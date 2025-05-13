from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Cart
from manage_courses.models import Course
from manage_courses.serializers import CourseSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    
    try:
       
        cart = request.user.cart
        courses = cart.courses.all()
        
        total_price = sum(course.price for course in courses)
        
        return Response({
               
            'courses': CourseSerializer(courses, many=True).data,
            'total_price': total_price,
            'total_items': courses.count()
        })
    except Cart.DoesNotExist:
        cart = Cart.objects.create(user=request.user)
        return Response({
         
            'courses': [],
            'total_price': 0,
            'total_items': 0,
        })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    try:
        course_id = request.data.get('course_id')
        if not course_id:
            return Response({'error': 'Course ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        course = Course.objects.get(id=course_id)
        cart = request.user.cart
        cart.courses.add(course)
        
        return Response({'message': 'Course added to cart successfully'})
    except Course.DoesNotExist:
        return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, course_id):
    try:
        cart = request.user.cart
        course = Course.objects.get(id=course_id)
        cart.courses.remove(course)
        
        return Response({'message': 'Course removed from cart successfully'})
    except Course.DoesNotExist:
        return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def clear_cart(request):
    try:
        cart = request.user.cart
        cart.courses.clear()
        
        return Response({'message': 'Cart cleared successfully'})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST) 