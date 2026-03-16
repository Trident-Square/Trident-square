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
  { label: "Tech Stack", value: "Next.js · Node · AI APIs" },
  { label: "Approach", value: "Design → Build → Launch" },
  { label: "Team", value: "Small & Senior" },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-hero bg-dots">

      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-[420px] h-[420px] bg-cyan-500/10 rounded-full blur-[120px] animate-float-orb" />
        <div className="absolute bottom-[20%] right-[15%] w-[380px] h-[380px] bg-blue-500/10 rounded-full blur-[100px] animate-float-orb-2" />
        <div className="absolute top-[50%] left-[50%] w-[300px] h-[300px] bg-sky-400/10 rounded-full blur-[90px] animate-float-orb-3 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-28">
        <div className="max-w-4xl mx-auto text-center">

          <motion.div variants={container} initial="hidden" animate="show">

            {/* Top badge */}
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-1.5 text-xs font-medium text-muted mb-6 shadow-sm"
            >
              <Sparkles className="w-3 h-3 text-accent" />
              Digital product studio
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-fg leading-[1.05] mb-6"
            >
              Build digital products
              <br />
              that <span className="gradient-text">scale</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={item}
              className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              <span className="font-semibold text-fg">Trident Square</span> is a
              digital product studio helping startups and businesses design,
              build, and launch modern web, mobile, and AI-powered platforms.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-4 mb-12 justify-center"
            >
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="shine-hover px-7 py-3"
              >
                Start your project
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

              <Button
                href="/portfolio"
                variant="outline"
                size="lg"
                className="px-7 py-3"
              >
                View our work
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={item}
              className="pt-6  grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-xs sm:text-sm text-muted"
            >
              {heroStats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="font-semibold text-fg/90">
                    {stat.label}
                  </span>
                  <span>{stat.value}</span>
                </div>
              ))}
            </motion.div>

            {/* Focus Areas */}
            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap gap-10 justify-center"
            >
              {focusAreas.map((area, index) => {
                const Icon = area.icon
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-muted"
                  >
                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-fg/5 text-fg/70">
                      <Icon className="w-4 h-4" />
                    </span>

                    <span className="text-sm font-medium text-fg/90">
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