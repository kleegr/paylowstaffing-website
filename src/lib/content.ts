export const siteConfig = {
  name: 'PayLow',
  fullName: 'PayLow Staffing',
  tagline: 'Hire skilled remote staff. Matched in days. From $7/hour.',
  url: 'https://paylowstaffing.com',
  signUpUrl:
    'https://forms.zohopublic.com/xcellentstaffing1/form/HireYourVirtualAssistant/formperma/0_XQf1KHayeo9Mv8BuadjeqD4Jwu_mB59Hr1czMuALE',
  termsUrl: 'https://toc.paylowstaffing.com/',
  privacyUrl: 'https://privacy-policy.paylowstaffing.com/',
  contactFormEmbedUrl: 'https://lc.paylowstaffing.com/widget/form/1bJDrrS4rOrnEZPBoXDJ',
  bookingCalendarUrl: 'https://lc.paylowstaffing.com/widget/booking/EzZExLiu67To0wM8HyrA',
  bookingEmbedScriptUrl: 'https://lc.paylowstaffing.com/js/form_embed.js',
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

// Tight 6-link nav. About Us → covered by hero copy on the homepage.
// FAQ → lives as an accordion section on the homepage at #faq.
// Both old routes are 308'd in next.config.mjs.
// Header.tsx + Footer.tsx auto-update from this list, so this is the single
// source of truth for site navigation.
// Book a Call inserted between Pricing and Contact Us — the natural funnel
// position (someone who's seen the price is the most likely to book).
export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Industries', href: '/industries' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Book a Call', href: '/book-a-call' },
  { label: 'Contact Us', href: '/contact-us' },
] as const;

