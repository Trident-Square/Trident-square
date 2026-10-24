import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PostBody from '@/components/blog/PostBody'
import PostCard from '@/components/blog/PostCard'
import PostCover from '@/components/blog/PostCover'
import ReadingProgress from '@/components/blog/ReadingProgress'
import Toc from '@/components/blog/Toc'
import Arrow from '@/components/site/Arrow'
import CtaBand from '@/components/site/CtaBand'
import FaqSection from '@/components/site/FaqSection'
import JsonLd from '@/components/site/JsonLd'
import { formatDate, getPost, headings, posts, readingMinutes, sortedPosts } from '@/lib/blog'
import { blogPostingSchema, breadcrumbs, faqSchema, pageMetadata } from '@/lib/seo'
import { getService } from '@/lib/services'
import { absoluteUrl } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug)
  if (!p) return {}
  const base = pageMetadata({ title: p.title, description: p.excerpt, path: `/blog/${p.slug}`, keywords: p.keywords })
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: `${p.date}T09:00:00+05:30`,
      modifiedTime: `${p.updated ?? p.date}T09:00:00+05:30`,
      section: p.category,
      tags: p.keywords,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const p = getPost((await params).slug)
  if (!p) notFound()
  const service = getService(p.service)
  const toc = headings(p)
  const more = sortedPosts().filter((o) => o.slug !== p.slug)
  const related = [...more.filter((o) => o.category === p.category), ...more.filter((o) => o.category !== p.category)].slice(0, 3)
  const url = absoluteUrl(`/blog/${p.slug}`)
  const share = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${p.title} ${url}`)}` },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { label: 'X', href: `https://x.com/intent/post?text=${encodeURIComponent(p.title)}&url=${encodeURIComponent(url)}` },
  ]

  return (
    <>
      <JsonLd
        data={[
          blogPostingSchema(p),
          breadcrumbs([
            { name: 'Blog', path: '/blog' },
            { name: p.title, path: `/blog/${p.slug}` },
          ]),
          ...(p.faqs?.length ? [faqSchema(p.faqs)] : []),
        ]}
      />
      <ReadingProgress target="post-body" />

      {/* HEADER */}
      <header className="container pt-28 sm:pt-36">
        <nav aria-label="Breadcrumb" className="flex items-center justify-between border-b border-ink pb-3 font-mono text-[11px] uppercase tracking-[0.14em]">
          <ol className="flex min-w-0 items-center gap-2">
            <li><Link href="/" className="text-muted hover:text-ink">Home</Link></li>
            <li aria-hidden className="text-muted">/</li>
            <li><Link href="/blog" className="text-muted hover:text-ink">Blog</Link></li>
            <li aria-hidden className="text-muted">/</li>
            <li className="truncate">{p.category}</li>
          </ol>
          <span className="hidden shrink-0 text-muted sm:inline">{readingMinutes(p)} min read</span>
        </nav>

        <div className="grid gap-10 pt-12 sm:pt-16 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <p className="flex flex-wrap items-center gap-x-3 font-mono text-[11.5px] uppercase tracking-[0.12em]">
              <span className="bg-cobalt px-2 py-1 text-white">{p.category}</span>
              <span className="text-muted">{formatDate(p.date)}</span>
            </p>
            <h1 className="mt-6 animate-[title-in_1.1s_cubic-bezier(.2,.75,.15,1)_both] text-[clamp(2.4rem,5.4vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
              {p.title}
            </h1>
            <p className="lede mt-6 max-w-3xl text-ink-2">{p.excerpt}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-y border-line py-5">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center bg-ink">
              <Image src="/trident-remove-bg.png" alt="" width={22} height={24} className="h-6 w-auto" />
            </span>
            <div>
              <p className="text-[15px] font-semibold">Trident Square Engineering</p>
              <p className="text-[13.5px] text-muted">
                {formatDate(p.date)}
                {p.updated ? ` · Updated ${formatDate(p.updated)}` : ''} · {readingMinutes(p)} min read
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">Share</span>
            {share.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="border border-ink/15 px-3 py-1.5 text-[13px] transition-colors hover:border-ink hover:bg-ink hover:text-paper">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <PostCover post={p} size="hero" className="mt-10 aspect-[16/10] sm:aspect-[5/2]" />
      </header>

      {/* BODY */}
      <section className="container py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28 space-y-10">
              <Toc items={toc} />
              {service ? (
                <Link href={`/services/${service.slug}`} className="group block border border-line bg-white p-5 transition-colors hover:border-ink">
                  <p className="eyebrow">Related service</p>
                  <p className="mt-3 text-[17px] font-semibold leading-snug tracking-[-0.01em] group-hover:text-cobalt">{service.name}</p>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{service.timeline}</p>
                  <span className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em]">
                    Learn more <Arrow className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ) : null}
            </div>
          </aside>

          <article id="post-body" className="min-w-0 lg:col-span-8 lg:col-start-5 xl:col-span-7 xl:col-start-5">
            <PostBody blocks={p.body} />

            <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-ink pt-6">
              <Link href="/blog" className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.1em] hover:text-cobalt">
                <Arrow className="h-3.5 w-3.5 rotate-180" /> All articles
              </Link>
              <div className="flex flex-wrap gap-2">
                {p.keywords.slice(0, 3).map((k) => (
                  <span key={k} className="bg-paper-2 px-2.5 py-1 text-[12.5px] text-muted">{k}</span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      {p.faqs?.length ? <FaqSection faqs={p.faqs} title="Quick answers." label="FAQ" /> : null}

      {related.length ? (
        <section className="bg-paper-2/70 py-20 sm:py-28">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="h2">Keep reading</h2>
              <Link href="/blog" className="btn-ghost">All articles <Arrow /></Link>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((o) => (
                <PostCard key={o.slug} post={o} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand />
    </>
  )
}
