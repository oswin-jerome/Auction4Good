import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { db } from "./lib/db";

export default {
  providers: [
    CredentialsProvider({
      name: "credentials",
      type: "credentials",

      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "username", type: "text" },
      },

      async authorize(credentials, req) {
        const user = await db.user.findFirst({
          where: {
            AND: [
              {
                email: credentials.username?.toString(),
                password: credentials?.password?.toString(),
              },
            ],
          },
        });

        console.log(user);

        if (user != null) {
          return {
            name: user.first_name,
            id: user.id.toString(),
            email: user.email,
            user_id: user.id,
          };
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
