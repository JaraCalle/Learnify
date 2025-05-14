import React from "react";
import { IoMdClose } from "react-icons/io";
import { BiWindows } from "react-icons/bi";
import { TiHome } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useRef } from "react";
import Link from "next/link";
import { logout } from "@/actions/auth";
import { Button } from "./ui/Button";
import CreateNewCourse from "./Courses/CreateNewCourse";

function Sidebar({ close, session, update }) {
  const ref = useRef(null);

  useClickOutside(ref, () => close());

  const handleLogOut = () => {
    logout();
    close();
  };

  return (
    <div
      className="absolute right-0 h-screen flex flex-col justify-between w-1/5 bg-black z-30 px-12 py-6"
      ref={ref}
    >
      <div className="flex flex-col gap-4">
        <div className="flex w-full justify-end pr-4 pt-4">
          <IoMdClose className="size-6" onClick={close} />
        </div>
        <div className="flex flex-col justify-between mt-12">
          <div className="flex flex-col gap-6">
            <Link className="flex items-center justify-start gap-4" href="/">
              <TiHome className="size-6" />
              <p className="text-xl">Home</p>
            </Link>
            <Link
              className="flex items-center justify-start gap-4"
              href="/courses/owned"
            >
              <BiWindows className="size-6" />
              <p className="text-xl">Owned Courses</p>
            </Link>
            <Link className="flex items-center justify-start gap-4" href="/">
              <FaUser className="size-6" />
              <p className="text-xl">My Profile</p>
            </Link>
            <Link
              className="flex items-center justify-start gap-4"
              href="/cart"
            >
              <IoCart className="size-6" />
              <p className="text-xl">Cart</p>
            </Link>

            <div className="py-10 ">
              {" "}
              {session?.user && (
                <Button
                  onClick={handleLogOut}
                  className={
                    "relative inline-flex items-center justify-center p-0  overflow-hidden text-sm font-medium text-gray-900  group bg-gradient-to-br "
                  }
                >
                  <span className="relative px-5 py-2.5 text-white ">
                    Log out
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <CreateNewCourse image="/avatar.jpg" author={session.user} />
      </div>
    </div>
  );
}

export default Sidebar;
