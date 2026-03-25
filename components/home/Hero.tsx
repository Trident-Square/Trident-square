"use client"

import { motion } from "framer-motion"
import { ArrowRight, Code2, Smartphone, Layout, Sparkles } from "lucide-react"
import Button from "@/components/ui/Button"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const focusAreas = [
  { icon: Layout, label: "Web Platforms" },
  { icon: Smartphone, label: "Mobile Apps" },
  { icon: Code2, label: "AI Products" },
]

const heroStats = [
  { label: "Products Built", value: "Web · Mobile · AI" },
  { label: "What we ship", value: "MVPs · Platforms · Integrations" },
  { label: "Approach", value: "Design → Build → Launch" },
  { label: "Team", value: "Small & Senior" },
]

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-x-hidden bg-hero bg-dots">

      {/* Glow background — smaller orbs on narrow screens to avoid overflow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[12%] left-[5%] w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[420px] lg:h-[420px] bg-cyan-500/10 rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px] animate-float-orb" />
        <div className="absolute bottom-[18%] right-[5%] w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] lg:w-[380px] lg:h-[380px] bg-blue-500/10 rounded-full blur-[70px] sm:blur-[90px] lg:blur-[100px] animate-float-orb-2" />
        <div className="absolute top-[50%] left-[50%] w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] lg:w-[300px] lg:h-[300px] bg-sky-400/10 rounded-full blur-[60px] sm:blur-[80px] lg:blur-[90px] animate-float-orb-3 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)]" />
      </div>

      <div className="relative w-full min-w-0 container mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-24 sm:py-24 sm:pt-28 lg:py-28">
        <div className="max-w-4xl mx-auto text-center min-w-0">

          <motion.div variants={container} initial="hidden" animate="show">

            {/* Top badge */}
            <motion.div
              variants={item}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-card/80 px-3 py-1.5 sm:px-4 text-[11px] sm:text-xs font-medium text-muted mb-5 sm:mb-6 shadow-sm max-w-[calc(100vw-2rem)] text-center"
            >
              <Sparkles className="w-3 h-3 text-accent" />
              Digital product studio
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={item}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-fg leading-[1.12] sm:leading-[1.05] mb-5 sm:mb-6 px-0.5 break-words"
            >
              Build digital products
              <br />
              that <span className="gradient-text">scale</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={item}
              className="text-base sm:text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-1"
            >
              <span className="font-semibold text-fg">Trident Square</span> is a
              digital product studio helping startups and businesses design,
              build, and launch modern web, mobile, and AI-powered platforms.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-12 justify-center items-stretch sm:items-center w-full max-w-md sm:max-w-none mx-auto"
            >
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="shine-hover px-6 py-3 sm:px-7 w-full sm:w-auto justify-center"
              >
                Start your project
                <ArrowRight className="ml-2 w-4 h-4 shrink-0" />
              </Button>

              <Button
                href="/portfolio"
                variant="outline"
                size="lg"
                className="px-6 py-3 sm:px-7 w-full sm:w-auto justify-center"
              >
                View our work
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={item}
              className="pt-4 sm:pt-6 grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-6 sm:gap-y-6 lg:grid-cols-4 text-center text-[11px] sm:text-xs md:text-sm text-muted"
            >
              {heroStats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1 min-w-0 items-center px-0.5">
                  <span className="font-semibold text-fg/90">
                    {stat.label}
                  </span>
                  <span className="break-words hyphens-auto">{stat.value}</span>
                </div>
              ))}
            </motion.div>

            {/* Focus Areas */}
            <motion.div
              variants={item}
              className="mt-8 sm:mt-10 flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-5 sm:gap-x-10 sm:gap-y-6"
            >
              {focusAreas.map((area, index) => {
                const Icon = area.icon
                return (
                  <div
                    key={index}
                    className="flex shrink-0 items-center gap-3 text-muted"
                  >
                    <span className="flex shrink-0 items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-fg/5 text-fg/70">
                      <Icon className="w-4 h-4" />
                    </span>

                    <span className="text-sm font-medium text-fg/90 text-left">
                      {area.label}
                    </span>
                  </div>
                )
              })}
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}