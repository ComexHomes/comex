import { notFound } from "next/navigation";
import Link from "next/link";
import { LANDINGS, SITE_URL, ORG, HOME_IMAGE } from "../data/seo";
import JsonLd from "../components/JsonLd";
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
        {l.kind === "land" ? (
          <ul style={{ margin: "14px 0 0 18px", listStyle: "disc" }}>
            <li>50 by 100 plots in a 60 plot gated estate, bought direct from the developer</li>
            <li>12m and 9m internal roads, 25m road frontage and a 2,025 sqm community plot</li>
            <li>Just off Mombasa Road, about 45 minutes from Nairobi CBD</li>
            <li>Developer track record: Nyayo View Suites I fully occupied, Balozi Suites 97% occupied</li>
          </ul>
        ) : (
          <ul style={{ margin: "14px 0 0 18px", listStyle: "disc" }}>
            <li>Prices from {ORG.priceFrom}, bought direct from the developer</li>
            <li>Payment plan: {ORG.paymentPlan}</li>
            <li>Tenant sourcing, rent collection and management by Comex Homes</li>
            <li>Track record: Nyayo View Suites I fully occupied, Balozi Suites 97% occupied</li>
          </ul>
        )}
        <CtaBar project={l.h1} />
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
      <FaqList />
    </main>
  );
}
