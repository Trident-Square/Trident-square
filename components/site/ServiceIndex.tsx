'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Arrow from './Arrow'
import { groups, servicesIn, type Service } from '@/lib/services'
import { getProject } from '@/lib/work'
import { cn } from '@/lib/utils'

function mediaFor(s: Service) {
  return s.work.map(getProject).find((p) => p?.loop)
}

/**
 * Services as a large typographic index. Hovering a row plays footage from a
 * project we built with that service in the sticky panel on the right.
 */
export default function ServiceIndex() {
  const first = servicesIn('thinks')[1] ?? servicesIn('thinks')[0]
  const [active, setActive] = useState<Service>(first)
  const media = mediaFor(active)
  let n = 0

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        {groups.map((g) => (
          <div key={g.id} className="mb-10 last:mb-0">
            <p className="flex items-center gap-3 border-b border-ink pb-3 font-mono text-[11px] uppercase tracking-[0.14em]">
              <span className="text-cobalt">{g.n}</span>
              <span>{g.verb}</span>
              <span className="text-muted">— {g.title}</span>
            </p>
            <ul>
              {servicesIn(g.id).map((s) => {
                const on = active.slug === s.slug
                n++
                return (
                  <li key={s.slug} className="border-b border-ink/10">
                    <Link
                      href={`/services/${s.slug}`}
                      onMouseEnter={() => setActive(s)}
                      onFocus={() => setActive(s)}
                      className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 py-4 sm:py-5"
                    >
                      <span className="font-mono text-[11px] text-muted">{String(n).padStart(2, '0')}</span>
                      <span>
                        <span
                          className={cn(
                            'display block text-[clamp(1.9rem,4.2vw,3.6rem)] transition-[color,transform] duration-500 ease-[cubic-bezier(.2,.75,.15,1)]',
                            on ? 'translate-x-3 text-cobalt' : 'text-ink group-hover:translate-x-3'
                          )}
                        >
                          {s.name}
                        </span>
                        <span className="mt-1 block text-[14.5px] text-muted lg:hidden">{s.hook}</span>
                      </span>
                      <span
                        className={cn(
                          'grid h-10 w-10 place-items-center border transition-all duration-300',
                          on ? 'rotate-[-45deg] border-ink bg-ink text-paper' : 'border-ink/15 group-hover:border-ink'
                        )}
                      >
                        <Arrow />
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Sticky preview */}
      <aside className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-24">
          <div className="relative aspect-[4/5] overflow-hidden bg-ink">
            {media ? (
              <>
                <Image key={`p-${media.slug}`} src={media.poster!} alt="" fill sizes="40vw" className="animate-[fade_.5s_ease_both] object-cover" />
                <video key={`v-${media.slug}`} src={media.loop} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full animate-[fade_.5s_ease_both] object-cover" />
              </>
            ) : null}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-6 pt-24 text-paper">
              <p key={active.slug} className="animate-rise">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-cobalt-ink">{active.timeline}</span>
                <span className="display mt-2 block text-[2.4rem]">{active.short}</span>
                <span className="mt-2 block max-w-sm text-[15px] leading-relaxed text-paper/75">{active.hook}</span>
              </p>
            </div>
            {media ? (
              <span className="absolute left-0 top-0 bg-paper px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink">
                Built with it — {media.name}
              </span>
            ) : null}
          </div>
        </div>
      </aside>
    </div>
  )
}
