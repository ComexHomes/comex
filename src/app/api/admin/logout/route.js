import { NextResponse } from "next/server";
import { COOKIE } from "../../../admin/lib/session";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const res = NextResponse.redirect(new URL("/admin/login", req.url), 303);
  res.cookies.set(COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
