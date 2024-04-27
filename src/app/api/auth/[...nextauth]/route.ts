import { PrismaClient } from "@prisma/client";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import NextAuth, { DefaultSession, getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      type: "credentials",

      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "username", type: "text" },
      },

      async authorize(credentials, req) {
        const prisma = new PrismaClient();

        const user = await prisma.user.findFirst({
          where: {
            AND: [
              {
                email: credentials?.username,
                password: credentials?.password,
              },
            ],
          },
        });

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
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user_id = user.user_id;
        return token;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.user_id = token.user_id;

      return session;
    },
  },
});

export { handler as GET, handler as POST };

export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, handler);
}
