import { gscQuery, gaBatch, serviceAccount } from "./google";

const DAY = 86400000;
const iso = (d) => d.toISOString().slice(0, 10);
const shift = (d, days) => new Date(d.getTime() + days * DAY);
const num = (v) => Number(v) || 0;

// Two back to back windows of the same length: this period and the one before it.
function windows(days, lagDays) {
  const end = shift(new Date(), -lagDays);
  const start = shift(end, -(days - 1));
  const prevEnd = shift(start, -1);
  const prevStart = shift(prevEnd, -(days - 1));
  return { start: iso(start), end: iso(end), prevStart: iso(prevStart), prevEnd: iso(prevEnd) };
}

function sumSearch(rows) {
  const clicks = rows.reduce((a, r) => a + num(r.clicks), 0);
  const impressions = rows.reduce((a, r) => a + num(r.impressions), 0);
  const weighted = rows.reduce((a, r) => a + num(r.position) * num(r.impressions), 0);
  return { clicks, impressions, ctr: impressions ? clicks / impressions : 0, position: impressions ? weighted / impressions : 0 };
}

// ---------- Google Search Console ----------
// Search Console finalises data two to three days late, so the window ends three days ago.
async function searchData(site, days) {
  const w = windows(days, 3);
  const q = (body) => gscQuery(site.gsc, { dataState: "final", ...body });
  const [byDate, queries, prevQueries, pages, prevPages, countries, devices] = await Promise.all([
    q({ startDate: w.prevStart, endDate: w.end, dimensions: ["date"], rowLimit: 400 }),
    q({ startDate: w.start, endDate: w.end, dimensions: ["query"], rowLimit: 1000 }),
    q({ startDate: w.prevStart, endDate: w.prevEnd, dimensions: ["query"], rowLimit: 1000 }),
    q({ startDate: w.start, endDate: w.end, dimensions: ["page"], rowLimit: 25 }),
    q({ startDate: w.prevStart, endDate: w.prevEnd, dimensions: ["page"], rowLimit: 200 }),
    q({ startDate: w.start, endDate: w.end, dimensions: ["country"], rowLimit: 10 }),
    q({ startDate: w.start, endDate: w.end, dimensions: ["device"], rowLimit: 5 }),
  ]);

  const dateRows = new Map((byDate.rows || []).map((r) => [r.keys[0], r]));
  const empty = { clicks: 0, impressions: 0, position: 0 };
  const daily = [];
  for (let i = 0; i < days; i++) {
    const d = iso(shift(new Date(`${w.start}T00:00:00Z`), i));
    const p = iso(shift(new Date(`${w.prevStart}T00:00:00Z`), i));
    daily.push({ date: d, prevDate: p, cur: dateRows.get(d) || empty, prev: dateRows.get(p) || empty });
  }
  const totals = { cur: sumSearch(daily.map((d) => d.cur)), prev: sumSearch(daily.map((d) => d.prev)) };

  const prevQ = new Map((prevQueries.rows || []).map((r) => [r.keys[0], r]));
  const allQueries = (queries.rows || []).map((r) => ({
    key: r.keys[0], clicks: num(r.clicks), impressions: num(r.impressions), ctr: num(r.ctr), position: num(r.position),
    prevClicks: prevQ.has(r.keys[0]) ? num(prevQ.get(r.keys[0]).clicks) : null,
    prevPosition: prevQ.has(r.keys[0]) ? num(prevQ.get(r.keys[0]).position) : null,
  }));

  // Brand searches (people who already know the name) against everything else.
  const brandRows = allQueries.filter((r) => site.brand.test(r.key));
  const brandClicks = brandRows.reduce((a, r) => a + r.clicks, 0);
  const listedClicks = allQueries.reduce((a, r) => a + r.clicks, 0);
  const brand = {
    brand: brandClicks,
    nonBrand: listedClicks - brandClicks,
    hidden: Math.max(0, totals.cur.clicks - listedClicks),
  };

  // Searches where the site already shows on page one or two but is not winning the click.
  const minImpressions = Math.max(10, Math.round(days / 2));
  const opportunities = allQueries
    .filter((r) => r.position > 3 && r.position <= 20 && r.impressions >= minImpressions)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 12);

  const prevP = new Map((prevPages.rows || []).map((r) => [r.keys[0], r]));
  const mapRows = (res) => (res.rows || []).map((r) => ({ key: r.keys[0], clicks: num(r.clicks), impressions: num(r.impressions), ctr: num(r.ctr), position: num(r.position) }));
  return {
    window: w,
    totals,
    daily,
    queries: allQueries.slice(0, 25),
    queryCount: allQueries.length,
    brand,
    opportunities,
    pages: mapRows(pages).map((r) => ({ ...r, prevClicks: prevP.has(r.key) ? num(prevP.get(r.key).clicks) : null })),
    countries: mapRows(countries),
    devices: mapRows(devices),
  };
}

