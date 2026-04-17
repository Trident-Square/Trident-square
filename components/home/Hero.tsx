"use client"

import Link from "next/link"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  CalendarClock,
  CheckCircle2,
  Code2,
  MapPin,
  Sparkles,
} from "lucide-react"
import Button from "@/components/ui/Button"
import {
  easePremium,
  fadeUpVariants,
  staggerDelay,
  transition,
} from "@/lib/motion"

const listItemVariants = (reduce: boolean | null): Variants => ({
  hidden: reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 },
  show: {
    opacity: 1,
    x: 0,
    transition: transition(reduce, 0.4),
  },
})

const listContainerVariants = (reduce: boolean | null): Variants => ({
  hidden: { opacity: reduce ? 1 : 0 },
  show: {
    opacity: 1,
    transition: staggerDelay(reduce, 0.09, 0.12),
  },
})

const workAsideItems: {
  label: string
  value: string
  Icon: LucideIcon
}[] = [
  {
    label: "Track record",
    value: "25+ projects delivered",
    Icon: BadgeCheck,
  },
  {
    label: "Delivery",
    value: "Milestones & weekly demos",
    Icon: CalendarClock,
  },
  {
    label: "Stack",
    value: "Modern, documented, testable",
    Icon: Code2,
  },
  {
    label: "Engagement",
    value: "Fixed-scope or retained teams",
    Icon: Briefcase,
  },
]

