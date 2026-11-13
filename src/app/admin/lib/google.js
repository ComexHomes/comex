// Read only access to Google Search Console and Google Analytics 4, using a
// Google Cloud service account. No extra npm packages needed.
//
// Vercel > Settings > Environment Variables (Sensitive):
//   GOOGLE_SERVICE_ACCOUNT_JSON   the full contents of the service account key file
// Then add the service account's email as a user on each Search Console
// property and as a Viewer on each Analytics property.
import crypto from "crypto";

// Local testing only: lets `next dev` talk to a stand-in server. Ignored in production.
const DEV = process.env.NODE_ENV !== "production" ? process.env.ADMIN_DEV_GOOGLE_ORIGIN : "";
const TOKEN_URL = DEV ? `${DEV}/token` : "https://oauth2.googleapis.com/token";
const GSC_BASE = DEV ? `${DEV}/webmasters/v3` : "https://www.googleapis.com/webmasters/v3";
const GA_BASE = DEV ? `${DEV}/v1beta` : "https://analyticsdata.googleapis.com/v1beta";
const SCOPES = "https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/analytics.readonly";

export function serviceAccount() {
  const raw = (process.env.GOOGLE_SERVICE_ACCOUNT_JSON || "").trim();
  if (!raw) return { ok: false, error: "GOOGLE_SERVICE_ACCOUNT_JSON is not set in Vercel yet." };
  try {
    const text = raw.startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
    const json = JSON.parse(text);
    if (!json.client_email || !json.private_key) throw new Error("missing fields");
    return { ok: true, email: json.client_email, key: json.private_key.replace(/\\n/g, "\n") };
  } catch (e) {
    return { ok: false, error: "GOOGLE_SERVICE_ACCOUNT_JSON is set but is not a valid service account key file." };
  }
}

const b64url = (v) => Buffer.from(v).toString("base64url");
let cachedToken = null;

async function accessToken() {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.exp > now + 60) return cachedToken.value;
  const sa = serviceAccount();
  if (!sa.ok) throw new Error(sa.error);
  const head = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(JSON.stringify({ iss: sa.email, scope: SCOPES, aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }));
  let signature;
  try {
    signature = crypto.createSign("RSA-SHA256").update(`${head}.${claim}`).sign(sa.key, "base64url");
  } catch (e) {
    throw new Error("The private key inside GOOGLE_SERVICE_ACCOUNT_JSON could not be read. Paste the key file again.");
  }
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${head}.${claim}.${signature}` }),
    cache: "no-store",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.access_token) throw new Error(`Google did not accept the service account key (${json.error_description || json.error || res.status}).`);
  cachedToken = { value: json.access_token, exp: now + (json.expires_in || 3600) };
  return cachedToken.value;
}

// Answers are kept for 10 minutes so switching tabs does not hammer Google.
const cache = new Map();
const TTL = 10 * 60 * 1000;

async function post(url, body, label) {
  const key = url + JSON.stringify(body);
  const hit = cache.get(key);
  if (hit && hit.at > Date.now() - TTL) return hit.json;
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${await accessToken()}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (json.error && json.error.message) || `HTTP ${res.status}`;
    if (res.status === 403 || res.status === 404) throw new Error(`${label}: the service account has no access yet, or the property ID is wrong. (${msg})`);
    throw new Error(`${label}: ${msg}`);
  }
  if (cache.size > 300) cache.clear();
  cache.set(key, { at: Date.now(), json });
  return json;
}

export function gscQuery(siteUrl, body) {
  return post(`${GSC_BASE}/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, body, "Search Console");
}

export function gaBatch(propertyId, requests) {
  return post(`${GA_BASE}/properties/${encodeURIComponent(propertyId)}:batchRunReports`, { requests }, "Google Analytics");
}
