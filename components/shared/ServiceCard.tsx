'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface ServiceCardProps {
  service: {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
    price: string
    features: string[]
  }
  index: number
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group rounded-2xl bg-card p-6 lg:p-8 shadow-lg shadow-black/5 dark:shadow-black/20 transition-all duration-300 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30"
    >
      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-6">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-bold text-fg mb-3">{service.title}</h3>
      <p className="text-muted text-sm leading-relaxed mb-4">{service.description}</p>
      <p className="text-accent font-semibold mb-5">{service.price} / project</p>
      <ul className="space-y-2">
        {service.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-muted text-sm">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
