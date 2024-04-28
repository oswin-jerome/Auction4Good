"use server";

import { HOST_AUCTIONS } from "@/app/routes";
import { auth } from "@/auth";
// import { auth } from "@/app/api/auth/[...nextauth]/route";
import { createAuctionSchema } from "@/zod/schemas";
import { Prisma, PrismaClient } from "@prisma/client";
import { writeFile, writeFileSync } from "fs";

import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import path from "path";

export const createAuction = async (auction: Object, formData: FormData) => {
  const user = await auth();

  // File Upload
  const file = formData.get("image") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  try {
    await writeFileSync(path.join(process.cwd(), "public/" + "filename.jpeg"), buffer);
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
