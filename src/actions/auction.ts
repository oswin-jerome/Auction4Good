"use server";

import { HOST_AUCTIONS, LOGIN } from "@/app/routes";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/user";
// import { auth } from "@/app/api/auth/[...nextauth]/route";
import { createAuctionSchema } from "@/zod/schemas";
import { Prisma, PrismaClient, Status } from "@prisma/client";
import { writeFile, writeFileSync } from "fs";
import moment from "moment";

import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
import path from "path";

export const createAuction = async (auction: Object, formData: FormData) => {
  const user = await getSessionUser();
  if (user == null) {
    return {
      success: false,
    };
  }
  // File Upload
  const file = formData.get("image") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  try {
    await writeFileSync(
      path.join(process.cwd(), "public/" + "filename.jpeg"),
      buffer
    );
  } catch (e) {
    console.log(e);
  }

  const validation = createAuctionSchema.safeParse(auction);
  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.errors,
    };
  }
  delete validation.data["image"];
  const prisma = db;
  const res = await prisma.auction.create({
    data: {
      ...validation.data,

      user_id: user.id,
    },
  });

  if (moment(res.start_date).isSameOrBefore(new Date())) {
    await prisma.auction.update({
      where: {
        id: res.id,
      },
      data: {
        status: "OPEN",
      },
    });
  }
  revalidatePath(HOST_AUCTIONS);

  return {
    success: true,
  };
};

export const getAllAuctions = async ({
  max,
  min,
  active,
  closed,
  upcoming,
  completed,
}: {
  min?: number;
  max?: number;
  active?: boolean;
  closed?: boolean;
  upcoming?: boolean;
  completed?: boolean;
}) => {
  const prisma = db;
  var status: Status[] = [];
  if (active) {
    status.push("OPEN");
  }
  if (closed) {
    status.push("CLOSED");
  }
  if (upcoming) {
    status.push("YET_TO_OPEN");
  }
  if (completed) {
    status.push("COMPLETED");
  }

  const auctions = await prisma.auction.findMany({
    orderBy: {
      id: "desc",
    },
    where: {
      starting_bid_price: {
        gte: min,
        lte: max,
      },
      status: {
        in: [...status],
      },
    },
  });

  return auctions;
};

export const getMyAuctions = async () => {
  const user = await getSessionUser();
  if (user == null) {
    return null;
  }
  const prisma = db;
  const auctions = await prisma.auction.findMany({
    where: {
      user_id: user?.id,
    },
    orderBy: {
      id: "desc",
    },
  });

  return auctions;
};

export const getAuctionByUUID = async (uuid: string) => {
  const auction = await db.auction.findUnique({
    where: {
      id: uuid,
    },
  });

  return auction;
};
