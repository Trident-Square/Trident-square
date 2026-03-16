'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function CustomSolutionCTA() {
  return (
    <section className="py-16 lg:py-20 bg-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto"
        >
          <p className="text-sm font-medium text-fg mb-2">Need a custom solution?</p>
          <p className="text-muted text-sm sm:text-base mb-8">
            Tell us about your idea and we&apos;ll put together a tailored plan and quote
            for your product.
          </p>
          <Button href="/contact" variant="primary" size="lg" className="shine-hover">
            Get a custom quote
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

