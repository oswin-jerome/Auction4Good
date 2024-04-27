import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { withAuth } from "next-auth/middleware";
export { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {});

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/host/:path*",
};
