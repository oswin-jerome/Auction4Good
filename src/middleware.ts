import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { auth } from "./auth";
import { redirect } from "next/navigation";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
export const { auth } = NextAuth(authConfig);

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const user = await auth();
  if (!user) {
    return Response.redirect(new URL("/login", nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/host/:path*",
};
