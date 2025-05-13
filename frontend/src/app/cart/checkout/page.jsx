"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "@/providers/CartProvider";
import { createPaymentIntent, confirmPayment } from "@/services/paymentService";
import StripeElements from "@/components/Payment/StripeElements";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

// Check if the publishable key exists
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.error("Stripe publishable key is not defined!");
}

const stripePromise = stripePublishableKey
  ? loadStripe(stripePublishableKey)
  : null;

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();
  const [clientSecret, setClientSecret] = React.useState(null);
  const [paymentIntentId, setPaymentIntentId] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!session) {
      router.push("/auth");
      return;
    }

    if (cart.length === 0) {
      router.push("/cart");
      return;
    }

    if (!stripePublishableKey) {
      setError(
        "Payment system is not properly configured. Please contact support."
      );
      return;
    }

    const initializePayment = async () => {
      try {
        const { clientSecret, paymentIntentId } = await createPaymentIntent(
          totalPrice,
          session.accessToken
        );
        setClientSecret(clientSecret);
        setPaymentIntentId(paymentIntentId);
        setError(null);
      } catch (error) {
        console.error("Failed to initialize payment:", error);
        setError(error.message);
        toast.error("Failed to initialize payment. Please try again.");
      }
    };

    initializePayment();
  }, [session, totalPrice, router, cart.length]);

  const handlePaymentSuccess = async (paymentMethod) => {
    try {
      const courseIds = cart.map((item) => item.id);
      console.log(session);
      await confirmPayment(paymentIntentId, paymentMethod.id, courseIds, session.accessToken);
      clearCart();
      toast.success("Payment successful! You now have access to your courses.");
      router.push("/courses/my-courses");
    } catch (error) {
      console.error("Payment confirmation failed:", error);
      toast.error("Payment confirmation failed. Please contact support.");
    }
  };

  const handlePaymentError = (error) => {
    toast.error(`Payment failed: ${error}`);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button className="w-full" onClick={() => router.push("/cart")}>
            Return to Cart
          </Button>
        </Card>
      </div>
    );
  }

  if (!clientSecret || !stripePromise) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <Card className="p-4">
            {cart.map((course) => (
              <div key={course.id} className="flex justify-between py-2">
                <span>{course.title}</span>
                <span>${course.price}</span>
              </div>
            ))}
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <StripeElements
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
}
