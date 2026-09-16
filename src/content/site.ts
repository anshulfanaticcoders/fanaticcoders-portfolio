/**
 * Single source of truth for everything the page says.
 * Edit copy, projects, testimonials and links here — components only render.
 */

const unsplash = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const site = {
  name: "Anshul Mankotia",
  firstName: "Anshul",
  role: "IT Freelancer & Full Stack Developer",
  experienceYears: 4,
  location: "Dharamshala, Himachal Pradesh, India",
  locationShort: "Dharamshala, India",
  availability: "Available for new projects",
  /** Public contact email shown on the page. Leave empty to hide the mailto line. */
  email: "anshulmankotia1997@gmail.com",
  /** Where the primary CTA sends people. Keep as "#contact" for the on-page form. */
  ctaHref: "#contact",
  ctaLabel: "Start a project",
  socials: [
    { label: "Upwork", href: "https://www.upwork.com/freelancers/~01b5b3a20de9e60e1b?mp_source=share", kind: "upwork" as const },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/anshul-mankotia-112a34271", kind: "linkedin" as const },
  ],
  /** Words that morph after "builds" in the hero. Keep them short. */
  heroWords: ["websites", "web apps", "mobile apps", "stores", "SaaS"],
  /** Centered heading — keep these the same length so the morph cell doesn't leave gaps. */
  contactWords: ["great", "solid", "yours"],
  /** Replace with your own photo: drop a 4:5 image and set the path here. */
  portrait: unsplash("photo-1507003211169-0a1dd7228f2d", 800, 1000),
  portraitAlt: "Anshul Mankotia, full stack developer based in Dharamshala",
};

export const services = [
  {
    icon: "ShoppingBag",
    title: "Shopify stores",
    blurb:
      "Custom Shopify themes, headless storefronts and WooCommerce shops that load fast and sell without friction.",
    tags: ["Shopify", "WooCommerce", "Stripe"],
  },
  {
    icon: "Globe",
    title: "WordPress",
    blurb:
      "Hand-built themes and plugins, not page-builder soup. Editable by your team, quick on mobile, easy to rank.",
    tags: ["Custom themes", "Plugins", "ACF"],
  },
  {
    icon: "Code",
    title: "React, Next.js & Vue apps",
    blurb:
      "Modern frontends with real state, real auth and real performance budgets. Deployed on Vercel with previews.",
    tags: ["React", "Next.js", "Vue.js", "Tailwind"],
  },
  {
    icon: "Smartphone",
    title: "Mobile applications",
    blurb:
      "Cross-platform iOS and Android apps in React Native or Flutter, wired to the same backend as your website.",
    tags: ["React Native", "Flutter"],
  },
  {
    icon: "Server",
    title: "Laravel & FastAPI backends",
    blurb:
      "APIs, admin panels, payments, queues and integrations. Laravel for PHP shops, FastAPI when Python fits better.",
    tags: ["Laravel", "FastAPI", "MySQL", "Supabase", "Postman"],
  },
  {
    icon: "LayoutDashboard",
    title: "SaaS products & CMS",
    blurb:
      "Multi-tenant dashboards, subscriptions, roles and content systems — from first login to billing.",
    tags: ["Auth", "Billing", "Dashboards"],
  },
  {
    icon: "UtensilsCrossed",
    title: "Restaurant & car rental sites",
    blurb:
      "Menus, table reservations, online ordering, fleet listings and booking calendars that work on a phone.",
    tags: ["Bookings", "Ordering", "Maps"],
  },
  {
    icon: "Cloud",
    title: "Hosting, migration & care",
    blurb:
      "VPS and managed hosting, website migrations with zero downtime, DNS, SSL, backups and monthly care plans so nothing breaks after launch.",
    tags: ["VPS hosting", "Website migration", "Vercel", "Cloudflare"],
  },
] as const;

export type ServiceIcon = (typeof services)[number]["icon"];

export const techStack = [
  { name: "React", mark: "Re" },
  { name: "Next.js", mark: "Nx" },
  { name: "JavaScript", mark: "JS" },
  { name: "Vue.js", mark: "Vu" },
  { name: "React Native", mark: "RN" },
  { name: "Flutter", mark: "Fl" },
  { name: "Python", mark: "Py" },
  { name: "FastAPI", mark: "FA" },
  { name: "Laravel", mark: "La" },
  { name: "MySQL", mark: "My" },
  { name: "Supabase", mark: "Sb" },
  { name: "Postman", mark: "Pm" },
  { name: "WordPress", mark: "WP" },
  { name: "Shopify", mark: "Sh" },
  { name: "WooCommerce", mark: "Wo" },
  { name: "Tailwind", mark: "Tw" },
  { name: "SCSS", mark: "Sc" },
  { name: "Vercel", mark: "Ve" },
];

