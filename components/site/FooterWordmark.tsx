'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const WORD = 'Trident Square'

/**
 * Footer sign-off. Letters rise one by one when the footer scrolls into view,
 * and a cobalt spotlight follows the pointer across the wordmark.
 */
export default function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  const [hot, setHot] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--x', `${e.clientX - r.left}px`)
    el.style.setProperty('--y', `${e.clientY - r.top}px`)
  }

  const letters = (tone: string) =>
    WORD.split('').map((ch, i) => (
      <span key={i} className="-mb-[0.22em] -mt-[0.16em] inline-block overflow-hidden pb-[0.22em] pt-[0.16em] align-bottom">
        <span
          className={cn('inline-block transition-transform duration-[900ms] ease-[cubic-bezier(.2,.75,.15,1)]', tone)}
          style={{ transform: shown ? 'translateY(0)' : 'translateY(140%)', transitionDelay: `${i * 45}ms` }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      </span>
    ))

  return (
    <div
      ref={ref}
      aria-hidden
      onPointerMove={onMove}
      onPointerEnter={() => setHot(true)}
      onPointerLeave={() => setHot(false)}
      className="relative select-none overflow-hidden border-t border-line"
    >
      <p className="whitespace-nowrap px-[1vw] pt-[2vw] text-center text-[15.2vw] font-bold leading-[0.78] tracking-[-0.055em]">
        {letters('text-ink/[0.07]')}
      </p>
      {/* Same word in cobalt, revealed only inside a circle around the pointer */}
      <p
        className={cn(
          'pointer-events-none absolute inset-0 whitespace-nowrap px-[1vw] pt-[2vw] text-center text-[15.2vw] font-bold leading-[0.78] tracking-[-0.055em] transition-opacity duration-500',
          hot ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          maskImage: 'radial-gradient(circle 16vw at var(--x, 50%) var(--y, 50%), #000 0%, rgba(0,0,0,.55) 45%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle 16vw at var(--x, 50%) var(--y, 50%), #000 0%, rgba(0,0,0,.55) 45%, transparent 75%)',
        }}
      >
        {letters('text-cobalt')}
      </p>
    </div>
  )
}
