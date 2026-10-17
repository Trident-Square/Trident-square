'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/** Fades and lifts its children into place the first time they scroll into view. */
export default function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
  style,
}: {
  style?: React.CSSProperties
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'li'
}) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as never}
      className={cn('transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(.2,.75,.15,1)]', shown ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0', className)}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
