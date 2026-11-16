import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site'
import { services } from '@/lib/services'
import { posts } from '@/lib/blog'
import { projects } from '@/lib/work'
import { lastmod } from '@/lib/lastmod'

// Real last-changed dates only (see lib/lastmod.ts), so Google can trust them and recrawl what changed.
const at = (day: string) => new Date(`${day}T09:00:00+05:30`)

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, day: string, priority: number, changeFrequency: 'weekly' | 'monthly' = 'monthly') => ({
    url: absoluteUrl(path),
    lastModified: at(day),
    changeFrequency,
    priority,
  })
  const postDay = (p: (typeof posts)[number]) => p.updated ?? p.date
  const newestPost = posts.map(postDay).sort().at(-1) ?? lastmod.home

  return [
    page('/', lastmod.home, 1, 'weekly'),
    page('/services', lastmod.services, 0.9),
    ...services.map((s) => page(`/services/${s.slug}`, lastmod.servicePages, 0.9)),
    page('/partners', lastmod.partners, 0.8, 'weekly'),
    page('/work', lastmod.work, 0.8),
    ...projects.map((p) => page(`/work/${p.slug}`, lastmod.workPages[p.slug] ?? lastmod.workPagesDefault, 0.7)),
    page('/blog', newestPost, 0.8, 'weekly'),
    ...posts.map((p) => page(`/blog/${p.slug}`, postDay(p), 0.7)),
    page('/about', lastmod.about, 0.6),
    page('/contact', lastmod.contact, 0.7),
  ]
}
