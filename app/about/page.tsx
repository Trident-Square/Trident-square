'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Rocket,
  Code,
  Cpu,
  Layers,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import SiteCanvas from '@/components/layout/SiteCanvas'
import TechMarquee from '@/components/about/TechMarquee'

/** Borderless surface for About cards (avoids global `card-subtle` 1px border). */
const aboutCard =
  'rounded-xl bg-card/60 p-6 shadow-sm shadow-indigo-950/[0.04] dark:bg-slate-900/55 dark:shadow-black/25'

const principles = [
{
icon: Rocket,
title: "Product Thinking",
description:
"We approach every project as a product, not just a website. Our goal is to build platforms that scale and deliver real value."
},

{
icon: Code,
title: "Modern Engineering",
description:
"We use modern frameworks and cloud infrastructure to create reliable, maintainable systems."
},

{
icon: Cpu,
title: "AI & Automation",
description:
"We design platforms ready for AI integration, automation, and intelligent workflows."
},

{
icon: Layers,
title: "End-to-End Delivery",
description:
"From idea to launch and beyond, we support the entire lifecycle of your product."
}
]

export default function AboutPage() {

return (

<SiteCanvas>

<div className="relative z-[1]">

{/* HERO + WHO WE ARE + PRINCIPLES + TECH — one backdrop (includes header offset so nothing sits above it) */}
<section className="relative z-[1] overflow-hidden pt-36 pb-20 sm:pt-40 sm:pb-24 lg:pt-44 lg:pb-28">
  <div
    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_-5%,rgba(99,102,241,0.13),transparent_55%),radial-gradient(ellipse_55%_42%_at_100%_72%,rgba(45,212,191,0.07),transparent_50%),radial-gradient(ellipse_50%_38%_at_0%_88%,rgba(99,102,241,0.06),transparent_48%)] dark:bg-[radial-gradient(ellipse_88%_48%_at_50%_-8%,rgba(129,140,248,0.15),transparent_58%),radial-gradient(ellipse_48%_40%_at_100%_78%,rgba(45,212,191,0.06),transparent_52%),radial-gradient(ellipse_45%_36%_at_0%_90%,rgba(129,140,248,0.07),transparent_50%)]"
    aria-hidden
  />
  <div
    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-card/[0.14] via-transparent to-card/[0.12] dark:from-card/20 dark:via-transparent dark:to-card/18"
    aria-hidden
  />

  <div className="relative z-[1] pb-20 sm:pb-24">
    <div className="container mx-auto max-w-3xl px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="premium-eyebrow mx-auto mb-5 justify-center text-muted"
      >
        <span className="premium-eyebrow-bar" />
        Our studio
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 text-4xl font-bold text-fg md:text-5xl lg:text-6xl"
      >
        About <span className="gradient-text">Trident Square</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl text-muted"
      >
        We are a digital product studio building modern platforms, AI-powered tools, and scalable software for ambitious
        teams.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="mx-auto mt-8 max-w-lg"
      >
        <Link
          href="/portfolio"
          className="group flex items-center justify-center gap-3 rounded-2xl border border-indigo-200/90 bg-gradient-to-br from-white/95 via-indigo-50/50 to-teal-50/35 px-5 py-4 shadow-md shadow-indigo-900/[0.07] ring-1 ring-indigo-950/[0.05] transition-[border-color,box-shadow] hover:border-indigo-300/90 hover:shadow-lg dark:border-slate-600/85 dark:from-slate-900/95 dark:via-slate-900/75 dark:to-indigo-950/35 dark:shadow-black/40 dark:ring-white/[0.06] dark:hover:border-indigo-500/45 sm:gap-4 sm:px-6"
          aria-label="Portfolio: 25+ projects delivered"
        >
          <span className="text-[1.85rem] font-bold tabular-nums leading-none tracking-tight gradient-text sm:text-4xl">
            25+
          </span>
          <span className="min-w-0 border-l border-indigo-200/80 pl-3 text-left sm:pl-4 dark:border-slate-600">
            <span className="block text-sm font-semibold text-fg sm:text-base">Projects delivered</span>
            <span className="mt-0.5 block text-xs text-muted sm:text-sm">Explore our portfolio</span>
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-indigo-500 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100 dark:text-indigo-300" aria-hidden />
        </Link>
      </motion.div>
    </div>
  </div>

  <div className="container relative mx-auto grid gap-16 px-6 pb-16 sm:pb-20 lg:grid-cols-2 lg:pb-24 lg:items-center">
    <div>
      <h2 className="mb-6 text-3xl font-bold text-fg">Who we are</h2>
      <p className="mb-6 leading-relaxed text-muted">
        Trident Square is a digital product studio focused on building high-quality software platforms, web
        applications, and mobile products.
      </p>
      <p className="mb-6 leading-relaxed text-muted">
        We partner with startups, founders, and businesses to transform ideas into reliable digital platforms. Our team
        combines engineering, design, and product thinking to deliver systems that scale.
      </p>
      <p className="leading-relaxed text-muted">
        From AI-powered platforms to mobile apps and complex web systems, we focus on building products that are not
        only functional but also built for long-term growth.
      </p>
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div className={`${aboutCard} text-center`}>
        <h3 className="mb-2 text-3xl font-bold gradient-text">AI</h3>
        <p className="text-sm text-muted">Voice assistants, automation, and intelligent platforms.</p>
      </div>
      <div className={`${aboutCard} text-center`}>
        <h3 className="mb-2 text-3xl font-bold gradient-text">Web</h3>
        <p className="text-sm text-muted">Modern scalable web platforms and SaaS products.</p>
      </div>
      <div className={`${aboutCard} text-center`}>
        <h3 className="mb-2 text-3xl font-bold gradient-text">Mobile</h3>
        <p className="text-sm text-muted">Cross-platform and native mobile apps.</p>
      </div>
      <div className={`${aboutCard} text-center`}>
        <h3 className="mb-2 text-3xl font-bold gradient-text">Cloud</h3>
        <p className="text-sm text-muted">APIs, hosting, and environments built for reliability and scale.</p>
      </div>
    </div>
  </div>

  <div className="container relative mx-auto px-6 pb-14 sm:pb-16 lg:pb-20">
    <h2 className="mb-14 text-center text-3xl font-bold text-fg">How we build products</h2>
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {principles.map((p, index) => {
        const Icon = p.icon
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className={aboutCard}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-semibold text-fg">{p.title}</h3>
            <p className="text-sm text-muted">{p.description}</p>
          </motion.div>
        )
      })}
    </div>
  </div>

  <div className="relative pt-4 sm:pt-6">
    <div className="container relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
      <p className="premium-eyebrow normal-case mx-auto mb-4 inline-flex items-center justify-center gap-2 text-muted sm:mb-5">
        <span className="premium-eyebrow-bar" />
        <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" strokeWidth={2.25} aria-hidden />
        Engineering stack
      </p>
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
        Technologies we <span className="gradient-text">use</span>
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-pretty text-sm leading-relaxed text-muted sm:mt-5 sm:text-base">
        Production-grade tools we deploy every day. The strip scrolls automatically; it stays still when your system
        prefers reduced motion.
      </p>
    </div>
    <div className="relative mt-10 sm:mt-12">
      <TechMarquee />
    </div>
  </div>
</section>


{/* CTA */}

<section className="py-24 relative overflow-hidden">

<div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-sky-500/10"/>

<div className="container mx-auto px-6 text-center relative">

<h2 className="text-3xl font-bold text-fg mb-4">

Have an idea for a product?

</h2>

<p className="text-muted max-w-xl mx-auto mb-8">

Tell us what you're building and we'll help you turn it
into a working platform.

</p>

<Button href="/contact" size="lg">

Start your project
<ArrowRight className="ml-2 w-5 h-5"/>

</Button>

</div>

</section>

</div>

</SiteCanvas>

)
}