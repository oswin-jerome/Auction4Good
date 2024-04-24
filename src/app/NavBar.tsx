import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export default function NavBar() {
  return (
    <nav className="bg-zinc-100">
      <div className="container py-4 flex justify-between md:justify-normal gap-6  md:gap-12 items-center">
        <div className="font-bold text-lg">Auction4Good</div>
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
          <Button color="indigo" className="cursor-pointer" variant="outline">
            Login
          </Button>
          <Button className="cursor-pointer">Sign up</Button>
        </div>
      </div>
    </nav>
  );
}
