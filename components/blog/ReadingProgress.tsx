'use client'

import { useEffect, useRef } from 'react'

/** Thin cobalt bar under the header that fills as the article is read. */
export default function ReadingProgress({ target }: { target: string }) {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = document.getElementById(target)
    if (!el || !bar.current) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight * 0.6
      const done = Math.min(1, Math.max(0, -r.top / (total > 0 ? total : 1)))
      if (bar.current) bar.current.style.transform = `scaleX(${done})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [target])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-cobalt" />
    </div>
  )
}
