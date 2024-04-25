import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
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
          };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
