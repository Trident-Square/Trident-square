'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Play, X } from 'lucide-react'
import { easePremium, staggerDelay, transition } from '@/lib/motion'

const featured = [
  {
    title: 'Gigtap Hiring Platform',
    tag: 'Hiring platform',
    description:
      "India's hiring platform connecting blue and grey‑collar workers with employers for safe, reliable, and nearby jobs.",
    image: '/project/assets/project-smart-parking.jpg',
    video: '/project/gigtap.mp4',
  },
  {
    title: 'NowoChat',
    tag: 'Document & chat assistant',
    description:
      'Document and chat assistant that lets users upload documents, ask questions, and get intelligent, context‑aware responses in real time.',
    image: '/project/assets/project-aria.jpg',
    video: '/project/nowochat.mp4',
  },
  {
    title: 'AI Voice Form Assistant',
    tag: 'Voice form helper',
    description:
      'Voice‑powered form assistant that lets users provide information hands‑free and guides them through the platform conversationally.',
    image: '/project/assets/project-aria.jpg',
    video: '/project/gigtap form agent.mp4',
  },
]

export default function FeaturedProjects() {
  const reduce = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [selected, setSelected] = useState<(typeof featured)[number] | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!selected) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [selected])

  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  const headerVariants = {
    hidden: { opacity: reduce ? 1 : 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay(reduce, 0.1, 0.06).staggerChildren,
        delayChildren: staggerDelay(reduce, 0.1, 0.06).delayChildren,
      },
    },
  }
  const headerChild = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: transition(reduce, 0.48),
    },
  }

  const gridVariants = {
    hidden: { opacity: reduce ? 1 : 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay(reduce, 0.12, 0.15).staggerChildren,
        delayChildren: staggerDelay(reduce, 0.12, 0.15).delayChildren,
      },
    },
  }
  const cardVariants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: transition(reduce, 0.5),
    },
  }

  return (
    <section className="relative py-10 lg:py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="mb-8 max-w-3xl lg:mb-10"
        >
          <motion.p
            variants={headerChild}
            className="premium-eyebrow mb-4"
          >
            <span className="premium-eyebrow-bar" />
            Selected work
          </motion.p>
          <motion.h2
            variants={headerChild}
            className="text-2xl font-semibold tracking-tight text-fg md:text-3xl lg:text-[2.1rem]"
          >
            Recent <span className="gradient-text">case studies</span>
          </motion.h2>
          <motion.p
            variants={headerChild}
            className="text-muted text-sm mt-3 leading-relaxed max-w-2xl"
          >
            Representative builds across platforms, automation, and product UX.
          </motion.p>
          <motion.div variants={headerChild}>
            <Link
              href="/portfolio"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50/80 px-4 py-2 text-sm font-semibold text-indigo-800 shadow-sm transition-colors hover:border-indigo-300 hover:bg-indigo-100/90 dark:border-indigo-500/30 dark:bg-slate-900/80 dark:text-indigo-200 dark:hover:border-indigo-400/50 dark:hover:bg-slate-800"
            >
              Full portfolio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {featured.map((proj) => (
            <motion.article
              key={proj.title}
              variants={cardVariants}
              whileHover={reduce ? undefined : { y: -4 }}
              transition={{ duration: 0.3, ease: easePremium }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-indigo-100/70 bg-card shadow-md shadow-indigo-900/[0.04] ring-1 ring-indigo-900/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200/90 hover:shadow-xl hover:shadow-indigo-500/12 dark:border-slate-700 dark:ring-white/[0.04] dark:hover:border-slate-500 dark:hover:shadow-black/45"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200/80 dark:from-slate-800 dark:to-slate-900">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent opacity-90 dark:from-slate-950/50"
                  aria-hidden
                />
              </div>
              <div className="p-5 sm:p-6 flex flex-col gap-3 flex-1">
                <p className="text-[11px] font-semibold text-muted uppercase tracking-wide">
                  {proj.tag}
                </p>
                <h3 className="text-lg font-semibold text-fg">{proj.title}</h3>
                <p className="text-sm text-muted leading-relaxed flex-1">
                  {proj.description}
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSelected(proj)}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-fg hover:bg-accent-soft/40 hover:border-border transition-colors w-full sm:w-auto justify-center dark:hover:bg-slate-800 dark:hover:border-slate-600"
                  >
                    <Play className="h-4 w-4 text-accent" />
                    Watch demo
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {selected && selected.video && (
              <motion.div
                key={selected.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transition(reduce, 0.25)}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 px-4"
                onClick={() => setSelected(null)}
              >
                <motion.div
                  initial={reduce ? undefined : { opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 380, damping: 32, mass: 0.85 }
                  }
                  className="relative w-full max-w-4xl rounded-xl bg-card p-4 sm:p-6 border border-border shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-fg flex items-center gap-2 min-w-0">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent shrink-0">
                        <Play className="h-4 w-4" />
                      </span>
                      <span className="truncate">{selected.title}</span>
                      <span className="text-muted font-normal hidden sm:inline">— demo</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      className="rounded-lg p-2 text-muted hover:text-fg hover:bg-slate-100 transition-colors shrink-0 dark:hover:bg-slate-800"
                      aria-label="Close"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="relative w-full overflow-hidden rounded-lg bg-slate-950 ring-1 ring-border">
                    <video
                      src={selected.video}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full max-h-[80vh] object-contain"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  )
}
