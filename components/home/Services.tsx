'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  Globe,
  Smartphone,
  ShoppingCart,
  Code,
  Palette,
  TrendingUp,
} from 'lucide-react'
import ServiceCard from '@/components/shared/ServiceCard'
import { easePremium, fadeUpVariants, staggerDelay, transition } from '@/lib/motion'

const services = [
  {
    href: '/services/web',
    icon: Globe,
    title: 'Web Development',
    description: 'Custom websites, web applications, and e-commerce solutions built with modern technologies.',
    price: 'Project based',
    features: ['React/Next.js', 'Node.js', 'Python', 'PHP'],
  },
  {
    href: '/services/app',
    icon: Smartphone,
    title: 'App Development',
    description: 'Native and cross-platform mobile apps for iOS and Android with stunning UI/UX.',
    price: 'Project based',
    features: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
  },
  {
    href: '/services/ecommerce',
    icon: ShoppingCart,
    title: 'E-Commerce Solutions',
    description: 'Complete online store setup with payment integration and inventory management.',
    price: 'Project based',
    features: ['Shopify', 'WooCommerce', 'Custom', 'Payment Gateway'],
  },
  {
    href: '/contact',
    icon: Code,
    title: 'Custom Software',
    description: 'Tailored software solutions to automate and streamline your business processes.',
    price: 'Project based',
    features: ['CRM', 'ERP', 'Automation', 'API Integration'],
  },
  {
    href: '/services/design',
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive designs that enhance user experience and engagement.',
    price: 'Project based',
    features: ['Wireframing', 'Prototyping', 'User Testing', 'Design Systems'],
  },
  {
    href: '/contact',
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategies to grow your online presence.',
    price: 'Project based',
    features: ['SEO', 'Social Media', 'Content', 'Analytics'],
  },
]

export default function Services() {
  const reduce = useReducedMotion()

  const headerVariants = {
    hidden: { opacity: reduce ? 1 : 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay(reduce, 0.09, 0.05).staggerChildren,
        delayChildren: staggerDelay(reduce, 0.09, 0.05).delayChildren,
      },
    },
  }
  const headerItem = fadeUpVariants(reduce, 14)

  const gridContainer = {
    hidden: { opacity: reduce ? 1 : 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay(reduce, 0.07, 0.1).staggerChildren,
        delayChildren: staggerDelay(reduce, 0.07, 0.1).delayChildren,
      },
    },
  }

  const cardVariants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: transition(reduce, 0.48),
    },
  }

  return (
    <section id="services" className="relative py-10 sm:py-12 lg:py-14">
      <div className="container mx-auto min-w-0 max-w-7xl px-3.5 sm:px-6 lg:px-8">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="mb-6 max-w-2xl sm:mb-8 lg:mb-10"
        >
          <motion.p variants={headerItem} className="premium-eyebrow mb-3 sm:mb-4">
            <span className="premium-eyebrow-bar" />
            Capabilities
          </motion.p>
          <motion.h2
            variants={headerItem}
            className="text-[clamp(1.5rem,4vw,2.35rem)] font-semibold leading-tight tracking-tight text-fg md:text-4xl lg:leading-tight"
          >
            Services we <span className="gradient-text">deliver</span>
          </motion.h2>
          <motion.p
            variants={headerItem}
            className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-muted sm:mt-4 sm:text-base"
          >
            Project-based engagements across web, mobile, and custom software—scoped to your timelines and
            stakeholders.
          </motion.p>
        </motion.div>

        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-32px' }}
          className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:gap-7 lg:gap-8 xl:grid-cols-3"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={reduce ? undefined : { y: -4 }}
              transition={{ duration: 0.28, ease: easePremium }}
              className="min-w-0"
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
