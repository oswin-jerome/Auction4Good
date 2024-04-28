import NextAuth from "next-auth";
import { PrismaClient } from "@prisma/client";
import { number } from "zod";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      const prisma = new PrismaClient();
      const u = await prisma.user.findUnique({ where: { id: parseInt(token.sub ?? "0") } });
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
