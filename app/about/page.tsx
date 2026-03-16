'use client'

import { motion } from 'framer-motion'
import {
  Rocket,
  Code,
  Cpu,
  Layers,
  ArrowRight,
  Sparkles,
  Users
} from 'lucide-react'
import Button from '@/components/ui/Button'

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

const tech = [
"Next.js",
"React",
"Node.js",
"Python",
"Flutter",
"React Native",
"PostgreSQL",
"AWS",
"Docker",
"AI APIs",
]

export default function AboutPage() {

return (

<div className="pt-24 min-h-screen">

{/* HERO */}

<section className="py-24 bg-mesh relative overflow-hidden">

<div className="container mx-auto px-6 text-center max-w-3xl">

<motion.h1
initial={{ opacity:0, y:20 }}
animate={{ opacity:1, y:0 }}
transition={{ duration:0.6 }}
className="text-4xl md:text-5xl lg:text-6xl font-bold text-fg mb-6"
>

About <span className="gradient-text">Trident Square</span>

</motion.h1>

<motion.p
initial={{ opacity:0, y:20 }}
animate={{ opacity:1, y:0 }}
transition={{ delay:0.1 }}
className="text-xl text-muted"
>

We are a digital product studio building modern platforms,
AI-powered tools, and scalable software for ambitious teams.

</motion.p>

</div>

</section>


{/* WHO WE ARE */}

<section className="py-24">

<div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

<div>

<h2 className="text-3xl font-bold text-fg mb-6">

Who we are

</h2>

<p className="text-muted mb-6 leading-relaxed">

Trident Square is a digital product studio focused on building
high-quality software platforms, web applications, and mobile products.

</p>

<p className="text-muted mb-6 leading-relaxed">

We partner with startups, founders, and businesses to transform ideas
into reliable digital platforms. Our team combines engineering,
design, and product thinking to deliver systems that scale.

</p>

<p className="text-muted leading-relaxed">

From AI-powered platforms to mobile apps and complex web systems,
we focus on building products that are not only functional but also
built for long-term growth.

</p>

</div>

<div className="grid grid-cols-2 gap-6">

<div className="card-subtle p-6 rounded-xl text-center">
<h3 className="text-3xl font-bold gradient-text mb-2">AI</h3>
<p className="text-sm text-muted">
Voice assistants, automation, and intelligent platforms.
</p>
</div>

<div className="card-subtle p-6 rounded-xl text-center">
<h3 className="text-3xl font-bold gradient-text mb-2">Web</h3>
<p className="text-sm text-muted">
Modern scalable web platforms and SaaS products.
</p>
</div>

<div className="card-subtle p-6 rounded-xl text-center">
<h3 className="text-3xl font-bold gradient-text mb-2">Mobile</h3>
<p className="text-sm text-muted">
Cross-platform and native mobile apps.
</p>
</div>

<div className="card-subtle p-6 rounded-xl text-center">
<h3 className="text-3xl font-bold gradient-text mb-2">AI</h3>
<p className="text-sm text-muted">
Voice assistants, automation, and intelligent platforms.
</p>
</div>

</div>

</div>

</section>


{/* PRINCIPLES */}

<section className="py-24 border-y border-border bg-card/30">

<div className="container mx-auto px-6">

<h2 className="text-3xl font-bold text-center text-fg mb-14">

How we build products

</h2>

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

{principles.map((p,index)=>{

const Icon = p.icon

return (

<motion.div
key={index}
initial={{ opacity:0, y:20 }}
whileInView={{ opacity:1, y:0 }}
viewport={{ once:true }}
transition={{ delay:index*0.05 }}
className="card-subtle p-6 rounded-xl"
>

<div className="w-12 h-12 flex items-center justify-center rounded-lg bg-accent/10 text-accent mb-4">

<Icon className="w-6 h-6"/>

</div>

<h3 className="font-semibold text-fg mb-2">

{p.title}

</h3>

<p className="text-sm text-muted">

{p.description}

</p>

</motion.div>

)

})}

</div>

</div>

</section>


{/* TECH STACK */}

<section className="py-24">

<div className="container mx-auto px-6 text-center">

<h2 className="text-3xl font-bold text-fg mb-10">

Technologies we use

</h2>

<div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">

{tech.map((t)=>(
<span
key={t}
className="px-4 py-2 text-sm bg-fg/5 border border-border rounded-full text-muted"
>
{t}
</span>
))}

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

)
}