"use server";

import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/user";
import { addBidSchema } from "@/zod/schemas";

export const createBid = async (auctionId: string, data: object) => {
  const validation = addBidSchema.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.errors,
    };
  }

  const user = await getSessionUser();
  if (user == null) {
    return {
      success: false,
    };
  }
  const bid = await db.bid.create({
    data: {
      amount: validation.data.amount,
      auctionId: auctionId,
      userId: user!.id,
    },
  });

  return bid;
};

export const getBidsByAuctionId = async (auctionId: string, limit?: number | undefined) => {
  const auctions = await db.bid.findMany({
    where: {
      auctionId: auctionId,
    },
    include: {
      user: true,
    },
    orderBy: {
      amount: "desc",
    },
    take: limit,
  });

  return auctions;
};
