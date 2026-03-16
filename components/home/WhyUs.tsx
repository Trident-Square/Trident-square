'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Zap,
  Shield,
  Layers,
  Cpu,
  Sparkles,
  CheckCircle,
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

const [activeId, setActiveId] = useState('ai')

const active = items.find((item) => item.id === activeId) ?? items[0]

return (

<section className="relative py-24 bg-mesh bg-dots overflow-hidden">

<div className="container mx-auto px-6">

{/* Header */}

<div className="mb-16 max-w-3xl">

<p className="text-sm font-medium text-muted mb-2">
Why Trident Square
</p>

<h2 className="text-4xl font-bold text-fg leading-tight">
End-to-end digital
<span className="gradient-text"> product partners</span>
</h2>

<p className="text-muted mt-4 max-w-xl">
We help transform ideas into reliable digital products by combining
strong engineering, thoughtful design, and scalable architecture.
</p>

</div>

{/* Layout */}

<div className="grid lg:grid-cols-[320px_1fr] gap-12 items-stretch">

{/* LEFT MENU */}

<div className="space-y-3">

{items.map((item) => {

const Icon = item.icon
const isActive = item.id === activeId

return (

<button
key={item.id}
onClick={() => setActiveId(item.id)}
className={`w-full text-left rounded-xl border px-4 py-4 transition-all
${isActive
? 'border-accent bg-card shadow'
: 'border-border bg-card/60 hover:bg-card'
}`}
>

<div className="flex items-center gap-3 mb-1">

<span
className={`flex h-8 w-8 items-center justify-center rounded-lg
${isActive ? 'bg-accent text-white' : 'bg-fg/5 text-fg/70'}
`}
>
<Icon className="h-4 w-4" />
</span>

<span className="font-semibold text-fg text-sm">
{item.label}
</span>

</div>

<p className="text-xs text-muted pl-11">
{item.tagline}
</p>

</button>

)

})}

</div>

{/* RIGHT PANEL */}

<motion.div
key={active.id}
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.25 }}
className="rounded-2xl bg-card border border-border px-8 py-4 shadow-sm flex flex-col h-full"
>

<div className="flex items-center gap-3 mb-4">

<span className="h-10 w-10 flex items-center justify-center rounded-lg bg-accent/10 text-accent">
<active.icon className="h-5 w-5" />
</span>

<h3 className="text-xl font-semibold text-fg">
{active.title}
</h3>

</div>

<p className="text-muted text-sm leading-relaxed mb-6">
{active.description}
</p>

{/* Technologies */}

<div className="mb-6">

<p className="text-xs uppercase tracking-wide text-muted mb-3">
Technology Layer
</p>

<div className="flex flex-wrap gap-2">

{active.technologies.map((tech) => (

<span
key={tech}
className="text-xs bg-fg/5 border border-border rounded-full px-3 py-1 text-muted"
>
{tech}
</span>

))}

</div>

</div>

{/* Workflow */}

<div className="mb-6">

<p className="text-xs uppercase tracking-wide text-muted mb-3">
Typical Workflow
</p>

<ul className="space-y-2 text-sm text-muted">

{active.workflow.map((step) => (

<li key={step} className="flex gap-2">

<Workflow className="h-4 w-4 text-accent mt-1" />

{step}

</li>

))}

</ul>

</div>

{/* Deliverables */}

<div className="mb-6">

<p className="text-xs uppercase tracking-wide text-muted mb-3">
Deliverables
</p>

<ul className="space-y-2 text-sm text-muted">

{active.deliverables.map((d) => (

<li key={d} className="flex gap-2">

<Database className="h-4 w-4 text-accent mt-1" />

{d}

</li>

))}

</ul>

</div>


</motion.div>

</div>

</div>

</section>

)

}