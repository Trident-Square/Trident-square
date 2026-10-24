/**
 * Single source of truth for company facts. Everything user-facing and every
 * JSON-LD block reads from here, so NAP (name / address / phone) stays
 * identical across the site — Google's local ranking depends on that.
 */

export const site = {
  name: 'Trident Square',
  legalName: 'Trident Square',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.tridentsquare.com').replace(/\/$/, ''),
  tagline: 'Automation, AI and custom software, engineered in Noida',
  description:
    'Trident Square is an automation and software engineering company in Noida, India. We build business automation systems, AI agents, voice and chat bots, custom software, web, e-commerce and mobile apps for businesses worldwide.',
  projectsDelivered: '25+',
  email: (process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '').trim(),
  phoneE164: (process.env.NEXT_PUBLIC_CONTACT_PHONE_E164 ?? '916388443418').replace(/\D/g, ''),
  phoneDisplay: (process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY ?? '+91 63884 43418').trim(),
  address: {
    street: 'Bhutani 62 Avenue, Block C, Phase 2, Industrial Area, Sector 62',
    locality: 'Noida',
    region: 'Uttar Pradesh',
    postalCode: '201309',
    country: 'IN',
    countryName: 'India',
  },
  hours: 'Mo-Sa 10:00-19:00',
  socials: {
    linkedin: 'https://www.linkedin.com/company/trident-square/',
    instagram: 'https://www.instagram.com/tridentsquare/',
    facebook: 'https://www.facebook.com/profile.php?id=61574509445613',
  },
  gaId: 'G-5Q3QKNZVZ4',
} as const

/**
 * Partner programme economics. Change numbers here and the partner page,
 * calculator, FAQ and schema all update together.
 */
export const partnerProgram = {
  /**
   * Partner share by net project value (project value minus pass-through costs).
   * Indicative: the exact share is agreed per project after scoping.
   */
  slabs: [
    { upToInr: 100_000, min: 10, max: 15, label: 'Up to ₹1 lakh', fit: 'Small builds, sites, single automations' },
    { upToInr: 1_500_000, min: 20, max: 25, label: '₹1–15 lakh', fit: 'AI agents, chatbots, MVPs, apps' },
    { upToInr: Infinity, min: 30, max: 35, label: '₹15 lakh+', fit: 'Platforms and large builds' },
  ],
  share: { max: 35 },
  /** Business days after the client's payment clears that the partner is paid. */
  payoutDays: 5,
} as const

export function partnerSlab(netInr: number) {
  return partnerProgram.slabs.find((s) => netInr <= s.upToInr) ?? partnerProgram.slabs[partnerProgram.slabs.length - 1]
}

export const phoneHref = `tel:+${site.phoneE164}`

export function whatsappHref(text?: string) {
  const base = `https://wa.me/${site.phoneE164}`
  // encodeURIComponent (spaces → %20): some WhatsApp clients show a literal "+" for form-style encoding.
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

export function absoluteUrl(path = '/') {
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`
}

export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Partners', href: '/partners' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
] as const
