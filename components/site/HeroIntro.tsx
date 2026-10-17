'use client'

import Link from 'next/link'
import { useState } from 'react'
import Arrow from './Arrow'
import HeroConsole, { type Tab } from './HeroConsole'
import { cn } from '@/lib/utils'

/**
 * First screen: who we are. "Software that talks¹, thinks² & ships³." The
 * live console, the lit-up verb in the headline and the footnote below always
 * point at the same thing; click a footnote to switch the console.
 */

const ITEMS: { id: Tab; n: string; word: string; title: string; text: string }[] = [
  { id: 'talks', n: '1', word: 'talks', title: 'Talks', text: 'Voice agents and chatbots that answer every customer — in Hindi, English and Hinglish.' },
  { id: 'thinks', n: '2', word: 'thinks', title: 'Thinks', text: 'Automation systems and AI agents that run orders, invoices, leads and reports for you.' },
  { id: 'ships', n: '3', word: 'ships', title: 'Ships', text: 'Custom software, web, e-commerce and mobile apps your business runs on every day.' },
]

export default function HeroIntro() {
  const [tab, setTab] = useState<Tab>('talks')

  const word = (id: Tab) => {
    const it = ITEMS.find((x) => x.id === id)!
    return (
      <button
        type="button"
        onClick={() => setTab(id)}
        className={cn('relative uppercase transition-colors duration-500', tab === id ? 'text-cobalt' : 'text-ink hover:text-cobalt/70')}
      >
        {it.word}
        <sup className="fn">{it.n}</sup>
        {/* underline that draws in under the active verb */}
        <span
          aria-hidden
          className={cn(
            'absolute bottom-[0.04em] left-0 h-[0.06em] w-full origin-left bg-cobalt transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)]',
            tab === id ? 'scale-x-100' : 'scale-x-0'
          )}
        />
      </button>
    )
  }

  return (
    <section className="container pt-28 sm:pt-32">
      <div className="flex items-center justify-between border-b border-ink pb-3 font-mono text-[11px] uppercase tracking-[0.14em]">
        <span>Trident Square — automation, AI &amp; software</span>
        <span className="hidden text-muted sm:inline">Noida, India · working worldwide</span>
      </div>

      <h1 className="display mt-8 text-[clamp(3.4rem,11.2vw,11.5rem)] sm:mt-10">
        <span className="block animate-[title-in_1s_cubic-bezier(.2,.75,.15,1)_both]">Software</span>
        <span className="block animate-[title-in_1s_cubic-bezier(.2,.75,.15,1)_100ms_both]">that {word('talks')},</span>
        <span className="block animate-[title-in_1s_cubic-bezier(.2,.75,.15,1)_200ms_both]">
          {word('thinks')} <span className="text-cobalt">&amp;</span> {word('ships')}.
        </span>
      </h1>

      <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col lg:col-span-5">
          <ol className="border-t border-ink">
            {ITEMS.map((it) => {
              const on = tab === it.id
              return (
                <li key={it.id} className="border-b border-ink/15">
                  <button
                    type="button"
                    onClick={() => setTab(it.id)}
                    aria-pressed={on}
                    className={cn('grid w-full grid-cols-[2.25rem_1fr] gap-2 py-4 text-left transition-colors duration-500', on ? 'bg-ink px-3 text-paper' : 'px-0 hover:bg-paper-2')}
                  >
                    <span className={cn('pt-0.5 font-mono text-[12px]', on ? 'text-cobalt-ink' : 'text-cobalt')}>{it.n}</span>
                    <span className="text-[15.5px] leading-snug">
                      <strong className="font-semibold">{it.title}.</strong>{' '}
                      <span className={on ? 'text-paper/70' : 'text-muted'}>{it.text}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Book a free call <Arrow />
            </Link>
            <Link href="/work" className="btn-ghost">
              See the work
            </Link>
          </div>
        </div>
        <div className="lg:col-span-7">
          <HeroConsole tab={tab} onTabChange={setTab} />
        </div>
      </div>
    </section>
  )
}
