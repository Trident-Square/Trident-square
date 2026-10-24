'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import Arrow from './Arrow'
import MegaMenu from './MegaMenu'
import { nav, whatsappHref } from '@/lib/site'
import { groups, servicesIn } from '@/lib/services'
import { cn } from '@/lib/utils'

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mega, setMega] = useState(false)
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
    <header className="fixed inset-x-0 top-0 z-50" onMouseLeave={closeMegaSoon}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-paper">
        Skip to content
      </a>
      <div className={cn('transition-[padding] duration-500 ease-[cubic-bezier(.2,.75,.15,1)]', scrolled && !mega && !open ? 'bg-gradient-to-b from-paper from-40% to-transparent px-3 pt-3 sm:px-5' : cn('px-0 pt-0', (mega || open) && 'border-b border-line bg-paper'))}>
        <div
          className={cn(
            'mx-auto flex items-center justify-between gap-6 transition-all duration-500 ease-[cubic-bezier(.2,.75,.15,1)]',
            scrolled && !mega && !open
              ? 'h-16 max-w-[1320px] border border-ink/10 bg-paper/95 px-4 shadow-[0_18px_40px_-24px_rgba(17,17,16,0.45)] backdrop-blur-md sm:px-6'
              : cn('container h-20', (mega || open) && 'bg-paper')
          )}
        >
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              const base = 'group relative flex items-center gap-1.5 py-2 text-[15px] transition-colors duration-300'
              const underline = (
                <span
                  aria-hidden
                  className={cn(
                    'absolute bottom-0.5 left-0 h-px w-full origin-left bg-ink transition-transform duration-500 ease-[cubic-bezier(.2,.75,.15,1)]',
                    active || (item.href === '/services' && mega) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  )}
                />
              )
              if (item.href === '/services') {
                return (
                  <button
                    key={item.href}
                    type="button"
                    aria-expanded={mega}
                    aria-controls="mega-menu"
                    onMouseEnter={openMega}
                    onClick={() => setMega((v) => !v)}
                    className={cn(base, active || mega ? 'text-ink' : 'text-ink/65 hover:text-ink')}
                  >
                    {item.label}
                    <svg viewBox="0 0 10 10" className={cn('h-2.5 w-2.5 transition-transform duration-300', mega && 'rotate-180')} aria-hidden>
                      <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                    {underline}
                  </button>
                )
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={closeMegaSoon}
                  aria-current={active ? 'page' : undefined}
                  className={cn(base, active ? 'text-ink' : 'text-ink/65 hover:text-ink')}
                >
                  {item.label}
                  {item.href === '/partners' ? (
                    <span className="bg-cobalt px-1.5 py-[3px] font-mono text-[9.5px] font-medium leading-none text-white">35%</span>
                  ) : null}
                  {underline}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappHref('Hi Trident Square, I’d like to discuss a project.')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Trident Square"
              className="hidden h-11 w-11 place-items-center text-ink/70 transition-colors hover:text-[#1aa851] lg:grid"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.03c-.25.69-1.44 1.32-2 1.4-.51.08-1.16.11-1.87-.12-.43-.14-.98-.32-1.69-.62-2.98-1.29-4.92-4.28-5.07-4.48-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.6-.37.79-.37h.57c.18 0 .43-.07.67.51.25.59.84 2.05.91 2.2.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.45.52-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.06 1.13 1.01 2.09 1.32 2.39 1.47.3.15.47.12.64-.07.17-.2.74-.86.94-1.16.2-.3.39-.25.67-.15.27.1 1.73.82 2.03.97.3.15.5.22.57.35.07.12.07.71-.18 1.4Z" />
              </svg>
            </a>
            <Link href="/contact" className="group hidden h-11 items-center gap-2 bg-ink pl-5 pr-1.5 text-[14.5px] font-medium text-paper transition-colors hover:bg-cobalt sm:inline-flex">
              Start a project
              <span className="grid h-8 w-8 place-items-center bg-paper text-ink transition-transform duration-500 group-hover:rotate-[-45deg]">
                <Arrow className="h-3.5 w-3.5" />
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative grid h-11 w-11 place-items-center bg-ink md:hidden"
            >
              <span className={cn('absolute h-px w-4 bg-paper transition-transform', open ? 'rotate-45' : '-translate-y-[3px]')} />
              <span className={cn('absolute h-px w-4 bg-paper transition-transform', open ? '-rotate-45' : 'translate-y-[3px]')} />
            </button>
          </div>
        </div>
      </div>

      <div onMouseEnter={openMega}>
        <MegaMenu open={mega} onNavigate={() => setMega(false)} />
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="h-[calc(100dvh-5rem)] overflow-y-auto border-t border-line bg-paper md:hidden"
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
