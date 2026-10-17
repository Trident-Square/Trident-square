import Link from 'next/link'
import Arrow from './Arrow'
import MediaReveal from './MediaReveal'
import Reveal from './Reveal'
import { getService } from '@/lib/services'
import type { Project } from '@/lib/work'
import { cn } from '@/lib/utils'

// Alternating wide / narrow columns with a vertical offset — an editorial, not-a-template rhythm.
const LAYOUT = [
  'lg:col-span-7',
  'lg:col-span-5 lg:mt-48',
  'lg:col-span-5',
  'lg:col-span-7 lg:mt-24',
]

export default function WorkGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-x-10 gap-y-16 sm:gap-y-24 lg:grid-cols-12">
      {projects.map((p, i) => (
        <article key={p.slug} className={LAYOUT[i % LAYOUT.length]}>
          <Link href={`/work/${p.slug}`} className="group block">
            {p.poster ? (
              <MediaReveal
                poster={p.poster}
                video={p.loop}
                alt={`${p.name} — ${p.summary}`}
                sizes="(min-width:1024px) 55vw, 100vw"
                fit={p.orientation === 'portrait' ? 'contain' : 'cover'}
                className={p.orientation === 'portrait' ? 'aspect-[4/5]' : i % 4 === 0 || i % 4 === 3 ? 'aspect-[16/11]' : 'aspect-[4/3]'}
              >
                <span className="absolute bottom-0 right-0 grid h-14 w-14 place-items-center bg-paper text-ink transition-all duration-500 group-hover:bg-cobalt group-hover:text-white">
                  <Arrow className="h-5 w-5 transition-transform duration-500 group-hover:rotate-[-45deg]" />
                </span>
              </MediaReveal>
            ) : (
              <Reveal className={cn('relative flex flex-col justify-between bg-cobalt p-8 text-white', i % 4 === 0 || i % 4 === 3 ? 'aspect-[16/11]' : 'aspect-[4/5]')}>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">{p.client}</span>
                <span>
                  <span className="display block text-[clamp(4rem,10vw,9rem)] leading-[0.8]">{p.results[0].value}</span>
                  <span className="mt-3 block text-[16px] text-white/75">{p.results[0].label}</span>
                </span>
              </Reveal>
            )}
            <Reveal className="mt-5 grid items-start gap-3 border-t border-ink pt-4 sm:grid-cols-[1fr_auto] sm:gap-4">
              <div>
                <h3 className="display text-[clamp(2rem,3.6vw,3.25rem)] transition-colors group-hover:text-cobalt">{p.name}</h3>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">{p.summary}</p>
              </div>
              <div className="font-mono text-[10.5px] sm:text-right uppercase leading-relaxed tracking-[0.1em] text-muted">
                <p>{p.industry}</p>
                <p>{p.services.slice(0, 2).map((s) => getService(s)?.short).join(' · ')}</p>
                <p>{p.year}</p>
              </div>
            </Reveal>
          </Link>
        </article>
      ))}
    </div>
  )
}
