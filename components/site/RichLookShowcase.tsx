'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FileText, MessageCircle, ShoppingCart, Users } from 'lucide-react'
import Arrow from './Arrow'
import LiveFrame from './LiveFrame'
import Reveal from './Reveal'
import type { Project } from '@/lib/work'
import { cn } from '@/lib/utils'

/**
 * Case-study showcase for Rich Look Laminates: the live website in a browser
 * frame, the Partner App before/after our theme in phone frames, and the
 * dealer, staff, admin and WhatsApp systems behind them.
 */

const APP_SCREENS: { key: string; label: string; note: string }[] = [
  { key: 'login', label: 'Login', note: 'Dealer & staff login, WhatsApp OTP reset' },
  { key: 'dashboard', label: 'Dashboard', note: 'Each dealer sees only their own data' },
  { key: 'stock', label: 'Stock', note: 'Search by code, name or finish' },
  { key: 'ledger', label: 'Ledger', note: 'Tally ledgers for two companies' },
  { key: 'invoices', label: 'Invoices', note: 'Invoices & credit notes as PDF' },
  { key: 'sheet-view', label: 'Sheet view', note: '110 designs, 24 at a time' },
]

const SYSTEMS: { title: string; who: string; points: string[]; Icon: typeof Users }[] = [
  {
    title: 'Dealers',
    who: 'Partner App',
    Icon: Users,
    points: ['Set-new-password and OTP login', 'Live stock, order and order status', 'Own ledger, invoices and credit notes', 'Install on the phone home screen'],
  },
  {
    title: 'Sales staff',
    who: 'Partner App · employee login',
    Icon: ShoppingCart,
    points: ['Login with their 10-digit number', 'Modules by permission', 'Party ledgers for both companies', 'Open and share invoice PDFs'],
  },
  {
    title: 'Admin',
    who: 'Admin Panel',
    Icon: FileText,
    points: ['Delete a single invoice from a batch', 'Schedule in-app pop-ups', 'WhatsApp numbers and templates', 'Stock reservation, first come first served'],
  },
]

export default function RichLookShowcase({ project }: { project: Project }) {
  return (
    <div className="space-y-24 sm:space-y-32">
      {project.live?.site ? <LiveSite url={project.live.site} poster={project.livePoster ?? project.poster} appUrl={project.live.app} /> : null}
      <AppBeforeAfter />
      <Systems />
    </div>
  )
}

/* ───────── 01 · the live website + live partner app ───────── */

