export const siteConfig = {
  name: 'PayLow',
  fullName: 'PayLow Staffing',
  tagline: 'Hire skilled remote staff. Matched in days. From $7/hour.',
  url: 'https://paylowstaffing.com',
  // Live Zoho sign-up form ("Hire Your Virtual Assistant!") — Zoho's
  // formperma URLs are designed for iframe embedding, so the in-page modal
  // loads this directly. Update here to repoint the Get Started CTA.
  signUpUrl:
    'https://forms.zohopublic.com/xcellentstaffing1/form/HireYourVirtualAssistant/formperma/0_XQf1KHayeo9Mv8BuadjeqD4Jwu_mB59Hr1czMuALE',
  termsUrl: 'https://toc.paylowstaffing.com/',
  privacyUrl: 'https://privacy-policy.paylowstaffing.com/',
  contactFormEmbedUrl: 'https://lc.paylowstaffing.com/widget/form/1bJDrrS4rOrnEZPBoXDJ',
  designer: { name: 'Chaim Teitelbaum', url: 'https://www.chaimteitelbaum.com' },
  contact: {
    address: '3 Collage Rd #104 Monsey NY 10952',
    phone: '1-877-3PAYLOW',
    phoneDigits: '729569',
    phoneTel: '18873729569',
    email: 'Hire@paylowstaffing.com',
  },
  social: {
    facebook: '#',
    twitter: 'https://x.com/Paylowstaffing',
    youtube: 'https://www.youtube.com/@PayLowstaffing',
    linkedin: 'https://www.linkedin.com/company/paylow-staffing/',
    whatsapp: 'https://wa.me/+18773729569',
  },
} as const;

// Testimonials section now lives on the homepage at /#testimonials —
// /testimonials is 308'd to that anchor via next.config.mjs.
export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Industries', href: '/industries' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact Us', href: '/contact-us' },
] as const;

