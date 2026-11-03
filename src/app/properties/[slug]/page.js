import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECTS, LANDINGS, SITE_URL, ORG } from "../../data/seo";
import JsonLd from "../../components/JsonLd";
import { Breadcrumbs, CtaBar, ProjectGrid, FaqList, faqSchema, breadcrumbSchema, wrap } from "../../components/SeoBlocks";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

function projectFaqs(p) {
  const f = [
    { q: `Where is ${p.name} located?`, a: `${p.name} is in ${p.locationLine}.` },
    { q: `What units are available at ${p.name}?`, a: p.units.map((u) => `${u.type}${u.size ? ` (${u.size})` : ""}: ${u.price}`).join(". ") + "." },
    { q: `What is the current status of ${p.name}?`, a: `${p.status}.` },
  ];
  if (p.available) f.push({ q: `Is there a payment plan for ${p.name}?`, a: `Yes. ${ORG.paymentPlan}.` });
  return f;
}

export function generateMetadata({ params }) {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  if (!p) return {};
  const kind = p.slug.includes("lukenya") ? "Plots for Sale" : "Studio and 1 Bedroom Apartments";
  const title = `${p.name}, ${p.area}: ${kind} | Comex Homes`;
  return {
    title,
    description: p.summary.slice(0, 160),
    alternates: { canonical: `/properties/${p.slug}` },
    openGraph: { title, description: p.summary, url: `${SITE_URL}/properties/${p.slug}`, images: [{ url: p.image }] },
  };
}

export default function ProjectPage({ params }) {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: p.name, href: `/properties/${p.slug}` },
  ];
  const faqs = projectFaqs(p);
  const related = LANDINGS.filter((l) => l.projects.includes(p.slug));
  const offers = p.units
    .filter((u) => /KES/.test(u.price))
    .map((u) => ({
      "@type": "Offer",
      name: u.type,
      price: Number(u.price.replace(/[^0-9]/g, "")),
      priceCurrency: "KES",
      availability: p.available ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
      seller: { "@id": `${SITE_URL}/#organization` },
    }));
  const schema = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: p.name,
    url: `${SITE_URL}/properties/${p.slug}`,
    description: p.summary,
    image: `${SITE_URL}${p.image}`,
    address: { "@type": "PostalAddress", addressLocality: p.area, addressRegion: "Nairobi", addressCountry: "KE" },
    amenityFeature: p.amenities.map((a) => ({ "@type": "LocationFeatureSpecification", name: a, value: true })),
    ...(offers.length ? { makesOffer: offers } : {}),
  };

  return (
    <main>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema(crumbs, SITE_URL)} />
      <Breadcrumbs items={crumbs} />
      <section style={wrap}>
        <h1 style={{ fontSize: "clamp(26px, 6vw, 34px)", fontWeight: 800, lineHeight: 1.2 }}>
          {p.name}, {p.area}
        </h1>
        <p style={{ fontSize: 18, marginTop: 12, maxWidth: 820 }}>{p.summary}</p>
        <CtaBar project={p.name} />
          <Image src={p.image} sizes="(max-width: 768px) 100vw, 1100px" alt={`${p.name}, ${p.area}`} width={1200} height={630} style={{ width: "100%", height: "auto", marginTop: 24, borderRadius: 8 }} />
        <h2 style={{ fontSize: 26, fontWeight: 700, marginTop: 28 }}>Units and prices</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}>
          <thead>
            <tr style={{ background: "#f3f4f6", textAlign: "left" }}>
              <th style={{ padding: 8 }}>Unit</th>
              <th style={{ padding: 8 }}>Size</th>
              <th style={{ padding: 8 }}>Price</th>
              {p.units.some((u) => u.rent) && <th style={{ padding: 8 }}>Expected rent</th>}
            </tr>
          </thead>
          <tbody>
            {p.units.map((u) => (
              <tr key={u.type} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: 8 }}>{u.type}</td>
                <td style={{ padding: 8 }}>{u.size || "-"}</td>
                <td style={{ padding: 8 }}>{u.price}</td>
                {p.units.some((x) => x.rent) && <td style={{ padding: 8 }}>{u.rent || "-"}</td>}
              </tr>
            ))}
          </tbody>
        </table>
        {p.available && <p style={{ marginTop: 12 }}>Payment plan: {ORG.paymentPlan}. Comex Homes manages tenants and rent collection on your behalf.</p>}
        {p.amenities.length > 0 && (
          <>
            <h2 style={{ fontSize: 26, fontWeight: 700, marginTop: 28 }}>Amenities</h2>
            <ul style={{ margin: "8px 0 0 18px", listStyle: "disc", columns: 2 }}>
              {p.amenities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </>
        )}
        <p style={{ marginTop: 20 }}>
          Full gallery, brochure and 3D tour: <a href={p.externalUrl} target="_blank" rel="noopener">{p.externalUrl.replace("https://", "")}</a>
        </p>
        {related.length > 0 && (
          <p style={{ marginTop: 12 }}>
            Compare:{" "}
            {related.map((l, i) => (
              <span key={l.slug}>
                {i > 0 && " · "}
                <Link href={`/${l.slug}`}>{l.h1}</Link>
              </span>
            ))}
          </p>
        )}
      </section>
      <FaqList items={faqs} />
      <section style={wrap}>
        <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 16 }}>Other Comex Homes projects</h2>
        <ProjectGrid slugs={PROJECTS.filter((x) => x.slug !== p.slug && x.available).map((x) => x.slug)} />
      </section>
    </main>
  );
}