function LiveSite({ url, poster, appUrl }: { url: string; poster?: string; appUrl?: string }) {
  return (
    <section className="container">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted"><span className="text-cobalt">01 / </span>Live — use it right here</p>
        <h2 className="h2 mt-5 max-w-[16ch]">Click around the real site.</h2>
      </Reveal>
      <div className={cn('mt-10 grid gap-10', appUrl && 'lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start')}>
        <Reveal delay={80}>
          <LiveFrame url={url} poster={poster} label="Rich Look Laminates website" caption="Main website" />
        </Reveal>
        {appUrl ? (
          <Reveal delay={160}>
            <LiveFrame url={appUrl} poster="/work/richlook/app-login-after.jpg" label="Rich Look Partner App" caption="Partner App" phoneOnly />
            <p className="mt-2 text-center text-[13px] text-muted">Private to Rich Look’s dealers and staff — you’ll see the real install and login screen.</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}

/* ───────── 02 · partner app before / after ───────── */

function AppBeforeAfter() {
  const [after, setAfter] = useState(true)

  return (
    <section className="bg-ink py-24 text-paper sm:py-32">
      <div className="container">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/50"><span className="text-cobalt-ink">02 / </span>The Partner App</p>
            <h2 className="h2 mt-5 max-w-[18ch]">Before and after our work.</h2>
            <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-paper/65">
              The app dealers and staff use every day — rebuilt to work for every login, re-themed to match the brand.
            </p>
          </div>
          <div role="group" aria-label="Show app theme" className="flex border border-paper/20 p-1">
            {[
              { v: false, l: 'Before' },
              { v: true, l: 'After' },
            ].map((o) => (
              <button
                key={o.l}
                type="button"
                aria-pressed={after === o.v}
                onClick={() => setAfter(o.v)}
                className={cn('px-4 py-2 font-mono text-[11.5px] uppercase tracking-[0.1em] transition-colors', after === o.v ? 'bg-paper text-ink' : 'text-paper/60 hover:text-paper')}
              >
                {o.l}
              </button>
            ))}
          </div>
        </Reveal>

        <ul className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:thin] md:grid md:grid-cols-3 md:overflow-visible xl:grid-cols-6">
          {APP_SCREENS.map((s, i) => (
            <Reveal as="li" key={s.key} delay={i * 60} className="w-[200px] shrink-0 snap-start md:w-auto">
              <div className="relative overflow-hidden rounded-[26px] border-[6px] border-paper/90 bg-paper shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
                <div className="relative aspect-[341/739]">
                  <Image src={`/work/richlook/app-${s.key}-before.jpg`} alt={`Rich Look Partner App ${s.label} screen, old theme`} fill sizes="(min-width:1280px) 16vw, 200px" className={cn('object-cover transition-opacity duration-700', after ? 'opacity-0' : 'opacity-100')} />
                  <Image src={`/work/richlook/app-${s.key}-after.jpg`} alt={`Rich Look Partner App ${s.label} screen, new theme by Trident Square`} fill sizes="(min-width:1280px) 16vw, 200px" className={cn('object-cover transition-opacity duration-700', after ? 'opacity-100' : 'opacity-0')} />
                </div>
              </div>
              <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.12em] text-cobalt-ink">{s.label}</p>
              <p className="mt-1 text-[14px] leading-snug text-paper/70">{s.note}</p>
            </Reveal>
          ))}
        </ul>

      </div>
    </section>
  )
}

/* ───────── 03 · the systems behind it ───────── */

function Systems() {
  const flow = ['Dealer places an order', 'PDF order slip is created', 'WhatsApp to the party and the admin team']
  return (
    <section className="container">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted"><span className="text-cobalt">03 / </span>Behind the app</p>
        <h2 className="h2 mt-5 max-w-[18ch]">One system for dealers, staff and admin.</h2>
      </Reveal>

      <div className="mt-14 grid gap-px border border-ink bg-ink md:grid-cols-3">
        {SYSTEMS.map((s, i) => (
          <Reveal key={s.title} delay={i * 80} className="bg-paper p-7 sm:p-8">
            <s.Icon className="h-6 w-6 text-cobalt" strokeWidth={1.75} aria-hidden />
            <h3 className="display mt-6 text-[2.4rem]">{s.title}</h3>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">{s.who}</p>
            <ul className="mt-5 space-y-2.5 border-t border-ink/15 pt-5">
              {s.points.map((p) => (
                <li key={p} className="flex gap-2.5 text-[15px] leading-snug">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-cobalt" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-4 bg-cobalt p-7 text-white sm:p-10" delay={120}>
        <div className="flex flex-wrap items-center gap-3">
          <MessageCircle className="h-6 w-6" strokeWidth={1.75} aria-hidden />
          <h3 className="display text-[2.2rem]">WhatsApp, automatic</h3>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/60">Meta Cloud API</span>
        </div>
        <ol className="mt-8 grid gap-3 md:grid-cols-3">
          {flow.map((f, i) => (
            <li key={f} className="flex items-center gap-3 border border-white/25 p-4">
              <span className="font-mono text-[12px] text-white/60">0{i + 1}</span>
              <span className="text-[15.5px] font-medium">{f}</span>
              {i < flow.length - 1 ? <Arrow className="ml-auto hidden h-4 w-4 text-white/60 md:block" /> : null}
            </li>
          ))}
        </ol>
        <p className="mt-6 font-mono text-[11px] uppercase leading-loose tracking-[0.12em] text-white/70">
          Also automatic — login OTPs · stock-available alerts · order cancellations
        </p>
      </Reveal>
    </section>
  )
}
