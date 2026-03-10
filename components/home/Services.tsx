'use client'

import { motion } from 'framer-motion'
import { 
  Globe, 
  Smartphone, 
  ShoppingCart, 
  Code, 
  Palette, 
  TrendingUp,
  ArrowRight 
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

export default function Services() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive digital solutions tailored to your business needs.
            Pricing is project-based and customized for each client.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Need a Custom Solution?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Tell us about your project requirements, and we'll provide a tailored quote within 24 hours.
          </p>
          <Button href="/contact" variant="secondary" size="lg">
            Get Custom Quote
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