// ---------- Google Analytics 4 ----------
const AI_SOURCES = "chatgpt|openai|perplexity|claude|anthropic|gemini|copilot|deepseek|meta\\.ai|grok|you\\.com|phind";
const ENQUIRY_EVENTS = ["call_click", "whatsapp_click", "register_interest", "project_site_click", "generate_lead", "form_submit"];

// Turn a GA4 report into plain rows. With two date ranges GA4 adds a trailing
// "dateRange" dimension: date_range_0 is this period, date_range_1 the one before.
function gaRows(report, metricNames) {
  const dims = (report.dimensionHeaders || []).map((h) => h.name);
  return (report.rows || []).map((row) => {
    const out = { range: 0 };
    dims.forEach((d, i) => {
      const v = row.dimensionValues[i].value;
      if (d === "dateRange") out.range = v === "date_range_1" ? 1 : 0;
      else out[d] = v;
    });
    metricNames.forEach((m, i) => { out[m] = num(row.metricValues[i].value); });
    return out;
  });
}

// Fold this period / previous period rows into one row per key.
function pair(rows, keyName, metricNames) {
  const map = new Map();
  for (const r of rows) {
    const k = r[keyName];
    if (!map.has(k)) map.set(k, { key: k });
    const o = map.get(k);
    for (const m of metricNames) o[r.range === 1 ? `prev_${m}` : m] = r[m];
  }
  return [...map.values()].map((o) => {
    for (const m of metricNames) { if (o[m] == null) o[m] = 0; if (o[`prev_${m}`] == null) o[`prev_${m}`] = 0; }
    return o;
  });
}

