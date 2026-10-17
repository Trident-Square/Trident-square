'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  BarChart3,
  Calculator,
  FileText,
  Globe,
  MessageCircle,
  Monitor,
  Phone,
  ShoppingCart,
  Smartphone,
  Users,
  type LucideIcon,
} from 'lucide-react'
import Arrow from './Arrow'
import { cn } from '@/lib/utils'

/**
 * v4 hero. One idea, shown rather than told: your business inputs on the left,
 * the software we build in the middle, your systems on the right. The headline
 * verb and the lit-up routes cycle together through Talks → Thinks → Ships.
 */

type Mode = 0 | 1 | 2

const MODES: { verb: string; hub: string; line: string; left: number[]; right: number[] }[] = [
  { verb: 'talks', hub: 'Voice & chat agents', line: 'AI agents that answer every call and chat — in Hindi and English, 24/7.', left: [0, 1, 2], right: [0, 2] },
  { verb: 'thinks', hub: 'Automation engine', line: 'Automations that move orders, invoices and leads without anyone touching them.', left: [1, 3, 4], right: [0, 1, 2] },
  { verb: 'ships', hub: 'Custom software', line: 'Web, mobile and custom software your whole business runs on.', left: [2, 4], right: [2, 3, 4] },
]

const INPUTS: { label: string; short: string; Icon: LucideIcon }[] = [
  { label: 'Phone calls', short: 'Calls', Icon: Phone },
  { label: 'WhatsApp', short: 'Chat', Icon: MessageCircle },
  { label: 'Website', short: 'Web', Icon: Globe },
  { label: 'Emails & PDFs', short: 'Docs', Icon: FileText },
  { label: 'Orders', short: 'Orders', Icon: ShoppingCart },
]

const OUTPUTS: { label: string; short: string; Icon: LucideIcon }[] = [
  { label: 'CRM', short: 'CRM', Icon: Users },
  { label: 'Tally / ERP', short: 'ERP', Icon: Calculator },
  { label: 'Reports', short: 'Reports', Icon: BarChart3 },
  { label: 'Mobile app', short: 'App', Icon: Smartphone },
  { label: 'Web app', short: 'Portal', Icon: Monitor },
]

// Map geometry in a 1000 × 560 box. Node rows are evenly spaced.
const ROWS = [56, 168, 280, 392, 504]
const HUB = { x: 500, y: 280 }
const leftPath = (y: number) => `M 210 ${y} C 330 ${y}, 330 ${HUB.y}, 420 ${HUB.y}`
const rightPath = (y: number) => `M 580 ${HUB.y} C 670 ${HUB.y}, 670 ${y}, 790 ${y}`

const CYCLE_MS = 4200

