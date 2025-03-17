'use client'

import { usePathname } from "next/navigation";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/Button";
import { Menu } from "@geist-ui/icons";
import Search from "./Search";
import BackgroundBlur from "./BackgroundBlur";

const Navbar = () => {
  const  pathname  = usePathname();


  return (
    <div
      className={`w-full z-10 h-24  top-0 ${
        pathname == "/" ? "absolute" : "backdrop-blur-2xl sticky"
      }`}
    >
      <div className={`w-full flex items-center  h-full ${pathname != "/" && "bg-black/80"}`}>
        <div className="flex justify-between items-center w-full h-full px-12">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Learnify Logo"
              width={260}
              height={150}
            />
          </Link>
          {pathname != "/" && (
            <div className="w-1/4 z-20">
              <BackgroundBlur className={"w-full"}>
                <Search
                  placeholder="python"
                  className={" border border-neutral-500 py-5"}
                />
              </BackgroundBlur>
            </div>
          )}
          <ul className="hidden md:flex gap-x-6 text-white">
            <li>
              <Link href="/about">
                <Button className={" text-md font-normal"} variant={"outline"}>
                  Log In
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <Button className={" text-md font-normal"} variant={"outline"}>
                  Sign Up
                </Button>
              </Link>
            </li>
            <li>
              <Button className={" text-md font-normal"} variant={"outline"}>
                <Menu />
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
