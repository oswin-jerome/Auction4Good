"use server";

import { HOME } from "@/app/routes";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/user";
import Razorpay from "razorpay";
export const generatePayment = async () => {
  var instance = new Razorpay({
    key_id: process.env.RAZORPAY_ID ?? "",
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const res = await instance.orders.create({
    amount: 5000,
    currency: "INR",
  });

  if (!res) {
    return;
  }

  const user = await getSessionUser();

  var options = {
    key: process.env.RAZORPAY_ID, // Enter the Key ID generated from the Dashboard
    name: "Auction 4 Good",
    currency: "INR",
    amount: 50000,
    order_id: res.id,
    description: "Thankyou for your test donation",
    prefill: {
      name: user?.first_name,
      email: user?.email,
      contact: user?.phone,
    },
    callback_url: "http://localhost:3000/api/payment",
  };

  const dbUser = await db.user.update({
    where: {
      id: user?.id,
    },
    data: {
      order_id: res.id,
    },
  });

  return options;
};