export default function HeroSystem() {
  const [mode, setMode] = useState<Mode>(0)
  const [paused, setPaused] = useState(false)
  const [motion, setMotion] = useState(true)

  useEffect(() => {
    setMotion(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (paused || !motion) return
    const id = setInterval(() => setMode((m) => ((m + 1) % 3) as Mode), CYCLE_MS)
    return () => clearInterval(id)
  }, [paused, motion])

  const m = MODES[mode]

  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {/* Glow that follows the active mode */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-[18%] top-[38%] h-[520px] w-[520px] -translate-y-1/2 translate-x-1/2 animate-glow rounded-full bg-cobalt/35 blur-[120px]" />
        <div className="absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-signal/10 blur-[120px]" />
      </div>

      <div className="container relative grid min-h-[min(100svh,960px)] items-center gap-10 pb-14 pt-28 lg:grid-cols-12 lg:gap-8 lg:pt-24">
        {/* Copy */}
        <div className="lg:col-span-5" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/55">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-signal" />
            Automation · AI · Software — Noida, India
          </p>

          <h1 className="display mt-7 text-[clamp(3.4rem,8.2vw,8.25rem)]">
            <span className="block">Software</span>
            <span className="block">that</span>
            {/* Slot-machine verb */}
            <span className="relative block h-[0.9em] overflow-hidden" aria-live="polite">
              <span
                className="block transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)]"
                style={{ transform: `translateY(-${mode * 0.9}em)` }}
              >
                {MODES.map((x, i) => (
                  <span key={x.verb} className="block h-[0.9em] text-cobalt-ink" aria-hidden={i !== mode}>
                    {x.verb}.
                  </span>
                ))}
              </span>
            </span>
          </h1>

          <p key={mode} className="mt-7 min-h-[3.5em] max-w-md animate-rise text-[18px] leading-relaxed text-paper/75">
            {m.line}
          </p>

          <div role="tablist" aria-label="What we build" className="mt-6 flex gap-1.5">
            {MODES.map((x, i) => (
              <button
                key={x.verb}
                role="tab"
                type="button"
                aria-selected={i === mode}
                onClick={() => setMode(i as Mode)}
                className={cn(
                  'relative overflow-hidden px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors',
                  i === mode ? 'bg-paper text-ink' : 'bg-paper/[0.06] text-paper/60 hover:text-paper'
                )}
              >
                <span className={i === mode ? 'text-cobalt' : 'text-cobalt-ink'}>0{i + 1}</span> {x.verb}
                {i === mode && motion && !paused ? (
                  <span key={`bar-${mode}`} className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-cobalt" style={{ animation: `progress ${CYCLE_MS}ms linear` }} />
                ) : null}
              </button>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className="btn bg-cobalt text-white hover:bg-paper hover:text-ink">
              Book a free call <Arrow />
            </Link>
            <Link href="/work" className="btn border border-paper/25 text-paper hover:bg-paper hover:text-ink">
              See the work
            </Link>
          </div>
        </div>

        {/* System map */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[1000/560] w-full">
            <svg viewBox="0 0 1000 560" className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <linearGradient id="route" x1="0" x2="1">
                  <stop offset="0" stopColor="rgb(140 164 255)" stopOpacity="0.15" />
                  <stop offset="0.5" stopColor="rgb(140 164 255)" stopOpacity="0.95" />
                  <stop offset="1" stopColor="rgb(140 164 255)" stopOpacity="0.15" />
                </linearGradient>
              </defs>
              {ROWS.map((y, i) => {
                const on = m.left.includes(i)
                return (
                  <g key={`l${i}`}>
                    <path id={`lp${i}`} d={leftPath(y)} fill="none" stroke={on ? 'url(#route)' : 'rgb(246 244 239 / 0.09)'} strokeWidth={on ? 2 : 1.25} className="transition-all duration-500" />
                    {on && motion ? <Packets pathId={`lp${i}`} seed={i} /> : null}
                  </g>
                )
              })}
              {ROWS.map((y, i) => {
                const on = m.right.includes(i)
                return (
                  <g key={`r${i}`}>
                    <path id={`rp${i}`} d={rightPath(y)} fill="none" stroke={on ? 'url(#route)' : 'rgb(246 244 239 / 0.09)'} strokeWidth={on ? 2 : 1.25} className="transition-all duration-500" />
                    {on && motion ? <Packets pathId={`rp${i}`} seed={i + 3} delay={0.6} /> : null}
                  </g>
                )
              })}
            </svg>

            {/* Nodes, positioned in the same 1000 × 560 space */}
            {INPUTS.map((n, i) => (
              <Node key={n.label} {...n} on={m.left.includes(i)} style={{ left: 0, top: `${(ROWS[i] / 560) * 100}%` }} />
            ))}
            {OUTPUTS.map((n, i) => (
              <Node key={n.label} {...n} on={m.right.includes(i)} align="right" style={{ right: 0, top: `${(ROWS[i] / 560) * 100}%` }} />
            ))}

            {/* Hub */}
            <div className="absolute left-1/2 top-1/2 w-[16%] -translate-x-1/2 -translate-y-1/2">
              <div className="relative aspect-square">
                <span className="absolute inset-[-18%] animate-glow rounded-full bg-cobalt/40 blur-2xl" aria-hidden />
                <div className="relative grid h-full w-full place-items-center border border-paper/25 bg-ink shadow-[inset_0_0_40px_-10px_rgb(var(--cobalt))]">
                  <Image src="/trident-remove-bg.png" alt="" width={60} height={65} className="h-[46%] w-auto" />
                </div>
              </div>
              <p key={mode} className="mt-3 animate-rise whitespace-nowrap text-center font-mono text-[clamp(8px,1vw,11px)] uppercase tracking-[0.12em] text-cobalt-ink">
                {m.hub}
              </p>
            </div>

            <p className="absolute -bottom-8 sm:-bottom-1 left-0 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/35">Your business</p>
            <p className="absolute -bottom-8 sm:-bottom-1 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/35">We build this</p>
            <p className="absolute -bottom-8 sm:-bottom-1 right-0 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/35">Your systems</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Node({
  label,
  short,
  Icon,
  on,
  align = 'left',
  style,
}: {
  label: string
  short: string
  Icon: LucideIcon
  on: boolean
  align?: 'left' | 'right'
  style: React.CSSProperties
}) {
  return (
    <div
      style={style}
      className={cn(
        'absolute flex w-[21%] -translate-y-1/2 items-center gap-2 border px-2 py-2 transition-all duration-500 sm:gap-2.5 sm:px-3 sm:py-2.5',
        align === 'right' && 'flex-row-reverse text-right',
        on ? 'border-cobalt-ink/70 bg-cobalt/20 text-paper shadow-[0_0_30px_-6px_rgb(var(--cobalt))]' : 'border-paper/10 bg-paper/[0.03] text-paper/40'
      )}
    >
      <Icon className={cn('h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4', on ? 'text-cobalt-ink' : 'text-paper/35')} strokeWidth={1.75} aria-hidden />
      <span className="truncate text-[clamp(9.5px,1.1vw,13.5px)] font-medium">
        <span className="sm:hidden">{short}</span>
        <span className="hidden sm:inline">{label}</span>
      </span>
    </div>
  )
}

/** Small glowing dots that travel along a route. */
function Packets({ pathId, seed, delay = 0 }: { pathId: string; seed: number; delay?: number }) {
  const dur = 1.9 + (seed % 3) * 0.25
  return (
    <>
      {[0, 0.5].map((offset) => (
        <circle key={offset} r="3.5" fill="rgb(246 244 239)" opacity="0">
          <animateMotion dur={`${dur}s`} repeatCount="indefinite" begin={`${delay + offset * dur}s`}>
            <mpath href={`#${pathId}`} />
          </animateMotion>
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur={`${dur}s`} repeatCount="indefinite" begin={`${delay + offset * dur}s`} />
        </circle>
      ))}
    </>
  )
}
