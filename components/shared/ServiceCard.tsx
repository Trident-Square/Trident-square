'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface ServiceCardProps {
  service: {
    icon: any
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6">
        <Icon className="w-7 h-7 text-white" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      
      <div className="mb-6">
        <span className="text-2xl font-bold text-blue-600">{service.price}</span>
        <span className="text-gray-500 text-sm ml-1">/ project</span>
      </div>

      <ul className="space-y-3">
        {service.features.map((feature, i) => (
          <li key={i} className="flex items-center text-gray-600">
            <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