/**
 * Live client sites. Screenshots are real captures in /public/work (1440×900).
 * `stack` is the pill on the row — keep it factual.
 */
export const projects = [
  {
    title: "ShopAlert",
    url: "https://shopalert.ai/",
    tag: "SaaS · competitor price intelligence",
    stack: "Next.js SaaS",
    image: "/work/shopalert.jpg",
    alt: "ShopAlert homepage — paste a URL and it watches the price for you",
    summary:
      "A subscription SaaS that watches competitor product pages and alerts you the moment a price moves, stock runs out or a coupon appears. Marketing site, app, pricing and docs — built end to end.",
    points: [
      ["URL-based tracking", "paste any store URL, get alerts on price, stock, coupons and listing changes"],
      ["Subscription billing", "14-day free trial, plans and account management"],
      ["Docs and onboarding", "self-serve setup so users start tracking in minutes"],
    ],
  },
  {
    title: "Vrooem",
    url: "https://vrooem.com/",
    tag: "Car rental · worldwide fleet comparison & booking",
    stack: "Vue 3 + Laravel + Redis",
    image: "/work/vrooem.jpg",
    alt: "Vrooem homepage with pickup, drop-off and rental date search",
    summary:
      "A car rental comparison and booking platform pulling live fleet and pricing from a third-party rental provider API. Vue 3 frontend, Laravel backend, Redis in between so searches stay fast.",
    points: [
      ["Provider API integration", "live fleet, availability and pricing from a third-party car rental API"],
      ["Redis caching", "search results and rate lookups cached so repeat queries are instant"],
      ["Multi-currency, multi-language", "with user accounts and a full booking flow"],
    ],
  },
  {
    title: "Patriot Family Insurance",
    url: "https://patriotfamilyinsurance.com/",
    tag: "Insurance · lead-gen site with instant quotes",
    stack: "Next.js + Supabase",
    image: "/work/patriotfamilyinsurance.jpg",
    alt: "Patriot Family Insurance homepage with a quick quote form",
    summary:
      "A life insurance lead-generation site for a 49-state agency. Next.js for speed and SEO, Supabase for quote submissions and content, with a quote form on the first screen.",
    points: [
      ["Quick quote form", "captures name, state and date of birth straight into Supabase"],
      ["Coverage and blog pages", "structured for search and easy to keep updated"],
      ["Fast on mobile", "server-rendered pages with optimised media"],
    ],
  },
  {
    title: "Wellcrux",
    url: "https://wellcrux.com/",
    tag: "E-commerce · wellness store, Australia",
    stack: "Shopify",
    image: "/work/wellcrux.jpg",
    alt: "Wellcrux Shopify store homepage",
    summary:
      "A Shopify store for an Australian everyday-wellbeing brand: custom theme, collections organised by concern, promo bar, trust strip and a checkout that stays out of the way.",
    points: [
      ["Custom Shopify theme", "editable sections, no bloated app stack"],
      ["Shop by concern", "pain relief, wellbeing and mobility collections"],
      ["Conversion details", "free-shipping bar, guarantees strip, sticky cart"],
    ],
  },
  {
    title: "Curry Kitchen",
    url: "https://currykitcheninc.com/",
    tag: "Restaurant · tiffin delivery with weekly plans",
    stack: "Next.js",
    image: "/work/currykitchen.jpg",
    alt: "Curry Kitchen homepage — home-style tiffin delivery",
    summary:
      "An online ordering site for a San Diego tiffin service. Menu, packages, weekly and monthly subscription plans, customer accounts and a cart — built as a fast Next.js app.",
    points: [
      ["Menu and packages", "daily tiffin menu with plan-based pricing"],
      ["Subscriptions", "weekly and monthly plans with customer sign-in"],
      ["Delivery zones", "service areas and delivery windows shown before checkout"],
    ],
  },
  {
    title: "FinalExpense.co",
    url: "https://finalexpense.co/",
    tag: "Finance · final expense insurance quotes",
    stack: "WordPress",
    image: "/work/finalexpense.jpg",
    alt: "FinalExpense.co homepage with a call-to-quote hero",
    summary:
      "A WordPress lead-generation site for final expense insurance: quote funnel, click-to-call CTAs and content pages the client edits themselves.",
    points: [
      ["Quote funnel", "free-quote forms and phone CTAs on every page"],
      ["Custom WordPress theme", "fast, editable, no page-builder lock-in"],
      ["SEO content", "coverage guides structured for search"],
    ],
  },
  {
    title: "Derme Home",
    url: "https://dermehome.com/",
    tag: "E-commerce · antibacterial bamboo bedding",
    stack: "WordPress + WooCommerce",
    image: "/work/dermehome.jpg",
    alt: "Derme Home WooCommerce store homepage",
    summary:
      "A WooCommerce store for a bedding brand: product catalogue, coupons and promotions, and a homepage built around the product's lab-tested claims.",
    points: [
      ["WooCommerce catalogue", "variants, bundles and coupon campaigns"],
      ["Product storytelling", "benefit-led sections with proof points"],
      ["Payments and shipping", "configured and tested end to end"],
    ],
  },
  {
    title: "The Sebian Shop",
    url: "https://shop.thesebian.com/",
    tag: "E-commerce · alkaline herbs & subscriptions",
    stack: "WordPress + WooCommerce",
    image: "/work/thesebian.jpg",
    alt: "The Sebian Shop homepage with fresh produce hero",
    summary:
      "An online herb store with WooCommerce subscriptions, blog and customer accounts, with AMP pages for fast mobile loads.",
    points: [
      ["Subscriptions", "recurring orders with account management"],
      ["Shop and blog", "products and content under one WordPress install"],
      ["AMP mobile pages", "lightweight pages for mobile search traffic"],
    ],
  },
];

