import Link from "next/link";
import { SITES, RANGES } from "./lib/sites";
import { siteData } from "./lib/data";
import { serviceAccount } from "./lib/google";
import TrendChart from "./ui/TrendChart";
import { Delta, Tile, Table, Problem, int, pct, pos } from "./ui/parts";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const COUNTRIES = { ken: "Kenya", usa: "United States", gbr: "United Kingdom", are: "United Arab Emirates", can: "Canada", deu: "Germany", aus: "Australia", zaf: "South Africa", uga: "Uganda", tza: "Tanzania", qat: "Qatar", sau: "Saudi Arabia", nld: "Netherlands", swe: "Sweden", ind: "India", nga: "Nigeria", fra: "France", chn: "China", rwa: "Rwanda", eth: "Ethiopia" };
const country = (c) => COUNTRIES[c] || String(c || "").toUpperCase();
const day = (d) => new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
const path = (url) => { try { const u = new URL(url); return u.pathname + u.search; } catch (e) { return url; } };
const title = (s) => String(s || "").replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase());

function Glance({ results }) {
  const cell = (ok, value, delta) => (ok ? <td>{value}{delta}</td> : <td className="note">not connected</td>);
  const tot = { clicks: 0, pClicks: 0, imp: 0, pImp: 0, users: 0, pUsers: 0, sess: 0, pSess: 0, enq: 0, pEnq: 0 };
  const rows = results.map(({ site, data }) => {
    const s = data.search.ok ? data.search.data.totals : null;
    const a = data.analytics.ok ? data.analytics.data : null;
    if (s) { tot.clicks += s.cur.clicks; tot.pClicks += s.prev.clicks; tot.imp += s.cur.impressions; tot.pImp += s.prev.impressions; }
    if (a) { tot.users += a.totals.cur.totalUsers; tot.pUsers += a.totals.prev.totalUsers; tot.sess += a.totals.cur.sessions; tot.pSess += a.totals.prev.sessions; tot.enq += a.enquiries.cur; tot.pEnq += a.enquiries.prev; }
    return (
      <tr key={site.key}>
        <td><b>{site.name}</b><br /><span className="note">{site.domain}</span></td>
        {cell(s, s && int(s.cur.clicks), s && <Delta cur={s.cur.clicks} prev={s.prev.clicks} />)}
        {cell(s, s && int(s.cur.impressions), s && <Delta cur={s.cur.impressions} prev={s.prev.impressions} />)}
        {cell(s, s && pct(s.cur.ctr), s && <Delta cur={s.cur.ctr} prev={s.prev.ctr} points scale={100} />)}
        {cell(s, s && pos(s.cur.position), s && <Delta cur={s.cur.position} prev={s.prev.position} points lowerIsBetter />)}
        {cell(a, a && int(a.totals.cur.totalUsers), a && <Delta cur={a.totals.cur.totalUsers} prev={a.totals.prev.totalUsers} />)}
        {cell(a, a && int(a.totals.cur.sessions), a && <Delta cur={a.totals.cur.sessions} prev={a.totals.prev.sessions} />)}
        {cell(a, a && int(a.enquiries.cur), a && <Delta cur={a.enquiries.cur} prev={a.enquiries.prev} />)}
      </tr>
    );
  });
  rows.push(
    <tr key="total" className="total">
      <td>All sites</td>
      <td>{int(tot.clicks)}<Delta cur={tot.clicks} prev={tot.pClicks} /></td>
      <td>{int(tot.imp)}<Delta cur={tot.imp} prev={tot.pImp} /></td>
      <td>{pct(tot.imp ? tot.clicks / tot.imp : 0)}</td>
      <td></td>
      <td>{int(tot.users)}<Delta cur={tot.users} prev={tot.pUsers} /></td>
      <td>{int(tot.sess)}<Delta cur={tot.sess} prev={tot.pSess} /></td>
      <td>{int(tot.enq)}<Delta cur={tot.enq} prev={tot.pEnq} /></td>
    </tr>
  );
  return <Table head={["Site", "Search clicks", "Impressions", "Click rate", "Avg position", "Visitors", "Sessions", "Enquiry actions"]} rows={rows} />;
}

