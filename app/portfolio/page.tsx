"use client"

import { useMemo, useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Play, X, ExternalLink, Sparkles } from "lucide-react"
import Button from "@/components/ui/Button"
import SiteCanvas from "@/components/layout/SiteCanvas"
import { cn } from "@/lib/utils"

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
    title: "ARIA Voice Agent",
    category: "Voice AI",
    image: "/project/assets/project-aria.jpg",
    description:
      "24/7 AI-powered voice assistant built on Twilio and Gemini API for hotel guest experience.",
    stats: [
      { label: "Response", value: "<2s" },
      { label: "Satisfaction", value: "94%" },
      { label: "Staff load", value: "-60%" },
    ],
    video: "/project/ARIA demo .mp4",
  },
  {
    title: "Gigtap Hiring Platform",
    category: "AI Platform",
    image: "/project/assets/thumbnail-gigtap.png",
    description:
      "India's AI-powered hiring platform connecting blue and grey-collar workers with employers for safe, reliable, and nearby jobs.",
    stats: [
      { label: "Matching", value: "AI" },
      { label: "Verification", value: "Auto" },
      { label: "Hiring speed", value: "3×" },
    ],
    video: "/project/gigtap.mp4",
    externalLinks: [
      { label: "Web app", url: "https://gigtap.in/" },
      {
        label: "Play Store",
        url: "https://play.google.com/store/search?q=gigtap&c=apps&hl=en_IN",
      },
    ],
  },
  {
    title: "NowoChat",
    category: "Conversational AI",
    image: "/project/assets/thumbnail-nowochat.png",
    description:
      "AI-powered document and chat assistant that lets users upload documents, ask questions, and get intelligent, context-aware responses in real time.",
    stats: [
      { label: "Documents", value: "Multi" },
      { label: "AI model", value: "GPT" },
      { label: "Context", value: "Smart" },
    ],
    video: "/project/nowochat.mp4",
  },
  {
    title: "Gamecam",
    category: "Sports AI",
    image: "/project/assets/project-padel-ai.jpg",
    description:
      "Padel game analytics app showing stats for four players and the game—scores, rallies, shot types, and performance insights in real time.",
    stats: [
      { label: "Players", value: "4" },
      { label: "Analytics", value: "Live" },
      { label: "AI stats", value: "Full" },
    ],
    video: "/project/gamecam web.mp4",
    iframeUrl: "https://gametraq-app.lovable.app",
  },
  {
    title: "Trendify",
    category: "AI Platform",
    image: "/project/assets/thumbnail-trendify.png",
    description:
      "Prompt management and AI generation platform that democratizes high-end digital aesthetics—viral filters, resume styles, and event themes without technical AI knowledge.",
    stats: [
      { label: "Themes", value: "50+" },
      { label: "Styles", value: "AI" },
      { label: "Users", value: "Growing" },
    ],
    video: "/project/trendify.mp4",
  },
  {
    title: "InstaBus",
    category: "Voice AI",
    image: "/project/assets/thumbnail-instabus.png",
    description:
      "AI voice concierge for bus travel—handles booking confirmation to post-trip feedback with multilingual support and real-time escalation.",
    stats: [
      { label: "Onboarding", value: "50% faster" },
      { label: "Availability", value: "24/7" },
      { label: "Languages", value: "Multi" },
    ],
    video: "/project/Instabus vdo.mp4",
  },
  {
    title: "AI Voice Form Assistant",
    category: "Voice AI",
    image: "/project/assets/thumbnail-ai-voice-form.png",
    description:
      "Voice-powered form filling assistant that lets users provide information hands‑free and guides them through the platform conversationally.",
    stats: [
      { label: "Input", value: "Voice" },
      { label: "Accuracy", value: "98%" },
      { label: "Guidance", value: "Smart" },
    ],
    video: "/project/gigtap form agent.mp4",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const projectCardClass =
  "group flex flex-col overflow-hidden rounded-2xl border border-indigo-200/80 bg-white shadow-[0_14px_44px_-22px_rgba(30,41,59,0.18)] ring-1 ring-indigo-950/[0.04] transition-[transform,box-shadow,border-color,ring-color] duration-300 " +
  "hover:-translate-y-1 hover:border-indigo-400/65 hover:shadow-[0_0_0_1px_rgba(129,140,248,0.35),0_0_24px_-2px_rgba(99,102,241,0.35),0_28px_56px_-18px_rgba(99,102,241,0.22)] hover:ring-indigo-400/25 " +
  "dark:border-slate-600/55 dark:bg-[#070a12] dark:ring-white/[0.05] dark:hover:border-indigo-400/50 dark:hover:shadow-[0_0_0_1px_rgba(129,140,248,0.4),0_0_32px_-4px_rgba(99,102,241,0.25),0_28px_56px_-14px_rgba(0,0,0,0.55)] dark:hover:ring-indigo-400/20 sm:rounded-3xl"

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [selected, setSelected] = useState<WorkItem | null>(null)

  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null)
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [selected])

  const categories = useMemo(
    () => ["All", "AI", "Android & iOS", "Website"],
    [],
  )

  const filtered = useMemo(() => {
    if (activeCategory === "All") return works

    if (activeCategory === "AI") {
      const aiTitles = [
        "aria voice agent",
        "gamecam",
        "instabus",
        "ai voice form assistant",
      ]
      return works.filter((w) => aiTitles.includes(w.title.toLowerCase()))
    }

    if (activeCategory === "Android & iOS") {
      return works.filter(
        (w) =>
          ["trendify", "nowochat"].includes(w.title.toLowerCase()) ||
          w.category.toLowerCase().includes("mobile"),
      )
    }

    if (activeCategory === "Website") {
      return works.filter(
        (w) =>
          w.title.toLowerCase().includes("aria voice agent") ||
          w.category.toLowerCase().includes("platform") ||
          w.category.toLowerCase().includes("vision") ||
          w.category.toLowerCase().includes("iot") ||
          w.category.toLowerCase().includes("edtech") ||
          w.category.toLowerCase().includes("robotics"),
      )
    }

    return works
  }, [activeCategory])

  return (
    <SiteCanvas>
      <div className="relative z-[1] min-h-0 overflow-x-clip overflow-y-visible bg-dots pt-[max(6rem,calc(4rem+env(safe-area-inset-top,0px)+1rem))] sm:pt-20 lg:pt-24">
        <div className="container mx-auto min-w-0 max-w-6xl px-3 pb-14 sm:px-6 sm:pb-20 lg:max-w-7xl lg:px-8 lg:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto mb-7 min-w-0 max-w-3xl text-center sm:mb-10 lg:mb-12"
          >
            <p className="premium-eyebrow mx-auto mb-2.5 justify-center text-muted sm:mb-4">
              <span className="premium-eyebrow-bar" />
              Selected work
            </p>
            <h1 className="text-[clamp(1.45rem,4.2vw,3.65rem)] font-bold leading-[1.12] tracking-tight text-fg sm:leading-tight md:text-5xl lg:text-6xl lg:leading-[1.08]">
              AI‑driven{" "}
              <span className="gradient-text">products & platforms</span>
            </h1>
            <p className="mx-auto mt-2.5 max-w-2xl text-pretty text-sm leading-relaxed text-muted sm:mt-4 sm:text-base md:text-lg">
              Real projects across sports analytics, voice AI, automation, and
              platforms—designed and shipped end‑to‑end by our team.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mb-7 sm:mb-10"
          >
            <div className="-mx-1 flex justify-center sm:mx-0">
              <div
                className={cn(
                  "max-w-[100vw] overflow-x-auto overflow-y-visible px-1 pb-1.5 [-ms-overflow-style:none] [scrollbar-width:none]",
                  "[&::-webkit-scrollbar]:hidden sm:max-w-none sm:overflow-visible sm:px-0 sm:pb-0",
                )}
              >
                <div className="inline-flex w-max gap-1.5 rounded-2xl border border-indigo-200/70 bg-white/90 p-1.5 shadow-sm ring-1 ring-indigo-950/[0.03] dark:border-slate-600/60 dark:bg-[#070a12]/90 dark:ring-white/[0.04] sm:w-auto sm:flex-wrap sm:justify-center sm:gap-2 sm:p-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={cn(
                        "shrink-0 whitespace-nowrap rounded-xl px-3 py-2.5 text-xs font-semibold tracking-wide transition-all duration-200 sm:rounded-full sm:px-4 sm:py-2.5 sm:text-sm",
                        activeCategory === category
                          ? "bg-gradient-to-r from-indigo-600 via-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-white/20 dark:from-indigo-500 dark:via-indigo-500 dark:to-blue-500 dark:shadow-indigo-950/50 dark:ring-white/15"
                          : "text-muted hover:bg-indigo-50/80 hover:text-fg active:bg-indigo-100/80 dark:hover:bg-white/[0.06] dark:hover:text-fg dark:active:bg-white/[0.08]",
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            key={activeCategory}
            className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-7 md:gap-8 lg:gap-10 xl:grid-cols-3"
          >
            {filtered.map((project) => (
              <motion.article
                key={project.title}
                variants={item}
                className={projectCardClass}
              >
                <div className="relative aspect-[4/3] min-h-[11rem] overflow-hidden bg-fg/5 ring-1 ring-inset ring-black/[0.04] dark:ring-white/[0.06] sm:min-h-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />
                </div>

                <div className="flex flex-1 flex-col gap-2.5 p-4 sm:gap-3 sm:p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                    <h3 className="min-w-0 text-base font-semibold leading-snug tracking-tight text-fg sm:text-lg">
                      {project.title}
                    </h3>
                    <span className="w-fit shrink-0 rounded-full border border-indigo-200/60 bg-indigo-50/90 px-2.5 py-1 text-[11px] font-medium text-accent dark:border-indigo-500/25 dark:bg-indigo-500/15 dark:text-indigo-200">
                      {project.category}
                    </span>
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.stats.map((s) => (
                      <span
                        key={s.label}
                        className="inline-flex items-center rounded-lg border border-border/80 bg-bg/60 px-2.5 py-1.5 text-[11px] text-muted dark:border-slate-600/50 dark:bg-black/25"
                      >
                        <span className="mr-1 font-semibold text-fg/85 dark:text-slate-200">
                          {s.label}
                        </span>
                        {s.value}
                      </span>
                    ))}
                  </div>

                  {(project.iframeUrl ||
                    (project.externalLinks && project.externalLinks.length > 0)) && (
                    <div className="flex flex-wrap gap-x-3 gap-y-1 border-t border-indigo-100 pt-2.5 dark:border-slate-600/50 sm:gap-y-2 sm:pt-3">
                      {project.iframeUrl ? (
                        <a
                          href={project.iframeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[2.75rem] items-center gap-1.5 rounded-lg px-1 py-1 text-xs font-semibold text-accent transition-colors hover:bg-indigo-50/60 hover:text-fg sm:min-h-0 dark:hover:bg-white/[0.04] dark:hover:text-indigo-200"
                        >
                          Live preview
                          <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
                        </a>
                      ) : null}
                      {project.externalLinks?.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[2.75rem] items-center gap-1.5 rounded-lg px-1 py-1 text-xs font-semibold text-accent transition-colors hover:bg-indigo-50/60 hover:text-fg sm:min-h-0 dark:hover:bg-white/[0.04] dark:hover:text-indigo-200"
                        >
                          {link.label}
                          <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
                        </a>
                      ))}
                    </div>
                  )}

                  {project.video ? (
                    <div className="mt-auto w-full pt-1 sm:w-auto sm:justify-start">
                      <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        onClick={() => setSelected(project)}
                        fullWidth
                        className="min-h-[2.875rem] rounded-full px-5 text-[11px] font-bold uppercase tracking-wide sm:w-auto sm:min-h-0"
                      >
                        <Play className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                        See demo
                      </Button>
                    </div>
                  ) : null}
                </div>
              </motion.article>
            ))}
          </motion.div>

          <AnimatePresence>
            {selected && selected.video ? (
              <motion.div
                key="modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md sm:items-center sm:p-4 sm:pb-4"
                role="presentation"
                onClick={() => setSelected(null)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.98 }}
                  transition={{ type: "spring", damping: 26, stiffness: 320 }}
                  className="relative max-h-[calc(100dvh-1rem)] w-full max-w-4xl overflow-y-auto rounded-2xl border border-indigo-200/60 bg-white/95 p-3 shadow-[0_28px_80px_-20px_rgba(0,0,0,0.45)] ring-1 ring-indigo-950/[0.06] dark:border-slate-600/60 dark:bg-[#0b101c]/98 dark:ring-white/[0.06] sm:max-h-none sm:rounded-3xl sm:p-6"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="portfolio-demo-title"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="mb-3 flex items-start justify-between gap-3 sm:mb-4">
                    <h3
                      id="portfolio-demo-title"
                      className="flex min-w-0 items-center gap-2 text-base font-semibold text-fg sm:text-lg"
                    >
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-teal-500/10 text-accent ring-1 ring-indigo-500/15 dark:from-indigo-400/25 dark:to-teal-500/15">
                        <Play className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      <span className="leading-snug">{selected.title} – Demo</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      className="shrink-0 rounded-full border border-transparent p-2 text-muted transition-colors hover:border-border hover:bg-fg/5 hover:text-fg dark:hover:border-slate-600 dark:hover:bg-white/[0.06]"
                      aria-label="Close demo"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="relative w-full overflow-hidden rounded-lg bg-black ring-2 ring-indigo-500/40 dark:ring-indigo-400/35 sm:rounded-xl">
                    <video
                      src={selected.video}
                      controls
                      playsInline
                      autoPlay
                      className="max-h-[min(58dvh,720px)] w-full object-contain sm:max-h-[min(70vh,720px)]"
                    />
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <motion.section
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-16 w-full max-w-4xl sm:mt-24 sm:max-w-5xl lg:mt-28 lg:max-w-6xl"
          >
            <div className="relative overflow-hidden rounded-2xl border border-indigo-200/85 bg-gradient-to-b from-white via-indigo-50/30 to-indigo-100/40 p-px shadow-[0_22px_60px_-26px_rgba(67,56,202,0.22)] dark:border-indigo-400/20 dark:bg-gradient-to-br dark:from-indigo-500/25 dark:via-indigo-400/12 dark:to-teal-500/18 dark:shadow-[0_28px_72px_-28px_rgba(0,0,0,0.58)] sm:rounded-3xl">
              <div className="relative overflow-hidden rounded-[0.85rem] bg-white px-4 py-7 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:rounded-[1.25rem] sm:px-8 sm:py-9 lg:rounded-[1.35rem] lg:px-11 lg:py-10 dark:rounded-[0.85rem] dark:bg-gradient-to-b dark:from-[#111a2e] dark:via-[#0d121f] dark:to-[#080c14] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:dark:rounded-[1.25rem] lg:dark:rounded-[1.35rem]">
                <div
                  className="pointer-events-none absolute -top-20 left-1/2 h-44 w-[min(100%,36rem)] -translate-x-1/2 rounded-full bg-indigo-400/22 blur-3xl dark:bg-indigo-500/18"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/55 to-transparent dark:via-indigo-400/30 sm:inset-x-10"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-indigo-500/[0.04] to-transparent dark:from-indigo-400/[0.06]"
                  aria-hidden
                />
                <div className="relative">
                  <span className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-accent shadow-sm backdrop-blur-sm dark:border-indigo-500/25 dark:bg-indigo-500/[0.12] dark:text-indigo-200 sm:mb-4 sm:px-3.5 sm:py-1.5 sm:text-[11px]">
                    <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden />
                    Your turn
                  </span>
                  <h2 className="text-balance text-xl font-bold leading-[1.15] tracking-tight text-fg sm:text-3xl md:text-[2.125rem] md:leading-snug lg:text-4xl lg:leading-[1.12]">
                    Want your project{" "}
                    <span className="gradient-text">here next?</span>
                  </h2>
                  <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted sm:mt-4 sm:max-w-3xl sm:text-base md:text-lg">
                    Tell us what you&apos;re building—from idea to live product, we&apos;ll help you
                    ship it.
                  </p>
                  <Button
                    href="/contact"
                    variant="primary"
                    size="lg"
                    className="mx-auto mt-7 min-h-[2.875rem] w-full max-w-xs shadow-lg shadow-indigo-600/20 shine-hover sm:mt-8 sm:w-auto sm:min-w-[13.5rem] dark:shadow-indigo-950/40"
                  >
                    Start your project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </SiteCanvas>
  )
}
