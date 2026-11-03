// Single source of truth for SEO and GEO (AI search) content on comexhomes.ke.
// Update prices and availability here and every page, sitemap and llms.txt follows.

import astanaImg from "../../../assets/001.jpg";
import revealImg from "../../../assets/Reveal rooftop (1).jpg";
import baloziImg from "../../../assets/balozieight.jpg";
import nyayo2Img from "../../../assets/Lounge_angle 3.jpg";
import nyayo1Img from "../../../assets/One Bedroom Sitting-COMEXHOMES-NYAYO-VIEW-SUITES.jpeg";
import lukenyaImg from "../../../assets/lukenya-ridge.jpg";
import homeImg from "../../../assets/Lounge_angle 2.jpg";

export const HOME_IMAGE = homeImg.src;

export const SITE_URL = "https://www.comexhomes.ke";
export const PHONE = "+254709501501";
export const WHATSAPP = "https://wa.me/254709501501";
export const REGISTER_URL = "https://zfrmz.com/63qeS4QHxcWIQdgr1NB3";

export const ORG = {
  name: "Comex Homes",
  legalName: "Comex Homes Limited",
  description:
    "Comex Homes is a Nairobi real estate company that develops, sells and manages affordable luxury studio and one bedroom apartments, with rooftop pools, gyms and residents lounges, in South B, Ngara, Kilimani (Kabarnet Road) and Nairobi West, with flexible payment plans and full rental management.",
  address: {
    streetAddress: "Telkom Plaza, 1st Floor, Hurlingham",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi County",
    addressCountry: "KE",
  },
  sameAs: [
    "https://www.facebook.com/comexhomes",
    "https://www.instagram.com/comexhomeske/",
    "https://x.com/ComexHomes",
    "https://ke.linkedin.com/company/comex-homes",
  ],
  priceFrom: "KES 2.2M",
  paymentPlan: "25% deposit on signing the offer letter, balance payable within 24 months",
  currencies: "Kenya shillings (KES) or US dollars (USD) by bank transfer",
};

