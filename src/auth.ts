import NextAuth from "next-auth";
import { PrismaClient } from "@prisma/client";
import { number } from "zod";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      const u = await db.user.findUnique({ where: { id: parseInt(token.sub ?? "0") } });
      if (u) {
        token.user_id = u.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token.sub && session.user) {
        session.user.user_id = token.user_id;
      }

      return session;
    },
  },
  ...authConfig,
});