/**
 * Image assets — premium, male-focused professional photography from Unsplash.
 *
 * Direction: every photo communicates trust, competence, and friendly
 * professionalism. Portraits skew warm and natural — no awkward stock-photo
 * energy, no fake handshakes. Industry context photos (warehouse, home
 * interior, dev setup, etc.) are clean object-focused shots that pair with
 * the portraits without competing with them.
 *
 * Performance: Unsplash images are served via `images.unsplash.com` (already
 * whitelisted in next.config.mjs). Next.js's image optimizer transforms them
 * at the Vercel edge into AVIF/WebP, sized per viewport, so first request
 * is the only cost — repeat visits are CDN-fast.
 */
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?w=${w}&auto=format&fit=crop&q=85`;

// Photo bank — IDs chosen and verified as male-focused professional imagery.
const P = {
  // Portraits
  heroDistel: 'photo-1519085360753-af0119f7cbe7',     // Young pro at laptop, headphones (iconic remote-work shot)
  proLaptop: 'photo-1556157382-97eda2d62296',         // Male at laptop in modern lit office
  friendlySmile: 'photo-1573496359142-b8d87734a5a2',  // NOTE: turned out to be a woman — no longer used on active hero (see industriesHeroBg)
  confidentPro: 'photo-1492562080023-ab3db95bfbce',   // Confident professional male
  suitedPro: 'photo-1564564321837-a57b7070ac4f',      // Male in suit, blurred bg
  beardedPro: 'photo-1472099645785-5658abf4ff4e',     // Bearded male, natural light
  glassesSmile: 'photo-1599566150163-29194dcaad36',   // Smiling male with glasses
  warmSmile: 'photo-1560250097-0b93528c311a',         // Warmly smiling male
  cleanCut: 'photo-1507003211169-0a1dd7228f2d',       // Clean-cut male (reviewer + now industries hero)
  confident2: 'photo-1500648767791-00dcc994a43e',     // Confident male portrait (reviewer)
  asianPro: 'photo-1531123897727-8f129e1688ce',       // Asian male professional (reviewer)
  glassesPro: 'photo-1542178243-bc20204b769f',        // Male with glasses (reviewer)

  // Industry-context shots — clean, premium environment photography
  homeInterior: 'photo-1560518883-ce09059eeffa',      // Real estate
  warehouse: 'photo-1556742049-0a6b21adf8a4',         // Logistics (legacy — was previously used for e-commerce, read as too generic)
  ecommercePackages: 'photo-1607082348824-0a96f2a4b9da', // E-commerce — shipping packages / fulfillment (real, premium, recognizable)
  medicalSpace: 'photo-1576091160399-112ba8d25d1d',   // Healthcare
  devSetup: 'photo-1517694712202-14dd9538aa97',       // Developer workstation
  finance: 'photo-1554224155-6726b3ff858f',           // Finance / numbers
  callCenter: 'photo-1556745757-8d76bdb6984b',        // Customer service
  designerDesk: 'photo-1542744173-8e7e53415bb0',      // Creative / design
  marketingDesk: 'photo-1432888622747-4eb9a8efeb07',  // Marketing
  officeDesk: 'photo-1497019985829-7e1ea7d2c6a4',     // Admin / data (legacy)
  cleanDesk: 'photo-1486312338219-ce68d2c6f44d',      // MacBook + notebook on white desk — Admin & Data
  consultingRoom: 'photo-1521791136064-7986c2920216', // Professional services
  learningSetup: 'photo-1503676260728-1c00da094a0b',  // Education
  engineerSite: 'photo-1581094794329-c8112a89af12',   // Engineering
  specialistTools: 'photo-1581090700227-1e37b190418e', // (legacy — industries page now renders Specialized as a gradient card)
};

export const assets = {
  // ─── Homepage ──────────────────────────────────────────────────────────────
  heroPerson: u(P.heroDistel, 900),

  // ─── "Visual" tokens (reused across pages) ────────────────────────────────
  visualAbout: u(P.proLaptop, 1200),
  visualHowItWorks: u(P.consultingRoom, 1200),
  visualContact: u(P.suitedPro, 1200),
  visualPricing: u(P.confidentPro, 1200),

  // ─── Page-hero background portraits (passed to PageHero `bgImage`) ────────
  aboutHeroBg: u(P.confidentPro, 900),
  industriesHeroBg: u(P.cleanCut, 900),
  howItWorksHeroBg: u(P.proLaptop, 900),
  testimonialsHeroBg: u(P.suitedPro, 900),
  contactHeroBg: u(P.confident2, 900),
  faqHeroBg: u(P.glassesSmile, 900),

  // ─── About-page photo collage (3 portraits) ───────────────────────────────
  about01: u(P.beardedPro, 700),
  about02: u(P.glassesSmile, 500),
  aboutRecruiter: u(P.warmSmile, 500),

  // ─── How-it-works intro photo ─────────────────────────────────────────────
  howIntro: u(P.glassesPro, 1000),

  // ─── Industry tiles — premium context photography ─────────────────────────
  industryRealEstate: u(P.homeInterior, 800),
  industryEcommerce: u(P.ecommercePackages, 800),         // SWAPPED — was warehouse (too logistics-looking). Now real e-commerce shipping shot.
  industryHealthcare: u(P.medicalSpace, 800),
  industryIT: u(P.devSetup, 800),
  industryFinance: u(P.finance, 800),
  industryCustomerService: u(P.callCenter, 800),
  industryCreative: u(P.designerDesk, 800),
  industryMarketing: u(P.marketingDesk, 800),
  industryAdmin: u(P.cleanDesk, 800),
  industryServices: u(P.consultingRoom, 800),
  industryEducation: u(P.learningSetup, 800),
  industryEngineering: u(P.engineerSite, 800),
  industrySpecialized: u(P.specialistTools, 800),         // Kept for backward compat; industries/page.tsx renders Specialized as a gradient card.

  // ─── Testimonial avatars — all male ───────────────────────────────────────
  avatarJacob: u(P.beardedPro, 200),
  avatarDavid: u(P.cleanCut, 200),
  avatarSam: u(P.warmSmile, 200),
  avatarJohnDoe: u(P.confident2, 200),
  avatarJohnP: u(P.asianPro, 200),
  avatarEthan: u(P.glassesPro, 200),

  // ─── Logo ─────────────────────────────────────────────────────────────────
  logoGlow: '/logo.svg',
  logoFull: '/logo.svg',

  // ─── Backward-compatible aliases (old keys → new male photos) ─────────────
  avatarJessica: u(P.beardedPro, 200),
  avatarSarah: u(P.warmSmile, 200),
  avatarEmily: u(P.glassesPro, 200),
  heroHome: u(P.heroDistel, 900),
  homeHeroGroup94: u(P.heroDistel, 900),
  homeHeroGroup93: u(P.heroDistel, 900),
  homeHeroGroup95: u(P.heroDistel, 900),
  whyImage: u(P.proLaptop, 1000),
  advantageImage: u(P.consultingRoom, 800),
  ctaWomen: u(P.confident2, 1000),
  rectangleAccent: u(P.confidentPro, 800),
  about03: u(P.suitedPro, 500),
  about04: u(P.cleanCut, 500),
  howApply1: u(P.proLaptop, 800),
  howApply2: u(P.confidentPro, 800),
  pricing7: u(P.cleanCut, 800),
  pricingImage: u(P.confidentPro, 1000),
  industriesHero1: u(P.consultingRoom, 800),
  industriesHero2: u(P.devSetup, 800),
  industriesAdvantage: u(P.proLaptop, 1000),
  tColleagues: u(P.warmSmile, 200),
  tProperty: u(P.warmSmile, 200),
  tAbout04: u(P.glassesPro, 200),
  tFinancial: u(P.cleanCut, 200),
  tHomeImg7: u(P.glassesPro, 200),
  tManSlider: u(P.confident2, 200),
} as const;

// Reviews are ordered with the strongest narrative (story arc) first —
// the homepage testimonials section renders #0 as a dark-featured card.
export const reviews = [
  {
    quote:
      'They scoped the role on a Tuesday call. By Friday I was interviewing. We hired on Monday. Honestly didn\u2019t expect it to be this easy.',
    name: 'John D.',
    role: 'COO, logistics firm',
    image: 'avatarJohnDoe',
  },
  {
    quote:
      'A marketing coordinator on board in 6 days. He runs circles around the agency we used to pay 4x for.',
    name: 'Jacob M.',
    role: 'Marketing Director, e-commerce',
    image: 'avatarJacob',
  },
  {
    quote:
      'I needed someone to juggle 14 listings. They sent me three. I hired all three.',
    name: 'Sam K.',
    role: 'Broker, real estate',
    image: 'avatarSam',
  },
  {
    quote:
      'Replaced two contractors with one PayLow developer. Twice as fast. A third of the cost.',
    name: 'David L.',
    role: 'Founder, SaaS startup',
    image: 'avatarDavid',
  },
  {
    quote:
      'Skeptical going in. Converted now. Tight shortlist, sharp interviews, excellent hire.',
    name: 'John P.',
    role: 'Engineering Lead',
    image: 'avatarJohnP',
  },
  {
    quote:
      'Our support team doubled overnight. Our payroll barely moved.',
    name: 'Ethan T.',
    role: 'Operations, training co.',
    image: 'avatarEthan',
  },
] as const;

export const videoReviews = [
  { title: 'Perfect Capture Photography', youtubeId: 'u68BWUl94o8' },
  { title: 'Advanced Property Management', youtubeId: 'rWTjw-Ikjzk' },
  { title: 'Texas Real Realtors', youtubeId: 'ZCkRwvdrLtc' },
] as const;
