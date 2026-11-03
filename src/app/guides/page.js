import Link from "next/link";
import { GUIDES } from "../data/guides";
import { LANDINGS, SITE_URL } from "../data/seo";
import JsonLd from "../components/JsonLd";
import { Breadcrumbs, breadcrumbSchema, wrap } from "../components/SeoBlocks";

export const metadata = {
  title: "Buyer and Investor Guides: Buying Property in Kenya | Comex Homes",
  description: "Guides for diaspora buyers, foreign investors and first time buyers: buying property in Kenya from abroad, what foreigners can own, and Nairobi rental yields.",
  alternates: { canonical: "/guides" },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Guides", href: "/guides" },
];

export default function Guides() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema(crumbs, SITE_URL)} />
      <Breadcrumbs items={crumbs} />
      <section style={wrap}>
        <h1 style={{ fontSize: "clamp(26px, 6vw, 34px)", fontWeight: 800 }}>Buyer and Investor Guides</h1>
        <ul style={{ margin: "16px 0 0 18px", listStyle: "disc", lineHeight: 2 }}>
          {GUIDES.map((g) => (
            <li key={g.slug}>
              <Link href={`/guides/${g.slug}`}>{g.title}</Link>
            </li>
          ))}
        </ul>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 28 }}>Buying from abroad</h2>
        <ul style={{ margin: "8px 0 0 18px", listStyle: "disc", lineHeight: 2 }}>
          {LANDINGS.filter((l) => l.kind === "diaspora" || l.kind === "investor").map((l) => (
            <li key={l.slug}>
              <Link href={`/${l.slug}`}>{l.h1}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
