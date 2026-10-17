'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import type { Project } from '@/lib/work'
import { cn } from '@/lib/utils'
import Arrow from './Arrow'

/**
 * Case-study card. The silent loop plays while the card is on screen (cheap:
 * clips are ~100–350 KB) so visitors see real product footage, not stock art.
 */
export default function WorkCard({ project, size = 'md', priority }: { project: Project; size?: 'md' | 'lg'; priority?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.35 }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  const portrait = project.orientation === 'portrait'

  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div
        className={cn(
          'relative overflow-hidden bg-ink',
          size === 'lg' ? 'aspect-[16/10]' : 'aspect-[4/3]'
        )}
      >
        {project.poster ? (
          <>
            {portrait ? (
              // Portrait phone recordings: blurred fill behind a centred phone frame
              <Image src={project.poster} alt="" fill sizes="50vw" className="scale-125 object-cover opacity-40 blur-2xl" aria-hidden />
            ) : null}
            <div className={cn('absolute inset-0', portrait && 'flex items-center justify-center py-6')}>
              <div className={cn('relative', portrait ? 'h-full aspect-[9/19] overflow-hidden ring-1 ring-white/15' : 'h-full w-full')}>
                <Image
                  src={project.poster}
                  alt={`${project.name} — ${project.summary}`}
                  fill
                  priority={priority}
                  sizes={size === 'lg' ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 40vw, 100vw'}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {project.loop ? (
                  <video
                    ref={ref}
                    src={project.loop}
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster={project.poster}
                    aria-hidden
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : null}
              </div>
            </div>
          </>
        ) : (
          <TypeCard project={project} />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
        <span className="absolute bottom-0 left-0 bg-paper/95 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink">
          {project.industry}
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">{project.name}</h3>
          <p className="mt-1.5 max-w-md text-[15px] leading-relaxed text-muted">{project.summary}</p>
        </div>
        <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center border border-line transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
          <Arrow />
        </span>
      </div>
    </Link>
  )
}

/** For projects without footage: a typographic card built from the headline result. */
function TypeCard({ project }: { project: Project }) {
  const lead = project.results[0]
  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-[radial-gradient(120%_90%_at_100%_0%,rgb(var(--cobalt)/0.55),transparent_60%)] p-7 pb-16 text-paper">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/60">{project.client}</p>
      <div>
        <p className="text-[clamp(3.5rem,8vw,6rem)] display leading-none">{lead.value}</p>
        <p className="mt-2 text-paper/70">{lead.label}</p>
      </div>
    </div>
  )
}