function Search({ d }) {
  const t = d.totals;
  const b = d.brand;
  const bTotal = b.brand + b.nonBrand + b.hidden || 1;
  return (
    <>
      <div className="grid g4">
        <Tile label="Clicks from Google" value={int(t.cur.clicks)} was={int(t.prev.clicks)}><Delta cur={t.cur.clicks} prev={t.prev.clicks} /></Tile>
        <Tile label="Times shown in search" value={int(t.cur.impressions)} was={int(t.prev.impressions)}><Delta cur={t.cur.impressions} prev={t.prev.impressions} /></Tile>
        <Tile label="Click rate" value={pct(t.cur.ctr)} was={pct(t.prev.ctr)}><Delta cur={t.cur.ctr} prev={t.prev.ctr} points scale={100} /></Tile>
        <Tile label="Average position (lower is better)" value={pos(t.cur.position)} was={pos(t.prev.position)}><Delta cur={t.cur.position} prev={t.prev.position} points lowerIsBetter /></Tile>
      </div>
      <div className="grid g2" style={{ marginTop: 12 }}>
        <div className="card">
          <TrendChart title="Clicks from Google per day" unit="clicks" points={d.daily.map((x) => ({ date: x.date, prevDate: x.prevDate, cur: x.cur.clicks || 0, prev: x.prev.clicks || 0 }))} />
        </div>
        <div className="card">
          <TrendChart title="Times shown in search per day" unit="impressions" points={d.daily.map((x) => ({ date: x.date, prevDate: x.prevDate, cur: x.cur.impressions || 0, prev: x.prev.impressions || 0 }))} />
        </div>
      </div>
      <div className="card" style={{ marginTop: 12 }}>
        <h3>Brand searches against new demand</h3>
        <span className="note">Brand clicks come from people who already know the name. Non brand clicks are new buyers finding you by what they need.</span>
        <div className="split" role="img" aria-label={`Brand ${int(b.brand)} clicks, non brand ${int(b.nonBrand)} clicks, hidden by Google ${int(b.hidden)} clicks`}>
          <i style={{ width: `${(b.brand / bTotal) * 100}%`, background: "#b45309" }} />
          <i style={{ width: `${(b.nonBrand / bTotal) * 100}%`, background: "#2563eb" }} />
          <i style={{ width: `${(b.hidden / bTotal) * 100}%`, background: "#cfc9c6" }} />
        </div>
        <div className="legend">
          <span><i className="sw box" style={{ background: "#b45309" }} />Brand <b>{int(b.brand)}</b> ({pct(b.brand / bTotal)})</span>
          <span><i className="sw box" style={{ background: "#2563eb" }} />Non brand <b>{int(b.nonBrand)}</b> ({pct(b.nonBrand / bTotal)})</span>
          <span><i className="sw box" style={{ background: "#cfc9c6" }} />Searches Google keeps private <b>{int(b.hidden)}</b></span>
        </div>
      </div>
      <div className="grid g2" style={{ marginTop: 12 }}>
        <div className="card">
          <h3>Top searches</h3>
          <span className="note">What people typed before clicking through. Change is clicks against the previous period.</span>
          <Table head={["Search", "Clicks", "Shown", "Click rate", "Position"]} rows={d.queries.map((r) => (
            <tr key={r.key}><td>{r.key}</td><td>{int(r.clicks)}<Delta cur={r.clicks} prev={r.prevClicks} /></td><td>{int(r.impressions)}</td><td>{pct(r.ctr)}</td><td>{pos(r.position)}</td></tr>
          ))} />
        </div>
        <div className="card">
          <h3>Where to push next</h3>
          <span className="note">Searches where you already rank between position 4 and 20. Moving these up is the quickest route to more clicks.</span>
          <Table head={["Search", "Shown", "Clicks", "Position"]} empty="No searches in positions 4 to 20 with enough volume in this period." rows={d.opportunities.map((r) => (
            <tr key={r.key}><td>{r.key}</td><td>{int(r.impressions)}</td><td>{int(r.clicks)}</td><td>{pos(r.position)}{r.prevPosition != null && <Delta cur={r.position} prev={r.prevPosition} points lowerIsBetter />}</td></tr>
          ))} />
        </div>
      </div>
      <div className="grid g2" style={{ marginTop: 12 }}>
        <div className="card">
          <h3>Top pages in search</h3>
          <Table head={["Page", "Clicks", "Shown", "Position"]} rows={d.pages.slice(0, 15).map((r) => (
            <tr key={r.key}><td>{path(r.key)}</td><td>{int(r.clicks)}<Delta cur={r.clicks} prev={r.prevClicks} /></td><td>{int(r.impressions)}</td><td>{pos(r.position)}</td></tr>
          ))} />
        </div>
        <div className="card">
          <h3>Where searchers are</h3>
          <Table head={["Country", "Clicks", "Shown", "Position"]} rows={d.countries.map((r) => (
            <tr key={r.key}><td>{country(r.key)}</td><td>{int(r.clicks)}</td><td>{int(r.impressions)}</td><td>{pos(r.position)}</td></tr>
          ))} />
          <h3 style={{ marginTop: 18 }}>Device</h3>
          <Table head={["Device", "Clicks", "Shown", "Click rate"]} rows={d.devices.map((r) => (
            <tr key={r.key}><td>{title(String(r.key).toLowerCase())}</td><td>{int(r.clicks)}</td><td>{int(r.impressions)}</td><td>{pct(r.ctr)}</td></tr>
          ))} />
        </div>
      </div>
    </>
  );
}

