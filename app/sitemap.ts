import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site'
import { posts } from '@/lib/blog'
import { pageDates } from '@/lib/lastmod'

// lastmod comes from content fingerprints (lib/lastmod.ts): a page's date changes only when
// its content changes, so Google can trust it and recrawl exactly the pages that changed.
const at = (day: string) => new Date(`${day}T09:00:00+05:30`)
const later = (a: string, b?: string) => (b && b > a ? b : a)

const PRIORITY: [RegExp, number, 'weekly' | 'monthly'][] = [
  [/^\/$/, 1, 'weekly'],
  [/^\/services(\/|$)/, 0.9, 'monthly'],
  [/^\/(partners|blog)$/, 0.8, 'weekly'],
  [/^\/work$/, 0.8, 'monthly'],
  [/^\/contact$/, 0.7, 'monthly'],
  [/^\/(work|blog)\//, 0.7, 'monthly'],
  [/^\/about$/, 0.6, 'monthly'],
]

const ORDER = ['/', '/services', '/services/', '/partners', '/work', '/work/', '/blog', '/blog/', '/about', '/contact']
const rank = (p: string) => {
  const i = ORDER.findIndex((o) => (o.endsWith('/') && o !== '/' ? p.startsWith(o) : p === o))
  return i < 0 ? ORDER.length : i
}

export default function sitemap(): MetadataRoute.Sitemap {
  const dates = pageDates()
  const postDay = Object.fromEntries(posts.map((p) => [`/blog/${p.slug}`, p.updated ?? p.date]))
  const newestPost = Object.values(postDay).sort().at(-1)

  return Object.keys(dates)
    .sort((a, b) => rank(a) - rank(b))
    .map((path) => {
      let day = later(dates[path], postDay[path])
      if (path === '/blog') day = later(day, newestPost)
      const [, priority, changeFrequency] = PRIORITY.find(([re]) => re.test(path)) ?? [null, 0.5, 'monthly']
      return { url: absoluteUrl(path), lastModified: at(day), changeFrequency, priority }
    })
}
