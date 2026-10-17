import type { MetadataRoute } from 'next'
import { absoluteUrl, site } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    // AI assistants (ChatGPT, Claude, Perplexity, Gemini) are allowed on purpose:
    // being citable there is now a real source of B2B leads.
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: site.url,
  }
}
