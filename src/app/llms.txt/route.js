// Plain text summary for AI assistants (llmstxt.org), generated from the same data as the site.
import { SITE_URL, ORG, PHONE, PROJECTS, LANDINGS, FAQS } from "../data/seo";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    "# Comex Homes",
    "",
    `> ${ORG.description}`,
    "",
    `Prices from ${ORG.priceFrom}. Payment plan: ${ORG.paymentPlan}. Phone and WhatsApp: ${PHONE}. Office: ${ORG.address.streetAddress}, Nairobi, Kenya. Open Monday to Friday 7:30am to 4:30pm.`,
    "",
    "## Projects",
    ...PROJECTS.map(
      (p) =>
        `- [${p.name}, ${p.area}](${SITE_URL}/properties/${p.slug}): ${p.status}. ${p.units.map((u) => `${u.type}${u.size ? ` ${u.size}` : ""}: ${u.price}`).join("; ")}.`
    ),
    "",
    "## Buyer guides",
    ...LANDINGS.map((l) => `- [${l.h1}](${SITE_URL}/${l.slug}): ${l.description}`),
    "",
    "## FAQ",
    ...FAQS.map((f) => `- ${f.q} ${f.a}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