export const PROJECTS = [
  {
    slug: "astana-residence-ngara",
    name: "Astana Residence",
    area: "Ngara",
    locationLine: "Ngara, Nairobi (minutes from the CBD)",
    status: "Selling now, off plan (construction underway)",
    available: true,
    units: [
      { type: "Studio apartment", size: "291 sqft", price: "KES 3,510,000", rent: "KES 29,000 per month (expected)" },
      { type: "One bedroom apartment", size: "452 sqft", price: "KES 5,460,000", rent: "KES 45,000 per month (expected)" },
    ],
    priceFromNumber: 3510000,
    amenities: ["Swimming pool", "High speed lifts", "CCTV and manned security", "Backup generator", "Borehole water", "Fully fitted gym", "Coffee lounge", "Business centre", "Rooftop residents lounge"],
    externalUrl: "https://www.astanaresidence.com/",
    image: astanaImg.src,
    summary:
      "Astana Residence is an off plan development of studio and one bedroom apartments in Ngara, a short walk from Nairobi CBD. Studios start at KES 3.51M and one bedrooms at KES 5.46M, with an expected rental yield of about 10%.",
  },
  {
    slug: "the-reveal-kabarnet-road",
    name: "The Reveal",
    area: "Kilimani, Kabarnet Road",
    locationLine: "Kabarnet Road, off Ngong Road, Kilimani, Nairobi",
    status: "Nearing completion",
    available: true,
    units: [
      { type: "Studio apartment (convertible and junior studios)", price: "Contact for current price" },
      { type: "One bedroom apartment", price: "Contact for current price" },
    ],
    amenities: ["Rooftop swimming pool", "Two high speed lifts", "Business centre", "Residents lounge", "Gym", "Coffee shop"],
    externalUrl: "https://www.thereveal.co.ke/",
    image: revealImg.src,
    summary:
      "The Reveal is a studio and one bedroom apartment block on Kabarnet Road off Ngong Road in Kilimani, nearing completion, with a rooftop pool, gym and coffee shop. It suits buyers who want a Kilimani address for rental income.",
  },
  {
    slug: "balozi-suites-south-b",
    name: "Balozi Suites",
    area: "South B",
    locationLine: "South B, Nairobi, overlooking the Nairobi Expressway",
    status: "97% occupied, last units",
    available: true,
    units: [
      { type: "Executive studio", price: "Contact for current price" },
      { type: "One bedroom apartment", size: "510 sqft", price: "Contact for current price" },
    ],
    amenities: ["Rooftop swimming pool", "Two high speed lifts", "Business centre", "Residents lounge", "Rooftop restaurant", "Health and fitness club"],
    externalUrl: "https://www.balozisuites.com/",
    image: baloziImg.src,
    summary:
      "Balozi Suites is a completed, 97% occupied block of executive studios and 510 sqft one bedroom apartments in South B, with views of the Nairobi Expressway and CBD, a rooftop pool and gym. Only the last few units remain.",
  },
  {
    slug: "nyayo-view-suites-two-nairobi-west",
    name: "Nyayo View Suites II",
    area: "Nairobi West",
    locationLine: "Nairobi West, near Nyayo Stadium",
    status: "Nearing completion",
    available: false,
    units: [{ type: "Executive and premium one bedroom apartments", price: "Sold out, join the resale waitlist" }],
    amenities: [],
    externalUrl: "https://www.nyayoviewsuites.co.ke/",
    image: nyayo2Img.src,
    summary:
      "Nyayo View Suites II is a block of executive and premium one bedroom apartments in Nairobi West near Nyayo Stadium. It is nearing completion and sold out.",
  },
  {
    slug: "nyayo-view-suites-one-nairobi-west",
    name: "Nyayo View Suites I",
    area: "Nairobi West",
    locationLine: "Nairobi West, near Nyayo Stadium",
    status: "Completed and fully occupied",
    available: false,
    units: [{ type: "Executive studios and one bedroom apartments", size: "", price: "Sold out" }],
    amenities: [],
    externalUrl: "https://www.nyayoviewsuites.co.ke/nyayoone",
    image: nyayo1Img.src,
    summary:
      "Nyayo View Suites I is a completed block of executive studios and one bedroom apartments in Nairobi West, sold out and fully occupied by tenants managed by Comex Homes. It is our proof of delivery.",
  },
  {
    slug: "lukenya-ridge-plots",
    name: "Lukenya Ridge",
    area: "Lukenya, Mombasa Road",
    locationLine: "Lukenya, off Mombasa Road (Athi River area, Machakos County), 45 minutes from Nairobi CBD",
    status: "Selling now, 60 planned plots",
    available: true,
    kind: "land",
    units: [{ type: "50 by 100 residential plot in a gated estate", size: "50 x 100 ft", price: "Contact for current price" }],
    amenities: ["Gated estate concept", "12m and 9m internal roads", "25m wide road frontage", "2,025 sqm community plot", "3m drainage wayleave", "Near Lukenya Hills, Daystar University (Athi River campus) and Kilili Shopping Centre"],
    externalUrl: "https://www.lukenyaridge.com/",
    image: lukenyaImg.src,
    summary:
      "Lukenya Ridge by Comex Homes is a planned gated estate of 60 plots of 50 by 100 in Lukenya, just off Mombasa Road and about 45 minutes from Nairobi CBD, with 12m and 9m internal roads and a community plot. Build now, build later or hold as an investment.",
  },
];

