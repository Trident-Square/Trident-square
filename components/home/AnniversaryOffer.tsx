'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check, Phone, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'
import { getTelHref } from '@/lib/contact'
import { openContactEngagementModal } from '@/lib/open-contact-modal'
import { fadeUpVariants, staggerDelay, transition } from '@/lib/motion'

const starterFeatures = [
  'Up to 6 pages',
  'Contact form + WhatsApp chat',
  'Google Map + gallery',
  'Delivery in 2–3 days',
]

const premiumFeatures = [
  'Up to 20 pages + CMS',
  'Blog, gallery, advanced forms',
  'Basic on-page SEO',
  'Delivery in 8–10 days',
]

export default function AnniversaryOffer() {
  const reduce = useReducedMotion()
  const telHref = getTelHref()

  const headerVariants = {
    hidden: { opacity: reduce ? 1 : 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay(reduce, 0.08, 0.06).staggerChildren,
        delayChildren: staggerDelay(reduce, 0.08, 0.06).delayChildren,
      },
    },
  }
  const headerItem = fadeUpVariants(reduce, 14)

  return (
    <section
      id="february-offer"
      className="relative py-10 sm:py-12 lg:py-14"
      aria-labelledby="anniversary-offer-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[min(32rem,85%)] -translate-y-1/2 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(99,102,241,0.11),transparent_65%)] dark:bg-[radial-gradient(ellipse_68%_58%_at_50%_50%,rgba(129,140,248,0.14),transparent_68%)]" aria-hidden />

      <div className="container mx-auto min-w-0 max-w-7xl px-3.5 sm:px-6 lg:px-8">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="mx-auto mb-8 max-w-2xl text-center sm:mb-10 lg:mb-12"
        >
          <motion.div variants={headerItem} className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:mb-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200/80 bg-gradient-to-r from-rose-50 to-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-rose-900/90 shadow-sm shadow-rose-900/5 dark:border-rose-400/25 dark:from-rose-950/80 dark:to-amber-950/60 dark:text-rose-100/95">
              <Sparkles className="h-3 w-3 shrink-0 text-rose-600 dark:text-rose-300" strokeWidth={2.5} aria-hidden />
              April special
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">6-month anniversary</span>
          </motion.div>
          <motion.p variants={headerItem} className="premium-eyebrow mb-3 justify-center text-muted sm:mb-4">
            <span className="premium-eyebrow-bar" />
            Website packages
          </motion.p>
          <motion.h2
            id="anniversary-offer-heading"
            variants={headerItem}
            className="text-balance text-[clamp(1.45rem,3.8vw,2.25rem)] font-semibold leading-tight tracking-tight text-fg md:text-4xl"
          >
            Conversion-focused sites,{' '}
            <span className="gradient-text">launch-ready</span> delivery
          </motion.h2>
          <motion.p variants={headerItem} className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
            Limited-time anniversary pricing: polished websites with essentials wired up—forms, maps, and messaging—so
            you can go live fast.
          </motion.p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-5 sm:gap-6 md:grid-cols-2 md:items-stretch">
          {/* Starter */}
          <motion.article
            initial={reduce ? undefined : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={transition(reduce, 0.5, { delay: 0.05 })}
            className="relative flex flex-col overflow-hidden rounded-3xl border border-indigo-200/60 bg-white/85 p-6 shadow-[0_20px_50px_-28px_rgba(67,56,202,0.2)] ring-1 ring-indigo-950/[0.04] backdrop-blur-sm dark:border-slate-600/70 dark:bg-slate-900/75 dark:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)] dark:ring-white/[0.05] sm:p-8"
          >
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600/90 dark:text-indigo-300/90">
                Starter
              </p>
              <p className="mt-2 text-lg font-semibold text-fg sm:text-xl">Basic website</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-sm font-semibold text-muted">₹</span>
                <span className="text-4xl font-bold tracking-tight text-fg sm:text-[2.75rem]">9,999</span>
              </div>
            </div>
            <ul className="mb-8 flex flex-1 flex-col gap-3">
              {starterFeatures.map((line) => (
                <li key={line} className="flex gap-3 text-sm text-muted">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200">
                    <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                  </span>
                  <span className="leading-snug text-fg/90">{line}</span>
                </li>
              ))}
            </ul>
            <Button href="/contact" variant="outline" size="lg" fullWidth className="mt-auto border-indigo-200/90 hover:border-indigo-300 hover:bg-indigo-50/80 dark:border-slate-500 dark:hover:border-indigo-400/40 dark:hover:bg-slate-800/80">
              Enquire — Starter
            </Button>
          </motion.article>

          {/* Premium */}
          <motion.article
            initial={reduce ? undefined : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={transition(reduce, 0.5, { delay: 0.12 })}
            className="relative flex flex-col overflow-hidden rounded-3xl border-2 border-indigo-400/45 bg-gradient-to-b from-white via-indigo-50/40 to-white p-6 shadow-[0_28px_70px_-22px_rgba(67,56,202,0.35)] ring-2 ring-indigo-500/15 dark:border-indigo-400/35 dark:from-slate-900 dark:via-indigo-950/35 dark:to-slate-900 dark:shadow-[0_32px_80px_-20px_rgba(0,0,0,0.65)] dark:ring-indigo-400/20 sm:p-8"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-500/20"
              aria-hidden
            />
            <span className="absolute right-5 top-5 inline-flex items-center rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md shadow-indigo-900/25 sm:right-6 sm:top-6">
              Most popular
            </span>
            <div className="mb-6 pr-24 sm:pr-28">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">
                Premium
              </p>
              <p className="mt-2 text-lg font-semibold text-fg sm:text-xl">Premium website</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-sm font-semibold text-muted">₹</span>
                <span className="text-4xl font-bold tracking-tight text-fg sm:text-[2.75rem]">29,999</span>
              </div>
            </div>
            <ul className="relative mb-8 flex flex-1 flex-col gap-3">
              {premiumFeatures.map((line) => (
                <li key={line} className="flex gap-3 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm dark:bg-indigo-500">
                    <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                  </span>
                  <span className="leading-snug text-fg/95">{line}</span>
                </li>
              ))}
            </ul>
            <Button href="/contact" variant="primary" size="lg" fullWidth className="relative mt-auto shadow-lg">
              Enquire — Premium
            </Button>
          </motion.article>
        </div>

        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition(reduce, 0.45, { delay: 0.08 })}
          className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted sm:mt-10 sm:text-base"
        >
          Need a broader scope or a custom plan?{' '}
          <button
            type="button"
            onClick={() => openContactEngagementModal()}
            className="inline-flex items-center gap-1.5 bg-transparent p-0 font-semibold text-accent underline decoration-indigo-400/40 underline-offset-4 transition-colors hover:text-indigo-600 hover:decoration-indigo-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg dark:hover:text-indigo-300 dark:focus-visible:ring-indigo-400/35 dark:focus-visible:ring-offset-slate-900"
          >
            {telHref ? <Phone className="h-4 w-4 shrink-0 opacity-80" aria-hidden /> : null}
            {telHref ? 'Call us for a custom quote' : 'Contact us for a custom quote'}
          </button>
        </motion.p>
      </div>
    </section>
  )
}
