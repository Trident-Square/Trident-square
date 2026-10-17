'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Arrow from './Arrow'
import { groups, servicesIn, type Service } from '@/lib/services'
import { partnerProgram } from '@/lib/site'
import { getProject } from '@/lib/work'
import { cn } from '@/lib/utils'

/** Small barbed spear tip — the trident prong as an icon. */
function Prong({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 28" aria-hidden className={className}>
      <path d="M10 0 L20 14 L13.5 11.5 L13.5 28 L6.5 28 L6.5 11.5 L0 14 Z" fill="currentColor" />
    </svg>
  )
}

/**
 * Full-width services panel. Opens like a blind from the header; columns follow
 * the trident (Talks / Thinks / Ships / Base). Hovering a service swaps the
 * preview card on the right to that service and a project we built with it.
 */
export default function MegaMenu({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const [hover, setHover] = useState<Service | null>(null)
  const featured = getProject('gigtap')!
  const previewProject = hover
    ? hover.work.map(getProject).find((p) => p?.poster)
    : undefined

  let i = 0 // running index for the stagger

  return (
    <div
      id="mega-menu"
      aria-hidden={!open}
      inert={!open}
      onMouseLeave={() => setHover(null)}
      className={cn(
        'absolute inset-x-0 top-full hidden border-b border-ink bg-paper shadow-[0_40px_80px_-30px_rgba(17,17,16,0.35)] md:block',
        'transition-[clip-path] duration-500 ease-[cubic-bezier(.2,.75,.15,1)]',
        open ? '[clip-path:inset(0_0_0_0)]' : 'pointer-events-none [clip-path:inset(0_0_100%_0)]'
      )}
    >
      <div className="container grid grid-cols-12 gap-8 py-10">
        <div className="col-span-9 grid grid-cols-4 gap-px bg-ink/10">
          {groups.map((g) => (
            <div key={g.id} className="flex flex-col bg-paper pr-4 first:pl-0 [&:not(:first-child)]:pl-5">
              <div
                className={cn('flex items-end gap-2.5 border-b border-ink pb-3 transition-all duration-500', open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0')}
                style={{ transitionDelay: open ? `${80 + i++ * 35}ms` : '0ms' }}
              >
                <Prong className={cn('h-7 w-5', g.id === 'thinks' ? 'text-cobalt' : 'text-ink')} />
                <span className="display text-[2rem] leading-[0.8]">{g.verb}</span>
                <span className="ml-auto font-mono text-[10.5px] text-muted">{g.n}</span>
              </div>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{g.title}</p>
              <ul className="mt-3">
                {servicesIn(g.id).map((s) => (
                  <li
                    key={s.slug}
                    className={cn('transition-all duration-500', open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0')}
                    style={{ transitionDelay: open ? `${80 + i++ * 35}ms` : '0ms' }}
                  >
                    <Link
                      href={`/services/${s.slug}`}
                      onClick={onNavigate}
                      onMouseEnter={() => setHover(s)}
                      onFocus={() => setHover(s)}
                      className="group/s relative block py-2.5 pl-3"
                    >
                      <span
                        aria-hidden
                        className={cn(
                          'absolute left-0 top-2.5 bottom-2.5 w-[2px] origin-top bg-cobalt transition-transform duration-300',
                          hover?.slug === s.slug ? 'scale-y-100' : 'scale-y-0'
                        )}
                      />
                      <span className={cn('flex items-center gap-1.5 text-[15px] font-semibold leading-tight transition-colors', hover?.slug === s.slug && 'text-cobalt')}>
                        {s.name}
                        <Arrow className={cn('h-3.5 w-3.5 transition-all duration-300', hover?.slug === s.slug ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0')} />
                      </span>
                      <span className="mt-0.5 block text-[12.5px] text-muted">{s.hook}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Preview card */}
        <div className={cn('col-span-3 transition-all duration-500', open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0')} style={{ transitionDelay: open ? '200ms' : '0ms' }}>
          <div className="crop relative flex h-full min-h-[330px] flex-col overflow-hidden bg-ink p-1.5 text-paper">
            <div className="relative aspect-[16/10] overflow-hidden bg-ink-2">
              {hover ? (
                previewProject?.poster ? (
                  <Image key={hover.slug} src={previewProject.poster} alt="" fill sizes="25vw" className="animate-rise object-cover opacity-80" />
                ) : (
                  <div key={hover.slug} className="absolute inset-0 animate-rise bg-cobalt" />
                )
              ) : open ? (
                <video src={featured.loop} poster={featured.poster} autoPlay muted loop playsInline className="h-full w-full object-cover" />
              ) : null}
              <span className="absolute left-0 top-0 bg-paper px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink">
                {hover ? (previewProject ? `Built with it: ${previewProject.name}` : 'Service') : 'Latest work · Gigtap'}
              </span>
            </div>
            <div key={hover?.slug ?? 'featured'} className="flex flex-1 animate-rise flex-col p-4">
              <p className="display text-[1.65rem] leading-[0.9]">{hover ? hover.name : featured.name}</p>
              <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-paper/65">{hover ? hover.lede : featured.summary}</p>
              <p className="mt-auto pt-3 font-mono text-[10.5px] uppercase tracking-[0.1em] text-cobalt-ink">
                {hover ? hover.timeline : `${featured.industry} · ${featured.year}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="container flex items-center justify-between gap-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.1em]">
          <span className="text-muted">Automation · AI · every kind of software — one team in Noida</span>
          <div className="flex items-center gap-6">
            <Link href="/services" onClick={onNavigate} className="flex items-center gap-1.5 hover:text-cobalt">
              All services <Arrow className="h-3 w-3" />
            </Link>
            <Link href="/partners" onClick={onNavigate} className="flex items-center gap-1.5 hover:text-cobalt">
              Refer & earn {partnerProgram.referral.boosted}% <Arrow className="h-3 w-3" />
            </Link>
            <Link href="/contact" onClick={onNavigate} className="flex items-center gap-1.5 bg-ink px-3 py-1.5 text-paper hover:bg-cobalt">
              Free consultation <Arrow className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