export default function Hero() {
  const reduce = useReducedMotion()

  const container: Variants = {
    hidden: { opacity: reduce ? 1 : 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay(reduce, 0.07, 0.1).staggerChildren,
        delayChildren: staggerDelay(reduce, 0.07, 0.1).delayChildren,
      },
    },
  }

  const item = fadeUpVariants(reduce, 22)

  return (
    <section className="relative z-[1] flex min-h-svh flex-col overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_20%,rgba(99,102,241,0.07),transparent_58%),radial-gradient(ellipse_60%_45%_at_100%_0%,rgba(45,212,191,0.05),transparent_50%)] dark:bg-[radial-gradient(ellipse_85%_50%_at_50%_15%,rgba(129,140,248,0.12),transparent_55%),radial-gradient(ellipse_50%_40%_at_0%_100%,rgba(45,212,191,0.06),transparent_50%)]"
        aria-hidden
      />
      <div className="relative z-[1] flex min-h-0 w-full min-w-0 flex-1 flex-col justify-center container mx-auto px-4 pb-10 pt-[4.5rem] sm:px-6 sm:pb-12 sm:pt-24 lg:px-8 lg:pb-14 lg:pt-28">
        <div className="grid w-full grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start lg:gap-14 xl:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] xl:gap-16">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="min-w-0"
          >
            <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-5 text-center sm:max-w-2xl  lg:mx-0 lg:max-w-none lg:items-start lg:text-left">
              <motion.p
                variants={item}
                className="premium-eyebrow normal-case rounded-full border border-indigo-200/70 bg-white/75 py-2 pl-2.5 pr-4 shadow-md shadow-indigo-900/[0.06] backdrop-blur-sm dark:border-indigo-500/35 dark:bg-slate-900/75 dark:shadow-black/40"
              >
                <span className="premium-eyebrow-bar" />
                <span className="flex items-center gap-2 text-indigo-900 dark:text-indigo-100">
                  <Sparkles
                    className="h-3.5 w-3.5 shrink-0 text-indigo-600 dark:text-indigo-300"
                    strokeWidth={2.25}
                    aria-hidden
                  />
                  Digital product studio
                </span>
              </motion.p>

              <motion.h1
                variants={item}
                className="w-full text-balance text-[2.375rem] font-semibold leading-[1.05] tracking-tight text-fg sm:text-[2.625rem] sm:leading-[1.04] md:text-[3.25rem] md:leading-[1.03] lg:text-[4.25rem] lg:leading-[1.02] xl:text-[4.75rem] xl:leading-[1.01]"
              >
                <span className="block">Build digital products</span>
                <span className="mt-1 block gradient-text sm:mt-1.5">that scale.</span>
              </motion.h1>

              <motion.p
                variants={item}
                className="mx-auto w-full max-w-prose text-base leading-relaxed text-muted sm:text-lg lg:mx-0"
              >
                <span className="font-bold text-indigo-950 dark:text-white">Trident Square</span> is a digital product studio helping startups and businesses design, build, and launch modern web, mobile, and AI-powered platforms.
              </motion.p>

              <motion.div variants={item} className="w-full max-w-xl lg:max-w-none">
                <Link
                  href="/portfolio"
                  className="group mx-auto flex w-full max-w-sm items-center justify-center gap-3 rounded-2xl border border-indigo-200/90 bg-gradient-to-br from-white/95 via-indigo-50/50 to-teal-50/40 px-4 py-3.5 shadow-md shadow-indigo-900/[0.07] ring-1 ring-indigo-950/[0.05] transition-[border-color,box-shadow,transform] hover:border-indigo-300/90 hover:shadow-lg dark:border-slate-600/85 dark:from-slate-900/95 dark:via-slate-900/80 dark:to-indigo-950/40 dark:shadow-black/40 dark:ring-white/[0.06] dark:hover:border-indigo-500/50 sm:max-w-md lg:mx-0 lg:justify-start"
                  aria-label="Portfolio: 25+ projects delivered"
                >
                  <span className="text-[1.75rem] font-bold tabular-nums leading-none tracking-tight gradient-text sm:text-3xl">
                    25+
                  </span>
                  <span className="border-l border-indigo-200/80 pl-3 text-left text-sm font-semibold leading-snug text-fg dark:border-slate-600">
                    Projects delivered — see selected work
                    <span className="mt-0.5 block text-xs font-medium text-muted transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
                      Web, mobile & platforms
                    </span>
                  </span>
                  <ArrowRight className="ml-auto hidden h-4 w-4 shrink-0 text-indigo-500 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 sm:block" aria-hidden />
                </Link>
              </motion.div>

              <motion.div
                variants={item}
                className="flex w-full flex-wrap justify-center gap-2 lg:justify-start"
              >
                {["Ship-ready delivery", "Weekly demos", "Transparent estimates"].map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center rounded-full border border-border/90 bg-card/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted shadow-sm backdrop-blur-sm dark:border-slate-600/90 dark:bg-slate-900/80 dark:text-slate-300"
                  >
                    {label}
                  </span>
                ))}
              </motion.div>

              <motion.div
                variants={item}
                className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
              >
                <motion.div
                  className="min-w-0 flex-1 sm:flex-initial sm:shrink-0"
                  whileHover={reduce ? undefined : { scale: 1.02 }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                  transition={{ duration: 0.2, ease: easePremium }}
                >
                  <Button
                    href="/contact"
                    variant="primary"
                    size="lg"
                    className="w-full justify-center px-6 py-3 shadow-lg shadow-indigo-500/30 ring-1 ring-white/30 dark:shadow-indigo-950/60 dark:ring-white/10 sm:w-auto sm:px-7"
                  >
                    Discuss a project
                    <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                  </Button>
                </motion.div>
                <motion.div
                  className="min-w-0 flex-1 sm:flex-initial sm:shrink-0"
                  whileHover={reduce ? undefined : { scale: 1.02 }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                  transition={{ duration: 0.2, ease: easePremium }}
                >
                  <Button
                    href="/portfolio"
                    variant="outline"
                    size="lg"
                    className="w-full justify-center border-indigo-200/90 bg-white/80 px-6 py-3 text-indigo-950 shadow-md backdrop-blur-sm hover:border-indigo-300 hover:bg-indigo-50/90 dark:border-slate-600 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800/90 sm:w-auto sm:px-7"
                  >
                    View selected work
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                variants={item}
                className="w-full max-w-lg rounded-2xl border border-indigo-100/90 bg-gradient-to-br from-white/95 via-card to-indigo-50/60 p-5 shadow-lg shadow-indigo-900/[0.06] ring-1 ring-indigo-900/[0.04] backdrop-blur-sm dark:border-slate-600/80 dark:from-slate-900/95 dark:via-slate-900 dark:to-slate-950/90 dark:shadow-black/40 dark:ring-white/[0.06] sm:p-6 lg:max-w-xl"
              >
                <motion.ul
                  className="space-y-3 text-left"
                  initial="hidden"
                  animate="show"
                  variants={listContainerVariants(reduce)}
                >
                  {[
                    "Web platforms & internal tools",
                    "Mobile apps (iOS & Android)",
                    "AI-assisted workflows & integrations",
                    "Design systems, APIs & long-term maintainability",
                  ].map((line) => (
                    <motion.li
                      key={line}
                      variants={listItemVariants(reduce)}
                      className="flex items-start gap-3 text-sm font-medium text-fg/90 dark:text-slate-200/90"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent-2 drop-shadow-sm"
                        aria-hidden
                      />
                      <span className="leading-snug">{line}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </div>
          </motion.div>

          <motion.aside
            initial={reduce ? undefined : { opacity: 0, y: 20, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={transition(reduce, 0.55, { delay: 0.16 })}
            aria-labelledby="hero-work-heading"
            className="relative hidden min-w-0 overflow-hidden rounded-3xl border border-indigo-200/55 bg-card/90 p-6 shadow-2xl shadow-indigo-900/[0.08] ring-1 ring-white/70 backdrop-blur-md dark:border-slate-600/70 dark:bg-slate-950/80 dark:shadow-black/50 dark:ring-white/[0.06] sm:p-8 lg:block"
          >
            <div
              className="pointer-events-none absolute -right-px -top-px h-44 w-44 rounded-full bg-gradient-to-br from-indigo-400/25 via-blue-400/12 to-transparent blur-2xl dark:from-indigo-500/20 dark:via-blue-500/10"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-gradient-to-tr from-teal-400/20 to-transparent blur-2xl dark:from-teal-500/15"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.2]"
              style={{
                backgroundImage: `linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)`,
                backgroundSize: "20px 20px",
              }}
              aria-hidden
            />

            {!reduce && (
              <motion.div
                className="absolute inset-x-0 top-0 z-[1] h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-teal-500"
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.65, delay: 0.32, ease: easePremium }}
                style={{ transformOrigin: "left" }}
              />
            )}
            {reduce && (
              <div
                className="absolute inset-x-0 top-0 z-[1] h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-teal-500"
                aria-hidden
              />
            )}

            <div className="relative z-[1]">
              <div className="mb-7 mt-2">
                <span className="inline-flex items-center rounded-full border border-indigo-200/80 bg-indigo-500/[0.08] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-800 dark:border-indigo-500/35 dark:bg-indigo-500/10 dark:text-indigo-200">
                  Partner playbook
                </span>
                <h2
                  id="hero-work-heading"
                  className="mt-4 text-xl font-semibold tracking-tight text-fg sm:text-2xl"
                >
                  How we work{" "}
                  <span className="gradient-text">with you</span>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Outcomes, documentation, and a clean handover—so your team can
                  own what we ship.
                </p>
              </div>

              <dl className="flex flex-col gap-3">
                {workAsideItems.map((m, i) => {
                  const Icon = m.Icon
                  return (
                    <motion.div
                      key={m.label}
                      initial={reduce ? undefined : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={transition(reduce, 0.38, {
                        delay: 0.34 + i * 0.07,
                      })}
                      className="group rounded-2xl border border-indigo-100/90 bg-gradient-to-br from-white/95 to-indigo-50/40 p-4 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-indigo-300/70 hover:shadow-md dark:border-slate-600/80 dark:from-slate-900/90 dark:to-slate-900/40 dark:hover:border-indigo-500/40"
                    >
                      <div className="flex gap-4">
                        <div
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-teal-600 text-white shadow-md shadow-indigo-900/25 ring-1 ring-white/25 dark:from-indigo-500 dark:to-teal-600 dark:ring-white/10"
                          aria-hidden
                        >
                          <Icon className="h-5 w-5 opacity-[0.98]" strokeWidth={2} />
                        </div>
                        <div className="min-w-0 flex-1 pt-0.5">
                          <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-indigo-700 dark:text-indigo-300">
                            {m.label}
                          </dt>
                          <dd className="mt-1.5 text-sm font-medium leading-snug text-fg">
                            {m.value}
                          </dd>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </dl>

              <div className="mt-8 flex gap-3 rounded-2xl border border-border/80 bg-fg/[0.03] p-4 dark:border-slate-600/60 dark:bg-white/[0.04]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                  <MapPin className="h-5 w-5" strokeWidth={2} aria-hidden />
                </div>
                <p className="min-w-0 text-xs leading-relaxed text-muted">
                  <span className="font-semibold text-fg">Noida, India.</span>{" "}
                  Engagements are structured around outcomes, documentation, and a
                  smooth handover to your team.
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
