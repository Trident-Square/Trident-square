import Link from 'next/link'
import { groups, servicesIn } from '@/lib/services'
import Arrow from './Arrow'

/**
 * The services section drawn as the brand mark itself: three prongs (what we
 * build), a crossbar and a shaft (the engineering that holds them together).
 */

/** Barbed spear tip centred on x, point at y. */
function tip(x: number, y: number) {
  return `M${x} ${y} L${x + 26} ${y + 58} L${x + 9} ${y + 48} L${x + 9} ${y + 70} L${x - 9} ${y + 70} L${x - 9} ${y + 48} L${x - 26} ${y + 58} Z`
}

/** The trident head, drawn so its prongs sit over the centres of the three columns (1/6, 1/2, 5/6). */
function TridentHead() {
  return (
    <svg viewBox="0 0 1200 300" className="block w-full" aria-hidden>
      {/* outer prongs */}
      <path d={tip(200, 40)} className="fill-ink" />
      <rect x="191" y="108" width="18" height="102" className="fill-ink" />
      <path d={tip(1000, 40)} className="fill-ink" />
      <rect x="991" y="108" width="18" height="102" className="fill-ink" />
      {/* centre prong, taller */}
      <path d={tip(600, 0)} className="fill-cobalt" />
      <rect x="591" y="68" width="18" height="232" className="fill-cobalt" />
      {/* crossbar */}
      <path d="M200 208 C200 262 330 262 600 262 C870 262 1000 262 1000 208" fill="none" strokeWidth="18" className="stroke-ink" />
      {/* drawing annotations */}
      <g className="fill-muted font-mono" fontSize="13" letterSpacing="1.5">
        <text x="236" y="70">01 — TALKS</text>
        <text x="636" y="30">02 — THINKS</text>
        <text x="1036" y="70">03 — SHIPS</text>
      </g>
    </svg>
  )
}

export default function TridentServices() {
  const prongs = groups.filter((g) => g.id !== 'base')
  const base = servicesIn('base')
  return (
    <div>
      <div className="hidden md:block">
        <TridentHead />
      </div>
      <div className="grid gap-6 md:grid-cols-3 md:gap-4 lg:gap-8">
        {prongs.map((p) => (
          <div key={p.id} className="group flex flex-col">
            <div className="flex items-end justify-between bg-ink px-5 pb-4 pt-10 text-paper transition-colors duration-300 group-hover:bg-cobalt">
              <span className="display text-[clamp(3rem,5.4vw,4.75rem)]">{p.verb}</span>
              <span className="pb-2 font-mono text-[11px] text-paper/60">{p.n}</span>
            </div>
            <div className="flex flex-1 flex-col border-x border-b border-ink/15 bg-paper px-5 pb-6 pt-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{p.title} — {p.line}</p>
              <ul className="mt-4 flex-1">
                {servicesIn(p.id).map((s) => {
                  return (
                    <li key={s.slug} className="border-t border-ink/10">
                      <Link href={`/services/${s.slug}`} className="group/l flex items-start justify-between gap-4 py-4">
                        <span>
                          <span className="block text-[18px] font-semibold leading-tight transition-colors group-hover/l:text-cobalt">
                            {s.name}
                          </span>
                          <span className="mt-1 block text-[14px] leading-snug text-muted">{s.hook}</span>
                        </span>
                        <Arrow className="mt-1 h-4 w-4 shrink-0 opacity-40 transition-all group-hover/l:translate-x-1 group-hover/l:opacity-100" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Shaft down to the base */}
      <div aria-hidden className="mx-auto h-14 w-3 bg-ink sm:h-20" />

      <div className="crop relative mx-auto grid max-w-4xl gap-6 border border-ink/15 bg-paper p-6 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-10 sm:p-8">
        <div>
          <span className="display block text-[2.5rem] text-cobalt">Base</span>
          <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.1em] text-muted">Under every prong</span>
        </div>
        <ul className="grid gap-px bg-ink/10 sm:grid-cols-2">
          {base.map((s) => (
            <li key={s.slug} className="bg-paper">
              <Link href={`/services/${s.slug}`} className="group/l flex h-full items-start justify-between gap-4 p-4 hover:bg-white">
                <span>
                  <span className="block text-[17px] font-semibold transition-colors group-hover/l:text-cobalt">{s.name}</span>
                  <span className="mt-1 block text-[14px] leading-snug text-muted">{s.hook}</span>
                </span>
                <Arrow className="mt-1 h-4 w-4 shrink-0 opacity-40 transition-all group-hover/l:translate-x-1 group-hover/l:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
