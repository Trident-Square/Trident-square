'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Logo from './Logo'
import Arrow from './Arrow'
import { nav } from '@/lib/site'
import { services } from '@/lib/services'
import { cn } from '@/lib/utils'

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

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
        scrolled || open ? 'border-b border-line bg-paper/90 backdrop-blur-md' : 'border-b border-transparent'
      )}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-paper">
        Skip to content
      </a>
      <div className="container flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'px-3.5 py-2 text-[14.5px] transition-colors',
                    active ? 'text-ink' : 'text-muted hover:text-ink'
                  )}
                >
                  {item.label}
                  {item.href === '/partners' ? (
                    <span className="ml-1.5 bg-cobalt/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-cobalt">
                      35%
                    </span>
                  ) : null}
                </Link>
                {item.href === '/services' ? (
                  <div className="invisible absolute left-1/2 top-full w-[520px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div className="grid grid-cols-2 gap-1 border border-line bg-paper p-2 shadow-[0_24px_60px_-20px_rgba(17,17,16,0.25)]">
                      {services.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className="px-3.5 py-3 transition-colors hover:bg-paper-2"
                        >
                          <span className="block text-[14px] font-medium text-ink">{s.name}</span>
                          <span className="mt-0.5 block text-[12.5px] text-muted">{s.timeline}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="btn-primary hidden min-h-[40px] px-5 text-[14px] sm:inline-flex">
            Start a project <Arrow className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative grid h-10 w-10 place-items-center border border-line md:hidden"
          >
            <span className={cn('absolute h-px w-4 bg-ink transition-transform', open ? 'rotate-45' : '-translate-y-[3px]')} />
            <span className={cn('absolute h-px w-4 bg-ink transition-transform', open ? '-rotate-45' : 'translate-y-[3px]')} />
          </button>
        </div>
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
          <p className="eyebrow mt-8">Services</p>
          <ul className="mt-3 grid gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-[15px] text-muted hover:text-ink">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" className="btn-primary mt-8 w-full">
            Start a project <Arrow />
          </Link>
        </nav>
      </div>
    </header>
  )
}
