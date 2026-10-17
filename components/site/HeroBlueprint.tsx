'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Arrow from './Arrow'
import { Viz } from './ServiceCards'
import { getService } from '@/lib/services'
import { whatsappHref } from '@/lib/site'
import { cn } from '@/lib/utils'

/**
 * Home hero: "You bring the problem. We build the system."
 * Left, a problem field with example chips (auto-typed until the visitor
 * takes over). Right, a cobalt engineering blueprint that redraws itself into
 * the system we'd build for that problem. Anything the visitor types is
 * matched to a service by keyword and can be sent to us on WhatsApp.
 */

const PROBLEMS: { chip: string; text: string; slug: string }[] = [
  { chip: 'Missed calls', text: 'We miss customer calls after 7 PM and on Sundays.', slug: 'voice-ai-agents' },
  { chip: 'Slow WhatsApp replies', text: 'WhatsApp enquiries wait hours for a reply.', slug: 'ai-chatbot-development' },
  { chip: 'Manual invoicing', text: 'Orders, invoices and Tally entries are all done by hand.', slug: 'business-process-automation' },
  { chip: 'Excel chaos', text: 'Our whole business runs on ten Excel sheets.', slug: 'custom-software-development' },
  { chip: 'Cold leads', text: 'Leads go cold before anyone follows up.', slug: 'ai-agent-development' },
  { chip: 'No app', text: 'Our customers keep asking for a mobile app.', slug: 'mobile-app-development' },
]

// Keyword → service, checked in order. Good enough to feel like it understood you.
const MATCHERS: [RegExp, string][] = [
  [/call|phone|ring|receptionist|voice/i, 'voice-ai-agents'],
  [/whats ?app|chat|reply|enquir|support|question/i, 'ai-chatbot-development'],
  [/invoice|tally|bill|order|stock|inventory|report|manual|copy|data entry|gst/i, 'business-process-automation'],
  [/lead|follow|sales|crm|quote|email/i, 'ai-agent-development'],
  [/excel|sheet|erp|software|portal|dashboard|system|process/i, 'custom-software-development'],
  [/app|android|ios|mobile/i, 'mobile-app-development'],
  [/shop|store|ecommerce|e-commerce|cart|sell online|shopify/i, 'ecommerce-development'],
  [/website|site|seo|google|landing/i, 'web-development'],
  [/design|ui|ux|figma/i, 'ui-ux-design'],
  [/server|cloud|aws|slow|down|hosting|devops/i, 'cloud-devops'],
]

function matchService(text: string) {
  return MATCHERS.find(([re]) => re.test(text))?.[1] ?? 'custom-software-development'
}

const CYCLE_MS = 6500
const TYPE_MS = 26

