"use client";
import React, { ReactNode } from "react";
import { BellIcon, DashboardIcon, HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
export default function HostLayout({ children }: { children: ReactNode }) {
  const path = usePathname();

  const menus = [
    {
      href: "/host",
      icon: <DashboardIcon />,
      label: "Dashboard",
    },
    {
      href: "/host/auctions/create",
      icon: <BellIcon />,
      label: "Auctions",
    },
  ];

  return (
    <div className="container  gap-6 h-full grid grid-cols-[250px,1fr]">
      <aside className="p-4 pt-12 bg-zinc-100 rounded">
        <ul className="space-y-2">
          {menus.map((menu, i) => {
            return (
              <li key={i} className={cn({ "flex gap-2 items-center  p-2 rounded cursor-pointer hover:bg-blue-100 hover:text-slate-800": true, "bg-blue-500 text-white": path === menu.href })}>
                <Link className="flex gap-2 items-center" href={menu.href}>
                  {menu.icon} {menu.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
      <section>{children}</section>
    </div>
  );
}
