import Link from "next/link";
import { LANDINGS, SITE_URL, ORG } from "../data/seo";
import JsonLd from "../components/JsonLd";
import { Breadcrumbs, CtaBar, ProjectGrid, FaqList, faqSchema, breadcrumbSchema, wrap } from "../components/SeoBlocks";

export const metadata = {
  title: "All Comex Homes Properties: Studios and 1 Bedrooms in Nairobi",
  description:
    "Every Comex Homes project in one place: Astana Residence (Ngara), The Reveal (Kabarnet Road), Balozi Suites (South B), Nyayo View Suites (Nairobi West) and Lukenya Ridge plots. Prices and status.",
  alternates: { canonical: "/properties" },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
];

export default function Properties() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema(crumbs, SITE_URL)} />
      <JsonLd data={faqSchema()} />
      <Breadcrumbs items={crumbs} />
      <section style={wrap}>
        <h1 style={{ fontSize: "clamp(26px, 6vw, 34px)", fontWeight: 800 }}>Comex Homes Properties in Nairobi</h1>
        <p style={{ fontSize: 18, marginTop: 12, maxWidth: 820 }}>{ORG.description} Prices start from {ORG.priceFrom}. Payment plan: {ORG.paymentPlan}.</p>
        <CtaBar />
        <div style={{ marginTop: 24 }}>
          <ProjectGrid />
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 32 }}>Search by what you need</h2>
        <ul style={{ margin: "8px 0 0 18px", listStyle: "disc" }}>
          {LANDINGS.map((l) => (
            <li key={l.slug}>
              <Link href={`/${l.slug}`}>{l.h1}</Link>
            </li>
          ))}
        </ul>
      </section>
      <FaqList />
    </main>
  );
}
