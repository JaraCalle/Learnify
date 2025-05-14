"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function OrderSummary({ totalPrice = 0, itemCount = 0 }) {
  const router = useRouter();

  return (
    <Card className="bg-black p-6 gap-y-10">
      <CardHeader className="px-0">
        <CardTitle className={"text-4xl"}>Order Summary</CardTitle>
        <div className="flex justify-between text-sm text-muted-foreground">
          <p>
            Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
          </p>
          <p className="text-muted-foreground">${totalPrice.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <p className="font-semibold">TOTAL</p>
          <p className="text-muted-foreground">${totalPrice.toFixed(2)}</p>
        </div>
      </CardHeader>
      <CardFooter className="px-0">
        <Button
          className="w-full bg-gray-700 hover:bg-gray-600"
          onClick={() => router.push("/cart/checkout")}
        >
          Proceed to Checkout
        </Button>
      </CardFooter>
      <p className="text-xs text-muted-foreground mt-4 text-center">
        By proceeding to checkout, you agree to our Terms of Service and Privacy
        Policy.
      </p>
    </Card>
  );
}
