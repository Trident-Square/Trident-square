'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { easePremium, fadeUpVariants, staggerDelay, transition } from '@/lib/motion'
import {
  Zap,
  Shield,
  Layers,
  Cpu,
  Sparkles,
  Database,
  Workflow
} from 'lucide-react'

const items = [
{
id: 'ai',
icon: Cpu,
label: 'AI-ready architecture',
tagline: 'Building intelligent future systems',
title: 'AI-ready digital products',

description:
'We design systems that integrate AI capabilities from day one. This ensures your platform can adopt automation, analytics, and intelligent features without needing major architectural rewrites later.',

points: [
'Modular APIs ready for AI agents',
'Structured data pipelines',
'Cloud-native infrastructure',
'Future-proof backend architecture'
],

technologies: [
'Vector databases',
'Serverless infrastructure',
'Event-driven services',
'AI model integration',
],

workflow: [
'Data modelling and architecture planning',
'AI-ready API layer development',
],

deliverables: [
'Technical architecture documentation',
'Production-ready backend services',
'Monitoring and analytics integration',
],

benefits: [
'Future-ready AI integrations',
'Better analytics capabilities',
'Flexible and scalable architecture',
],
},

{
id: 'delivery',
icon: Zap,
label: 'Delivery you can trust',
tagline: 'Ship fast without breaking things',
title: 'Clean, reliable engineering',

description:
'Our development approach focuses on clarity, maintainability, and predictable delivery. We ship production-ready code that teams can confidently build upon.',

points: [
'Modern stack (Next.js, React, Node)',
'Clean modular architecture',
'Weekly sprint reviews',
'CI/CD automated deployments'
],

technologies: [
'Next.js',
'Node.js',
'Docker',
'GitHub Actions'
],

workflow: [
'Sprint planning and milestone definition',
'Agile development cycles',
],

deliverables: [
'Maintainable codebase',
'Automated deployment pipeline',
'Documentation and handover'
],

benefits: [
'Faster development cycles',
'Reduced technical debt',
'High reliability in production',
],
},

{
id: 'design',
icon: Sparkles,
label: 'Design that feels right',
tagline: 'Interfaces people enjoy using',
title: 'Design-first experiences',

description:
'We prioritise user experience early in the product lifecycle so that the final product feels intuitive and natural for users.',

points: [
'UX research and wireframing',
'User-focused product flows',
'Design system components',
'Responsive UI layouts'
],

technologies: [
'Figma',
'Tailwind',
'Component libraries',
'Design systems'
],

workflow: [
'User journey mapping',
'Wireframe creation',
'UI design and prototyping'
],

deliverables: [
'Wireframes and prototypes',
'Design system documentation',
'Responsive UI specifications'
],

benefits: [
'Higher user engagement',
'Lower learning curve',
'Consistent product UI',
],
},

{
id: 'lifecycle',
icon: Layers,
label: 'From idea to launch',
tagline: 'Support across the lifecycle',
title: 'End-to-end product partnership',

description:
'We partner with you across the entire lifecycle—from early discovery and MVP planning to scaling the product after launch.',

points: [
'Product discovery workshops',
'MVP roadmap planning',
'Iterative development cycles',
'Post-launch optimisation'
],

technologies: [
'Product analytics',
'Roadmap tools',
'User feedback loops'
],

workflow: [
'Discovery and scope definition',
'MVP release planning',
'Continuous iteration'
],

deliverables: [
'Product roadmap',
'Launch-ready MVP',
'Ongoing improvements'
],

benefits: [
'Clear product direction',
'Lower development risk',
'Continuous product evolution',
],
},

{
id: 'ops',
icon: Shield,
label: 'Stable operations',
tagline: 'Prepared for production from day one',
title: 'Production-ready by default',

description:
'We build products with reliability and scalability in mind so your platform can grow without operational stress.',

points: [
'Environment configuration',
'Application monitoring',
'Performance optimisation',
'Security best practices'
],

technologies: [
'Cloud hosting',
'Monitoring tools',
'Logging systems'
],

workflow: [
'Infrastructure setup',
'Performance optimisation',
'Security hardening'
],

deliverables: [
'Monitoring dashboards',
'Deployment infrastructure',
'Operational documentation'
],

benefits: [
'Reliable production systems',
'Reduced downtime',
'Confidence while scaling',
],
},
]

