import { UPGRADE } from "@/app/routes";
import { getSessionUser } from "@/lib/user";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";
const checkUserPlan = async () => {
  const user = await getSessionUser();
  if (user?.plan === "FREE") {
    redirect(UPGRADE);
    return;
  }
};
async function HostTemplate({ children }: PropsWithChildren) {
  await checkUserPlan();

  return <div>{children}</div>;
}

export default HostTemplate;