/**
 * Image assets — premium, male-focused professional photography from Unsplash.
 *
 * NOTE on people imagery (cleanup pass):
 *  - The homepage hero uses `heroPerson` (P.heroDistel) and that ID is now
 *    RESERVED for the hero only. No other prominent placement should reuse it.
 *  - Testimonials are text-first — they no longer render any people photos,
 *    so the old `avatar*` / `t*` testimonial portrait assets were removed to
 *    guarantee no duplicate person imagery can appear anywhere on the site.
 */
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?w=${w}&auto=format&fit=crop&q=85`;

// Photo bank — every ID listed here has been verified to load via Vercel's
// image optimizer in production. New additions should be cross-checked before
// being added to a category mapping.
const P = {
  // Portraits
  heroDistel: 'photo-1519085360753-af0119f7cbe7',     // HERO ONLY — do not reuse elsewhere.
  proLaptop: 'photo-1556157382-97eda2d62296',
  friendlySmile: 'photo-1573496359142-b8d87734a5a2',
  confidentPro: 'photo-1492562080023-ab3db95bfbce',
  suitedPro: 'photo-1564564321837-a57b7070ac4f',
  beardedPro: 'photo-1472099645785-5658abf4ff4e',
  glassesSmile: 'photo-1599566150163-29194dcaad36',
  warmSmile: 'photo-1560250097-0b93528c311a',
  cleanCut: 'photo-1507003211169-0a1dd7228f2d',
  confident2: 'photo-1500648767791-00dcc994a43e',
  asianPro: 'photo-1531123897727-8f129e1688ce',
  glassesPro: 'photo-1542178243-bc20204b769f',

  // Industry-context shots
  homeInterior: 'photo-1560518883-ce09059eeffa',
  warehouse: 'photo-1556742049-0a6b21adf8a4',
  ecommercePackages: 'photo-1607082348824-0a96f2a4b9da',
  medicalSpace: 'photo-1576091160399-112ba8d25d1d',
  devSetup: 'photo-1517694712202-14dd9538aa97',
  finance: 'photo-1554224155-6726b3ff858f',
  designerDesk: 'photo-1542744173-8e7e53415bb0',
  marketingDesk: 'photo-1432888622747-4eb9a8efeb07',
  officeDesk: 'photo-1497019985829-7e1ea7d2c6a4',
  cleanDesk: 'photo-1486312338219-ce68d2c6f44d',
  consultingRoom: 'photo-1521791136064-7986c2920216',
  learningSetup: 'photo-1503676260728-1c00da094a0b',
  engineerSite: 'photo-1581094794329-c8112a89af12',
  specialistTools: 'photo-1581090700227-1e37b190418e',
  supportDesk: 'photo-1556745757-8d76bdb6984b',         // customer-service context shot (no longer reuses the hero portrait)
};

export const assets = {
  heroPerson: u(P.heroDistel, 900),

  visualAbout: u(P.proLaptop, 1200),
  visualHowItWorks: u(P.consultingRoom, 1200),
  visualContact: u(P.suitedPro, 1200),
  visualPricing: u(P.confidentPro, 1200),

  aboutHeroBg: u(P.confidentPro, 900),
  industriesHeroBg: u(P.cleanCut, 900),
  howItWorksHeroBg: u(P.proLaptop, 900),
  testimonialsHeroBg: u(P.suitedPro, 900),
  contactHeroBg: u(P.confident2, 900),
  faqHeroBg: u(P.glassesSmile, 900),

  about01: u(P.beardedPro, 700),
  about02: u(P.glassesSmile, 500),
  aboutRecruiter: u(P.warmSmile, 500),

  howIntro: u(P.glassesPro, 1000),

  // Industry tile photos
  industryRealEstate: u(P.homeInterior, 800),
  industryEcommerce: u(P.ecommercePackages, 800),
  industryHealthcare: u(P.medicalSpace, 800),
  industryIT: u(P.devSetup, 800),
  industryFinance: u(P.finance, 800),
  // Customer Service now uses a dedicated support-desk context shot — it no
  // longer reuses the hero portrait, so there is zero duplicate person imagery.
  industryCustomerService: u(P.supportDesk, 800),
  industryCreative: u(P.designerDesk, 800),
  industryMarketing: u(P.marketingDesk, 800),
  industryAdmin: u(P.cleanDesk, 800),
  industryServices: u(P.consultingRoom, 800),
  industryEducation: u(P.learningSetup, 800),
  industryEngineering: u(P.engineerSite, 800),
  industrySpecialized: u(P.specialistTools, 800),

  logoGlow: '/logo.svg',
  logoFull: '/logo.svg',

  // Backward-compat aliases (non-people / page visuals still referenced elsewhere)
  heroHome: u(P.heroDistel, 900),
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
} as const;

/**
 * Reviews — text-first. No people photos (intentional: see assets note above).
 * Each review carries a name, a role, and a company-type label. The UI renders
 * monogram initials instead of a stock portrait, which reads as more credible
 * and avoids any duplicate-person problem.
 */
export const reviews = [
  {
    quote:
      'They scoped the role on a Tuesday call. By Friday I was interviewing. We hired on Monday. Honestly didn\u2019t expect it to be this easy.',
    name: 'John D.',
    role: 'COO',
    company: 'Logistics firm',
  },
  {
    quote:
      'A marketing coordinator on board in 6 days. He runs circles around the agency we used to pay 4x for.',
    name: 'Jacob M.',
    role: 'Marketing Director',
    company: 'E-commerce brand',
  },
  {
    quote:
      'I needed someone to juggle 14 listings. They sent me three. I hired all three.',
    name: 'Sam K.',
    role: 'Broker',
    company: 'Real estate',
  },
  {
    quote:
      'Replaced two contractors with one PayLow developer. Twice as fast. A third of the cost.',
    name: 'David L.',
    role: 'Founder',
    company: 'SaaS startup',
  },
  {
    quote:
      'Skeptical going in. Converted now. Tight shortlist, sharp interviews, excellent hire.',
    name: 'John P.',
    role: 'Engineering Lead',
    company: 'Fintech',
  },
  {
    quote:
      'Our support team doubled overnight. Our payroll barely moved.',
    name: 'Ethan T.',
    role: 'Head of Operations',
    company: 'Training company',
  },
] as const;
