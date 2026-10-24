'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { Project } from '@/lib/work'
import { cn } from '@/lib/utils'

/**
 * A slow, endless strip of real product footage in device frames. A video only
 * plays while the strip is on screen and that video is inside the strip's
 * visible window — the strip is doubled for the loop, so playing every copy
 * would decode ~10 videos at once and make scrolling stutter on slower laptops.
 */
export default function Showreel({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const inStrip = useRef(new Set<HTMLVideoElement>())
  const items = projects.filter((p) => p.loop)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || !visible) {
      el?.querySelectorAll('video').forEach((v) => v.pause())
      return
    }
    const seen = inStrip.current
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement
          if (e.isIntersecting) {
            seen.add(v)
            v.play().catch(() => {})
          } else {
            seen.delete(v)
            v.pause()
          }
        })
      },
      { root: el, threshold: 0.05 }
    )
    el.querySelectorAll('video').forEach((v) => io.observe(v))
    return () => {
      io.disconnect()
      seen.forEach((v) => v.pause())
      seen.clear()
    }
  }, [visible])

  return (
    <div ref={ref} className="group/reel mask-fade-x overflow-hidden">
      <ul className="flex w-max animate-marquee-slow items-end gap-6 group-hover/reel:[animation-play-state:paused] sm:gap-10">
        {[...items, ...items].map((p, i) => (
          <li key={`${p.slug}-${i}`} aria-hidden={i >= items.length}>
            <Link href={`/work/${p.slug}`} tabIndex={i >= items.length ? -1 : undefined} className="group block">
              {p.orientation === 'portrait' ? (
                <div className="w-[170px] overflow-hidden rounded-[26px] border-[6px] border-ink bg-ink shadow-[0_40px_60px_-30px_rgba(17,17,16,0.55)] transition-transform duration-500 group-hover:-translate-y-3 sm:w-[210px]">
                  <video src={p.loop} poster={p.poster} muted loop playsInline preload="none" className="aspect-[9/19] w-full object-cover" />
                </div>
              ) : (
                <div className="w-[420px] overflow-hidden border border-ink/15 bg-white shadow-[0_40px_60px_-30px_rgba(17,17,16,0.45)] transition-transform duration-500 group-hover:-translate-y-3 sm:w-[560px]">
                  <div className="flex items-center gap-1.5 border-b border-ink/10 px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-ink/15" />
                    <span className="h-2 w-2 rounded-full bg-ink/15" />
                    <span className="h-2 w-2 rounded-full bg-ink/15" />
                  </div>
                  <video src={p.loop} poster={p.poster} muted loop playsInline preload="none" className="aspect-[16/9] w-full object-cover object-top" />
                </div>
              )}
              <p className={cn('mt-4 flex items-baseline gap-3')}>
                <span className="display text-2xl transition-colors group-hover:text-cobalt">{p.name}</span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted">{p.industry}</span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
