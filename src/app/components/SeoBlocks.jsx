import Image from "next/image";
// Server rendered building blocks for SEO pages. No client JS, so Google and
// AI crawlers read every word on first load.
import Link from "next/link";
import { PHONE, WHATSAPP, REGISTER_URL, PROJECTS, FAQS, LIVING_PHONE, LIVING_PHONE_DISPLAY } from "../data/seo";

const wrap = { maxWidth: 1100, margin: "0 auto", padding: "32px 16px" };
const btn = {
  display: "inline-block",
  padding: "12px 20px",
  borderRadius: 6,
  fontWeight: 600,
  marginRight: 10,
  marginTop: 10,
  textDecoration: "none",
};

export function Breadcrumbs({ items }) {
  return (
    <div role="navigation" aria-label="Breadcrumb" style={{ ...wrap, paddingTop: 120, paddingBottom: 0, fontSize: 14, color: "#555" }}>
      {items.map((it, i) => (
        <span key={it.href}>
          {i > 0 && " / "}
          {i < items.length - 1 ? <Link href={it.href}>{it.name}</Link> : <span>{it.name}</span>}
        </span>
      ))}
    </div>
  );
}

export function CtaBar({ project = "" }) {
  return (
    <div>
      <a href={REGISTER_URL} target="_blank" rel="noopener" data-track="register_interest" data-project={project} style={{ ...btn, background: "#f8a428", color: "#fff" }}>
        Register interest
      </a>
      <a href={`${WHATSAPP}?text=${encodeURIComponent(`Hi Comex Homes, I am interested in ${project || "your studios and 1 bedrooms"}`)}`} target="_blank" rel="noopener" data-track="whatsapp_click" data-project={project} style={{ ...btn, background: "#25D366", color: "#fff" }}>
        WhatsApp us
      </a>
      <a href={`tel:${PHONE}`} data-track="call_click" data-project={project} style={{ ...btn, border: "2px solid #222", color: "#222" }}>
        Call {PHONE}
      </a>
    </div>
  );
}

// Shown on sold-out buildings: turns rental and Airbnb traffic away from the sales
// line and turns buyers towards what is selling now.
export function SoldOutNotice({ name }) {
  return (
    <div style={{ border: "2px solid #f8a428", borderRadius: 10, padding: 16, background: "#fff7ea", marginTop: 16, maxWidth: 860 }}>
      <p style={{ fontWeight: 700 }}>{name} is sold out. No units are for sale here.</p>
      <p style={{ marginTop: 6 }}>
        Looking to rent or book a short stay? Comex Homes sales does not handle rentals or Airbnb bookings. Contact{" "}
        <a href={`tel:${LIVING_PHONE}`} data-track="rental_redirect" style={{ fontWeight: 600 }}>Comex Living on {LIVING_PHONE_DISPLAY}</a>.
      </p>
      <p style={{ marginTop: 6 }}>Want to own a unit like this? These are selling now:</p>
      <div>
        <a href="/properties/astana-residence-ngara" style={{ display: "inline-block", padding: "12px 20px", borderRadius: 6, fontWeight: 600, marginRight: 10, marginTop: 10, background: "#f8a428", color: "#fff" }}>
          Astana Residence, Ngara: studios from KES 3.51M
        </a>
        <a href="/properties/lukenya-ridge-plots" style={{ display: "inline-block", padding: "12px 20px", borderRadius: 6, fontWeight: 600, marginRight: 10, marginTop: 10, border: "2px solid #222", color: "#222" }}>
          Lukenya Ridge plots, Mombasa Road
        </a>
        <a href={`${WHATSAPP}?text=${encodeURIComponent("Hi Comex Homes, I want to BUY a unit or plot. Please share what is available.")}`} target="_blank" rel="noopener" data-track="whatsapp_click" style={{ display: "inline-block", padding: "12px 20px", borderRadius: 6, fontWeight: 600, marginTop: 10, background: "#25D366", color: "#fff" }}>
          WhatsApp sales (buyers only)
        </a>
      </div>
    </div>
  );
}

export function ProjectCard({ p }) {
  return (
    <article style={{ border: "1px solid #e5e5e5", borderRadius: 8, overflow: "hidden", background: "#fff" }}>
      <Image src={p.image} sizes="(max-width: 768px) 100vw, 1100px" alt={`${p.name} apartments, ${p.area}, Nairobi`} width={1200} height={630} style={{ width: "100%", height: "auto", display: "block" }} />
      <div style={{ padding: 16 }}>
        <h3 style={{ fontSize: 20, fontWeight: 700 }}>
          <Link href={`/properties/${p.slug}`}>{p.name}</Link>
        </h3>
        <p style={{ color: "#555", margin: "4px 0" }}>{p.locationLine}</p>
        <p style={{ color: p.available ? "#15803d" : "#b91c1c", fontWeight: 600 }}>{p.status}</p>
        <ul style={{ margin: "8px 0 0 18px", listStyle: "disc" }}>
          {p.units.map((u) => (
            <li key={u.type}>
              {u.type}
              {u.size ? `, ${u.size}` : ""}: {u.price}
            </li>
          ))}
        </ul>
        <p style={{ marginTop: 10 }}>
          <Link href={`/properties/${p.slug}`} style={{ color: "#c2410c", fontWeight: 600 }}>
            See {p.name} details
          </Link>
        </p>
      </div>
    </article>
  );
}

export function ProjectGrid({ slugs }) {
  const list = slugs ? slugs.map((s) => PROJECTS.find((p) => p.slug === s)).filter(Boolean) : PROJECTS;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
      {list.map((p) => (
        <ProjectCard key={p.slug} p={p} />
      ))}
    </div>
  );
}

export function FaqList({ items = FAQS }) {
  return (
    <section style={wrap}>
      <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12 }}>Frequently asked questions</h2>
      {items.map((f) => (
        <details key={f.q} style={{ borderBottom: "1px solid #eee", padding: "12px 0" }} open>
          <summary style={{ fontWeight: 600, cursor: "pointer" }}>{f.q}</summary>
          <p style={{ marginTop: 6, color: "#333" }}>{f.a}</p>
        </details>
      ))}
    </section>
  );
}

export function faqSchema(items = FAQS) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items, base) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${base}${it.href}`,
    })),
  };
}

export { wrap };