export default function HeroBlueprint() {
  const [active, setActive] = useState(0)
  const [text, setText] = useState('')
  const [auto, setAuto] = useState(true)
  const [reduced, setReduced] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches), [])

  // Auto mode: type the current example, hold, move to the next.
  useEffect(() => {
    if (!auto) return
    const target = PROBLEMS[active].text
    if (reduced) {
      setText(target)
      return
    }
    let n = 0
    setText('')
    const typer = setInterval(() => {
      n++
      setText(target.slice(0, n))
      if (n >= target.length) clearInterval(typer)
    }, TYPE_MS)
    const next = setTimeout(() => setActive((a) => (a + 1) % PROBLEMS.length), CYCLE_MS)
    return () => {
      clearInterval(typer)
      clearTimeout(next)
    }
  }, [active, auto, reduced])

  const slug = auto ? PROBLEMS[active].slug : matchService(text)
  const service = getService(slug)!
  const shownProblem = text.trim() || PROBLEMS[active].text

  const pick = (i: number) => {
    setAuto(false)
    setActive(i)
    setText(PROBLEMS[i].text)
  }

  return (
    <section className="container pt-28 sm:pt-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12">
        {/* ── Left ── */}
        <div className="lg:col-span-5">
          <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-signal" />
            Trident Square — automation, AI &amp; software studio
          </p>

          <h1 className="display mt-6 whitespace-nowrap text-[clamp(2.6rem,4.7vw,5rem)]">
            <span className="block animate-[title-in_1s_cubic-bezier(.2,.75,.15,1)_both]">You bring</span>
            <span className="block animate-[title-in_1s_cubic-bezier(.2,.75,.15,1)_80ms_both]">the problem.</span>
            <span className="block text-cobalt animate-[title-in_1s_cubic-bezier(.2,.75,.15,1)_160ms_both]">We build</span>
            <span className="block text-cobalt animate-[title-in_1s_cubic-bezier(.2,.75,.15,1)_240ms_both]">the system.</span>
          </h1>

          {/* Problem field */}
          <form
            className="mt-9"
            onSubmit={(e) => {
              e.preventDefault()
              window.open(whatsappHref(`Hi Trident Square — our problem: ${shownProblem}`), '_blank', 'noopener')
            }}
          >
            <label htmlFor="problem" className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
              What’s slowing your team down?
            </label>
            <div className="mt-2 flex border border-ink bg-white focus-within:ring-4 focus-within:ring-cobalt/15">
              <input
                ref={inputRef}
                id="problem"
                value={text}
                onChange={(e) => {
                  setAuto(false)
                  setText(e.target.value)
                }}
                onFocus={() => {
                  if (auto) {
                    setAuto(false)
                    setText('')
                  }
                }}
                placeholder="Type your problem…"
                className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-[16px] outline-none placeholder:text-muted/60"
              />
              <button type="submit" className="flex shrink-0 items-center gap-2 bg-ink px-4 font-mono text-[11.5px] uppercase tracking-[0.08em] text-paper transition-colors hover:bg-cobalt">
                <span className="hidden sm:inline">Send</span> <Arrow className="h-4 w-4" />
              </button>
            </div>
          </form>

          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Example problems">
            {PROBLEMS.map((p, i) => (
              <li key={p.chip}>
                <button
                  type="button"
                  onClick={() => pick(i)}
                  className={cn(
                    'relative overflow-hidden border px-3 py-1.5 text-[13px] transition-colors',
                    (auto || text === p.text) && active === i ? 'border-ink bg-ink text-paper' : 'border-ink/15 hover:border-ink'
                  )}
                >
                  {p.chip}
                  {auto && !reduced && active === i ? (
                    <span key={`bar-${active}`} aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-cobalt" style={{ animation: `progress ${CYCLE_MS}ms linear both` }} />
                  ) : null}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/contact" className="btn-primary">
              Book a free call <Arrow />
            </Link>
            <p className="font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.12em] text-muted">
              25+ products shipped
              <br />
              Fixed price · Hindi &amp; English
            </p>
          </div>
        </div>

        {/* ── Right: the blueprint ── */}
        <div className="lg:col-span-7">
          <TiltStack>
            <Blueprint key={slug} slug={slug} problem={shownProblem} sheet={PROBLEMS.findIndex((p) => p.slug === slug) + 1} service={service} />
          </TiltStack>
        </div>
      </div>
    </section>
  )
}

function Blueprint({
  slug,
  problem,
  sheet,
  service,
}: {
  slug: string
  problem: string
  sheet: number
  service: NonNullable<ReturnType<typeof getService>>
}) {
  const steps = useMemo(() => service.deliverables.slice(0, 3), [service])
  const rise = (ms: number) => ({ style: { animationDelay: `${ms}ms` } })

  return (
    <figure className="relative animate-[sheet-in_.65s_cubic-bezier(.2,.75,.15,1)_both] bg-cobalt text-white shadow-[0_40px_80px_-40px_rgb(var(--cobalt)/0.7)]">
      {/* Fine sheet border, inset like a drawing frame */}
      <div className="pointer-events-none absolute inset-2.5 border border-white/35" aria-hidden />

      <div className="relative grid gap-0 p-6 sm:p-9">
        {/* Header strip */}
        <div className="flex items-center justify-between border-b border-white/30 pb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
          <span>System spec</span>
          <span>Sheet {String(Math.max(sheet, 1)).padStart(2, '0')} · Rev A</span>
        </div>

        {/* Problem, in the client's handwriting */}
        <div className="rise-in mt-5" {...rise(0)}>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">01 — Your problem</p>
          <p className="mt-1.5 min-h-[2.6em] font-hand text-[clamp(1.25rem,2vw,1.6rem)] leading-tight text-white">“<Marked text={problem} />”</p>
        </div>

        {/* Drawn arrow */}
        <svg viewBox="0 0 400 40" className="my-2 h-8 w-full" aria-hidden>
          <path d="M20 8 C 120 8, 140 32, 260 30 L 380 30" fill="none" stroke="white" strokeOpacity="0.8" strokeWidth="1.5" strokeDasharray="420" className="animate-[draw_1s_cubic-bezier(.7,0,.2,1)_.2s_both]" />
          <path d="M370 24 L380 30 L370 36" fill="none" stroke="white" strokeWidth="1.5" className="animate-[fade_.3s_ease_1.1s_both]" />
        </svg>

        {/* Solution */}
        <div className="grid gap-6 sm:grid-cols-[1.1fr_1fr] sm:items-start">
          <div className="rise-in" {...rise(250)}>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">02 — We build</p>
            <p className="display mt-2 text-[clamp(2.2rem,3.6vw,3.4rem)]">{service.name}</p>
            <p className="mt-2 text-[15px] leading-snug text-white/80">{service.hook}</p>
          </div>
          <div className="rise-in relative h-40 overflow-hidden border border-white/40 bg-paper text-ink sm:h-44" {...rise(350)}>
            <Viz slug={slug} />
          </div>
        </div>

        {/* Spec list */}
        <ol className="mt-6 border-t border-white/30">
          {steps.map((d, i) => (
            <li key={d} className="rise-in grid grid-cols-[2.5rem_1fr] border-b border-white/20 py-2.5 text-[14.5px] leading-snug" {...rise(450 + i * 90)}>
              <span className="font-mono text-[11px] text-white/55">0{i + 3}</span>
              {d}
            </li>
          ))}
        </ol>

        {/* Dimension line: live in … */}
        <div className="rise-in mt-5" {...rise(700)}>
          <div className="relative h-3" aria-hidden>
            <span className="absolute inset-y-0 left-0 w-px bg-white" />
            <span className="absolute left-0 top-1/2 h-px w-full origin-left bg-white/70 animate-[strike_.8s_cubic-bezier(.7,0,.2,1)_.75s_both]" />
            <span className="absolute inset-y-0 right-0 w-px bg-white" />
          </div>
          <p className="mt-2 flex items-baseline justify-between gap-4 font-mono text-[10.5px] uppercase tracking-[0.12em]">
            <span className="text-white/60">Live in</span>
            <span className="text-white">{service.timeline}</span>
          </p>
        </div>

        {/* Title block */}
        <div className="mt-6 grid grid-cols-3 border border-white/35 font-mono text-[9.5px] uppercase tracking-[0.12em] text-white/60">
          <span className="border-r border-white/35 p-2.5">Drawn by<br /><b className="font-medium text-white">Trident Square</b></span>
          <span className="border-r border-white/35 p-2.5">Checked by<br /><b className="font-medium text-white">You</b></span>
          <span className="relative p-2.5">
            Status
            <br />
            <b className="font-medium text-white">Ready to build</b>
            <span className="absolute -right-2 -top-3 rotate-[-8deg] border-2 border-white bg-cobalt px-1.5 py-0.5 text-[10px] font-bold text-white animate-[stamp_.4s_cubic-bezier(.2,.75,.15,1)_1.05s_both]">
              Approved
            </span>
          </span>
        </div>
      </div>
    </figure>
  )
}

/** Underlines, in a hand-drawn wave, the words that told us which system to draw. */
function Marked({ text }: { text: string }) {
  // Whole words only, matched from the start of the word ("build" must not light up for "ui").
  const starts = new RegExp(`^(?:${MATCHERS.map(([r]) => r.source).join('|')})`, 'i')
  return (
    <>
      {text.split(/(\s+)/).map((w, i) =>
        /\S/.test(w) && starts.test(w.replace(/^[^\p{L}\p{N}]+/u, '')) ? (
          <span key={i} className="underline decoration-white/80 decoration-wavy decoration-[1.5px] underline-offset-[5px]">
            {w}
          </span>
        ) : (
          w
        )
      )}
    </>
  )
}

/**
 * The blueprint sits on a little pad of older sheets and leans toward the
 * pointer, like a drawing held up in your hand.
 */
function TiltStack({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const move = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`
  }
  const leave = () => {
    if (ref.current) ref.current.style.transform = ''
  }
  return (
    <div className="[perspective:1400px]" onPointerMove={move} onPointerLeave={leave}>
      <div ref={ref} className="relative transition-transform duration-300 ease-out [transform-style:preserve-3d]">
        {/* older sheets underneath */}
        <div aria-hidden className="absolute inset-0 translate-x-[5px] translate-y-[12px] rotate-[1.2deg] sm:translate-x-[14px] sm:translate-y-[16px] sm:rotate-[2.2deg] border border-cobalt/30 bg-[#c9d3f5]" />
        <div aria-hidden className="absolute inset-0 translate-x-[2px] translate-y-[6px] rotate-[0.6deg] sm:translate-x-[7px] sm:translate-y-[8px] sm:rotate-[1deg] border border-cobalt/40 bg-[#7d93e8]" />
        <div className="relative">{children}</div>
      </div>
    </div>
  )
}
