import { SITE_URL, PROJECTS, LANDINGS } from "./data/seo";
import { GUIDES } from "./data/guides";

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/properties`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...LANDINGS.map((l) => ({ url: `${SITE_URL}/${l.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.9 })),
    ...PROJECTS.map((p) => ({ url: `${SITE_URL}/properties/${p.slug}`, lastModified: now, changeFrequency: "weekly", priority: p.available ? 0.8 : 0.5 })),
    { url: `${SITE_URL}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...GUIDES.map((g) => ({ url: `${SITE_URL}/guides/${g.slug}`, lastModified: new Date(g.updated), changeFrequency: "monthly", priority: 0.8 })),
    { url: `${SITE_URL}/our-team`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];
}
