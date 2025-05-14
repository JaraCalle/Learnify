"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/providers/CartProvider";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";
import CourseOverview from "@/components/Courses/CourseOverview";
import { getCart } from "@/services/cartService";
import { useQuery } from "@tanstack/react-query";
import OrderSummary from "@/components/Cart/OrderSummary";
import { useI18n } from "@/providers/I18nProvider";

export default function CartPage() {
  const router = useRouter();
  const { clearCart } = useCart();
  const { t } = useI18n();
  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  if (cart?.courses?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 max-w-7xl mx-auto min-h-[60vh]">
        <MdShoppingCart className="size-24 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">{t("cart.empty")}</h1>
        <p className="text-muted-foreground mb-6">{t("cart.emptyMessage")}</p>
        <Link href="/courses">
          <Button>{t("cart.browseCourses")}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="flex flex-col lg:flex-row justify-around gap-8">
        <div className="w-full lg:w-2/3 flex flex-col gap-12">
          {cart?.courses?.map((course) => (
            <CourseOverview key={course.id} course={course} />
          ))}

          <div className="mt-8 pt-6 border-t">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-medium">
                {t("cart.totalItems")}:
              </span>
              <span className="text-xl font-medium">
                {cart?.courses?.length}
              </span>
            </div>

            <Button variant="outline" onClick={clearCart} className="w-full">
              {t("cart.clearCart")}
              
            </Button>
          </div>
        </div>

        <div className="w-full lg:w-1/4 lg:sticky lg:top-24 lg:self-start">
          <OrderSummary
            totalPrice={cart?.total_price}
            itemCount={cart?.courses?.length}
            onCheckout={() => router.push("/cart/checkout")}
          />
        </div>
      </div>
    </div>
  );
}
