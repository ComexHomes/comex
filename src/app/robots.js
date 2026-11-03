import { SITE_URL } from "./data/seo";

// Explicitly welcome search engines and AI assistants (ChatGPT, Claude,
// Perplexity, Gemini, Copilot) so Comex Homes can be cited in AI answers.
export default function robots() {
  const ai = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Bingbot", "Applebot-Extended", "CCBot", "meta-externalagent"];
  return {
    rules: [{ userAgent: "*", allow: "/" }, ...ai.map((ua) => ({ userAgent: ua, allow: "/" }))],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
