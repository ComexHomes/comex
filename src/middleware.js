import { NextResponse } from "next/server";
import { COOKIE, adminConfig, verifySession } from "./app/admin/lib/session";

// Everything under /admin and /api/admin needs a valid session, except the
// login page and the login endpoint themselves.
export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };

const OPEN = new Set(["/admin/login", "/api/admin/login"]);

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  let res;
  if (OPEN.has(pathname)) {
    res = NextResponse.next();
  } else if (await verifySession(adminConfig(), req.cookies.get(COOKIE)?.value)) {
    res = NextResponse.next();
  } else if (pathname.startsWith("/api/")) {
    res = NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  } else {
    res = NextResponse.redirect(new URL("/admin/login", req.url));
  }
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "no-store");
  return res;
}
