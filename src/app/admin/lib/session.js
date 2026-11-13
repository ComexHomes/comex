// Admin session helpers. Web Crypto only, so the same code runs in middleware
// (edge) and in the login route (node).
//
// Set these in Vercel > Settings > Environment Variables (mark them Sensitive):
//   ADMIN_EMAIL            the email used to log in
//   ADMIN_PASSWORD         a strong password, 16 characters or more
//   ADMIN_SESSION_SECRET   a random string, 32 characters or more
export const COOKIE = "comex_admin";
export const MAX_AGE = 60 * 60 * 12; // 12 hours, then log in again

const enc = new TextEncoder();
const hex = (buf) => Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");

export function adminConfig() {
  const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "";
  const secret = process.env.ADMIN_SESSION_SECRET || "";
  const missing = [];
  if (!email) missing.push("ADMIN_EMAIL");
  if (password.length < 12) missing.push("ADMIN_PASSWORD");
  if (secret.length < 32) missing.push("ADMIN_SESSION_SECRET");
  return { email, password, secret, missing, ready: missing.length === 0 };
}

async function hmac(key, message) {
  const k = await crypto.subtle.importKey("raw", enc.encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return hex(await crypto.subtle.sign("HMAC", k, enc.encode(message)));
}

export async function sha256(text) {
  return hex(await crypto.subtle.digest("SHA-256", enc.encode(text)));
}

// Compare without leaking where two strings differ.
export function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// The password is part of the signing key, so changing it signs everyone out.
const signingKey = (cfg) => `${cfg.secret}|${cfg.password}`;

export async function createSession(cfg) {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  return `${exp}.${await hmac(signingKey(cfg), `admin|${cfg.email}|${exp}`)}`;
}

export async function verifySession(cfg, value) {
  if (!cfg.ready || !value) return false;
  const [exp, sig] = String(value).split(".");
  if (!/^\d+$/.test(exp || "") || !sig) return false;
  if (Number(exp) < Math.floor(Date.now() / 1000)) return false;
  return safeEqual(sig, await hmac(signingKey(cfg), `admin|${cfg.email}|${exp}`));
}
