import React from "react";
import { cn } from "@/lib/utils/cn";
import { cva } from "class-variance-authority";

const blurVariants = cva(
  "absolute inset-0 blur bg-white opacity-40 -z-10 group-hover:opacity-60  transition-opacity duration-500",
  {
    variants: {
      size: {
        sm: "blur-sm group-hover:blur-md",
        md: "blur-md group-hover:blur-lg",
        lg: "blur-lg group-hover:blur-xl",
        xl: "blur-xl group-hover:blur-2xl",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
);

function BackgroundBlur({ children, className = "", color = "", size = "sm" }) {
  return (
    <div className={`relative ${className} group`}>
      {children}
      <div className={cn(blurVariants({ size }), color)}></div>
    </div>
  );
}

export default BackgroundBlur;
