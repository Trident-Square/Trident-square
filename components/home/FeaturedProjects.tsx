'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play, X } from 'lucide-react'

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
  const [selected, setSelected] = useState<(typeof featured)[number] | null>(null)

  return (
    <section className="py-16 lg:py-20 bg-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-muted uppercase tracking-[0.2em]">
              Featured work
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-fg">
              Recent <span className="gradient-text">projects</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden sm:inline-flex items-center text-sm font-medium text-accent hover:text-fg"
          >
            View full portfolio
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {featured.map((proj) => (
            <motion.article
              key={proj.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl bg-card shadow-sm border hover:border-border/60 border-transparent hover:shadow-2xl hover:shadow-cyan-500/30 transition-all flex flex-col overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-fg/5">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 sm:p-7 flex flex-col gap-4">
                <p className="text-[11px] font-medium text-muted uppercase tracking-wide">
                  {proj.tag}
                </p>
                <h3 className="text-xl font-semibold text-fg">{proj.title}</h3>
                <p className="text-sm text-muted leading-relaxed flex-1">
                  {proj.description}
                </p>
                <div className="mt-1 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setSelected(proj)}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 text-[11px] font-bold uppercase tracking-wide text-white shadow-md shadow-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/60 hover:brightness-110 transition-all"
                  >
                    <Play className="h-3.5 w-3.5" />
                    See demo
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && selected.video && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl rounded-2xl bg-card p-4 sm:p-6 shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_25px_70px_rgba(15,23,42,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-fg flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Play className="h-3.5 w-3.5" />
                  </span>
                  {selected.title} – Demo
                </h3>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-full p-1.5 text-muted hover:text-fg hover:bg-fg/5 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="relative w-full overflow-hidden rounded-xl bg-black ring-2 ring-accent/60">
                <video
                  src={selected.video}
                  controls
                  autoPlay
                  className="w-full h-full max-h-[80vh] object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}