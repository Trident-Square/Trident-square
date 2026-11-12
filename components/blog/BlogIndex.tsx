'use client'

import { useState } from 'react'
import PostCard from './PostCard'
import type { Category, Post } from '@/lib/blog'
import { cn } from '@/lib/utils'

/** Featured latest post plus a category-filterable grid. */
export default function BlogIndex({ posts, categories }: { posts: Post[]; categories: Category[] }) {
  const [active, setActive] = useState<Category | 'All'>('All')
  const [q, setQ] = useState('')
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean)
  const list = (active === 'All' ? posts : posts.filter((p) => p.category === active)).filter((p) => {
    if (!terms.length) return true
    const hay = `${p.title} ${p.excerpt} ${p.keywords.join(' ')} ${p.category}`.toLowerCase()
    return terms.every((t) => hay.includes(t))
  })
  const [featured, ...rest] = list

  return (
    <>
      <div className="flex flex-col-reverse gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div role="tablist" aria-label="Filter by topic" className="flex flex-wrap items-center gap-2">
        {(['All', ...categories.filter((c) => posts.some((p) => p.category === c))] as const).map((c) => {
          const count = c === 'All' ? posts.length : posts.filter((p) => p.category === c).length
          return (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active === c}
              onClick={() => setActive(c)}
              className={cn(
                'flex items-center gap-2 border px-4 py-2 text-[14px] transition-colors',
                active === c ? 'border-ink bg-ink text-paper' : 'border-ink/15 hover:border-ink'
              )}
            >
              {c}
              <span className={cn('font-mono text-[11px]', active === c ? 'text-paper/60' : 'text-muted')}>{count}</span>
            </button>
          )
        })}
      </div>
      <label className="relative block w-full lg:w-80">
        <span className="sr-only">Search articles</span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search — e.g. WhatsApp, cost, Tally"
          className="field pr-10"
        />
        <svg viewBox="0 0 20 20" aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted">
          <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </label>
      </div>

      {!list.length ? (
        <p className="mt-12 border border-line bg-white p-8 text-[16px] text-muted">
          No article matches “{q}” yet. <a href="/contact" className="text-cobalt underline">Ask us directly</a> — we usually reply within a day.
        </p>
      ) : null}

      {featured ? (
        <div className="mt-10">
          <PostCard post={featured} featured />
        </div>
      ) : null}

      {rest.length ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      ) : null}
    </>
  )
}
