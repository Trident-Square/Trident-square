'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MessageSquare, Phone, X } from 'lucide-react'
import ContactInquiryForm from '@/components/contact/ContactInquiryForm'
import {
  getContactEmail,
  getContactPhoneDisplay,
  getMailtoHref,
  getTelHref,
  getWhatsAppChatUrl,
} from '@/lib/contact'
import { WhatsAppIcon } from '@/components/layout/WhatsAppFloat'
import { easePremium } from '@/lib/motion'
import { OPEN_CONTACT_ENGAGEMENT_MODAL } from '@/lib/open-contact-modal'

const STORAGE_KEY = 'trident-contact-engagement-dismissed'

/** Scroll depth: pass either this fraction of max scroll or min px, whichever comes first */
const MIN_SCROLL_RATIO = 0.2
const MIN_SCROLL_PX = 360

/** Must also stay on the page at least this long (ms) before we show */
const MIN_DWELL_MS = 15_000

const waPrefill =
  "Hi! I've been browsing Trident Square and would like to talk about a project."

export default function ContactEngagementModal() {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const headingId = useId()
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const dismissedRef = useRef(false)

  const email = getContactEmail()
  const phoneDisplay = getContactPhoneDisplay()
  const telHref = getTelHref()
  const mailHref = getMailtoHref('Hello from tridentsquare.com', '')
  const waHref = getWhatsAppChatUrl(waPrefill)

  const dismiss = useCallback((persist = true) => {
    setOpen(false)
    if (persist) {
      dismissedRef.current = true
      try {
        sessionStorage.setItem(STORAGE_KEY, '1')
      } catch {
        /* private mode */
      }
    }
  }, [])

  useEffect(() => {
    if (pathname?.startsWith('/contact')) setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onProgrammaticOpen = () => {
      if (pathname?.startsWith('/contact')) return
      setOpen(true)
    }
    window.addEventListener(OPEN_CONTACT_ENGAGEMENT_MODAL, onProgrammaticOpen)
    return () => window.removeEventListener(OPEN_CONTACT_ENGAGEMENT_MODAL, onProgrammaticOpen)
  }, [pathname])

  useEffect(() => {
    if (pathname?.startsWith('/contact')) return

    let cancelled = false
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) dismissedRef.current = true
    } catch {
      /* ignore */
    }
    if (dismissedRef.current) return

    let scrollMet = false
    let timeMet = false

    const evaluateScroll = () => {
      const doc = document.documentElement
      const maxScroll = Math.max(0, doc.scrollHeight - window.innerHeight)
      const y = window.scrollY
      if (maxScroll <= 0) {
        scrollMet = y >= MIN_SCROLL_PX * 0.5
        return
      }
      const ratio = y / maxScroll
      scrollMet = y >= MIN_SCROLL_PX || ratio >= MIN_SCROLL_RATIO
    }

    const tryOpen = () => {
      if (cancelled || dismissedRef.current) return
      if (scrollMet && timeMet) setOpen(true)
    }

    const onScroll = () => {
      evaluateScroll()
      tryOpen()
    }

    evaluateScroll()

    const dwellTimer = window.setTimeout(() => {
      if (cancelled) return
      timeMet = true
      tryOpen()
    }, MIN_DWELL_MS)

    window.addEventListener('scroll', onScroll, { passive: true })
    tryOpen()

    return () => {
      cancelled = true
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(dwellTimer)
    }
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, dismiss])

  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLInputElement>('#engage-name')?.focus()
    }, 120)
    return () => window.clearTimeout(t)
  }, [open])

  if (pathname?.startsWith('/contact')) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="contact-engagement-layer"
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: reduce ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: reduce ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.26, ease: easePremium }}
        >
          <button
            type="button"
            aria-label="Dismiss"
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm dark:bg-black/60"
            onClick={() => dismiss(true)}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            className="relative z-[1] flex max-h-[min(92dvh,52rem)] w-full max-w-xl flex-col overflow-hidden rounded-t-3xl border border-indigo-200/80 bg-gradient-to-b from-white via-card to-indigo-50/40 shadow-[0_-24px_80px_-20px_rgba(67,56,202,0.35)] ring-1 ring-indigo-950/[0.06] dark:border-slate-600/80 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40 dark:shadow-[0_-28px_90px_-18px_rgba(0,0,0,0.75)] dark:ring-white/[0.06] sm:max-h-[min(88vh,48rem)] sm:rounded-3xl sm:shadow-2xl"
            initial={
              reduce ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reduce ? 0 : 0.38, ease: easePremium, delay: reduce ? 0 : 0.04 }}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/45 to-transparent dark:via-indigo-500/35"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-24 top-24 h-56 w-56 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-500/18"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-20 bottom-0 h-44 w-44 rounded-full bg-teal-400/12 blur-3xl dark:bg-teal-500/12"
              aria-hidden
            />

            <button
              type="button"
              onClick={() => dismiss(true)}
              className="absolute right-3 top-3 z-[2] flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-indigo-100/80 hover:text-fg dark:hover:bg-slate-800 dark:hover:text-slate-100 sm:right-4 sm:top-4"
              aria-label="Close"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>

            <div className="relative z-[1] shrink-0 px-5 pb-3 pt-6 sm:px-7 sm:pb-4 sm:pt-7">
              <p className="premium-eyebrow mb-2.5 text-muted sm:mb-3">
                <span className="premium-eyebrow-bar" />
                Still exploring?
              </p>
              <h2
                id={headingId}
                className="pr-11 text-xl font-semibold leading-snug tracking-tight text-fg sm:pr-12 sm:text-2xl"
              >
                Send a <span className="gradient-text">project note</span>
              </h2>
              <p className="mt-2 max-w-md text-xs leading-relaxed text-muted sm:text-sm">
                Same fields as our contact page — we usually reply within one business day.
              </p>
            </div>

            <div className="relative z-[1] min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-5 pb-4 sm:px-7 sm:pb-5">
              <div className="rounded-2xl border border-indigo-200/75 bg-white/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-sm dark:border-slate-600/70 dark:bg-slate-950/65 dark:shadow-none sm:p-5">
                <ContactInquiryForm
                  idPrefix="engage"
                  compact
                  successVariant="modal"
                  onSuccessClose={() => dismiss(true)}
                />
              </div>
              <p className="mt-3 text-center text-[11px] text-muted sm:text-xs">
                Prefer the full page?{' '}
                <Link
                  href="/contact"
                  className="font-semibold text-accent underline-offset-2 hover:underline"
                  onClick={() => dismiss(true)}
                >
                  Open contact
                </Link>
              </p>
            </div>

            <div className="relative z-[1] shrink-0 border-t border-indigo-100/90 bg-white/50 px-5 py-3.5 dark:border-slate-600/60 dark:bg-slate-950/40 sm:px-7 sm:py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <button
                  type="button"
                  onClick={() => dismiss(true)}
                  className="text-left text-xs font-semibold text-muted underline-offset-2 transition-colors hover:text-fg sm:text-sm"
                >
                  Maybe later
                </button>
                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  <span className="hidden text-[10px] font-bold uppercase tracking-[0.16em] text-muted sm:inline sm:mr-1">
                    Or
                  </span>
                  {waHref ? (
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200/85 bg-emerald-50/95 px-2.5 py-1.5 text-xs font-semibold text-emerald-900 shadow-sm transition-colors hover:border-emerald-300 dark:border-emerald-800/55 dark:bg-emerald-950/50 dark:text-emerald-100"
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
                      WhatsApp
                    </a>
                  ) : null}
                  {telHref ? (
                    <a
                      href={telHref}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200/85 bg-indigo-50/90 px-2.5 py-1.5 text-xs font-semibold text-indigo-950 dark:border-slate-600 dark:bg-slate-800/90 dark:text-slate-100"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      Call
                    </a>
                  ) : null}
                  {mailHref ? (
                    <a
                      href={mailHref}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/95 px-2.5 py-1.5 text-xs font-semibold text-fg dark:bg-slate-900/90"
                    >
                      <MessageSquare className="h-3.5 w-3.5 shrink-0 text-indigo-600 dark:text-indigo-300" aria-hidden />
                      Email
                    </a>
                  ) : null}
                  {!waHref && !telHref && !mailHref ? (
                    <Link
                      href="/contact"
                      className="text-xs font-semibold text-accent hover:underline"
                      onClick={() => dismiss(true)}
                    >
                      Contact page
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
