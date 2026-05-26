export const siteConfig = {
  name: 'PayLow',
  fullName: 'PayLow Staffing',
  tagline: 'Brilliant remote staff. Matched in days. Starting at $7/hour.',
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

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Industries', href: '/industries' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact Us', href: '/contact-us' },
] as const;

/**
 * Image assets.
 *
 * - People-focused photography is served from Unsplash CDN. Next.js's image
 *   optimizer caches them through Vercel's edge as AVIF/WebP, so first-request
 *   latency is the only cost — subsequent loads are local-fast.
 * - Industry icons + diagrams stay as local SVGs in /public/images/ (kept as
 *   resilient fallbacks too).
 */
export const assets = {
  heroPerson:
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&auto=format&fit=crop&q=80',
  visualAbout:
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1000&auto=format&fit=crop&q=80',
  visualHowItWorks:
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1000&auto=format&fit=crop&q=80',
  visualContact:
    'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=1000&auto=format&fit=crop&q=80',
  visualPricing:
    'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1000&auto=format&fit=crop&q=80',
  avatarJessica:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
  avatarDavid:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  avatarSarah:
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80',
  avatarJohnDoe:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
  avatarJohnP:
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&auto=format&fit=crop&q=80',
  avatarEmily:
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
  heroHome: '/images/hero-home.svg',
  industryRealEstate: '/images/industry-real-estate.svg',
  industryEcommerce: '/images/industry-ecommerce.svg',
  industryHealthcare: '/images/industry-healthcare.svg',
  industryIT: '/images/industry-it.svg',
  industryFinance: '/images/industry-finance.svg',
  industryCustomerService: '/images/industry-customer-service.svg',
  industryCreative: '/images/industry-creative.svg',
  industryMarketing: '/images/industry-marketing.svg',
  industryAdmin: '/images/industry-admin.svg',
  industryServices: '/images/industry-services.svg',
  industryEducation: '/images/industry-education.svg',
  industryEngineering: '/images/industry-engineering.svg',
  industrySpecialized: '/images/industry-specialized.svg',
  logoGlow: '/logo.svg',
  logoFull: '/logo.svg',
  homeHeroGroup94: '/images/hero-home.svg',
  homeHeroGroup93: '/images/hero-home.svg',
  homeHeroGroup95: '/images/hero-home.svg',
  aboutHeroBg: '/images/visual-about.svg',
  industriesHeroBg: '/images/industry-it.svg',
  howItWorksHeroBg: '/images/visual-how-it-works.svg',
  faqHeroBg: '/images/visual-contact.svg',
  testimonialsHeroBg: '/images/visual-about.svg',
  contactHeroBg: '/images/visual-contact.svg',
  whyImage: '/images/visual-about.svg',
  advantageImage: '/images/industry-services.svg',
  ctaWomen: '/images/visual-contact.svg',
  rectangleAccent: '/images/visual-about.svg',
  about01: '/images/visual-about.svg',
  about02: '/images/industry-services.svg',
  aboutRecruiter: '/images/industry-admin.svg',
  about03: '/images/visual-about.svg',
  about04: '/images/industry-creative.svg',
  howIntro: '/images/visual-how-it-works.svg',
  howApply1: '/images/visual-how-it-works.svg',
  howApply2: '/images/visual-how-it-works.svg',
  pricing7: '/images/visual-pricing.svg',
  pricingImage: '/images/visual-pricing.svg',
  industriesHero1: '/images/industry-services.svg',
  industriesHero2: '/images/industry-it.svg',
  industriesAdvantage: '/images/visual-about.svg',
  tColleagues: '/images/avatar-jessica.svg',
  tProperty: '/images/avatar-sarah.svg',
  tAbout04: '/images/avatar-john-p.svg',
  tFinancial: '/images/avatar-david.svg',
  tHomeImg7: '/images/avatar-emily.svg',
  tManSlider: '/images/avatar-john-doe.svg',
} as const;

export const reviews = [
  {
    quote:
      'We had a marketing coordinator on board in 6 days. She runs circles around the agency we used to pay 4x for.',
    name: 'Jessica M.',
    role: 'Marketing Director, e-commerce',
    image: 'avatarJessica',
  },
  {
    quote:
      'Replaced two contractors with one PayLow developer. He builds twice as fast and costs a third of what we were paying.',
    name: 'David L.',
    role: 'Founder, SaaS startup',
    image: 'avatarDavid',
  },
  {
    quote:
      'I needed a property coordinator who could juggle 14 listings. PayLow sent me three. I hired all three.',
    name: 'Sarah K.',
    role: 'Broker, real estate',
    image: 'avatarSarah',
  },
  {
    quote:
      'They scoped the role on a Tuesday call. By Friday I was interviewing. We hired on Monday. Honestly didn\u2019t expect it to be this easy.',
    name: 'John D.',
    role: 'COO, logistics firm',
    image: 'avatarJohnDoe',
  },
  {
    quote:
      'Skeptical going in, completely converted now. The shortlist was tight, the interviews were sharp, the hire was excellent.',
    name: 'John P.',
    role: 'Engineering Lead',
    image: 'avatarJohnP',
  },
  {
    quote:
      'Our customer-support team doubled overnight without doubling our payroll. Couldn\u2019t recommend higher.',
    name: 'Emily T.',
    role: 'Operations, training co.',
    image: 'avatarEmily',
  },
] as const;

export const videoReviews = [
  { title: 'Perfect Capture Photography', youtubeId: 'u68BWUl94o8' },
  { title: 'Advanced Property Management', youtubeId: 'rWTjw-Ikjzk' },
  { title: 'Texas Real Realtors', youtubeId: 'ZCkRwvdrLtc' },
] as const;
