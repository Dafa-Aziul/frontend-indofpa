import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refresh_token")?.value;
  const { pathname } = req.nextUrl;

  // Allowed paths (misal static files / images)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // Proteksi admin (tepat, bukan startsWith longgar)
  if (pathname.match(/^\/admin(\/|$)/)) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // User sudah login, larang masuk /login
  if (pathname === "/login" && refreshToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
  ],
};
