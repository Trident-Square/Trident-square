import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site'
import { services } from '@/lib/services'
import { posts } from '@/lib/blog'
import { projects } from '@/lib/work'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const page = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' = 'monthly') => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency,
    priority,
  })
  return [
    page('/', 1, 'weekly'),
    page('/services', 0.9),
    ...services.map((s) => page(`/services/${s.slug}`, 0.9)),
    page('/partners', 0.8, 'weekly'),
    page('/work', 0.8),
    ...projects.map((p) => page(`/work/${p.slug}`, 0.7)),
    page('/blog', 0.8, 'weekly'),
    ...posts.map((p) => ({ ...page(`/blog/${p.slug}`, 0.7), lastModified: new Date(`${p.updated ?? p.date}T09:00:00+05:30`) })),
    page('/about', 0.6),
    page('/contact', 0.7),
  ]
}
