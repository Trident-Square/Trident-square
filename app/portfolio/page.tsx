"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Play, X } from "lucide-react"
import Button from '@/components/ui/Button'

type Stat = { label: string; value: string }

type WorkItem = {
  title: string
  category: string
  image: string
  description: string
  stats: Stat[]
  video?: string
  video2?: string
  iframeUrl?: string
  externalLinks?: { label: string; url: string }[]
}

const works: WorkItem[] = [
  {
    title: 'ARIA Voice Agent',
    category: 'Voice AI',
    image: '/project/assets/project-aria.jpg',
    description:
      '24/7 AI-powered voice assistant built on Twilio and Gemini API for hotel guest experience.',
    stats: [
      { label: 'Response', value: '<2s' },
      { label: 'Satisfaction', value: '94%' },
      { label: 'Staff load', value: '-60%' },
    ],
    video: '/project/ARIA demo .mp4',
  },
  {
    title: 'Gigtap Hiring Platform',
    category: 'AI Platform',
    image: '/project/assets/thumbnail-gigtap.png',
    description:
      "India's AI-powered hiring platform connecting blue and grey-collar workers with employers for safe, reliable, and nearby jobs.",
    stats: [
      { label: 'Matching', value: 'AI' },
      { label: 'Verification', value: 'Auto' },
      { label: 'Hiring speed', value: '3×' },
    ],
    video: '/project/gigtap.mp4',
    externalLinks: [
      { label: 'Web app', url: 'https://gigtap.in/' },
      {
        label: 'Play Store',
        url: 'https://play.google.com/store/search?q=gigtap&c=apps&hl=en_IN',
      },
    ],
  },
  {
    title: 'NowoChat',
    category: 'Conversational AI',
    image: '/project/assets/thumbnail-nowochat.png',
    description:
      'AI-powered document and chat assistant that lets users upload documents, ask questions, and get intelligent, context-aware responses in real time.',
    stats: [
      { label: 'Documents', value: 'Multi' },
      { label: 'AI model', value: 'GPT' },
      { label: 'Context', value: 'Smart' },
    ],
    video: '/project/nowochat.mp4',
  },
  {
    title: 'Gamecam',
    category: 'Sports AI',
    image: '/project/assets/project-padel-ai.jpg', // no dedicated thumbnail, reuse
    description:
      'Padel game analytics app showing stats for four players and the game—scores, rallies, shot types, and performance insights in real time.',
    stats: [
      { label: 'Players', value: '4' },
      { label: 'Analytics', value: 'Live' },
      { label: 'AI stats', value: 'Full' },
    ],
    video: '/project/gamecam web.mp4',
    iframeUrl: 'https://gametraq-app.lovable.app',
  },
  {
    title: 'Trendify',
    category: 'AI Platform',
    image: '/project/assets/thumbnail-trendify.png',
    description:
      'Prompt management and AI generation platform that democratizes high-end digital aesthetics—viral filters, resume styles, and event themes without technical AI knowledge.',
    stats: [
      { label: 'Themes', value: '50+' },
      { label: 'Styles', value: 'AI' },
      { label: 'Users', value: 'Growing' },
    ],
    video: '/project/trendify.mp4',
  },
  {
    title: 'InstaBus',
    category: 'Voice AI',
    image: '/project/assets/thumbnail-instabus.png',
    description:
      'AI voice concierge for bus travel—handles booking confirmation to post-trip feedback with multilingual support and real-time escalation.',
    stats: [
      { label: 'Onboarding', value: '50% faster' },
      { label: 'Availability', value: '24/7' },
      { label: 'Languages', value: 'Multi' },
    ],
    video: '/project/Instabus vdo.mp4',
  },
  {
    title: 'AI Voice Form Assistant',
    category: 'Voice AI',
    image: '/project/assets/thumbnail-ai-voice-form.png',
    description:
      'Voice-powered form filling assistant that lets users provide information hands‑free and guides them through the platform conversationally.',
    stats: [
      { label: 'Input', value: 'Voice' },
      { label: 'Accuracy', value: '98%' },
      { label: 'Guidance', value: 'Smart' },
    ],
    video: '/project/gigtap form agent.mp4',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35 },
  },
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [selected, setSelected] = useState<WorkItem | null>(null)

  const categories = useMemo(
    () => ['All', 'AI', 'Android & iOS', 'Website'],
    [],
  )

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return works

    if (activeCategory === 'AI') {
      // Only show these four projects in AI tab
      const aiTitles = [
        'aria voice agent',
        'gamecam',
        'instabus',
        'ai voice form assistant',
      ]
      return works.filter((w) => aiTitles.includes(w.title.toLowerCase()))
    }

    if (activeCategory === 'Android & iOS') {
      // Explicitly treat Trendify + NowoChat as Android/iOS,
      // plus anything with "mobile" in category if added later.
      return works.filter(
        (w) =>
          ['trendify', 'nowochat'].includes(w.title.toLowerCase()) ||
          w.category.toLowerCase().includes('mobile'),
      )
    }

    if (activeCategory === 'Website') {
      // ARIA Voice Agent should appear here, plus general web / platform work.
      return works.filter(
        (w) =>
          w.title.toLowerCase().includes('aria voice agent') ||
          w.category.toLowerCase().includes('platform') ||
          w.category.toLowerCase().includes('vision') ||
          w.category.toLowerCase().includes('iot') ||
          w.category.toLowerCase().includes('edtech') ||
          w.category.toLowerCase().includes('robotics'),
      )
    }

    return works
  }, [activeCategory])

  return (
    <div className="pt-8 lg:pt-10 min-h-screen relative bg-mesh bg-dots overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 lg:mb-10 max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-fg">
            AI‑driven <span className="gradient-text">products & platforms</span>
          </h1>
          <p className="text-muted mt-4 text-sm sm:text-base max-w-2xl mx-auto">
            Real projects across sports analytics, voice AI, automation, robotics, and
            more—built end‑to‑end by our team.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-3"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-2.5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/40'
                  : 'text-muted hover:text-fg hover:bg-fg/5'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          key={activeCategory}
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {filtered.map((project) => (
            <motion.article
              key={project.title}
              variants={item}
              className="group flex flex-col rounded-2xl overflow-hidden bg-card/95 backdrop-blur-sm border border-border/70 border-transparent shadow-sm hover:shadow-2xl hover:shadow-cyan-500/30 transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-fg/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-fg">{project.title}</h3>
                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-fg/5 text-xs text-muted">
                    {project.category}
                  </span>
                </div>
                <p className="text-muted text-sm leading-relaxed flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stats.map((s) => (
                    <span
                      key={s.label}
                      className="inline-flex items-center rounded-full bg-fg/5 px-2.5 py-1 text-[11px] text-muted"
                    >
                      <span className="mr-1 font-medium text-fg/80">{s.label}:</span>
                      {s.value}
                    </span>
                  ))}
                </div>
                {project.video && (
                  <div className="mt-5 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setSelected(project)}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 text-xs font-bold tracking-wide uppercase text-white shadow-md shadow-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/60 hover:brightness-110 transition-all"
                    >
                      <Play className="h-3.5 w-3.5" />
                      See demo
                    </button>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Video modal */}
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
              className="relative w-full max-w-3xl rounded-2xl bg-card p-4 sm:p-6 shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_25px_70px_rgba(15,23,42,0.8)]"
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
                  className="w-full h-full max-h-[70vh] object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 lg:mt-32 py-16 text-center"
        >
          <h2 className="text-2xl font-bold text-fg mb-2">
            Want your project here next?
          </h2>
          <p className="text-muted mb-8 max-w-md mx-auto text-sm sm:text-base">
            Tell us what you&apos;re building—from idea to live product, we&apos;ll help you
            ship it.
          </p>
          <Button href="/contact" variant="primary" size="lg" className="shine-hover">
            Start your project
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.section>
      </div>
    </div>
  )
}