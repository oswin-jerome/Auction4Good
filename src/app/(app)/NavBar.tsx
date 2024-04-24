import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export default function NavBar() {
  return (
    <nav className="bg-zinc-100 fixed left-0 right-0 z-40">
      <div className="container py-4 flex justify-between md:justify-normal gap-6  md:gap-12 items-center">
        <div className="font-bold text-lg">
          Auction<span className="text-xl text-blue-700">4</span>Good
        </div>
        <ul className="hidden md:flex gap-10 flex-1">
          <li className="text-zinc-500 hover:text-zinc-800">
            <Link href={"/"}>Home</Link>
          </li>
          <li className="text-zinc-500 hover:text-zinc-800">
            <Link href={"/"}>Auctions</Link>
          </li>
          <li className="text-zinc-500 hover:text-zinc-800">
            <Link href={"/"}>About</Link>
          </li>
        </ul>
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
      </div>
    </nav>
  );
}
