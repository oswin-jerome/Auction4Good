"use server";

import { auth } from "@/auth";
// import { auth } from "@/app/api/auth/[...nextauth]/route";
import { createAuctionSchema } from "@/zod/schemas";
import { Prisma, PrismaClient } from "@prisma/client";

import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

export const createAuction = async (auction: Object) => {
  const user = await auth();

  const validation = createAuctionSchema.safeParse(auction);
  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.errors,
    };
  }

  const prisma = new PrismaClient();
  const res = await prisma.auction.create({
    data: {
      ...validation.data,
      user_id: user!.user.user_id,
    },
  });

  return {
    success: true,
  };
};

export const getAllAuctions = async () => {
  const prisma = new PrismaClient();
  const auctions = await prisma.auction.findMany();

  return auctions;
};
