"use client";
import React from "react";
import { CardDescription } from "@/components/ui/Card";
import ReviewStars from "@/components/Courses/ReviewStars";
import CourseDetails from "@/components/Courses/CourseDetails";
import BackgroundBlur from "@/components/BackgroundBlur";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useCart } from "@/providers/CartProvider";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { useSession } from "next-auth/react";
import {
  MdOutlineShoppingCart,
  MdOutlineShoppingCartCheckout,
  MdDelete,
} from "react-icons/md";
import Image from "next/image";

function CourseOverview({ course, className, isCart }) {
  const path = usePathname();
  const isCartPath = path === "/cart";
  const { data: session } = useSession();
  const router = useRouter();

  const { addToCart, removeFromCart, isInCart } = useCart();

  const handleCartAction = () => {
    if (!session) {
      router.push("/auth");
      return;
    }

    if (isInCart(course.id)) {
      removeFromCart(course.id);
    } else {
      addToCart(course);
    }
  };

  const removeCourse = () => {
    removeFromCart(course.id);
  };

  return (
    <div
      className={`flex w-full relative items-stretch gap-12 max-w-7xl ${className}`}
    >
      {isCartPath && (
        <div className="absolute top-0 right-0">
          <IoMdClose
            onClick={removeCourse}
            className="size-8 text-neutral-800 cursor-pointer hover:fill-white transition-colors duration-300"
          />
        </div>
      )}
      <Card className="w-3/5 h-[450px] p-4 border-2 dark:bg-transparent">
        <div className="relative size-full">
          <Image
            src={
              course.thumbnail_url ||
              "https://support.heberjahiz.com/hc/article_attachments/21013076295570"
            }
            alt="Course thumbnail preview"
            fill
            className="object-cover rounded-md"
          />
        </div>
      </Card>
      <div className="flex flex-col  w-2/5 gap-8 justify-between">
        <div className="flex flex-col gap-4 justify-start ">
          <h1 className="text-2xl">{course?.title}</h1>
          <div className="flex gap-2">
            <ReviewStars review={course.rating_avg} />
            <span>{course.rating_avg}</span>
          </div>
          <CourseDetails course={course} />
        </div>
        <CardDescription>{course.description}</CardDescription>
        <Button className={"w-fit"}>{course.price} USD</Button>

        {!isCartPath &&
          (isInCart(course.id) ? (
            <Button
              variant={"destructive"}
              className={"w-fit"}
              onClick={removeCourse}
            >
              <MdOutlineShoppingCartCheckout className="mr-2" />
              Remove from Cart
            </Button>
          ) : (
            <div className="flex relative">
              <BackgroundBlur size={"md"} className={"w-full"}>
                <Button
                  className={
                    "w-full dark:bg-linear-to-b from-white to-neutral-300 text-neutral-800 hover:text-neutral-800 hover:to-white border-none transition-colors duration-300 cursor-pointer"
                  }
                  onClick={handleCartAction}
                >
                  <MdOutlineShoppingCart className="mr-2" />
                  Add to cart
                </Button>
              </BackgroundBlur>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CourseOverview;