export default function WhyUs() {
  const reduce = useReducedMotion()
  const [activeId, setActiveId] = useState('ai')
  const active = items.find((item) => item.id === activeId) ?? items[0]

  const headerContainer = {
    hidden: { opacity: reduce ? 1 : 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay(reduce, 0.08, 0.06).staggerChildren,
        delayChildren: staggerDelay(reduce, 0.08, 0.06).delayChildren,
      },
    },
  }
  const headerItem = fadeUpVariants(reduce, 16)

  const menuContainer = {
    hidden: { opacity: reduce ? 1 : 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay(reduce, 0.06, 0.08).staggerChildren,
        delayChildren: staggerDelay(reduce, 0.06, 0.08).delayChildren,
      },
    },
  }
  const menuItem = {
    hidden: reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 },
    show: {
      opacity: 1,
      x: 0,
      transition: transition(reduce, 0.42),
    },
  }

  return (
    <section className="relative overflow-hidden pb-10 pt-2 sm:pt-3 lg:pb-14 lg:pt-5">
      <div className="container mx-auto min-w-0 px-4 sm:px-6 lg:px-8">
        <div className="w-full min-w-0">
        <motion.div
          className="mb-6 max-w-3xl sm:mb-8 lg:mb-10"
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.p
            variants={headerItem}
            className="premium-eyebrow mb-4"
          >
            <span className="premium-eyebrow-bar" />
            Why Trident Square
          </motion.p>
          <motion.h2
            variants={headerItem}
            className="text-3xl font-semibold leading-tight tracking-tight text-fg sm:text-4xl lg:text-[2.35rem] lg:leading-[1.15]"
          >
            End-to-end digital{" "}
            <span className="gradient-text">product partners</span>
          </motion.h2>
          <motion.p
            variants={headerItem}
            className="mt-4 max-w-xl text-sm leading-relaxed text-muted"
          >
            We help transform ideas into reliable digital products by combining
            strong engineering, thoughtful design, and scalable architecture.
          </motion.p>
        </motion.div>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-12 items-stretch min-w-0">
          <motion.div
            className="flex lg:flex-col gap-2 sm:gap-3 overflow-x-auto lg:overflow-visible px-0 pb-3 lg:pb-0 snap-x snap-mandatory lg:snap-none scroll-smooth overscroll-x-contain [-webkit-overflow-scrolling:touch]"
            variants={menuContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
          >
            {items.map((item) => {
              const Icon = item.icon
              const isActive = item.id === activeId
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  variants={menuItem}
                  whileHover={reduce ? undefined : { scale: 1.01 }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                  transition={{ duration: 0.2, ease: easePremium }}
                  onClick={() => setActiveId(item.id)}
                  className={`
          shrink-0 snap-start
          w-[260px] sm:w-[280px] lg:w-full
          text-left rounded-xl border
          px-3 sm:px-4 py-3 sm:py-4
          transition-[background-color,border-color,box-shadow] duration-200
          touch-manipulation
          min-h-[80px] sm:min-h-[88px]
          ${isActive
            ? 'border-indigo-300 bg-card shadow-lg shadow-indigo-500/10 ring-2 ring-indigo-500/15 dark:border-indigo-500/50 dark:bg-card dark:shadow-indigo-950/40 dark:ring-indigo-400/20'
            : 'border-slate-200/75 bg-white/65 shadow-sm backdrop-blur-md hover:border-slate-300/90 hover:bg-white/82 hover:shadow-md active:bg-white/75 dark:border-slate-600/70 dark:bg-slate-900/55 dark:backdrop-blur-md dark:hover:border-slate-500 dark:hover:bg-slate-900/75 dark:active:bg-slate-900/70'}
        `}
                >
        <div className="flex items-start gap-2.5 sm:gap-3 mb-1">
          <span
            className={`
              flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg
              ${isActive
                ? 'bg-accent text-white'
                : 'bg-fg/5 text-fg/70'}
            `}
          >
            <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </span>

          <span className="font-semibold text-fg text-xs sm:text-sm leading-snug">
            {item.label}
          </span>
        </div>

                  <p className="text-[11px] sm:text-xs text-muted pl-9.5 sm:pl-11 line-clamp-2">
                    {item.tagline}
                  </p>
                </motion.button>
              )
            })}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduce ? undefined : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={transition(reduce, 0.38)}
              className="flex h-full min-w-0 flex-col rounded-2xl border border-indigo-100/80 bg-gradient-to-br from-card via-card to-indigo-50/35 p-4 shadow-lg shadow-indigo-900/[0.05] ring-1 ring-indigo-900/[0.03] dark:border-slate-600/80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950/90 dark:shadow-black/35 dark:ring-white/[0.05] sm:p-5 lg:p-6"
            >

<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4 min-w-0">

<span className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 shrink-0 flex items-center justify-center rounded-lg bg-accent/10 text-accent">
<active.icon className="h-4 w-4 sm:h-4.5 sm:w-4.5 lg:h-5 lg:w-5" />
</span>

<h3 className="text-base sm:text-lg lg:text-xl font-semibold text-fg min-w-0 break-words">
{active.title}
</h3>

</div>

<p className="text-muted text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 lg:mb-6 min-w-0">
{active.description}
</p>

{/* Technologies */}

<div className="mb-4 sm:mb-5 lg:mb-6">

<p className="text-[10px] sm:text-xs uppercase tracking-wide text-muted mb-2 sm:mb-3">
Technology Layer
</p>

<div className="flex flex-wrap gap-1.5 sm:gap-2">

{active.technologies.map((tech) => (

<span
key={tech}
className="text-[10px] sm:text-xs bg-slate-100 border border-border rounded-full px-2 py-1 sm:px-2.5 sm:py-1.5 text-muted max-w-full break-words text-left dark:bg-slate-800/80 dark:border-slate-600 dark:text-slate-300"
>
{tech}
</span>

))}

</div>

</div>

{/* Workflow */}

<div className="mb-4 sm:mb-5 lg:mb-6">

<p className="text-[10px] sm:text-xs uppercase tracking-wide text-muted mb-2 sm:mb-3">
Typical Workflow
</p>

<ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted">

{active.workflow.map((step) => (

<li key={step} className="flex gap-2 min-w-0">

<Workflow className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent mt-0.5 shrink-0" />

<span className="min-w-0 break-words">{step}</span>

</li>

))}

</ul>

</div>

{/* Deliverables */}

<div className="mb-4 sm:mb-5 lg:mb-6">

<p className="text-[10px] sm:text-xs uppercase tracking-wide text-muted mb-2 sm:mb-3">
Deliverables
</p>

<ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted">

{active.deliverables.map((d) => (

<li key={d} className="flex gap-2 min-w-0">

<Database className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent mt-0.5 shrink-0" />

<span className="min-w-0 break-words">{d}</span>

</li>

))}

</ul>

            </div>
            </motion.div>
          </AnimatePresence>
        </div>
        </div>
      </div>
    </section>
  )
}