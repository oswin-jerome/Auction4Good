import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { auth } from "./auth";
import { redirect } from "next/navigation";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { AUTH_API, PUBLIC_ROUTES } from "./app/routes";
export const { auth } = NextAuth(authConfig);

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  const user = await auth();
  const isAuthApiRoute = nextUrl.pathname.startsWith(AUTH_API);
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  /**
   * Do nothing if it is a Auth API route
   */
  if (isAuthApiRoute) {
    return null;
  }

  /**
   * Redirect to home if user is logged in and accessing login or register page
   */
  if ((nextUrl.pathname == "/login" || nextUrl.pathname == "/register") && user?.user) {
    return Response.redirect(new URL("/", nextUrl));
  }

  /**
   * Do nothing if it is a public route
   */
  if (isPublicRoute) {
    return null;
  }

  /**
   * Redirect if not logged in
   */
  if (user?.user == null) {
    return Response.redirect(new URL("/login", nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