function Traffic({ d }) {
  const t = d.totals;
  return (
    <>
      <div className="grid g4">
        <Tile label="Visitors" value={int(t.cur.totalUsers)} was={int(t.prev.totalUsers)}><Delta cur={t.cur.totalUsers} prev={t.prev.totalUsers} /></Tile>
        <Tile label="Sessions" value={int(t.cur.sessions)} was={int(t.prev.sessions)}><Delta cur={t.cur.sessions} prev={t.prev.sessions} /></Tile>
        <Tile label="Engaged sessions" value={pct(t.cur.engagementRate)} was={pct(t.prev.engagementRate)}><Delta cur={t.cur.engagementRate} prev={t.prev.engagementRate} points scale={100} /></Tile>
        <Tile label="Enquiry actions" value={int(d.enquiries.cur)} was={int(d.enquiries.prev)}><Delta cur={d.enquiries.cur} prev={d.enquiries.prev} /></Tile>
      </div>
      <div className="grid g2" style={{ marginTop: 12 }}>
        <div className="card">
          <TrendChart title="Sessions per day" unit="sessions" points={d.daily} />
        </div>
        <div className="card">
          <h3>Where visits come from</h3>
          <span className="note">Change is sessions against the previous period.</span>
          <Table head={["Channel", "Sessions", "Key events"]} rows={d.channels.map((r) => (
            <tr key={r.key}><td>{r.key}</td><td>{int(r.sessions)}<Delta cur={r.sessions} prev={r.prev_sessions} /></td><td>{int(r.keyEvents)}</td></tr>
          ))} />
        </div>
      </div>
      <div className="grid g2" style={{ marginTop: 12 }}>
        <div className="card">
          <h3>Visits from AI assistants</h3>
          <span className="note">Sessions sent by ChatGPT, Perplexity, Claude, Gemini, Copilot and similar. This is the GEO scoreboard.</span>
          <div className="tile" style={{ marginTop: 8 }}>
            <span className="val" style={{ display: "inline-block", marginRight: 8 }}>{int(d.aiTotals.cur)}</span>
            <Delta cur={d.aiTotals.cur} prev={d.aiTotals.prev} /><span className="was">was {int(d.aiTotals.prev)}</span>
          </div>
          <Table head={["Assistant", "Sessions"]} empty="No visits from AI assistants recorded in this period." rows={d.ai.map((r) => (
            <tr key={r.key}><td>{r.key}</td><td>{int(r.sessions)}<Delta cur={r.sessions} prev={r.prev_sessions} /></td></tr>
          ))} />
        </div>
        <div className="card">
          <h3>Enquiry actions</h3>
          <span className="note">Calls, WhatsApp taps and form opens tracked on the site.</span>
          <Table head={["Action", "Count"]} empty="No enquiry actions recorded in this period." rows={d.events.map((r) => (
            <tr key={r.key}><td>{title(r.key)}</td><td>{int(r.eventCount)}<Delta cur={r.eventCount} prev={r.prev_eventCount} /></td></tr>
          ))} />
        </div>
      </div>
      <div className="grid g2" style={{ marginTop: 12 }}>
        <div className="card">
          <h3>Top landing pages</h3>
          <Table head={["Page", "Sessions", "Engaged", "Key events"]} rows={d.landing.map((r) => (
            <tr key={r.key}><td>{r.key || "(not set)"}</td><td>{int(r.sessions)}</td><td>{pct(r.engagementRate)}</td><td>{int(r.keyEvents)}</td></tr>
          ))} />
        </div>
        <div className="card">
          <h3>Top sources</h3>
          <Table head={["Source / medium", "Sessions", "Key events"]} rows={d.sources.map((r) => (
            <tr key={r.key}><td>{r.key}</td><td>{int(r.sessions)}</td><td>{int(r.keyEvents)}</td></tr>
          ))} />
          <h3 style={{ marginTop: 18 }}>Visitor countries</h3>
          <Table head={["Country", "Sessions", "Visitors"]} rows={d.countries.map((r) => (
            <tr key={r.key}><td>{r.key}</td><td>{int(r.sessions)}</td><td>{int(r.totalUsers)}</td></tr>
          ))} />
        </div>
      </div>
    </>
  );
}

