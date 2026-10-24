'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

/** "On this page" list that highlights the section currently being read. */
export default function Toc({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e)
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -65% 0px' }
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [items])

  return (
    <nav aria-label="On this page">
      <p className="eyebrow">On this page</p>
      <ol className="mt-4 border-l border-line">
        {items.map((i, n) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={cn(
                '-ml-px flex gap-3 border-l py-2 pl-4 text-[14px] leading-snug transition-colors',
                active === i.id ? 'border-cobalt text-ink' : 'border-transparent text-muted hover:text-ink'
              )}
            >
              <span className={cn('font-mono text-[11px] pt-0.5', active === i.id ? 'text-cobalt' : 'text-muted/70')}>{String(n + 1).padStart(2, '0')}</span>
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
