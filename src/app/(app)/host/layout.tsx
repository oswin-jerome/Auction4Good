import { ReactNode } from "react";
import SideMenu from "./SideMenu";
import { getSessionUser } from "@/lib/user";
import { redirect } from "next/navigation";
import { UPGRADE } from "@/app/routes";

export default async function HostLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container  gap-6 h-full grid grid-cols-[250px,1fr]">
      <SideMenu />
      <section>{children}</section>
    </div>
  );
}
