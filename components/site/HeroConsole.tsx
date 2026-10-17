'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * "Fig. 01" in the hero: a scripted, looping simulation of the three things we
 * build — a voice agent on a call, an AI agent working a lead, and the software
 * dashboard underneath. It explains the company in ten seconds without a video.
 */

type Tab = 'talks' | 'thinks' | 'ships'

const TABS: { id: Tab; n: string; label: string; caption: string }[] = [
  { id: 'talks', n: '1', label: 'Talks', caption: 'Voice agent · outbound booking call' },
  { id: 'thinks', n: '2', label: 'Thinks', caption: 'AI agent · WhatsApp lead → booked meeting' },
  { id: 'ships', n: '3', label: 'Ships', caption: 'Custom software · operations dashboard' },
]

const CALL = [
  { who: 'agent', text: 'Namaste Rahul ji! Main Shree Travels se Riya bol rahi hoon. Kal subah 7 baje Jaipur ki bus — aap travel kar rahe hain?' },
  { who: 'caller', text: 'Haan ji. Boarding point kya hai?' },
  { who: 'agent', text: 'Sindhi Camp, gate 3. Seat 14B. Main details aapko WhatsApp kar deti hoon.' },
  { who: 'caller', text: 'Perfect, thank you.' },
] as const

const RUN = [
  ['read_message', 'intent: new project'],
  ['extract', 'Mehta Motors · 12 showrooms · ₹8L'],
  ['score_lead', '86 / 100 — qualified'],
  ['calendar.find_slot', 'Thu 16:00 IST'],
  ['meeting.book', 'invite sent ✓'],
  ['crm.create_deal', '#D-2041'],
] as const

const ROWS = [
  ['#4821', 'Lucknow', 'Dispatched', 'ok'],
  ['#4822', 'Pune', 'Packed', 'wait'],
  ['#4823', 'Indore', 'Dispatched', 'ok'],
  ['#4824', 'Surat', 'Flagged', 'bad'],
  ['#4825', 'Noida', 'Delivered', 'ok'],
] as const

const STEPS: Record<Tab, number> = { talks: CALL.length + 1, thinks: RUN.length + 2, ships: ROWS.length + 1 }
const STEP_MS = 1100

export default function HeroConsole() {
  const [tab, setTab] = useState<Tab>('talks')
  const [step, setStep] = useState(0)
  const [auto, setAuto] = useState(true)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced.current) setStep(99)
  }, [])

  useEffect(() => {
    if (reduced.current) return
    const id = setInterval(() => setStep((s) => s + 1), STEP_MS)
    return () => clearInterval(id)
  }, [tab])

  // After the scene finishes, hold it for a few beats, then replay or move to the next tab.
  useEffect(() => {
    if (reduced.current || step <= STEPS[tab] + 3) return
    if (auto) setTab(TABS[(TABS.findIndex((t) => t.id === tab) + 1) % TABS.length].id)
    setStep(0)
  }, [step, tab, auto])

  const choose = (t: Tab) => {
    setAuto(false)
    setTab(t)
    setStep(reduced.current ? 99 : 0)
  }

  const active = TABS.find((t) => t.id === tab)!

  return (
    <figure className="relative">
      <div className="crop relative border border-ink/15 bg-paper p-2">
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-ink/10 px-3 py-2.5">
          <div role="tablist" aria-label="What we build" className="flex gap-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                type="button"
                aria-selected={tab === t.id}
                onClick={() => choose(t.id)}
                className={cn(
                  'px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors',
                  tab === t.id ? 'bg-ink text-paper' : 'text-muted hover:text-ink'
                )}
              >
                <span className={tab === t.id ? 'text-cobalt-ink' : 'text-cobalt'}>{t.n}</span> {t.label}
              </button>
            ))}
          </div>
          <span className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-signal" /> live
          </span>
        </div>

        <div role="tabpanel" className="relative h-[400px] bg-paper-2/50 overflow-hidden sm:h-[420px]">
          {tab === 'talks' && <Call step={step} />}
          {tab === 'thinks' && <Agent step={step} />}
          {tab === 'ships' && <Dashboard step={step} />}
        </div>
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
        <span>
          Fig. 0{active.n} — {active.caption}
        </span>
        <span className="hidden sm:inline">Simulation</span>
      </figcaption>
    </figure>
  )
}