// Landing pages built around what Kenyans actually type into Google (checked on google.co.ke, Nov 2026).
export const LANDINGS = [
  {
    slug: "land-for-sale-along-mombasa-road",
    kind: "land",
    h1: "Land and Plots for Sale Along Mombasa Road",
    title: "Land for Sale Along Mombasa Road: 50 by 100 Plots in Lukenya | Comex Homes",
    description:
      "50 by 100 plots for sale on the Mombasa Road growth corridor at Lukenya Ridge, a gated estate 45 minutes from Nairobi CBD past Athi River. Buy direct from Comex Homes.",
    keywords: ["land for sale along mombasa road", "cheap land for sale along mombasa road", "plots for sale mombasa road", "mombasa road corridor land"],
    projects: ["lukenya-ridge-plots"],
    intro:
      "The Mombasa Road corridor from Syokimau and Mlolongo through Athi River to Lukenya is where Nairobi is growing next: the Expressway, SGR, industrial parks and new estates keep pushing demand outward. Lukenya Ridge gives you a 50 by 100 plot in a planned gated estate just off Mombasa Road, where land is still priced below Syokimau and Kitengela.",
  },
  {
    slug: "plots-for-sale-in-lukenya",
    kind: "land",
    h1: "Plots for Sale in Lukenya",
    title: "Plots for Sale in Lukenya: 50 by 100 Gated Estate | Lukenya Ridge by Comex Homes",
    description:
      "50 by 100 plots for sale in Lukenya off Mombasa Road at Lukenya Ridge: gated estate, 12m and 9m roads, community plot, near Daystar University and Lukenya Hills.",
    keywords: ["plots for sale in lukenya", "cheap plots for sale in lukenya", "50 by 100 plots lukenya", "land for sale near daystar university"],
    projects: ["lukenya-ridge-plots"],
    intro:
      "Lukenya Ridge is a 60 plot gated estate in Lukenya, just off Mombasa Road, with Lukenya Hills, Daystar University's Athi River campus and Kilili Shopping Centre nearby. Every plot is 50 by 100 with access from 12m and 9m internal roads.",
  },
  {
    slug: "plots-for-sale-in-athi-river",
    kind: "land",
    h1: "Plots for Sale in Athi River and Lukenya",
    title: "Plots for Sale in Athi River: 50 by 100 in Lukenya | Comex Homes",
    description:
      "Looking for plots in Athi River? Lukenya Ridge, just past Athi River on Mombasa Road, offers 50 by 100 plots in a gated estate by Comex Homes.",
    keywords: ["plots for sale in athi river", "land for sale athi river", "50 by 100 plots athi river", "plots for sale in kinanie athi river"],
    projects: ["lukenya-ridge-plots"],
    intro:
      "Athi River town plots are now expensive and crowded. A few minutes further along Mombasa Road, Lukenya Ridge gives you a 50 by 100 plot in a planned gated estate with wide internal roads, still within easy reach of Athi River, the Export Processing Zone and Nairobi.",
  },
  {
    slug: "plots-for-sale-kitengela-alternative",
    kind: "land",
    h1: "Plots Near Kitengela: Why Buyers Are Choosing Lukenya",
    title: "Plots for Sale Near Kitengela: Lukenya Ridge Alternative | Comex Homes",
    description:
      "Comparing plots in Kitengela? Lukenya Ridge on Mombasa Road offers 50 by 100 plots in a gated estate, 45 minutes from Nairobi CBD, by Comex Homes.",
    keywords: ["plots for sale in kitengela", "land for sale kitengela", "cheap plots near kitengela", "plots for sale kajiado mombasa road"],
    projects: ["lukenya-ridge-plots"],
    intro:
      "Kitengela and Lukenya both sit on the south eastern growth belt from Athi River. If you are shopping for a Kitengela plot, compare it with Lukenya Ridge: a gated, planned 50 by 100 estate just off Mombasa Road instead of an open subdivision, with a community plot and planned internal roads.",
  },
  {
    slug: "studio-apartments-for-sale-nairobi",
    h1: "Studio Apartments for Sale in Nairobi",
    title: "Studio Apartments for Sale in Nairobi from KES 2.2M | Comex Homes",
    description:
      "Buy an affordable luxury studio apartment in Nairobi direct from the developer. South B, Ngara and Kilimani studios with a 25% deposit and 24 month payment plan, plus rental management.",
    keywords: ["studio apartments for sale in nairobi", "cheap studio apartments for sale in nairobi", "studio apartment for sale nairobi cbd", "bedsitter for sale nairobi"],
    projects: ["astana-residence-ngara", "balozi-suites-south-b", "the-reveal-kabarnet-road"],
    intro:
      "Comex Homes builds and sells executive studio apartments in Nairobi from KES 2.2M. You buy direct from the developer, pay 25% on signing and the balance over 24 months, and we find tenants and collect rent for you once the unit is ready.",
  },
  {
    slug: "1-bedroom-apartments-for-sale-nairobi",
    h1: "1 Bedroom Apartments for Sale in Nairobi",
    title: "1 Bedroom Apartments for Sale in Nairobi | Payment Plan | Comex Homes",
    description:
      "Affordable luxury one bedroom apartments for sale in Nairobi: Ngara from KES 5.46M, South B and Kilimani. Buy direct from the developer with a 24 month payment plan and managed rentals.",
    keywords: ["1 bedroom apartment for sale in nairobi", "cheap 1 bedroom apartments for sale in nairobi", "one bedroom apartment for sale nairobi", "1 bedroom off plan nairobi"],
    projects: ["astana-residence-ngara", "balozi-suites-south-b", "the-reveal-kabarnet-road"],
    intro:
      "Our one bedroom apartments are built for owners who want steady rental income close to the CBD. Astana Residence in Ngara starts at KES 5.46M with expected rent of KES 45,000 a month, and Balozi Suites in South B offers 510 sqft one bedrooms.",
  },
  {
    slug: "apartments-for-sale-south-b",
    h1: "Studio and 1 Bedroom Apartments for Sale in South B",
    title: "Apartments for Sale in South B, Nairobi | Balozi Suites | Comex Homes",
    description:
      "Studio and one bedroom apartments for sale in South B at Balozi Suites, overlooking the Nairobi Expressway, with rooftop pool and gym. Last units, 97% occupied.",
    keywords: ["studio apartments for sale south b", "1 bedroom apartment for sale in south b", "south b apartments for sale"],
    projects: ["balozi-suites-south-b"],
    intro:
      "Balozi Suites is our completed South B block, 97% occupied, close to the Nairobi Expressway, Capital Centre and JKIA. It is the fastest way to own a tenanted studio or one bedroom in South B.",
  },
  {
    slug: "apartments-for-sale-ngara",
    h1: "Apartments for Sale in Ngara, Nairobi",
    title: "Apartments for Sale in Ngara from KES 3.51M | Astana Residence",
    description:
      "Off plan studio (KES 3.51M) and one bedroom (KES 5.46M) apartments for sale in Ngara, Nairobi at Astana Residence. About 10% expected rental yield, minutes from the CBD.",
    keywords: ["apartments for sale in ngara", "studio apartment for sale ngara", "1 bedroom apartment for sale ngara"],
    projects: ["astana-residence-ngara"],
    intro:
      "Astana Residence puts you in Ngara, walking distance to the CBD, University of Nairobi and Globe roundabout, which keeps tenant demand high. Studios are 291 sqft from KES 3.51M and one bedrooms are 452 sqft from KES 5.46M.",
  },
  {
    slug: "apartments-for-sale-kilimani-kabarnet-road",
    h1: "Apartments for Sale on Kabarnet Road, Kilimani",
    title: "Studio and 1 Bedroom Apartments for Sale Kabarnet Road, Kilimani | The Reveal",
    description:
      "Studio and one bedroom apartments for sale on Kabarnet Road off Ngong Road, Kilimani, at The Reveal. Nearing completion, rooftop pool, gym and coffee shop.",
    keywords: ["apartments for sale kabarnet road", "studio apartment for sale kilimani", "1 bedroom apartment for sale ngong road"],
    projects: ["the-reveal-kabarnet-road"],
    intro:
      "The Reveal on Kabarnet Road gives you a Kilimani and Ngong Road address at an entry price well below typical Kilimani stock, and it is nearing completion so rental income starts sooner.",
  },
  {
    slug: "apartments-for-sale-nairobi-west",
    h1: "Apartments in Nairobi West by Comex Homes",
    title: "Apartments for Sale in Nairobi West | Nyayo View Suites | Comex Homes",
    description:
      "Nyayo View Suites I and II in Nairobi West: executive studios and one bedroom apartments by Comex Homes. Both are sold out; see similar units selling now in South B and Ngara.",
    keywords: ["apartments for sale nairobi west", "studio apartments for sale in nairobi west", "nyayo view suites"],
    projects: ["nyayo-view-suites-one-nairobi-west", "nyayo-view-suites-two-nairobi-west", "balozi-suites-south-b", "astana-residence-ngara"],
    intro:
      "Nyayo View Suites I is fully occupied and Nyayo View Suites II is nearing completion, both sold out. If you wanted Nairobi West, the closest equivalents selling now are Balozi Suites in South B and Astana Residence in Ngara.",
  },
  {
    slug: "apartments-for-sale-in-nairobi-under-3-million",
    h1: "Apartments for Sale in Nairobi Under 3 Million",
    title: "Apartments for Sale in Nairobi for 2 to 3 Million | Comex Homes",
    description:
      "Looking for an apartment in Nairobi for 2 million or 3 million shillings? Comex Homes executive studios start from KES 2.2M with 25% deposit and 24 months to pay.",
    keywords: ["apartments for sale in nairobi for 2 million", "1 bedroom apartments for sale in nairobi for 3 million", "cheapest apartments for sale in nairobi"],
    projects: ["balozi-suites-south-b", "astana-residence-ngara", "the-reveal-kabarnet-road"],
    intro:
      "Our executive studios start from KES 2.2M. On a 25% deposit that is about KES 550,000 to start, with the balance spread over 24 months, so you can own a rent paying unit in Nairobi without a mortgage.",
  },
  {
    slug: "buy-property-in-nairobi-from-diaspora",
    kind: "diaspora",
    steps: true,
    h1: "Buy an Apartment in Nairobi from the Diaspora",
    title: "Buy Property in Nairobi from the Diaspora | Managed Rentals | Comex Homes",
    description:
      "Kenyans abroad can buy studio and one bedroom apartments in Nairobi remotely with Comex Homes: virtual tours, staged payments, title process support and full tenant management.",
    keywords: ["buy property in kenya from diaspora", "diaspora real estate kenya", "invest in nairobi apartments from abroad"],
    projects: ["astana-residence-ngara", "balozi-suites-south-b", "the-reveal-kabarnet-road"],
    intro:
      "Most of our buyers never need to fly home to buy. We share 3D tours and progress updates, you pay in stages, and once the unit is complete we find tenants, collect rent and send you statements.",
  },
  ...[
    { code: "uk", place: "the UK", people: "Kenyans in the UK", h: "Buy Property in Kenya from the UK", kw: ["buy property in kenya from uk", "kenyan diaspora uk property", "invest in kenya from uk"], tz: "Our team works 7:30am to 4:30pm Nairobi time, which is early morning to early afternoon in the UK, and WhatsApp messages are answered after hours." },
    { code: "usa", place: "the USA", people: "Kenyans in the USA", h: "Buy Property in Kenya from the USA", kw: ["buy property in kenya from usa", "kenyan diaspora usa real estate", "invest in kenya from america"], tz: "Nairobi is 7 to 10 hours ahead of the US, so we schedule video viewings in your morning or evening and answer WhatsApp messages after hours." },
    { code: "uae-gulf", place: "the UAE and the Gulf", people: "Kenyans in Dubai, Abu Dhabi, Qatar and Saudi Arabia", h: "Buy Property in Kenya from Dubai and the Gulf", kw: ["buy property in kenya from dubai", "kenyans in uae invest in kenya", "kenyan diaspora gulf real estate"], tz: "Nairobi is 1 hour behind the UAE, so you can call or join a video viewing during your normal working day." },
    { code: "canada", place: "Canada", people: "Kenyans in Canada", h: "Buy Property in Kenya from Canada", kw: ["buy property in kenya from canada", "kenyan diaspora canada property"], tz: "Nairobi is 7 to 10 hours ahead of Canada, so we book video viewings in your morning or evening." },
    { code: "europe-australia", place: "Europe and Australia", people: "Kenyans in Germany, Sweden, the Netherlands, Australia and beyond", h: "Buy Property in Kenya from Europe or Australia", kw: ["buy property in kenya from germany", "buy property in kenya from australia", "kenyan diaspora europe real estate"], tz: "Wherever you are, WhatsApp is the fastest way to reach our sales team and book a video viewing at a time that suits you." },
  ].map((c) => ({
    slug: `buy-property-in-kenya-from-${c.code}`,
    kind: "diaspora",
    h1: c.h,
    title: `${c.h}: Studios, 1 Bedrooms and Plots | Comex Homes`,
    description: `${c.people} buy Nairobi apartments and Mombasa Road plots with Comex Homes: video viewings, staged payments, your own advocate and full tenant management after handover.`,
    keywords: c.kw,
    projects: ["astana-residence-ngara", "balozi-suites-south-b", "the-reveal-kabarnet-road", "lukenya-ridge-plots"],
    intro: `Comex Homes helps ${c.people} own rent paying property in Nairobi without flying home. You view by video, pay in stages, and once the unit is complete we find tenants, collect rent and keep you updated. ${c.tz}`,
    bullets: [
      "Live video viewings and a 3D virtual tour (Astana Residence)",
      `Payment plan: ${"25% deposit on signing the offer letter, balance within 24 months"}`,
      "Pay in US dollars (USD) or Kenya shillings by bank transfer from abroad",
      "You appoint your own advocate in Kenya to review the sale agreement and title",
      "After handover, Comex Homes finds tenants, collects rent and manages the unit",
    ],
    steps: true,
  })),
  {
    slug: "real-estate-investment-nairobi",
    kind: "investor",
    h1: "Real Estate Investment in Nairobi: Studios and 1 Bedrooms for Rental Income",
    title: "Real Estate Investment in Nairobi: Rental Yield, Off Plan and Buy to Let | Comex Homes",
    description: "Invest in Nairobi rental apartments with Comex Homes: studios from KES 3.51M in Ngara with about 10% expected yield, 24 month payment plan, full management and a delivered track record.",
    keywords: ["real estate investment nairobi", "best real estate investment in nairobi", "buy to let nairobi", "rental yield nairobi apartments", "property investment kenya"],
    projects: ["astana-residence-ngara", "balozi-suites-south-b", "the-reveal-kabarnet-road"],
    intro: "Studios and one bedrooms are the most rented homes in Nairobi because young professionals and students want to live close to the CBD and work hubs. Comex Homes builds exactly these units in Ngara, South B and Kilimani, then manages them for owners. At Astana Residence the expected rent is KES 29,000 a month on a KES 3.51M studio, an expected gross yield of about 10%.",
    bullets: [
      "Expected gross yield of about 10% at Astana Residence (KES 29,000 rent on a KES 3.51M studio)",
      "Off plan entry with 25% deposit and 24 months to pay, so capital is spread over the build",
      "Full management: tenant sourcing, rent collection and upkeep",
      "Delivered track record: Nyayo View Suites I fully occupied, Balozi Suites 97% occupied",
      "Buying several units? Talk to us about a multi unit allocation in one block",
    ],
    calculator: true,
  },
  {
    slug: "off-plan-property-investment-kenya",
    kind: "investor",
    h1: "Off Plan Property Investment in Kenya",
    title: "Off Plan Apartments in Nairobi: How to Invest Safely | Comex Homes",
    description: "How off plan apartment investment works in Nairobi: staged payments, what to check before you pay, and Comex Homes projects selling off plan now, with a delivered track record.",
    keywords: ["off plan property investment kenya", "off plan apartments nairobi", "off plan apartments for sale nairobi payment plan"],
    projects: ["astana-residence-ngara", "the-reveal-kabarnet-road"],
    intro: "Buying off plan means you buy before the building is finished, usually at a lower price, and pay as construction progresses. The risk is delivery, so check the developer's finished projects first. Comex Homes has delivered Nyayo View Suites I (fully occupied) and Balozi Suites (97% occupied), and Astana Residence in Ngara is selling off plan now.",
    bullets: [
      "Check finished projects you can visit: Nyayo View Suites I and Balozi Suites",
      "Ask for approvals: county building approval and NEMA licence for the project",
      "Have your own advocate review the sale agreement and the mother title before paying",
      "Pay into the account named in the sale agreement, never to an individual",
      "Payment plan: 25% deposit, balance within 24 months",
    ],
    calculator: true,
  },
];

