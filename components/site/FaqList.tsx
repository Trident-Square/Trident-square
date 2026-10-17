'use client'

import { useState } from 'react'
import type { Faq } from '@/lib/services'
import { cn } from '@/lib/utils'

/**
 * Numbered accordion. Answers stay in the HTML (only visually collapsed) so
 * search engines and AI crawlers still read them; FAQPage schema is separate.
 */
export default function FaqList({ faqs, dark }: { faqs: Faq[]; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <ol className={cn('border-t', dark ? 'border-paper/20' : 'border-ink')}>
      {faqs.map((f, i) => {
        const on = open === i
        return (
          <li key={f.q} className={cn('border-b', dark ? 'border-paper/15' : 'border-ink/15')}>
            <h3>
              <button
                type="button"
                aria-expanded={on}
                onClick={() => setOpen(on ? null : i)}
                className="group grid w-full grid-cols-[3rem_1fr_auto] items-start gap-3 py-6 text-left sm:py-7"
              >
                <span className={cn('pt-1.5 font-mono text-[12px] transition-colors', on ? 'text-cobalt' : dark ? 'text-paper/40' : 'text-muted')}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={cn(
                    'text-[clamp(1.15rem,1.9vw,1.6rem)] font-medium leading-snug tracking-[-0.015em] transition-colors',
                    dark ? 'text-paper' : on ? 'text-ink' : 'text-ink/75 group-hover:text-ink'
                  )}
                >
                  {f.q}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    'relative mt-1 grid h-9 w-9 place-items-center border transition-all duration-500',
                    on ? 'rotate-45 border-cobalt bg-cobalt text-white' : dark ? 'border-paper/25 text-paper' : 'border-ink/20 group-hover:border-ink'
                  )}
                >
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span className="absolute h-3.5 w-px bg-current" />
                </span>
              </button>
            </h3>
            <div className={cn('grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.2,.75,.15,1)]', on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
              <div className="overflow-hidden">
                <p className={cn('max-w-2xl pb-8 pl-[3.75rem] pr-12 text-[16.5px] leading-relaxed', dark ? 'text-paper/65' : 'text-muted')}>{f.a}</p>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
