/** @type {import('next').NextConfig} */
// Short links for social media bios and posts. Each one lands on the site with
// UTM tags, so Vercel Analytics and GA4 show exactly which platform sent the visit.
const social = [
  ["ig", "instagram", "social"],
  ["fb", "facebook", "social"],
  ["tiktok", "tiktok", "social"],
  ["li", "linkedin", "social"],
  ["x", "x", "social"],
  ["yt", "youtube", "social"],
  ["wa", "whatsapp", "broadcast"],
  ["email", "zoho_mail", "email"],
];

module.exports = {
  experimental: {
    serverActions: true,
  },
  async redirects() {
    const moved = [
      { source: "/apartments-for-sale-in-nairobi-under-3-million", destination: "/apartments-for-sale-in-nairobi-under-4-million", permanent: true },
    ];
    return moved.concat(social.flatMap(([path, source, medium]) => [
      {
        source: `/${path}`,
        destination: `/?utm_source=${source}&utm_medium=${medium}&utm_campaign=profile_link`,
        permanent: false,
      },
      {
        source: `/${path}/:page*`,
        destination: `/:page*?utm_source=${source}&utm_medium=${medium}&utm_campaign=post_link`,
        permanent: false,
      },
    ]));
  },
};
