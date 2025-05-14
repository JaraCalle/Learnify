"use client";
import React from "react";
import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Button } from "@/components/ui/Button";
import { getCart } from "@/services/cartService";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

function CartIcon() {

  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  return (
    <Link href="/cart">
      <Button  className="relative p-2">
        <MdOutlineShoppingCart className="size-6" />
        {cart?.total_items > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {cart?.total_items}
          </span>
        )}
      </Button>
    </Link>
  );
}

export default CartIcon;
