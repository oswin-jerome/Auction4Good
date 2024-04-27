import React, { ReactNode } from "react";
import { BellIcon, DashboardIcon, HomeIcon } from "@radix-ui/react-icons";
export default function HostLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container  gap-6 h-full grid grid-cols-[250px,1fr]">
      <aside className="p-4 pt-12 bg-zinc-100 rounded">
        <ul className="space-y-2">
          <li className="flex gap-2 items-center bg-blue-500 text-white p-2 rounded cursor-pointer">
            <DashboardIcon /> Dashboard
          </li>
          <li className="flex gap-2 items-center hover:bg-blue-500/30  p-2 rounded cursor-pointer">
            <BellIcon /> Auctions
          </li>
        </ul>
      </aside>
      <section>{children}</section>
    </div>
  );
}
