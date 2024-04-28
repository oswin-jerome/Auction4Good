"use server";
import { db } from "@/lib/db";
import { registerUserSchema } from "@/zod/schemas";
import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/react-native.js";

export const registerUser = async (user: Object) => {
  const validation = registerUserSchema.safeParse(user);
  if (!validation.success) {
    return {
      success: false,
      //   errors: validation.error.errors,
    };
  }

  try {
    const userData = await db.user.create({
      data: validation.data,
    });

    return {
      success: true,
      data: userData,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      var errors = {};
      console.log(error.meta);

      if (error.meta?.target === "User_phone_key") {
        return {
          success: false,
          errors: {
            phone: "Phone number must be unique",
          },
        };
      }
      if (error.meta?.target === "User_email_key") {
        return {
          success: false,
          errors: {
            email: "Email must be unique",
          },
        };
      }
    }
  }
};
