import { notFound } from "next/navigation";
import Link from "next/link";
import { LANDINGS, SITE_URL, ORG, HOME_IMAGE } from "../data/seo";
import JsonLd from "../components/JsonLd";
import YieldCalculator from "../components/YieldCalculator";
import { GUIDES } from "../data/guides";
import { Breadcrumbs, CtaBar, ProjectGrid, FaqList, faqSchema, breadcrumbSchema, wrap } from "../components/SeoBlocks";

// Only the slugs in LANDINGS exist; every other path still 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return LANDINGS.map((l) => ({ landing: l.slug }));
}

export function generateMetadata({ params }) {
  const l = LANDINGS.find((x) => x.slug === params.landing);
  if (!l) return {};
  return {
    title: l.title,
    description: l.description,
    keywords: l.keywords,
    alternates: { canonical: `/${l.slug}` },
    openGraph: { title: l.title, description: l.description, url: `${SITE_URL}/${l.slug}`, images: [{ url: HOME_IMAGE }] },
  };
}

export default function Landing({ params }) {
  const l = LANDINGS.find((x) => x.slug === params.landing);
  if (!l) notFound();
  const crumbs = [
    { name: "Home", href: "/" },
    { name: l.h1, href: `/${l.slug}` },
  ];
  return (
    <main>
      <JsonLd data={breadcrumbSchema(crumbs, SITE_URL)} />
      <JsonLd data={faqSchema()} />
      <Breadcrumbs items={crumbs} />
      <section style={wrap}>
        <h1 style={{ fontSize: "clamp(26px, 6vw, 34px)", fontWeight: 800, lineHeight: 1.2 }}>{l.h1}</h1>
        <p style={{ fontSize: 18, marginTop: 12, maxWidth: 820 }}>{l.intro}</p>
        <ul style={{ margin: "14px 0 0 18px", listStyle: "disc" }}>
          {(l.bullets ||
            (l.kind === "land"
              ? [
                  "50 by 100 plots in a 60 plot gated estate, bought direct from the developer",
                  "12m and 9m internal roads, 25m road frontage and a 2,025 sqm community plot",
                  "Just off Mombasa Road, about 45 minutes from Nairobi CBD",
                  "Developer track record: Nyayo View Suites I fully occupied, Balozi Suites 97% occupied",
                ]
              : [
                  `Prices from ${ORG.priceFrom}, bought direct from the developer`,
                  `Payment plan: ${ORG.paymentPlan}`,
                  "Tenant sourcing, rent collection and management by Comex Homes",
                  "Track record: Nyayo View Suites I fully occupied, Balozi Suites 97% occupied",
                ])).map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        {l.steps && (
          <>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 24 }}>How buying from abroad works</h2>
            <ol style={{ margin: "8px 0 0 20px", listStyle: "decimal", lineHeight: 1.8 }}>
              <li>WhatsApp us for prices, floor plans and a live video viewing</li>
              <li>Ask someone you trust to visit the site and our finished projects</li>
              <li>Your own Kenyan advocate checks the title and the sale agreement</li>
              <li>Sign the offer letter and pay the 25% deposit by bank transfer to the account named in the agreement</li>
              <li>Pay the balance over up to 24 months while you get construction updates</li>
              <li>At handover we find a tenant, collect rent and keep you updated</li>
            </ol>
            <p style={{ marginTop: 10 }}>
              Full details: <Link href="/guides/how-to-buy-property-in-kenya-from-abroad">How to buy property in Kenya from abroad</Link> ·{" "}
              <Link href="/guides/can-foreigners-buy-property-in-kenya">Can foreigners buy property in Kenya?</Link>
            </p>
          </>
        )}
        <CtaBar project={l.h1} />
        {l.calculator && <YieldCalculator />}
        <h2 style={{ fontSize: 26, fontWeight: 700, margin: "32px 0 16px" }}>{l.kind === "land" ? "Available plots" : "Available projects"}</h2>
        <ProjectGrid slugs={l.projects} />
        <p style={{ marginTop: 24 }}>
          More searches:{" "}
          {LANDINGS.filter((x) => x.slug !== l.slug).map((x, i) => (
            <span key={x.slug}>
              {i > 0 && " · "}
              <Link href={`/${x.slug}`}>{x.h1}</Link>
            </span>
          ))}
        </p>
      </section>
      <section style={wrap}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Guides</h2>
        <ul style={{ margin: "8px 0 0 18px", listStyle: "disc" }}>
          {GUIDES.map((g) => (
            <li key={g.slug}>
              <Link href={`/guides/${g.slug}`}>{g.title}</Link>
            </li>
          ))}
        </ul>
      </section>
      <FaqList />
    </main>
  );
}
