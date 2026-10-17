'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Arrow from './Arrow'
import BeforeAfter from './BeforeAfter'
import { cn } from '@/lib/utils'

/**
 * The home hero is one pinned scene. The page holds still while you scroll;
 * the before/after wipe travels across the desk, the headline flips from
 * "without us" to "on autopilot", and the counters run. Dragging the handle
 * still works — the next scroll takes over again.
 *
 * Reduced-motion visitors get the same picture without pinning: a normal
 * section with a draggable slider.
 */

const HOURS_SAVED = 32
const TASKS = 6

export default function HeroScroll({
  heading: Heading = 'h1',
  label,
  ctas = true,
}: {
  heading?: 'h1' | 'h2'
  /** Small line above the headline, e.g. on the About page */
  label?: string
  ctas?: boolean
} = {}) {
  const track = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0) // 0 → 1 across the pinned scroll
  const [manual, setManual] = useState<number | null>(null)
  const [pinned, setPinned] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPinned(false)
      return
    }
    let raf = 0
    const read = () => {
      const el = track.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const travel = el.offsetHeight - window.innerHeight
      setProgress(travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 0)
      setManual(null)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Leave a beat of stillness at both ends of the scroll before/after the wipe.
  // `wipe` is how much of the desk has been automated (0 → 100). The "before"
  // layer sits left of the handle, so the handle starts at the right edge and
  // sweeps left, uncovering the "after" side.
  const fromScroll = Math.min(100, Math.max(0, ((progress - 0.08) / 0.8) * 100))
  const wipe = manual === null ? fromScroll : 100 - manual
  const pos = 100 - wipe
  const done = wipe > 55
  const busywork = Math.round(100 - wipe)
  const hours = Math.round((wipe / 100) * HOURS_SAVED)
  const tasks = Math.round((wipe / 100) * TASKS)

  return (
    <section ref={track} aria-label="Before and after Trident Square" className={cn('relative', pinned ? 'h-[260svh]' : '')}>
      <div className={cn('flex flex-col', pinned ? 'sticky top-0 h-[100svh] pb-5 pt-24 sm:pt-[6.5rem]' : 'pb-16 pt-28')}>
        <div className="container flex min-h-0 flex-1 flex-col">
          {/* ── Words ── */}
          <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-10">
            <Heading className="display text-[clamp(2.5rem,5.6vw,5.5rem)] lg:col-span-7">
              {label ? (
                <span className="mb-4 block font-mono text-[11px] font-normal normal-case tracking-[0.14em] text-muted">{label}</span>
              ) : null}
              <span className="block animate-[title-in_1s_cubic-bezier(.2,.75,.15,1)_both]">Your Monday,</span>
              <span className="relative block h-[0.9em] overflow-hidden animate-[title-in_1s_cubic-bezier(.2,.75,.15,1)_120ms_both]">
                <span className="sr-only">without automation, and on autopilot with Trident Square.</span>
                <span
                  aria-hidden
                  className="block transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)]"
                  style={{ transform: done ? 'translateY(-0.9em)' : 'none' }}
                >
                  <span className="block h-[0.9em] text-ink/30">without us.</span>
                  <span className="block h-[0.9em] text-cobalt">on autopilot.</span>
                </span>
              </span>
            </Heading>

            <div className="lg:col-span-5">
              <p className="hidden max-w-md text-[17px] leading-relaxed text-ink-2 sm:block">
                Trident Square builds <strong className="font-semibold text-ink">automation, AI agents and custom software</strong> that
                take the repetitive work off your team.
              </p>
              {ctas ? (
                <div className="mt-4 flex flex-wrap gap-2.5">
                  <Link href="/contact" className="btn-primary">
                    Book a free call <Arrow />
                  </Link>
                  <Link href="/services" className="btn-ghost">
                    What we build
                  </Link>
                </div>
              ) : null}
            </div>
          </div>

          {/* ── Stage ── */}
          <div className={cn('relative mt-5 sm:mt-7', pinned ? 'min-h-0 flex-1' : 'aspect-[4/5] sm:aspect-[16/9]')}>
            {pinned ? (
              <BeforeAfter layout="fill" pos={pos} onUserMove={setManual} />
            ) : (
              <BeforeAfter layout="fill" />
            )}

            {/* Scroll cue, fades out as soon as the wipe starts */}
            {pinned ? (
              <span
                aria-hidden
                className={cn(
                  'pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 bg-ink px-3 py-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-paper transition-opacity duration-500',
                  wipe > 3 ? 'opacity-0' : 'opacity-100'
                )}
              >
                Scroll to automate
                <span className="animate-bounce">↓</span>
              </span>
            ) : null}
          </div>

          {/* ── Meters ── */}
          <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-ink pt-3 pr-14 sm:gap-6 sm:pr-20">
            <Meter label="Busywork" value={`${busywork}%`} bar={busywork} tone="ink" />
            <Meter label="Hours saved / week" value={`${hours}`} bar={(hours / HOURS_SAVED) * 100} tone="cobalt" />
            <Meter label="Tasks on autopilot" value={`${tasks}/${TASKS}`} bar={(tasks / TASKS) * 100} tone="signal" />
          </dl>
        </div>
      </div>
    </section>
  )
}

function Meter({ label, value, bar, tone }: { label: string; value: string; bar: number; tone: 'ink' | 'cobalt' | 'signal' }) {
  return (
    <div>
      <dt className="flex flex-col gap-1 font-mono text-[9px] uppercase leading-tight tracking-[0.1em] text-muted sm:flex-row sm:items-baseline sm:justify-between sm:gap-2 sm:text-[10.5px] sm:tracking-[0.12em]">
        {label}
        <span className={cn('display text-[1.35rem] tabular-nums sm:text-[1.9rem]', tone === 'ink' ? 'text-ink' : tone === 'cobalt' ? 'text-cobalt' : 'text-signal')}>
          {value}
        </span>
      </dt>
      <dd className="mt-1.5 h-[3px] bg-ink/10">
        <span
          className={cn('block h-full transition-[width] duration-150', tone === 'ink' ? 'bg-ink' : tone === 'cobalt' ? 'bg-cobalt' : 'bg-signal')}
          style={{ width: `${bar}%` }}
        />
      </dd>
    </div>
  )
}
