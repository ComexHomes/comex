import { NextResponse } from "next/server";
import { COOKIE, MAX_AGE, adminConfig, createSession, safeEqual, sha256 } from "../../../admin/lib/session";

export const dynamic = "force-dynamic";

// Best effort brake on password guessing. Memory is per server instance, so the
// fixed delay on every wrong attempt is the part that always applies.
const attempts = new Map();
const LIMIT = 5;
const LOCK_MS = 15 * 60 * 1000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const back = (req, code) => NextResponse.redirect(new URL(`/admin/login?error=${code}`, req.url), 303);

export async function POST(req) {
  const cfg = adminConfig();
  if (!cfg.ready) return back(req, "setup");

  // Only accept the form when it was posted from this site.
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  if (origin) {
    let originHost = "";
    try { originHost = new URL(origin).host; } catch (e) {}
    if (originHost !== host) return back(req, "origin");
  }

  const ip = (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  const now = Date.now();
  const rec = attempts.get(ip);
  if (rec && rec.until > now) return back(req, "locked");

  let form;
  try { form = await req.formData(); } catch (e) { return back(req, "1"); }
  const email = String(form.get("email") || "").trim().toLowerCase();
  const password = String(form.get("password") || "");

  const [e1, e2, p1, p2] = await Promise.all([sha256(email), sha256(cfg.email), sha256(password), sha256(cfg.password)]);
  const ok = safeEqual(e1, e2) & safeEqual(p1, p2);

  if (!ok) {
    const count = (rec && rec.count ? rec.count : 0) + 1;
    attempts.set(ip, count >= LIMIT ? { count: 0, until: now + LOCK_MS } : { count, until: 0 });
    if (attempts.size > 5000) attempts.clear();
    await sleep(900);
    return back(req, count >= LIMIT ? "locked" : "1");
  }

  attempts.delete(ip);
  const res = NextResponse.redirect(new URL("/admin", req.url), 303);
  res.cookies.set(COOKIE, await createSession(cfg), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
  return res;
}
