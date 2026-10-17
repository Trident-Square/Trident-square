import type { Metadata } from 'next'
import { absoluteUrl, partnerProgram, site } from './site'
import { services, type Faq, type Service } from './services'
import type { Project } from './work'

const ORG_ID = `${site.url}/#organization`
const WEBSITE_ID = `${site.url}/#website`

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  image,
}: {
  title: string
  description: string
  path: string
  keywords?: string[]
  image?: string
}): Metadata {
  const url = absoluteUrl(path)
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: 'en_IN',
      type: 'website',
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: site.address.street,
  addressLocality: site.address.locality,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
}

/** Sitewide graph: the company as Organization + local ProfessionalService, and the WebSite. */
export function organizationGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': ORG_ID,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        logo: absoluteUrl('/trident-remove-bg.png'),
        image: absoluteUrl('/opengraph-image'),
        description: site.description,
        slogan: site.tagline,
        telephone: `+${site.phoneE164}`,
        ...(site.email ? { email: site.email } : {}),
        address: postalAddress,
        openingHours: site.hours,
        priceRange: '₹₹',
        areaServed: [
          { '@type': 'Country', name: 'India' },
          { '@type': 'Country', name: 'United States' },
          { '@type': 'Country', name: 'United Kingdom' },
          { '@type': 'Country', name: 'United Arab Emirates' },
          { '@type': 'Place', name: 'Worldwide' },
        ],
        knowsAbout: [
          'Artificial intelligence',
          'AI agents',
          'Voice AI',
          'Large language models',
          'Retrieval-augmented generation',
          'Custom software development',
          'Web development',
          'Mobile app development',
          'UI/UX design',
        ],
        sameAs: Object.values(site.socials),
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: `+${site.phoneE164}`,
            contactType: 'sales',
            availableLanguage: ['English', 'Hindi'],
            areaServed: 'Worldwide',
          },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'AI and software development services',
          itemListElement: services.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.name, url: absoluteUrl(`/services/${s.slug}`) },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: site.url,
        name: site.name,
        description: site.description,
        publisher: { '@id': ORG_ID },
        inLanguage: 'en-IN',
      },
    ],
  }
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...items].map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  }
}

export function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function serviceSchema(s: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(`/services/${s.slug}`)}#service`,
    name: s.name,
    serviceType: s.name,
    description: s.metaDescription,
    url: absoluteUrl(`/services/${s.slug}`),
    provider: { '@id': ORG_ID },
    areaServed: 'Worldwide',
    audience: { '@type': 'BusinessAudience', audienceType: 'Startups and businesses' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${s.name} deliverables`,
      itemListElement: s.deliverables.map((d) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: d },
      })),
    },
  }
}

export function projectSchema(p: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${p.name} — case study`,
    headline: p.summary,
    url: absoluteUrl(`/work/${p.slug}`),
    creator: { '@id': ORG_ID },
    about: p.industry,
    keywords: p.stack.join(', '),
    dateCreated: p.year,
    ...(p.poster ? { image: absoluteUrl(p.poster) } : {}),
    ...(p.demo
      ? {
          video: {
            '@type': 'VideoObject',
            name: `${p.name} product demo`,
            description: p.summary,
            contentUrl: absoluteUrl(encodeURI(p.demo)),
            thumbnailUrl: p.poster ? absoluteUrl(p.poster) : undefined,
            uploadDate: `${p.year}-01-01`,
          },
        }
      : {}),
  }
}

export function partnerProgramSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${site.name} Partner Programme`,
    url: absoluteUrl('/partners'),
    description: `Refer clients for AI agents and custom software and earn ${partnerProgram.referral.base}–${partnerProgram.referral.boosted}% of the project value.`,
    publisher: { '@id': ORG_ID },
    mainEntity: {
      '@type': 'Offer',
      name: 'Referral and white-label partnership',
      description: `${partnerProgram.referral.base}% commission on every closed referral, ${partnerProgram.referral.boosted}% on larger or repeat deals. White-label partners keep a ${partnerProgram.whiteLabelMargin.min}–${partnerProgram.whiteLabelMargin.max}% margin.`,
      seller: { '@id': ORG_ID },
    },
  }
}
