import Link from "next/link";
import { LANDINGS, PROJECTS, ORG } from "../data/seo";
import JsonLd from "./JsonLd";
import { FaqList, faqSchema, wrap } from "./SeoBlocks";

// Server rendered text block so search engines and AI assistants can read what
// Comex Homes sells, where, and for how much.
export default function HomeSeo() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <section style={wrap}>
        <h2 style={{ fontSize: 28, fontWeight: 800 }}>Affordable luxury studios and 1 bedroom apartments in Nairobi</h2>
        <p style={{ marginTop: 10, fontSize: 17, maxWidth: 860 }}>
          {ORG.description} Units start from {ORG.priceFrom}, with {ORG.paymentPlan.toLowerCase()}.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginTop: 18 }}>
          {LANDINGS.map((l) => (
            <Link key={l.slug} href={`/${l.slug}`} style={{ border: "1px solid #e5e5e5", borderRadius: 8, padding: 14, fontWeight: 600, background: "#fff" }}>
              {l.h1}
            </Link>
          ))}
        </div>
        <p style={{ marginTop: 18 }}>
          Project details:{" "}
          {PROJECTS.map((p, i) => (
            <span key={p.slug}>
              {i > 0 && " · "}
              <Link href={`/properties/${p.slug}`}>{p.name} ({p.area})</Link>
            </span>
          ))}
        </p>
      </section>
      <FaqList />
    </>
  );
}
