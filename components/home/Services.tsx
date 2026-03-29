'use client'

import { motion } from 'framer-motion'
import {
  Globe,
  Smartphone,
  ShoppingCart,
  Code,
  Palette,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'
import ServiceCard from '@/components/shared/ServiceCard'
import Button from '@/components/ui/Button'

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Custom websites, web applications, and e-commerce solutions built with modern technologies.',
    price: 'Project based',
    features: ['React/Next.js', 'Node.js', 'Python', 'PHP'],
  },
  {
    icon: Smartphone,
    title: 'App Development',
    description: 'Native and cross-platform mobile apps for iOS and Android with stunning UI/UX.',
    price: 'Project based',
    features: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Solutions',
    description: 'Complete online store setup with payment integration and inventory management.',
    price: 'Project based',
    features: ['Shopify', 'WooCommerce', 'Custom', 'Payment Gateway'],
  },
  {
    icon: Code,
    title: 'Custom Software',
    description: 'Tailored software solutions to automate and streamline your business processes.',
    price: 'Project based',
    features: ['CRM', 'ERP', 'Automation', 'API Integration'],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive designs that enhance user experience and engagement.',
    price: 'Project based',
    features: ['Wireframing', 'Prototyping', 'User Testing', 'Design Systems'],
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategies to grow your online presence.',
    price: 'Project based',
    features: ['SEO', 'Social Media', 'Content', 'Analytics'],
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.06 },
  },
}

export default function Services() {
  return (
    <section id="services" className="relative py-18 lg:py-20 bg-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-fg">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted mt-4 max-w-2xl mx-auto text-sm lg:text-lg">
            We offer comprehensive digital solutions tailored to your business needs. Pricing is project-based and customized for each client.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