function Call({ step }: { step: number }) {
  const shown = CALL.slice(0, step)
  const done = step > CALL.length
  return (
    <div className="flex h-full flex-col p-4 sm:p-5">
      <div className="flex items-center justify-between bg-ink px-4 py-3 text-paper">
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-paper/50">Outbound · Hindi</p>
          <p className="mt-0.5 text-[15px] font-semibold">Rahul S. · +91 98•• ••••21</p>
        </div>
        <div className="flex h-8 items-center gap-[3px]" aria-hidden>
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className={cn('w-[3px] origin-center bg-cobalt-ink', done ? 'h-1' : 'h-full animate-wave')}
              style={{ animationDelay: `${(i * 73) % 600}ms` }}
            />
          ))}
        </div>
      </div>
      <ol className="mt-4 flex flex-1 flex-col gap-2.5 overflow-hidden">
        {shown.map((l, i) => (
          <li
            key={i}
            className={cn(
              'max-w-[85%] animate-rise px-3.5 py-2.5 text-[14px] leading-snug',
              l.who === 'agent' ? 'self-start border border-ink/10 bg-white' : 'self-end bg-cobalt text-white'
            )}
          >
            <span className="mb-0.5 block font-mono text-[9.5px] uppercase tracking-[0.12em] opacity-60">
              {l.who === 'agent' ? 'AI agent' : 'Caller'}
            </span>
            {l.text}
          </li>
        ))}
      </ol>
      <div className={cn('mt-3 grid grid-cols-3 border-t border-ink/10 pt-3 font-mono text-[11px] transition-opacity', done ? 'opacity-100' : 'opacity-0')}>
        <span className="text-signal">✓ Confirmed</span>
        <span className="text-center text-muted">WhatsApp sent</span>
        <span className="text-right text-muted">1.4s avg reply</span>
      </div>
    </div>
  )
}

function Agent({ step }: { step: number }) {
  const ran = Math.max(0, step - 1)
  const replied = step > RUN.length + 1
  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3 p-4 sm:p-5">
      <div className="max-w-[88%] border border-ink/10 bg-white px-3.5 py-2.5 text-[14px] leading-snug">
        <span className="mb-0.5 block font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted">WhatsApp · new lead</span>
        Hi, we need a CRM for our 12 showrooms. Budget around 8L. Can we talk this week?
      </div>
      <ol className="bg-ink p-4 font-mono text-[12px] leading-relaxed text-paper/80">
        {RUN.map(([fn, out], i) => (
          <li key={fn} className={cn('flex justify-between gap-4 transition-opacity duration-300', i < ran ? 'opacity-100' : 'opacity-0')}>
            <span>
              <span className="text-cobalt-ink">▸</span> {fn}()
            </span>
            <span className="truncate text-right text-paper/50">{out}</span>
          </li>
        ))}
        {!replied ? <li className="mt-1 h-3.5 w-2 animate-blink bg-paper/70" aria-hidden /> : null}
      </ol>
      <div className={cn('ml-auto max-w-[88%] bg-cobalt px-3.5 py-2.5 text-[14px] leading-snug text-white transition-all duration-500', replied ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0')}>
        <span className="mb-0.5 block font-mono text-[9.5px] uppercase tracking-[0.12em] opacity-60">AI agent · 4.2s</span>
        Thanks Mr. Mehta! I’ve booked a call with our engineer on Thursday, 4 PM. Invite is in your inbox.
      </div>
    </div>
  )
}

function Dashboard({ step }: { step: number }) {
  const bars = [38, 52, 44, 61, 58, 73, 69, 84, 77, 92]
  const grown = Math.min(bars.length, step * 2)
  return (
    <div className="flex h-full flex-col gap-3 p-4 sm:p-5">
      <div className="grid grid-cols-3 gap-px border border-ink/10 bg-ink/10">
        {[
          ['Orders today', '1,284', '+12%'],
          ['On-time', '97.2%', '+3.1'],
          ['Open issues', '4', '−9'],
        ].map(([k, v, d]) => (
          <div key={k} className="bg-white p-3">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted">{k}</p>
            <p className="condensed mt-1 text-2xl font-bold">{v}</p>
            <p className="font-mono text-[10.5px] text-signal">{d}</p>
          </div>
        ))}
      </div>
      <div className="flex h-24 items-end gap-1.5 border border-ink/10 bg-white p-3" aria-hidden>
        {bars.map((h, i) => (
          <span
            key={i}
            className={cn('flex-1 transition-[height] duration-700', i === bars.length - 1 ? 'bg-cobalt' : 'bg-ink/80')}
            style={{ height: i < grown ? `${h}%` : '4%' }}
          />
        ))}
      </div>
      <table className="w-full border border-ink/10 bg-white text-left text-[12.5px]">
        <tbody>
          {ROWS.map(([id, city, status, tone], i) => (
            <tr key={id} className={cn('border-b border-ink/5 transition-opacity duration-300 last:border-0', i < step ? 'opacity-100' : 'opacity-0')}>
              <td className="px-3 py-1.5 font-mono text-muted">{id}</td>
              <td className="px-3 py-1.5">{city}</td>
              <td className="px-3 py-1.5 text-right">
                <span className={cn('font-mono text-[10.5px] uppercase', tone === 'ok' && 'text-signal', tone === 'wait' && 'text-muted', tone === 'bad' && 'text-[#c2410c]')}>
                  {status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
