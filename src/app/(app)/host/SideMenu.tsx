"use client";
import { HOST_AUCTIONS, HOST_AUCTION_CREATE } from "@/app/routes";
import { cn } from "@/lib/utils";
import { BellIcon, DashboardIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function SideMenu() {
  const path = usePathname();

  const menus = [
    {
      href: "/host",
      icon: <DashboardIcon />,
      label: "Dashboard",
      keepActiveFor: [],
    },
    {
      href: HOST_AUCTIONS,
      icon: <BellIcon />,
      label: "Auctions",
      keepActiveFor: [HOST_AUCTION_CREATE],
    },
  ];
  return (
    <aside className="p-4 pt-12 bg-zinc-100 rounded">
      <ul className="space-y-2">
        {menus.map((menu, i) => {
          return (
            <li key={i} className={cn({ "flex gap-2 items-center  p-2 rounded cursor-pointer hover:bg-blue-100 hover:text-slate-800": true, "bg-blue-500 text-white": path === menu.href || menu.keepActiveFor.includes(path) })}>
              <Link className="flex gap-2 items-center" href={menu.href}>
                {menu.icon} {menu.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default SideMenu;
