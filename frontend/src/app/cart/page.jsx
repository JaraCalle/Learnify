"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/providers/CartProvider";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";
import CourseOverview from "@/components/Courses/CourseOverview";
import OrderSummary from "../../components/Cart/OrderSummary";

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, totalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 max-w-7xl mx-auto min-h-[60vh]">
        <MdShoppingCart className="size-24 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">
          Looks like you haven't added any courses to your cart yet.
        </p>
        <Link href="/courses">
          <Button>Browse Courses</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="flex flex-col lg:flex-row justify-around gap-8">
        <div className="w-full lg:w-2/3 flex flex-col gap-12">
          {cart.map((course) => (
            <CourseOverview key={course.id} course={course} />
          ))}

          <div className="mt-8 pt-6 border-t">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-medium">Total Items:</span>
              <span className="text-xl font-medium">{cart.length}</span>
            </div>

            <Button variant="outline" onClick={clearCart} className="w-full">
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Order Summary - Right Side (Smaller) */}
        <div className="w-full lg:w-1/4 lg:sticky lg:top-24 lg:self-start">
          <OrderSummary
            totalPrice={totalPrice}
            itemCount={cart.length}
            onCheckout={() => router.push("/cart/checkout")}
          />
        </div>
      </div>
    </div>
  );
}
