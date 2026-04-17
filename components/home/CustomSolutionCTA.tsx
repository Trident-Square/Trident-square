'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { transition } from '@/lib/motion'

export default function CustomSolutionCTA() {
  const reduce = useReducedMotion()

  return (
    <section className="relative py-10 lg:py-14">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 22, scale: 0.99 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={transition(reduce, 0.55, { delay: 0.05 })}
          className="relative overflow-hidden rounded-3xl border border-indigo-300/35 bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-800 shadow-2xl shadow-indigo-900/20 dark:border-indigo-500/30 dark:from-indigo-950 dark:via-[#151032] dark:to-blue-950 dark:shadow-[0_0_0_1px_rgba(99,102,241,0.12),0_24px_70px_-18px_rgba(0,0,0,0.65)]"
        >
          {/* Light: soft white lift; dark: faint indigo glow only — no bright sky wash */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_100%_-10%,rgba(255,255,255,0.22),transparent_50%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_95%_-8%,rgba(99,102,241,0.22),transparent_58%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-indigo-950/30 via-transparent to-white/10 dark:from-black/45 dark:via-transparent dark:to-transparent"
            aria-hidden
          />

          <div
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent dark:via-indigo-500/35 sm:inset-x-12"
            aria-hidden
          />

          <div className="relative flex flex-col gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-14 lg:py-14">
            <motion.div
              className="max-w-xl min-w-0"
              initial={reduce ? undefined : { opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={transition(reduce, 0.45, { delay: 0.12 })}
            >
              <p className="mb-4 inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white/55 dark:text-indigo-300/55">
                <span className="h-4 w-1 shrink-0 rounded-full bg-white/50 shadow-sm shadow-indigo-950/30 dark:bg-indigo-400/50 dark:shadow-indigo-950/50" />
                Next step
              </p>
              <h2 className="mb-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Planning a{' '}
                <span className="text-indigo-100 drop-shadow-sm dark:text-indigo-200">custom build?</span>
              </h2>
              <p className="text-sm leading-relaxed text-indigo-100/90 dark:text-indigo-100/80 sm:text-base">
                Share goals, constraints, and timeline—we&apos;ll respond with a concise
                approach, rough phases, and a transparent estimate.
              </p>
            </motion.div>
            <motion.div
              className="shrink-0"
              initial={reduce ? undefined : { opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={transition(reduce, 0.45, { delay: 0.18 })}
            >
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="w-full justify-center border border-white/25 bg-white text-indigo-700 shadow-lg shadow-indigo-950/25 ring-1 ring-white/40 hover:bg-indigo-50 hover:text-indigo-800 sm:w-auto dark:border-white/20 dark:bg-white dark:text-indigo-800 dark:hover:bg-indigo-50"
              >
                Request a proposal
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