export default async function Admin({ searchParams }) {
  const days = RANGES.includes(Number(searchParams.days)) ? Number(searchParams.days) : 28;
  const active = SITES.find((s) => s.key === searchParams.site) || SITES[0];
  const sa = serviceAccount();
  const results = await Promise.all(SITES.map(async (site) => ({ site, data: await siteData(site, days) })));
  const current = results.find((r) => r.site.key === active.key).data;
  const href = (o) => `/admin?site=${o.site || active.key}&days=${o.days || days}`;
  const sw = current.search.ok ? current.search.data.window : null;
  const aw = current.analytics.ok ? current.analytics.data.window : null;

  return (
    <>
      <div className="top">
        <div className="top-in">
          <div className="logo">Comex <span>Admin</span></div>
          <div className="sub">Website traffic and search performance</div>
          <div className="spacer" />
          <form method="post" action="/api/admin/logout"><button className="btn" type="submit">Log out</button></form>
        </div>
      </div>
      <main className="wrap">
        <div className="bar">
          <div>
            <h1>All sites at a glance</h1>
            <span className="note">Last {days} days against the {days} days before.</span>
          </div>
          <div className="seg" role="navigation" aria-label="Period">
            {RANGES.map((r) => <Link key={r} href={href({ days: r })} className={r === days ? "on" : ""} prefetch={false}>{r} days</Link>)}
          </div>
        </div>
        <div className="card"><Glance results={results} /></div>

        <div className="bar" style={{ marginTop: 30 }}>
          <div className="seg" role="navigation" aria-label="Site">
            {SITES.map((s) => <Link key={s.key} href={href({ site: s.key })} className={s.key === active.key ? "on" : ""} prefetch={false}>{s.name}</Link>)}
          </div>
          <span className="note">{active.domain}</span>
        </div>

        <h2>Search performance</h2>
        <span className="note">Google Search Console{sw ? `, ${day(sw.start)} to ${day(sw.end)}. Google confirms search data about three days late.` : "."}</span>
        {current.search.ok ? <Search d={current.search.data} /> : <Problem title="Search data is not connected for this site" error={current.search.error} />}

        <h2>Website traffic</h2>
        <span className="note">Google Analytics{aw ? `, ${day(aw.start)} to ${day(aw.end)}.` : "."}</span>
        {current.analytics.ok ? <Traffic d={current.analytics.data} /> : <Problem title="Traffic data is not connected for this site" error={current.analytics.error} />}

        <h2>Connections</h2>
        <div className="card setup">
          <ul>
            <li>Google service account: {sa.ok ? <><span className="ok">connected</span> as <code>{sa.email}</code></> : <><span className="todo">not connected.</span> {sa.error}</>}</li>
            {results.map(({ site, data }) => (
              <li key={site.key}>
                <b>{site.name}</b>: Search Console {data.search.ok ? <span className="ok">working</span> : <span className="todo">not working</span>} (<code>{site.gsc}</code>), Analytics {data.analytics.ok ? <span className="ok">working</span> : <span className="todo">not working</span>} ({site.ga4 ? <code>{site.ga4}</code> : "no property ID"})
              </li>
            ))}
          </ul>
          {sa.ok && <p className="note" style={{ marginTop: 8 }}>If a line says not working, add the service account email above as a user on that Search Console property and as a Viewer on that Analytics property.</p>}
        </div>
      </main>
    </>
  );
}
