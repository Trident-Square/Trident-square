'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'
import ThemeToggle from '@/components/ui/ThemeToggle'

const navigation = [
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

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 shadow-lg shadow-black/40' : 'bg-transparent'
      }`}
    >
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300"
      >
        <nav className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center shrink-0 text-2xl sm:text-3xl font-extrabold tracking-tight text-fg hover:opacity-90 transition-opacity"
          >
            Trident <span className="gradient-text">Square</span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium text-muted hover:text-fg hover:bg-fg/5 transition-colors">
                    <span>{item.name}</span>
                    <ChevronDown className="w-4 h-4 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-4 py-2.5 rounded-lg text-sm font-medium text-muted hover:text-fg hover:bg-fg/5 transition-colors"
                  >
                    {item.name}
                  </Link>
                )}

                {item.dropdown && (
                  <div className="absolute top-full left-0 pt-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="min-w-[220px] py-2 rounded-xl bg-card shadow-xl border border-border overflow-hidden">
                      {item.dropdown.map((dropItem) => (
                        <Link
                          key={dropItem.name}
                          href={dropItem.href}
                          className="block px-4 py-2.5 text-sm text-muted hover:text-fg hover:bg-accent/5 transition-colors"
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {/* <ThemeToggle /> */}
            <Button
              href="https://calendar.app.google/vcnJxCrqEPrUnYhB7"
              variant="primary"
              size="sm"
              className="rounded-full px-6 font-semibold"
            >
              Start your project
            </Button>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            {/* <ThemeToggle /> */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-fg hover:bg-fg/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[4.5rem] z-40 lg:hidden bg-card backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="container mx-auto px-4 sm:px-6 py-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div className="py-2">
                        <p className="px-4 py-2 text-xs font-semibold text-muted uppercase tracking-wider">
                          {item.name}
                        </p>
                        {item.dropdown.map((dropItem) => (
                          <Link
                            key={dropItem.name}
                            href={dropItem.href}
                            className="block py-3 px-4 text-fg rounded-xl hover:bg-fg/5 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {dropItem.name}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block py-3 px-4 text-fg font-medium rounded-xl hover:bg-fg/5 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="mt-6 pt-4 px-4">
                  <Button href="/contact" variant="primary" size="lg" fullWidth className="rounded-xl">
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
