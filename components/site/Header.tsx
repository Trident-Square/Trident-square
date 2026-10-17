'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import Arrow from './Arrow'
import MegaMenu from './MegaMenu'
import { nav } from '@/lib/site'
import { groups, servicesIn } from '@/lib/services'
import { cn } from '@/lib/utils'

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mega, setMega] = useState(false)
  // Over the dark home hero (until you scroll or open a menu) the header inverts.
  const onDark = pathname === '/' && !scrolled && !mega && !open
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  // Hover intent: open at once, close after a short grace period so moving the
  // pointer from the trigger down into the panel doesn't flicker it shut.
  const openMega = () => {
    clearTimeout(closeTimer.current)
    setMega(true)
  }
  const closeMegaSoon = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMega(false), 160)
  }

  useEffect(() => {
    if (!mega) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMega(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mega])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setMega(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300',
        mega ? 'border-b border-line bg-paper' : scrolled || open ? 'border-b border-line bg-paper/90 backdrop-blur-md' : 'border-b border-transparent'
      )}
      onMouseLeave={closeMegaSoon}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-paper">
        Skip to content
      </a>
      <div className="container flex h-16 items-center justify-between gap-6">
        <Logo inverted={onDark} />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            if (item.href === '/services') {
              return (
                <button
                  key={item.href}
                  type="button"
                  aria-expanded={mega}
                  aria-controls="mega-menu"
                  onMouseEnter={openMega}
                  onClick={() => setMega((v) => !v)}
                  className={cn(
                    'flex items-center gap-1.5 px-3.5 py-2 text-[14.5px] transition-colors',
                    onDark ? 'text-paper/70 hover:text-paper' : active || mega ? 'text-ink' : 'text-muted hover:text-ink'
                  )}
                >
                  {item.label}
                  <span aria-hidden className={cn('relative h-2.5 w-2.5 transition-transform duration-300', mega && 'rotate-45')}>
                    <span className="absolute left-0 top-1/2 h-px w-2.5 bg-current" />
                    <span className="absolute left-1/2 top-0 h-2.5 w-px bg-current" />
                  </span>
                </button>
              )
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={closeMegaSoon}
                aria-current={active ? 'page' : undefined}
                className={cn('px-3.5 py-2 text-[14.5px] transition-colors', onDark ? 'text-paper/70 hover:text-paper' : active ? 'text-ink' : 'text-muted hover:text-ink')}
              >
                {item.label}
                {item.href === '/partners' ? (
                  <span className={cn('ml-1.5 px-1.5 py-0.5 font-mono text-[10px] font-medium', onDark ? 'bg-cobalt text-white' : 'bg-cobalt/10 text-cobalt')}>35%</span>
                ) : null}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className={cn('hidden min-h-[40px] px-5 text-[14px] sm:inline-flex', onDark ? 'btn bg-paper text-ink hover:bg-cobalt hover:text-white' : 'btn-primary')}>
            Start a project <Arrow className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={cn("relative grid h-10 w-10 place-items-center border md:hidden", onDark ? "border-paper/25" : "border-line")}
          >
            <span className={cn('absolute h-px w-4 transition-transform', onDark ? 'bg-paper' : 'bg-ink', open ? 'rotate-45' : '-translate-y-[3px]')} />
            <span className={cn('absolute h-px w-4 transition-transform', onDark ? 'bg-paper' : 'bg-ink', open ? '-rotate-45' : 'translate-y-[3px]')} />
          </button>
        </div>
      </div>

      <div onMouseEnter={openMega}>
        <MegaMenu open={mega} onNavigate={() => setMega(false)} />
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper md:hidden"
      >
        <nav aria-label="Mobile" className="container flex flex-col py-6">
          {[{ label: 'Home', href: '/' }, ...nav, { label: 'Contact', href: '/contact' }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between border-b border-line py-4 text-3xl font-semibold tracking-[-0.03em]"
            >
              {item.label}
              <Arrow className="h-5 w-5 text-muted" />
            </Link>
          ))}
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6">
            {groups.map((g) => (
              <div key={g.id}>
                <p className="eyebrow"><span className="text-cobalt">{g.n}</span> {g.verb}</p>
                <ul className="mt-2 grid gap-1.5">
                  {servicesIn(g.id).map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="text-[14.5px] text-ink-2 hover:text-cobalt">
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Link href="/contact" className="btn-primary mt-8 w-full">
            Start a project <Arrow />
          </Link>
        </nav>
      </div>
    </header>
  )
}
