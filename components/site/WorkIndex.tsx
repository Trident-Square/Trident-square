'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { getService } from '@/lib/services'
import type { Project } from '@/lib/work'
import { cn } from '@/lib/utils'

/**
 * Editorial project index. On pointer devices a preview of the real product
 * footage follows the cursor while you hover a row; on touch, rows show a
 * thumbnail instead.
 */
export default function WorkIndex({ projects }: { projects: Project[] }) {
  const [hover, setHover] = useState<Project | null>(null)
  const preview = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 })

  useEffect(() => {
    let raf = 0
    const onMove = (e: PointerEvent) => {
      pos.current.tx = e.clientX
      pos.current.ty = e.clientY
    }
    // Ease toward the pointer so the preview trails a little — feels physical, not glued.
    const tick = () => {
      const p = pos.current
      p.x += (p.tx - p.x) * 0.16
      p.y += (p.ty - p.y) * 0.16
      if (preview.current) preview.current.style.transform = `translate3d(${p.x + 24}px, ${p.y - 120}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="relative">
      <ol className="border-t border-ink" onPointerLeave={() => setHover(null)}>
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Link
              href={`/work/${p.slug}`}
              onPointerEnter={() => setHover(p)}
              className="group grid grid-cols-[4.5rem_1fr_auto] items-center gap-4 border-b border-ink/15 py-5 sm:grid-cols-[3rem_1fr_14rem_auto] sm:gap-6 sm:py-6 lg:grid-cols-[3rem_1fr_16rem_14rem_3rem]"
            >
              {/* Touch: thumbnail; pointer: index number */}
              <span className="relative aspect-square w-[4.5rem] overflow-hidden bg-ink sm:hidden">
                {p.poster ? (
                  <Image src={p.poster} alt="" fill sizes="72px" className="object-cover" />
                ) : (
                  <span className="display absolute inset-0 grid place-items-center bg-cobalt text-[1.35rem] text-white">
                    {p.results[0].value}
                  </span>
                )}
              </span>
              <span className="hidden font-mono text-[12px] text-muted sm:block">{String(i + 1).padStart(2, '0')}</span>
              <span>
                <span className="display block text-[clamp(2rem,6vw,4.5rem)] transition-[color,transform] duration-300 group-hover:translate-x-2 group-hover:text-cobalt">
                  {p.name}
                </span>
                <span className="mt-1 block text-[13.5px] text-muted sm:hidden">{p.industry}</span>
              </span>
              <span className="hidden text-[14.5px] text-muted sm:block">{p.industry}</span>
              <span className="hidden font-mono text-[11.5px] uppercase leading-relaxed tracking-[0.06em] text-muted lg:block">
                {p.services.slice(0, 2).map((s) => getService(s)?.short).join(' · ')}
              </span>
              <span className="text-right font-mono text-[12px] text-muted">{p.year}</span>
            </Link>
          </li>
        ))}
      </ol>

      <div
        ref={preview}
        aria-hidden
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-40 hidden w-[340px] transition-opacity duration-200 [@media(hover:hover)]:block',
          hover ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div className="crop relative aspect-[4/3] overflow-hidden border border-ink/20 bg-ink p-1.5">
          {projects.map((p) => (
            <div key={p.slug} className={cn('absolute inset-1.5 transition-opacity duration-200', hover?.slug === p.slug ? 'opacity-100' : 'opacity-0')}>
              {p.loop && hover?.slug === p.slug ? (
                <video src={p.loop} poster={p.poster} autoPlay muted loop playsInline className="h-full w-full object-cover" />
              ) : p.poster ? (
                <Image src={p.poster} alt="" fill sizes="340px" className="object-cover" />
              ) : (
                <div className="flex h-full flex-col justify-end bg-cobalt p-5 text-white">
                  <span className="display text-6xl">{p.results[0].value}</span>
                  <span className="mt-1 text-[14px] text-white/75">{p.results[0].label}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        {hover ? (
          <p className="mt-2 bg-ink px-2.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-paper">{hover.summary}</p>
        ) : null}
      </div>
    </div>
  )
}
