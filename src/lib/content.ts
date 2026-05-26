export const siteConfig = {
  name: 'PayLow',
  fullName: 'PayLow Staffing',
  tagline:
    'At PayLow, we tailor our hiring process to align skilled talent with your unique business needs for optimal success.',
  url: 'https://paylowstaffing.com',
  signUpUrl: 'https://signup.paylowstaffing.com/sign-up',
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
 * Every asset is now local under /public/images/.
 * Total weight ~50KB for the entire site (vs. ~2-3MB of WP photos before).
 *
 * Legacy keys are kept (mapped to local SVGs) so existing pages render
 * without any code changes. New keys (heroHome, visualAbout, etc.)
 * are the canonical names for new code.
 */
export const assets = {
  // ---- New canonical names ----
  heroHome: '/images/hero-home.svg',
  visualAbout: '/images/visual-about.svg',
  visualHowItWorks: '/images/visual-how-it-works.svg',
  visualContact: '/images/visual-contact.svg',
  visualPricing: '/images/visual-pricing.svg',

  // Industry illustrations (consistent geometric set, all local)
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

  // Testimonial avatars
  avatarJessica: '/images/avatar-jessica.svg',
  avatarDavid: '/images/avatar-david.svg',
  avatarSarah: '/images/avatar-sarah.svg',
  avatarJohnDoe: '/images/avatar-john-doe.svg',
  avatarJohnP: '/images/avatar-john-p.svg',
  avatarEmily: '/images/avatar-emily.svg',

  // ---- Legacy aliases (mapped to local SVGs) ----
  // Keeps existing pages working without rewriting every <Image src=...>.
  logoGlow: '/logo.svg',
  logoFull: '/logo.svg',
  homeHero: '/images/hero-home.svg',
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
  { quote: 'Incredible service and quality. From start to finish \u2014 professional, timely, and beyond expectations. Highly recommend.', name: 'Jessica M.', role: 'Designer', image: 'tColleagues' },
  { quote: 'Exceeded all expectations. The detail and care put into every aspect was incredible. Responsive, talented, easy to work with.', name: 'David L.', role: 'Web Designer', image: 'tFinancial' },
  { quote: 'Excellent service. Worked quickly without cutting corners. Communication was great and I always felt informed.', name: 'Sarah', role: 'Architect', image: 'tProperty' },
  { quote: 'Great work. The final product was excellent. Transparent communication and professional throughout.', name: 'John Doe', role: 'IT Expert', image: 'tManSlider' },
  { quote: 'Fantastic experience. Exceptional quality, seamless from start to finish, top-notch results.', name: 'John P.', role: 'Software Engineer', image: 'tAbout04' },
  { quote: 'Hiring them was the best choice. They understood exactly what we wanted and delivered more than expected.', name: 'Emily T.', role: 'Trainer', image: 'tHomeImg7' },
] as const;

export const videoReviews = [
  { title: 'Perfect Capture Photography', youtubeId: 'u68BWUl94o8' },
  { title: 'Advanced Property Management', youtubeId: 'rWTjw-Ikjzk' },
  { title: 'Texas Real Realtors', youtubeId: 'ZCkRwvdrLtc' },
] as const;
