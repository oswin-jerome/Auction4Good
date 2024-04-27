import NextAuth, { DefaultUser, type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      user_id: number;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    user_id: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user_id: number;
  }
  interface Session {
    user: {
      user_id: number;
    } & DefaultSession["user"];
  }
}
