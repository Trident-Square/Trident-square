import BlogIndex from '@/components/blog/BlogIndex'
import CtaBand from '@/components/site/CtaBand'
import JsonLd from '@/components/site/JsonLd'
import PageHero from '@/components/site/PageHero'
import { categories, sortedPosts } from '@/lib/blog'
import { breadcrumbs, pageMetadata } from '@/lib/seo'
import { absoluteUrl, site } from '@/lib/site'

export const metadata = {
  ...pageMetadata({
    title: 'Blog — AI, Automation & Software Guides for Indian Businesses',
    description:
      'Plain-English guides from Trident Square’s engineers: what AI chatbots and voice agents cost in India, WhatsApp automation, and how to ship software that gets used.',
    path: '/blog',
    keywords: ['AI blog India', 'business automation guide', 'AI chatbot cost', 'voice AI agent guide', 'WhatsApp automation guide'],
  }),
  alternates: { canonical: absoluteUrl('/blog'), types: { 'application/rss+xml': absoluteUrl('/blog/feed.xml') } },
}

export default function BlogPage() {
  const posts = sortedPosts()
  return (
    <>
      <JsonLd
        data={[
          breadcrumbs([{ name: 'Blog', path: '/blog' }]),
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: `${site.name} Blog`,
            url: absoluteUrl('/blog'),
            publisher: { '@id': `${site.url}/#organization` },
            blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: absoluteUrl(`/blog/${p.slug}`), datePublished: p.date })),
          },
        ]}
      />

      <PageHero
        crumbs={[{ label: 'Blog' }]}
        title={<>Field notes<br />from the <span className="text-cobalt">build.</span></>}
        meta={[
          { k: 'Written by', v: 'Engineers, not marketers' },
          { k: 'Topics', v: 'AI · Automation · Pricing' },
          { k: 'Articles', v: posts.length },
        ]}
        intro="Straight answers to the questions clients ask us every week — what things cost, what actually works, and when AI is the wrong tool. No fluff, real numbers."
      />

      <section className="container py-20 sm:py-28">
        <BlogIndex posts={posts} categories={categories} />
      </section>

      <CtaBand title="Got a question we haven’t answered?" />
    </>
  )
}
