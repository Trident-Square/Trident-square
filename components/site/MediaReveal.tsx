'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Product footage that reveals like a lifting shutter when it scrolls into view,
 * then drifts slightly against the scroll (parallax). Video plays only on screen.
 */
export default function MediaReveal({
  poster,
  video,
  alt,
  className,
  sizes = '100vw',
  priority,
  parallax = true,
  fit = 'cover',
  children,
}: {
  poster?: string
  video?: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
  parallax?: boolean
  fit?: 'cover' | 'contain'
  children?: React.ReactNode
}) {
  const box = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const vid = useRef<HTMLVideoElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = box.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) setShown(true)

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setShown(true)
        if (vid.current) e.isIntersecting && !reduce ? vid.current.play().catch(() => {}) : vid.current.pause()
      },
      { threshold: 0.12 }
    )
    io.observe(el)

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (!inner.current || !box.current) return
        const r = box.current.getBoundingClientRect()
        const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight // -1 … 1 around centre
        inner.current.style.translate = `0 ${(-p * 6).toFixed(2)}%`
      })
    }
    if (parallax && !reduce) {
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
    }
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [parallax])

  return (
    <div
      ref={box}
      className={cn('relative overflow-hidden bg-ink transition-[clip-path] duration-[1300ms] ease-[cubic-bezier(.7,0,.15,1)]', className)}
      style={{ clipPath: shown ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)' }}
    >
      <div
        ref={inner}
        className={cn('absolute inset-[-7%_0] transition-transform duration-[1600ms] ease-[cubic-bezier(.2,.75,.15,1)]', shown ? 'scale-100' : 'scale-[1.18]')}
      >
        {poster ? <Image src={poster} alt={alt} fill sizes={sizes} priority={priority} className={fit === 'cover' ? 'object-cover' : 'object-contain'} /> : null}
        {video ? (
          <video ref={vid} src={video} poster={poster} muted loop playsInline preload="none" aria-hidden className={cn('absolute inset-0 h-full w-full', fit === 'cover' ? 'object-cover' : 'object-contain')} />
        ) : null}
      </div>
      {children}
    </div>
  )
}