export const FAQS = [
  {
    q: "What is the cheapest apartment Comex Homes sells in Nairobi?",
    a: "Comex Homes executive studios start from KES 2.2M. At Astana Residence in Ngara, studios are KES 3.51M and one bedrooms KES 5.46M.",
  },
  {
    q: "Does Comex Homes offer a payment plan?",
    a: "Yes. Pay a 25% deposit when you sign the offer letter and the balance within 24 months, with no bank mortgage needed. Payments are accepted in Kenya shillings or US dollars.",
  },
  {
    q: "Where are Comex Homes apartments located?",
    a: "South B (Balozi Suites), Ngara (Astana Residence), Kabarnet Road in Kilimani (The Reveal) and Nairobi West (Nyayo View Suites I and II). Lukenya Ridge offers plots off Mombasa Road.",
  },
  {
    q: "Will Comex Homes manage my apartment and find tenants?",
    a: "Yes. Comex Homes finds tenants, collects rent and manages the unit on your behalf, which is why owners in the diaspora buy with us.",
  },
  {
    q: "What rental income can I expect from a Nairobi studio?",
    a: "At Astana Residence the expected rent is about KES 29,000 a month for a studio and KES 45,000 for a one bedroom, an expected yield of around 10%. Actual rent depends on the market at the time of letting.",
  },
  {
    q: "Has Comex Homes delivered projects before?",
    a: "Yes. Nyayo View Suites I in Nairobi West is completed and fully occupied, and Balozi Suites in South B is 97% occupied.",
  },
  {
    q: "Does Comex Homes sell land along Mombasa Road?",
    a: "Yes. Lukenya Ridge is a gated estate of 60 plots of 50 by 100 in Lukenya, just off Mombasa Road past Athi River, about 45 minutes from Nairobi CBD.",
  },
  {
    q: "Can I buy a Comex Homes apartment from abroad?",
    a: "Yes. Kenyans in the UK, USA, UAE, Canada, Europe and Australia buy with Comex Homes through video viewings, staged bank payments in US dollars or Kenya shillings, and their own Kenyan advocate, and we manage the unit after handover.",
  },
  {
    q: "Does Comex Homes accept payment in US dollars?",
    a: "Yes. Comex Homes accepts payment in US dollars (USD) or Kenya shillings (KES) by bank transfer into the account named in your sale agreement.",
  },
  {
    q: "Is a Nairobi studio a good investment?",
    a: "At Astana Residence in Ngara, a KES 3.51M studio has expected rent of KES 29,000 a month, an expected gross yield of about 10% before costs. Use the rental yield calculator on comexhomes.ke to test your own assumptions.",
  },
  {
    q: "How do I book a site visit?",
    a: "Call or WhatsApp +254 709 501 501, or visit our office at Telkom Plaza, 1st Floor, Hurlingham, Monday to Friday 7:30am to 4:30pm.",
  },
];
