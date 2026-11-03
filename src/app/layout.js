import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";
import Tracking from "./components/Tracking";
import JsonLd from "./components/JsonLd";
import { Analytics } from "@vercel/analytics/react";
import { SITE_URL, ORG, PHONE, PROJECTS, HOME_IMAGE } from "./data/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Affordable Luxury Apartments in Nairobi | Comex Homes",
    template: "%s",
  },
  description:
    "Affordable luxury studios and 1 bedrooms in Nairobi from KES 3.51M at Astana Residence, Ngara. 25% deposit, 24 months to pay, rental management included.",
  keywords: [
    "studio apartments for sale in nairobi",
    "1 bedroom apartment for sale in nairobi",
    "affordable luxury apartments nairobi",
    "luxury studio apartments nairobi",
    "affordable apartments nairobi",
    "off plan apartments nairobi",
    "apartments for sale with payment plan nairobi",
    "Comex Homes",
  ],
  openGraph: {
    type: "website",
    siteName: "Comex Homes",
    locale: "en_KE",
    url: SITE_URL,
    title: "Affordable Luxury Studio and 1 Bedroom Apartments in Nairobi | Comex Homes",
    description:
      "Studios and one bedrooms from KES 3.51M at Astana Residence, Ngara. 25% deposit, 24 months to pay, rental management included.",
    images: [{ url: HOME_IMAGE, alt: "Comex Homes apartment lounge, Nairobi" }],
  },
  twitter: { card: "summary_large_image", site: "@ComexHomes" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  // Search engine ownership tags. Paste each code into Vercel > Settings > Environment Variables.
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION ? { yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION } : {}),
    other: {
      ...(process.env.NEXT_PUBLIC_BING_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } : {}),
      ...(process.env.NEXT_PUBLIC_META_DOMAIN_VERIFICATION ? { "facebook-domain-verification": process.env.NEXT_PUBLIC_META_DOMAIN_VERIFICATION } : {}),
    },
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["RealEstateAgent", "Organization"],
  "@id": `${SITE_URL}/#organization`,
  name: ORG.name,
  legalName: ORG.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}${HOME_IMAGE}`,
  image: `${SITE_URL}${HOME_IMAGE}`,
  description: ORG.description,
  telephone: PHONE,
  priceRange: "KES 3,510,000 and above",
  currenciesAccepted: "KES, USD",
  paymentAccepted: "Bank transfer",
  address: { "@type": "PostalAddress", ...ORG.address },
  areaServed: ["Nairobi", "South B", "Ngara", "Kilimani", "Nairobi West", "Machakos County", "Kenya"],
  knowsAbout: ["Studio apartments for sale in Nairobi", "One bedroom apartments for sale in Nairobi", "Off plan property investment in Kenya", "Buying property in Kenya from the diaspora", "Plots for sale along Mombasa Road", "Rental property management in Nairobi"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: PHONE,
      availableLanguage: ["English", "Swahili"],
      areaServed: ["KE", "GB", "US", "AE", "CA", "AU", "DE", "QA", "SA", "SE", "NL"],
    },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:30",
      closes: "16:30",
    },
  ],
  sameAs: ORG.sameAs,
  makesOffer: PROJECTS.filter((p) => p.available).map((p) => ({
    "@type": "Offer",
    url: `${SITE_URL}/properties/${p.slug}`,
    itemOffered: { "@type": "Residence", name: `${p.name}, ${p.area}` },
  })),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Comex Homes",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-KE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-KE">
      <body>
        <JsonLd data={orgSchema} />
        <JsonLd data={websiteSchema} />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TJ32RV86"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Navbar />
        {children}
        <WhatsAppButton />
        <Footer />
        <Tracking />
        <Analytics />
      </body>
    </html>
  );
}
