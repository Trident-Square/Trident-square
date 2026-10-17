'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Arrow from './Arrow'
import BeforeAfter, { type Slot } from './BeforeAfter'

/**
 * Second section of the home page: "We automate your ___." The last word cycles through the six chores
 * on the before/after stage below, and the matching card lights up — the
 * headline and the picture tell the same story.
 */

const WORDS: { word: string; slot: Slot }[] = [
  { word: 'calls', slot: 'calls' },
  { word: 'WhatsApp', slot: 'whatsapp' },
  { word: 'orders', slot: 'orders' },
  { word: 'invoices', slot: 'invoice' },
  { word: 'follow-ups', slot: 'followup' },
  { word: 'reports', slot: 'report' },
]

export default function AutomateSection() {
  const [i, setI] = useState(0)
  const [motion, setMotion] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setMotion(false)
      return
    }
    const id = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="container py-24 sm:py-32">
      <p className="mb-10 flex items-center justify-between border-b border-ink pb-3 font-mono text-[11px] uppercase tracking-[0.14em]">
        <span><span className="text-cobalt">01 / </span>What changes</span>
        <span className="hidden text-muted sm:inline">Your Monday, before and after</span>
      </p>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <h2 className="display text-[clamp(3rem,7.4vw,7.25rem)] lg:col-span-7">
          <span className="block">We automate</span>
          <span className="block">your</span>
          {/* Rolling word */}
          <span className="relative block h-[0.9em] overflow-hidden">
            <span className="sr-only">calls, WhatsApp, orders, invoices, follow-ups and reports.</span>
            <span
              aria-hidden
              className="block text-cobalt transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)]"
              style={{ transform: `translateY(-${(motion ? i : 0) * 0.9}em)` }}
            >
              {WORDS.map((w) => (
                <span key={w.word} className="block h-[0.9em]">
                  {w.word}.
                </span>
              ))}
            </span>
          </span>
        </h2>

        <div className="lg:col-span-5 lg:pb-2">
          <p className="max-w-md text-[19px] leading-relaxed text-ink-2">
            Trident Square builds <strong className="font-semibold text-ink">automation systems, AI agents and custom software</strong> that
            take repetitive work off your team — so you can run the business instead of chasing it.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Book a free call <Arrow />
            </Link>
            <Link href="/services" className="btn-ghost">
              What we build
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-3 gap-4 border-t border-ink/15 pt-5">
            {[
              ['25+', 'products shipped'],
              ['HI · EN', 'AI that speaks both'],
              ['Fixed', 'price, before we start'],
            ].map(([v, l]) => (
              <li key={l}>
                <span className="display block text-[1.9rem] leading-none">{v}</span>
                <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{l}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 sm:mt-16">
        <BeforeAfter focus={motion ? WORDS[i].slot : undefined} />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
          <span>← Drag to see what changes</span>
          <span>Automation · AI agents · Voice · Chatbots · Custom software · Apps</span>
        </div>
      </div>
    </section>
  )
}
