// The sites shown on the admin dashboard. To add another Comex site later, add
// one more entry here and give the Google service account access to it.
//   gsc: the Search Console property, exactly as it appears in Search Console
//        ("https://www.example.com/" for a URL property, "sc-domain:example.com" for a domain property)
//   ga4: the numeric Google Analytics property ID (Admin > Property details), not the G-XXXX tag
export const SITES = [
  {
    key: "comex",
    name: "Comex Homes",
    domain: "www.comexhomes.ke",
    gsc: process.env.GSC_SITE_COMEX || "https://www.comexhomes.ke/",
    ga4: process.env.GA4_PROPERTY_COMEX || "305615274",
    ga4Env: "GA4_PROPERTY_COMEX",
    brand: /comex/i,
  },
  {
    key: "astana",
    name: "Astana Residence",
    domain: "www.astanaresidence.com",
    gsc: process.env.GSC_SITE_ASTANA || "https://www.astanaresidence.com/",
    ga4: process.env.GA4_PROPERTY_ASTANA || "",
    ga4Env: "GA4_PROPERTY_ASTANA",
    brand: /astana|comex/i,
  },
];

export const RANGES = [7, 28, 90];
