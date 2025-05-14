from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.conf import settings
import stripe
from .models import Payment, PaymentCourse
from courses_gateway.models import Order, Cart
from manage_courses.models import Course
from auth_users.models import User


stripe.api_key = settings.STRIPE_SECRET_KEY

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_payment_intent(request):
    try:
        amount = request.data.get('amount')
        currency = request.data.get('currency', 'usd')
        
        print('amount', amount)
        print('currency', currency)

        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            automatic_payment_methods={
                'enabled': True,
            },
           
        )

        return Response({
            'clientSecret': intent.client_secret,
            'paymentIntentId': intent.id
        })
    except Exception as e:
        return Response(
            {'message': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def confirm_payment(request):
    try:
        payment_intent_id = request.data.get('paymentIntentId')
        payment_method_id = request.data.get('paymentMethodId', None)
        
        # Modify the payment intent
        stripe.PaymentIntent.modify(payment_intent_id, payment_method=payment_method_id)
        intent = stripe.PaymentIntent.retrieve(payment_intent_id)
        
        #get the access token from the request header without the Token prefix
        access_token = request.headers.get('Authorization', None)
        access_token = access_token.split(' ')[1]
        
        
        
        if not access_token:
            return Response(
                {'message': 'Access token is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = User.objects.get(auth_token=access_token)
        cart = user.cart
        print('cart', cart)
        
        if not user:
            return Response(
                {'message': 'User not found'},
                status=status.HTTP_400_BAD_REQUEST
            )  
        order = Order.objects.create(
            user=user,
            total_price=intent.amount / 100,
            status="pending"
        )
        
        for course in cart.courses.all():
            order.course.add(course)
            
            
        user.orders.add(order)
        user.save()
        
        # Verify the payment intent

        intent = intent.confirm(payment_method=payment_method_id, return_url="http://localhost:3000/")   

        print('intent', intent)
        
        
        if intent.status != 'succeeded':
            order.status = "failed"
            order.save()
            return Response(
                {'message': 'Payment not successful'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        
        order.status = "completed"
        order.save()
        
        for course in cart.courses.all():
            user.owned_courses.add(course)
        user.save()
        
        
        

        # Create payment record
        payment = Payment.objects.create(
            user=request.user,
            amount=intent.amount / 100,  # Convert from cents
            currency=intent.currency,
            payment_intent_id=payment_intent_id,
            status=intent.status
        )

        # Create payment course records
        for course in cart.courses.all():
            PaymentCourse.objects.create(
                payment=payment,
                course=course,
                price=course.price
            )

        return Response({
            'message': 'Payment confirmed successfully',
            'payment_id': payment.id
        })
    except Exception as e:
        return Response(
            {'message': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )
