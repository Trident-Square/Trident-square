'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * The hero's story in one picture. Left of the handle: a business owner's desk
 * on a normal day. Right: the same six things once our systems run them.
 * Drag the handle (or use arrow keys); until someone touches it, it sways
 * gently to show it can move.
 */

export const SLOTS = ['whatsapp', 'calls', 'orders', 'invoice', 'followup', 'report'] as const
export type Slot = (typeof SLOTS)[number]

export default function BeforeAfter({
  focus,
  layout = 'wide',
  pos: controlled,
  onUserMove,
}: {
  focus?: Slot
  layout?: 'wide' | 'tall' | 'fill'
  /** When set, the parent drives the handle (e.g. from scroll); drags are reported via onUserMove. */
  pos?: number
  onUserMove?: (pos: number) => void
}) {
  const stage = useRef<HTMLDivElement>(null)
  const [own, setOwn] = useState(56) // % from the left
  const isControlled = controlled !== undefined
  const pos = isControlled ? controlled : own
  const setPos = useCallback(
    (v: number | ((p: number) => number)) => {
      const next = typeof v === 'function' ? v(pos) : v
      if (isControlled) onUserMove?.(next)
      else setOwn(next)
    },
    [isControlled, onUserMove, pos]
  )
  const [touched, setTouched] = useState(false)
  const dragging = useRef(false)

  // Idle sway until the visitor interacts
  useEffect(() => {
    if (touched || isControlled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      setOwn(52 + Math.sin((t - start) / 1400) * 22)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [touched, isControlled])

  const moveTo = useCallback((clientX: number) => {
    const r = stage.current?.getBoundingClientRect()
    if (!r) return
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }, [setPos])

  useEffect(() => {
    const up = () => (dragging.current = false)
    const move = (e: PointerEvent) => dragging.current && moveTo(e.clientX)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointermove', move)
    return () => {
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointermove', move)
    }
  }, [moveTo])

  return (
    <div
      ref={stage}
      onPointerDown={(e) => {
        setTouched(true)
        dragging.current = true
        moveTo(e.clientX)
      }}
      className={cn('relative w-full cursor-ew-resize touch-pan-y select-none overflow-hidden border border-ink', layout === 'fill' ? 'h-full' : layout === 'tall' ? 'aspect-[4/5] sm:aspect-square' : 'aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/8]')}
    >
      {/* AFTER — the calm version (underneath) */}
      <div className="absolute inset-0 bg-paper">
        <Grid tall={layout === 'tall'}>{SLOTS.map((s) => <After key={s} slot={s} on={focus === s} />)}</Grid>
        <Tag side="right">
          After<span className="hidden sm:inline"> · with Trident Square</span>
        </Tag>
      </div>

      {/* BEFORE — the desk (clipped to the left of the handle) */}
      <div className="absolute inset-0 bg-[#E7DFCF]" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {/* paper grain lives on its own layer: .grain sets position: relative */}
        <div aria-hidden className="grain absolute inset-0 opacity-70" />
        <Grid tall={layout === 'tall'}>
          {SLOTS.map((s) => (
            <div key={s} className={cn('flex transition-transform duration-500 ease-[cubic-bezier(.2,.75,.15,1)]', focus === s ? 'z-[1] scale-[1.06]' : 'scale-100')}>
              <Before slot={s} />
            </div>
          ))}
        </Grid>
        <Tag side="left">
          Before<span className="hidden sm:inline"> · a normal Monday</span>
        </Tag>
      </div>

      {/* Handle */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -translate-x-1/2 border-l-2 border-ink" />
        <button
          type="button"
          role="slider"
          aria-label="Compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
              setTouched(true)
              setPos((p) => Math.min(97, Math.max(3, p + (e.key === 'ArrowLeft' ? -5 : 5))))
            }
          }}
          className="pointer-events-auto absolute top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-grab place-items-center bg-ink text-paper shadow-[0_10px_30px_-8px_rgba(17,17,16,0.6)] active:cursor-grabbing"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </button>
        {!touched && !isControlled ? (
          <span className="absolute top-[calc(50%+2.5rem)] -translate-x-1/2 whitespace-nowrap bg-cobalt px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white">
            Drag me
          </span>
        ) : null}
      </div>
    </div>
  )
}

function Grid({ children, tall }: { children: React.ReactNode; tall?: boolean }) {
  return (
    <div className={cn('relative grid h-full grid-cols-2 grid-rows-3 gap-3 p-4 pt-12', tall ? 'sm:gap-4 sm:p-6 sm:pt-14' : 'sm:grid-cols-3 sm:grid-rows-2 sm:gap-5 sm:p-8 sm:pt-14')}>
      {children}
    </div>
  )
}

function Tag({ side, children }: { side: 'left' | 'right'; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        'absolute top-3 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] sm:top-4',
        side === 'left' ? 'left-3 bg-ink text-paper sm:left-4' : 'right-3 bg-cobalt text-white sm:right-4'
      )}
    >
      {children}
    </span>
  )
}

/* ───────── BEFORE: paper, phones, handwriting, a bit of chaos ───────── */

function Before({ slot }: { slot: Slot }) {
  switch (slot) {
    case 'whatsapp':
      return (
        <div className="flex rotate-[-2.5deg] flex-col gap-1.5 self-start">
          {['Bhai price kya hai?', 'Order kab aayega??', 'Hello? Reply karo'].map((m, i) => (
            <p key={m} className="w-fit max-w-full bg-white px-3 py-2 text-[12px] leading-tight shadow-[0_6px_14px_-6px_rgba(0,0,0,0.35)] sm:text-[13px]" style={{ marginLeft: `${i * 10}px` }}>
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#25D366]" />
              {m}
            </p>
          ))}
          <p className="mt-1 font-hand text-[18px] font-bold leading-none text-[#c2410c] sm:text-[22px]">47 unread!!</p>
        </div>
      )
    case 'calls':
      return (
        <div className="rotate-[3deg] self-center bg-ink p-3 text-paper shadow-[0_10px_20px_-8px_rgba(0,0,0,0.5)] sm:p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-paper/50">Missed calls</p>
          {[
            ['+91 98•• 21', '9:12'],
            ['+91 70•• 64', '9:40'],
            ['Unknown', '10:05'],
          ].map(([n, t]) => (
            <p key={n} className="mt-1.5 flex items-center justify-between gap-4 text-[12px] sm:text-[13px]">
              <span className="text-[#f87171]">↙ {n}</span>
              <span className="text-paper/40">{t}</span>
            </p>
          ))}
          <p className="mt-2 font-hand text-[17px] text-[#fbbf24]">+3 more…</p>
        </div>
      )
    case 'orders':
      return (
        <div className="rotate-[-1.5deg] self-start bg-white shadow-[0_8px_18px_-8px_rgba(0,0,0,0.35)]">
          <p className="border-b border-ink/10 bg-[#1d6f42] px-2.5 py-1.5 font-mono text-[10px] text-white">orders_FINAL_v3 (2).xlsx</p>
          <table className="w-full text-[11px] sm:text-[12px]">
            <tbody>
              {[
                ['#4821', 'Pune', '??'],
                ['#4822', 'Surat', '#REF!'],
                ['#4823', 'Indore', 'pending'],
              ].map((r) => (
                <tr key={r[0]} className="border-b border-ink/5">
                  {r.map((c, i) => (
                    <td key={i} className={cn('px-2 py-1', i === 2 && 'bg-[#fee2e2] text-[#b91c1c]')}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'invoice':
      return (
        <div className="relative rotate-[4deg] self-end bg-[#fbfaf6] p-3 shadow-[0_8px_18px_-8px_rgba(0,0,0,0.35)] sm:p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Tax invoice</p>
          <p className="condensed mt-1 text-[22px] font-bold sm:text-[26px]">INV #221</p>
          <p className="text-[12px] text-muted">₹ 14,250 · Sharma Traders</p>
          <span className="absolute -right-2 top-3 rotate-[12deg] border-2 border-[#b91c1c] px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase text-[#b91c1c]">
            Not sent
          </span>
        </div>
      )
    case 'followup':
      return (
        <div className="rotate-[-4deg] self-center bg-[#fde68a] p-4 shadow-[0_10px_20px_-8px_rgba(0,0,0,0.35)]">
          <p className="font-hand text-[20px] font-bold leading-tight text-ink sm:text-[24px]">
            Mehta ji ko follow up karna hai!!
          </p>
          <p className="mt-1 font-hand text-[16px] text-ink/70">(Thursday? Friday?)</p>
        </div>
      )
    case 'report':
      return (
        <div className="rotate-[2deg] self-start bg-white p-3 shadow-[0_8px_18px_-8px_rgba(0,0,0,0.35)] [background-image:repeating-linear-gradient(transparent_0_21px,rgba(30,75,216,0.18)_21px_22px)] sm:p-4">
          <p className="font-hand text-[18px] leading-[22px] text-ink sm:text-[20px]">Sales today = ??</p>
          <p className="font-hand text-[18px] leading-[22px] text-ink/70 line-through sm:text-[20px]">ask Ravi</p>
          <p className="font-hand text-[18px] leading-[22px] text-[#c2410c] sm:text-[20px]">ask Ravi AGAIN</p>
        </div>
      )
  }
}

/* ───────── AFTER: the same six things, handled ───────── */

function Done({ children, label, on }: { children: React.ReactNode; label: string; on?: boolean }) {
  return (
    <div className={cn('flex flex-col self-center border bg-white p-3 transition-[border-color,box-shadow,transform] duration-500 sm:p-4', on ? '-translate-y-1 border-cobalt shadow-[0_0_0_1px_rgb(var(--cobalt)),0_20px_40px_-20px_rgb(var(--cobalt)/0.6)]' : 'border-ink/10 shadow-[0_14px_34px_-18px_rgba(17,17,16,0.3)]')}>
      <p className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
        {label}
        <span className="grid h-5 w-5 place-items-center bg-signal text-white">
          <Check className="h-3 w-3" strokeWidth={3} />
        </span>
      </p>
      <div className="mt-2">{children}</div>
    </div>
  )
}

function After({ slot, on }: { slot: Slot; on?: boolean }) {
  switch (slot) {
    case 'whatsapp':
      return (
        <Done on={on} label="WhatsApp">
          <p className="condensed text-[26px] font-bold leading-none sm:text-[32px]">47 replied</p>
          <p className="mt-1 text-[12px] text-muted sm:text-[13px]">by your AI assistant · 3 handed to you</p>
        </Done>
      )
    case 'calls':
      return (
        <Done on={on} label="Calls">
          <div className="flex h-6 items-center gap-[2px]" aria-hidden>
            {Array.from({ length: 22 }).map((_, i) => (
              <span key={i} className="h-full w-[3px] animate-wave bg-cobalt" style={{ animationDelay: `${(i * 97) % 900}ms` }} />
            ))}
          </div>
          <p className="mt-1.5 text-[12px] text-muted sm:text-[13px]">Voice agent answered 6 calls · 2 bookings</p>
        </Done>
      )
    case 'orders':
      return (
        <Done on={on} label="Orders → Tally">
          <p className="condensed text-[26px] font-bold leading-none sm:text-[32px]">128 synced</p>
          <p className="mt-1 text-[12px] text-muted sm:text-[13px]">stock, invoice and ledger updated</p>
        </Done>
      )
    case 'invoice':
      return (
        <Done on={on} label="Invoices">
          <p className="condensed text-[26px] font-bold leading-none sm:text-[32px]">INV #221 sent</p>
          <p className="mt-1 text-[12px] text-muted sm:text-[13px]">on WhatsApp + email · reminder in 3 days</p>
        </Done>
      )
    case 'followup':
      return (
        <Done on={on} label="Calendar">
          <p className="text-[15px] font-semibold leading-snug sm:text-[17px]">Thu, 4:00 PM — Mehta Motors</p>
          <p className="mt-1 text-[12px] text-muted sm:text-[13px]">follow-up booked by AI · invite sent</p>
        </Done>
      )
    case 'report':
      return (
        <Done on={on} label="Daily report · 9:00 AM">
          <div className="flex h-9 items-end gap-1" aria-hidden>
            {[40, 65, 50, 80, 70, 95].map((h, i) => (
              <span key={i} className={cn('flex-1', i === 5 ? 'bg-cobalt' : 'bg-ink')} style={{ height: `${h}%` }} />
            ))}
          </div>
          <p className="mt-1.5 text-[12px] text-muted sm:text-[13px]">Sales ₹2.4L today · sent to your WhatsApp</p>
        </Done>
      )
  }
}
