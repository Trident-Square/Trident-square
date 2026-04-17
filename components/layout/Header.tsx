'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { cn } from '@/lib/utils'

type NavDropdownItem = { name: string; href: string }
type NavItem =
  | { name: string; href: string }
  | { name: string; href: string; dropdown: NavDropdownItem[] }

function hasDropdown(item: NavItem): item is Extract<NavItem, { dropdown: NavDropdownItem[] }> {
  return 'dropdown' in item && Array.isArray(item.dropdown)
}

const navigation: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  {
    name: 'Services',
    href: '/services',
    dropdown: [
      { name: 'Web Development', href: '/services/web' },
      { name: 'App Development', href: '/services/app' },
      { name: 'E-Commerce', href: '/services/ecommerce' },
      { name: 'UI/UX Design', href: '/services/design' },
    ],
  },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Contact', href: '/contact' },
]

function isRouteActive(href: string, pathname: string | null): boolean {
  if (!pathname) return false
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

const navLinkBase =
  'rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg dark:focus-visible:ring-offset-slate-900'

const navLinkInactive =
  'text-muted hover:bg-fg/[0.05] hover:text-fg dark:hover:bg-white/[0.06]'

const navLinkActive =
  'font-semibold text-indigo-600 dark:text-indigo-400'

const navLinkActiveDesktop = navLinkActive

export default function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [isOpen])

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const next = window.scrollY > 20
        setScrolled((prev) => (prev === next ? prev : next))
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <motion.header
      initial={reduce ? undefined : { y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-[background-color,box-shadow] duration-200 ease-out backdrop-blur-2xl',
        /* Stronger bar on small screens so controls stay readable over page content */
        scrolled
          ? 'bg-bg/92 shadow-md ring-1 ring-black/5 dark:bg-bg/92 dark:ring-white/10 md:bg-bg/75 md:shadow-sm md:ring-0 dark:md:bg-bg/80'
          : 'bg-bg/92 shadow-sm ring-1 ring-black/[0.06] dark:bg-bg/92 dark:ring-white/[0.08] md:bg-bg/70 md:shadow-none md:ring-0 dark:md:bg-bg/72',
      )}
    >
      <div className="container mx-auto min-w-0 max-w-7xl px-3 sm:px-5 lg:px-8">
        <nav className="flex h-14 min-h-[3.5rem] items-center justify-between gap-2 sm:h-16 sm:gap-3 md:gap-4">
          <motion.div
            initial={reduce ? undefined : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: reduce ? 0 : 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0 shrink"
          >
            <Link
              href="/"
              className="flex min-w-0 items-center gap-1.5 text-xl hover:opacity-90 sm:gap-2.5 sm:text-2xl md:text-3xl transition-opacity"
            >
              <Image
                src="/trident-remove-bg.png"
                alt=""
                width={48}
                height={48}
                className="h-[1em] w-[1em] shrink-0 object-contain sm:h-[1.12em] sm:w-[1.12em]"
                priority
              />
              <span className="truncate font-bold leading-none tracking-tight text-fg">
                Trident
                <span className="bg-gradient-to-r from-indigo-600 to-teal-600 bg-clip-text text-transparent dark:from-indigo-300 dark:to-teal-300">
                  Square
                </span>
              </span>
            </Link>
          </motion.div>

          <motion.div
            className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 md:flex md:px-1 lg:flex-none lg:justify-end lg:gap-0.5 lg:px-0"
            initial={reduce ? undefined : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: reduce ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {navigation.map((item) => {
              const servicesActive = hasDropdown(item) && isRouteActive('/services', pathname)
              return (
                <div key={item.name} className="relative shrink-0 group">
                  {hasDropdown(item) ? (
                    <>
                      {/* md–lg: touch-friendly single link (hover dropdown does not work on touch) */}
                      <Link
                        href={item.href}
                        className={cn(
                          navLinkBase,
                          'inline-flex lg:hidden px-2.5 py-2 md:px-3',
                          servicesActive ? navLinkActiveDesktop : navLinkInactive,
                        )}
                      >
                        {item.name}
                      </Link>
                      {/* lg+: link + hover mega (pointer-friendly) */}
                      <div className="relative hidden shrink-0 group lg:block">
                        <Link
                          href={item.href}
                          className={cn(
                            navLinkBase,
                            'inline-flex items-center gap-1 px-2.5 py-2 lg:px-4 lg:py-2.5',
                            servicesActive ? navLinkActiveDesktop : navLinkInactive,
                          )}
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            className={cn(
                              'h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 lg:h-4 lg:w-4',
                              servicesActive ? 'text-indigo-600 opacity-90 dark:text-indigo-400' : 'opacity-60',
                            )}
                            aria-hidden
                          />
                        </Link>
                        <div className="invisible absolute left-0 top-full z-50 pt-1.5 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                          <div className="min-w-[220px] overflow-hidden rounded-xl border border-border bg-card py-2 shadow-xl">
                            {item.dropdown.map((dropItem: NavDropdownItem) => {
                              const dropActive = pathname === dropItem.href
                              return (
                                <Link
                                  key={dropItem.name}
                                  href={dropItem.href}
                                  className={cn(
                                    'block rounded-lg px-4 py-2.5 text-sm transition-colors',
                                    dropActive
                                      ? 'font-semibold text-indigo-600 dark:text-indigo-400'
                                      : 'text-muted hover:bg-fg/[0.05] hover:text-fg dark:hover:bg-white/[0.06]',
                                  )}
                                >
                                  {dropItem.name}
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        navLinkBase,
                        'inline-block px-2.5 py-2 md:px-3 lg:px-4 lg:py-2.5',
                        isRouteActive(item.href, pathname) ? navLinkActiveDesktop : navLinkInactive,
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              )
            })}
          </motion.div>

          <motion.div
            className="hidden shrink-0 items-center gap-2 md:flex md:gap-3"
            initial={reduce ? undefined : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: reduce ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <ThemeToggle />
            <Button
              href="https://calendar.app.google/vcnJxCrqEPrUnYhB7"
              variant="primary"
              size="sm"
              className="hidden rounded-full px-4 font-semibold sm:inline-flex lg:px-6"
            >
              Start your project
            </Button>
          </motion.div>

          <div
            className={cn(
              'relative z-[60] flex shrink-0 items-center gap-0.5 rounded-2xl p-1 md:hidden',
              'bg-card/95 backdrop-blur-md dark:bg-card/95',
            )}
          >
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen((o) => !o)}
              className="rounded-xl bg-fg/[0.06] p-2.5 text-fg transition-colors hover:bg-fg/10 active:bg-fg/[0.14] dark:bg-white/[0.08] dark:hover:bg-white/[0.12] dark:active:bg-white/[0.16]"
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-14 z-[45] bg-slate-950/45 backdrop-blur-md sm:top-16 md:hidden dark:bg-black/55"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="flex h-[calc(100dvh-3.5rem)] w-full max-w-none flex-col overflow-hidden border-b border-border bg-card shadow-xl dark:bg-card sm:h-[calc(100dvh-4rem)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                <div className="container mx-auto min-w-0 px-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 sm:px-5">
                  <div className="flex flex-col gap-1">
                    {navigation.map((item) => (
                      <div key={item.name} className="min-w-0">
                        {hasDropdown(item) ? (
                          <div className="py-1">
                            <Link
                              href={item.href}
                              className={cn(
                                'block rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors',
                                isRouteActive('/services', pathname)
                                  ? 'font-semibold text-indigo-600 dark:text-indigo-400'
                                  : 'text-muted hover:text-fg',
                              )}
                              onClick={() => setIsOpen(false)}
                            >
                              {item.name}
                            </Link>
                            <div className="mt-1 flex flex-col gap-0.5 border-l border-border/80 pl-3 dark:border-border">
                              {item.dropdown.map((dropItem: NavDropdownItem) => {
                                const dropActive = pathname === dropItem.href
                                return (
                                  <Link
                                    key={dropItem.name}
                                    href={dropItem.href}
                                    className={cn(
                                      'block rounded-lg py-3 pl-3 pr-4 text-[15px] font-medium transition-colors',
                                      dropActive
                                        ? 'font-semibold text-indigo-600 dark:text-indigo-400'
                                        : 'text-fg hover:bg-fg/5 active:bg-fg/10',
                                    )}
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {dropItem.name}
                                  </Link>
                                )
                              })}
                            </div>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className={cn(
                              'block min-h-[2.75rem] rounded-xl px-4 py-3 text-base font-medium transition-colors',
                              isRouteActive(item.href, pathname)
                                ? 'font-semibold text-indigo-600 dark:text-indigo-400'
                                : 'text-fg hover:bg-fg/5 active:bg-fg/10',
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                    <div className="mt-4 border-t border-border pt-4">
                      <Button
                        href="https://calendar.app.google/vcnJxCrqEPrUnYhB7"
                        variant="primary"
                        size="lg"
                        fullWidth
                        className="min-h-[3rem] rounded-xl"
                      >
                        Start your project
                      </Button>
                      <Button
                        href="/contact"
                        variant="secondary"
                        size="lg"
                        fullWidth
                        className="mt-2 min-h-[3rem] rounded-xl"
                      >
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
