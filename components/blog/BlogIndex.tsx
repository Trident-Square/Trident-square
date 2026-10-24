'use client'

import { useState } from 'react'
import PostCard from './PostCard'
import type { Category, Post } from '@/lib/blog'
import { cn } from '@/lib/utils'

/** Featured latest post plus a category-filterable grid. */
export default function BlogIndex({ posts, categories }: { posts: Post[]; categories: Category[] }) {
  const [active, setActive] = useState<Category | 'All'>('All')
  const list = active === 'All' ? posts : posts.filter((p) => p.category === active)
  const [featured, ...rest] = list

  return (
    <>
      <div role="tablist" aria-label="Filter by topic" className="flex flex-wrap items-center gap-2">
        {(['All', ...categories] as const).map((c) => {
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
