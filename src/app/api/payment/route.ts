import { HOME } from "@/app/routes";
import { handlers } from "@/auth";
import { db } from "@/lib/db";
import { NextApiRequest } from "next";
import { redirect } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

const handle = async (req: NextRequest) => {
  const data = await req.formData();
  console.log(data.get("razorpay_order_id"));
  const user = await db.user.findUnique({
    where: {
      order_id: data.get("razorpay_order_id")?.toString(),
    },
  });

  await db.user.update({
    where: {
      id: user?.id,
    },
    data: {
      plan: "PREMIUM",
    },
  });

  return NextResponse.redirect(new URL(HOME, req.nextUrl));
};

export { handle as GET, handle as POST };