async function analyticsData(site, days) {
  const w = windows(days, 1);
  const both = [{ startDate: w.start, endDate: w.end }, { startDate: w.prevStart, endDate: w.prevEnd }];
  const cur = [both[0]];
  const m = (...names) => names.map((name) => ({ name }));
  const d = (...names) => names.map((name) => ({ name }));
  const TOTALS = ["totalUsers", "newUsers", "sessions", "screenPageViews", "engagementRate", "keyEvents"];
  const desc = (metric) => [{ metric: { metricName: metric }, desc: true }];

  const [a, b] = await Promise.all([
    gaBatch(site.ga4, [
      { dateRanges: both, metrics: m(...TOTALS) },
      { dateRanges: both, dimensions: d("date"), metrics: m("sessions", "totalUsers"), limit: 400 },
      { dateRanges: both, dimensions: d("sessionDefaultChannelGroup"), metrics: m("sessions", "keyEvents"), limit: 50 },
      { dateRanges: cur, dimensions: d("landingPage"), metrics: m("sessions", "engagementRate", "keyEvents"), orderBys: desc("sessions"), limit: 15 },
      { dateRanges: cur, dimensions: d("country"), metrics: m("sessions", "totalUsers"), orderBys: desc("sessions"), limit: 10 },
    ]),
    gaBatch(site.ga4, [
      { dateRanges: both, dimensions: d("sessionSource"), metrics: m("sessions"), limit: 50,
        dimensionFilter: { filter: { fieldName: "sessionSource", stringFilter: { matchType: "PARTIAL_REGEXP", value: AI_SOURCES, caseSensitive: false } } } },
      { dateRanges: both, dimensions: d("eventName"), metrics: m("eventCount"), limit: 50,
        dimensionFilter: { filter: { fieldName: "eventName", inListFilter: { values: ENQUIRY_EVENTS } } } },
      { dateRanges: cur, dimensions: d("sessionSourceMedium"), metrics: m("sessions", "keyEvents"), orderBys: desc("sessions"), limit: 12 },
    ]),
  ]);
  const [rTotals, rDate, rChannels, rLanding, rCountry] = a.reports || [];
  const [rAi, rEvents, rSource] = b.reports || [];

  const zero = Object.fromEntries(TOTALS.map((t) => [t, 0]));
  const totalRows = gaRows(rTotals || {}, TOTALS);
  const totals = { cur: totalRows.find((r) => r.range === 0) || zero, prev: totalRows.find((r) => r.range === 1) || zero };

  const dateRows = gaRows(rDate || {}, ["sessions", "totalUsers"]);
  const byDate = new Map(dateRows.map((r) => [`${r.date.slice(0, 4)}-${r.date.slice(4, 6)}-${r.date.slice(6, 8)}`, r]));
  const daily = [];
  for (let i = 0; i < days; i++) {
    const dd = iso(shift(new Date(`${w.start}T00:00:00Z`), i));
    const pp = iso(shift(new Date(`${w.prevStart}T00:00:00Z`), i));
    daily.push({ date: dd, prevDate: pp, cur: num(byDate.get(dd) && byDate.get(dd).sessions), prev: num(byDate.get(pp) && byDate.get(pp).sessions) });
  }

  const bySessions = (x, y) => y.sessions - x.sessions;
  const ai = pair(gaRows(rAi || {}, ["sessions"]), "sessionSource", ["sessions"]).sort(bySessions);
  const events = pair(gaRows(rEvents || {}, ["eventCount"]), "eventName", ["eventCount"]).sort((x, y) => y.eventCount - x.eventCount);
  const sum = (rows, k) => rows.reduce((acc, r) => acc + num(r[k]), 0);
  return {
    window: w,
    totals,
    daily,
    channels: pair(gaRows(rChannels || {}, ["sessions", "keyEvents"]), "sessionDefaultChannelGroup", ["sessions", "keyEvents"]).sort(bySessions),
    landing: gaRows(rLanding || {}, ["sessions", "engagementRate", "keyEvents"]).map((r) => ({ key: r.landingPage, ...r })),
    countries: gaRows(rCountry || {}, ["sessions", "totalUsers"]).map((r) => ({ key: r.country, ...r })),
    sources: gaRows(rSource || {}, ["sessions", "keyEvents"]).map((r) => ({ key: r.sessionSourceMedium, ...r })),
    ai,
    aiTotals: { cur: sum(ai, "sessions"), prev: sum(ai, "prev_sessions") },
    events,
    enquiries: { cur: sum(events, "eventCount"), prev: sum(events, "prev_eventCount") },
  };
}

const settle = async (fn) => {
  try { return { ok: true, data: await fn() }; } catch (e) { return { ok: false, error: String((e && e.message) || e) }; }
};

export async function siteData(site, days) {
  const sa = serviceAccount();
  if (!sa.ok) return { search: { ok: false, error: sa.error }, analytics: { ok: false, error: sa.error } };
  const [search, analytics] = await Promise.all([
    settle(() => searchData(site, days)),
    site.ga4
      ? settle(() => analyticsData(site, days))
      : { ok: false, error: `No Google Analytics property ID yet. Add ${site.ga4Env} in Vercel (the numeric ID from Analytics > Admin > Property details).` },
  ]);
  return { search, analytics };
}
