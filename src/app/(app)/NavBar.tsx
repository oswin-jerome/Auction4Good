"use client";
import { Avatar, Button, Text } from "@radix-ui/themes";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.svg";
import { useSession, signOut } from "next-auth/react";
export default function NavBar() {
  const { data, status, update } = useSession();

  return (
    <nav className="bg-zinc-100 fixed left-0 right-0 z-40">
      <div className="container py-4 flex justify-between md:justify-normal gap-6  md:gap-12 items-center">
        <div className="font-bold text-lg">
          <Image alt="logo" src={logo} />
        </div>
        <ul className="hidden md:flex gap-10 flex-1">
          <li className="text-zinc-500 hover:text-zinc-800">
            <Link href={"/"}>Home</Link>
          </li>
          <li className="text-zinc-500 hover:text-zinc-800">
            <Link href={"/auctions"}>Auctions</Link>
          </li>
          <li className="text-zinc-500 hover:text-zinc-800">
            <Link href={"/"}>About</Link>
          </li>
        </ul>
        {["unauthenticated", "loading"].includes(status) && (
          <div className=" space-x-4">
            <Link href={"/login"}>
              <Button color="indigo" className="cursor-pointer" variant="outline">
                Login
              </Button>
            </Link>
            <Link href={"/register"}>
              <Button className="cursor-pointer">Sign up</Button>
            </Link>
          </div>
        )}
        {status == "authenticated" && (
          <div className="flex gap-4 items-center">
            <Avatar size={"1"} fallback />
            <Text className="mr-4">{data.user?.name}</Text>
            <Button
              className="cursor-pointer"
              variant="outline"
              color="red"
              onClick={() => {
                signOut({
                  callbackUrl: "/login",
                });
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
