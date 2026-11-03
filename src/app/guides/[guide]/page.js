import { notFound } from "next/navigation";
import Link from "next/link";
import { GUIDES } from "../../data/guides";
import { LANDINGS, SITE_URL, HOME_IMAGE } from "../../data/seo";
import JsonLd from "../../components/JsonLd";
import YieldCalculator from "../../components/YieldCalculator";
import { Breadcrumbs, CtaBar, FaqList, faqSchema, breadcrumbSchema, wrap } from "../../components/SeoBlocks";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ guide: g.slug }));
}

export function generateMetadata({ params }) {
  const g = GUIDES.find((x) => x.slug === params.guide);
  if (!g) return {};
  return {
    title: g.metaTitle,
    description: g.description,
    keywords: g.keywords,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: { type: "article", title: g.metaTitle, description: g.description, url: `${SITE_URL}/guides/${g.slug}`, images: [{ url: HOME_IMAGE }] },
  };
}

export default function Guide({ params }) {
  const g = GUIDES.find((x) => x.slug === params.guide);
  if (!g) notFound();
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides" },
    { name: g.title, href: `/guides/${g.slug}` },
  ];
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    datePublished: g.updated,
    dateModified: g.updated,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/guides/${g.slug}`,
    image: `${SITE_URL}${HOME_IMAGE}`,
  };
  const related = LANDINGS.filter((l) => l.kind === "diaspora" || l.kind === "investor");
  return (
    <main>
      <JsonLd data={article} />
      <JsonLd data={faqSchema(g.faqs)} />
      <JsonLd data={breadcrumbSchema(crumbs, SITE_URL)} />
      <Breadcrumbs items={crumbs} />
      <article style={wrap}>
        <h1 style={{ fontSize: "clamp(26px, 6vw, 34px)", fontWeight: 800, lineHeight: 1.2 }}>{g.title}</h1>
        <p style={{ fontSize: 14, color: "#666", marginTop: 6 }}>By Comex Homes, Nairobi. Updated {g.updated}.</p>
        <p style={{ fontSize: 18, marginTop: 14, maxWidth: 820 }}>{g.lead}</p>
        {g.table && (
          <table style={{ width: "100%", maxWidth: 700, borderCollapse: "collapse", marginTop: 18 }}>
            <thead>
              <tr style={{ background: "#f3f4f6", textAlign: "left" }}>
                {g.table.head.map((h) => (
                  <th key={h} style={{ padding: 8 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {g.table.rows.map((r) => (
                <tr key={r[0]} style={{ borderBottom: "1px solid #eee" }}>
                  {r.map((c, i) => (
                    <td key={i} style={{ padding: 8 }}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {g.sections.map((s) => (
          <section key={s.h} style={{ marginTop: 24, maxWidth: 820 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700 }}>{s.h}</h2>
            {(s.p || []).map((t, i) => (
              <p key={i} style={{ marginTop: 8 }}>{t}</p>
            ))}
            {s.list && (
              <ul style={{ margin: "8px 0 0 18px", listStyle: "disc" }}>
                {s.list.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        {g.calculator && <YieldCalculator />}
        <p style={{ fontSize: 13, color: "#666", marginTop: 20 }}>This guide is general information, not legal or financial advice. Confirm the details for your purchase with a Kenyan advocate.</p>
        <div style={{ marginTop: 16 }}>
          <CtaBar project={g.title} />
        </div>
        <p style={{ marginTop: 20 }}>
          Related:{" "}
          {related.map((l, i) => (
            <span key={l.slug}>
              {i > 0 && " · "}
              <Link href={`/${l.slug}`}>{l.h1}</Link>
            </span>
          ))}
        </p>
      </article>
      <FaqList items={g.faqs} />
    </main>
  );
}
