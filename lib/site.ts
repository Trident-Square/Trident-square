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
  email: (process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@tridentsquare.com').trim(),
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
   * One fixed rate per step; a project's whole net value takes the rate of the step it falls in
   * (upToInr is inclusive). Every rate sits inside the ranges in the signed partner agreements
   * (10–15% up to ₹1L, 20–25% for ₹1–15L, 30–35% above ₹15L), so site and agreements agree.
   */
  slabs: [
    { upToInr: 50_000, rate: 10, label: 'Up to ₹50,000', fit: 'Single automations, small sites' },
    { upToInr: 100_000, rate: 15, label: '₹50,000 – ₹1 lakh', fit: 'Websites, small bots and builds' },
    { upToInr: 500_000, rate: 20, label: '₹1 – 5 lakh', fit: 'AI agents, chatbots, automations' },
    { upToInr: 1_500_000, rate: 25, label: '₹5 – 15 lakh', fit: 'MVPs, apps, custom software' },
    { upToInr: 3_000_000, rate: 30, label: '₹15 – 30 lakh', fit: 'Platforms, multi-system builds' },
    { upToInr: Infinity, rate: 35, label: 'Above ₹30 lakh', fit: 'Large platforms and programmes' },
  ],
  share: { max: 35 },
  /** Business days after the client's payment clears that the partner is paid: usually / at most. */
  payoutTypicalDays: 2,
  payoutDays: 5,
  /** How long a registered lead stays credited to the partner, from the written registration date. */
  leadProtectionMonths: 12,
  /** Monthly volume that qualifies for a performance bonus (either one). Amount confirmed in writing. */
  bonus: { revenueInr: 2_000_000, projects: 10 },
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