/** Hover trail in the Work intro — ambient workspace/code photos, not client screenshots. */
export const trailImages = [
  "photo-1498050108023-c5249f4df085",
  "photo-1461749280684-dccba630e2f6",
  "photo-1555066931-4365d14bab8c",
  "photo-1519389950473-47ba0277781c",
  "photo-1460925895917-afdab827c52f",
  "photo-1526374965328-7f61d4dc18c5",
  "photo-1504384308090-c894fdcc538d",
  "photo-1517694712202-14dd9538aa97",
].map((id) => unsplash(id, 360, 450));

export const process = [
  {
    step: "01",
    when: "Week 1 — Discover",
    title: "Discover",
    image: unsplash("photo-1531403009284-440f080d1e12", 1600, 1000),
    imageAlt: "Team planning a project with sticky notes on a whiteboard",
    lede: "One call to understand what the business needs, then a written scope with a fixed price and a date. No forty-page proposal — one page you can say yes to.",
    deliverables: ["Requirements and sitemap", "Fixed quote and timeline", "Design direction you sign off on"],
  },
  {
    step: "02",
    when: "Weeks 2–4 — Build",
    title: "Build",
    image: unsplash("photo-1555066931-4365d14bab8c", 1600, 1000),
    imageAlt: "Source code on a dark monitor",
    lede: "Design and development run together. You get a live staging link in the first week and see real pages in a real browser, not static mockups.",
    deliverables: ["Weekly staging updates", "Mobile-first, tested on real devices", "Two revision rounds built in"],
  },
  {
    step: "03",
    when: "Launch — Support",
    title: "Launch & support",
    image: unsplash("photo-1517976487492-5750f3195933", 1600, 1000),
    imageAlt: "Rocket lifting off at dawn",
    lede: "I deploy it, set up hosting, DNS and analytics, and hand over a site your team can edit. Thirty days of support are included after launch.",
    deliverables: ["Deployment and hosting setup", "Training and handover docs", "30-day support, care plans after"],
  },
];

/**
 * PLACEHOLDER quotes — replace with real client words before sharing widely.
 * Names are intentionally roles, not invented people.
 */
export const testimonials = [
  {
    quote: "Our restaurant finally takes orders on its own site instead of paying commissions. Anshul shipped it in three weeks and trained the staff in one afternoon.",
    highlight: "shipped it in three weeks",
    name: "Restaurant owner",
    role: "WordPress + WooCommerce build",
  },
  {
    quote: "He asked the right questions on the first call, quoted a fixed price and delivered exactly that. The booking calendar works flawlessly on phones.",
    highlight: "delivered exactly that",
    name: "Car rental founder",
    role: "Laravel + Vue platform",
  },
  {
    quote: "Clear communication, weekly demos and no surprises. The new Shopify theme is faster and our conversion rate went up the month it launched.",
    highlight: "no surprises",
    name: "E-commerce brand manager",
    role: "Shopify custom theme",
  },
];

export const PROJECT_TYPES = [
  "Website",
  "Shopify / e-commerce",
  "WordPress",
  "Web app / SaaS",
  "Mobile app",
  "Backend / API",
  "Hosting / maintenance",
  "Not sure yet",
] as const;
