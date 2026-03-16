'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Globe, Smartphone, ShoppingCart, Code, Palette, ArrowRight, Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import Link from 'next/link'

const servicesData: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
    longDescription: string
    features: string[]
    technologies: string[]
    price: string
  }
> = {
  web: {
    icon: Globe,
    title: 'Web Development',
    description: 'Custom websites, web applications, and e-commerce solutions built with modern technologies.',
    longDescription:
      'We create stunning, responsive websites that drive business growth. Our web development services include everything from simple landing pages to complex web applications.',
    features: [
      'Custom Website Development',
      'E-commerce Solutions',
      'Progressive Web Apps (PWA)',
      'CMS Integration',
      'API Development',
      'Database Design',
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'Python', 'PHP', 'Laravel', 'WordPress'],
    price: 'Project based',
  },
  app: {
    icon: Smartphone,
    title: 'App Development',
    description: 'Native and cross-platform mobile apps for iOS and Android with stunning UI/UX.',
    longDescription:
      'Transform your ideas into powerful mobile applications. We build high-performance apps that users love.',
    features: [
      'iOS App Development',
      'Android App Development',
      'Cross-Platform Apps',
      'UI/UX Design',
      'App Store Optimization',
      'Maintenance & Support',
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    price: 'Project based',
  },
  ecommerce: {
    icon: ShoppingCart,
    title: 'E-Commerce Solutions',
    description: 'Complete online store setup with payment integration and inventory management.',
    longDescription:
      'Launch your online store quickly with our e-commerce solutions. We handle everything from setup to launch.',
    features: [
      'Online Store Setup',
      'Payment Gateway Integration',
      'Inventory Management',
      'Shopping Cart Development',
      'Order Management System',
      'Customer Portal',
    ],
    technologies: ['Shopify', 'WooCommerce', 'Magento', 'Custom Solutions'],
    price: 'Project based',
  },
  design: {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive designs that enhance user experience and engagement.',
    longDescription:
      'Create memorable user experiences with our design services. We focus on usability and aesthetics.',
    features: [
      'User Research',
      'Wireframing',
      'Prototyping',
      'Visual Design',
      'Interaction Design',
      'Usability Testing',
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision'],
    price: 'Project based',
  },
}

export default function ServicePage() {
  const params = useParams()
  const slug = params.slug as string
  const service = servicesData[slug]

  if (!service) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-mesh">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-fg mb-4">Service Not Found</h1>
          <p className="text-muted mb-8">The service you&apos;re looking for doesn&apos;t exist.</p>
          <Button href="/services">Back to Services</Button>
        </div>
      </div>
    )
  }

  const Icon = service.icon

  return (
    <div className="pt-24 min-h-screen bg-mesh">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/services"
          className="inline-flex items-center text-accent hover:underline mb-8 font-medium"
        >
          <ArrowRight className="w-4 h-4 rotate-180 mr-2" />
          Back to Services
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-accent/25">
                <Icon className="w-8 h-8 text-white" />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-fg mb-6">{service.title}</h1>

              <p className="text-xl text-muted mb-8 leading-relaxed">{service.longDescription}</p>

              <div className="rounded-xl p-8 card-subtle mb-8">
                <h2 className="text-2xl font-bold text-fg mb-6">Key Features</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-cyan-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-fg">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-8 card-subtle">
                <h2 className="text-2xl font-bold text-fg mb-6">Technologies We Use</h2>
                <div className="flex flex-wrap gap-3">
                  {service.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-xl bg-card border border-border text-muted text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-xl p-8 card-subtle sticky top-24"
            >
              <div className="mb-6">
                <span className="text-3xl font-bold gradient-text">{service.price}</span>
              </div>

              <p className="text-muted mb-6">Get a customized quote for your requirements.</p>

              <Button href="/contact" variant="primary" size="lg" fullWidth>
                Get Started
              </Button>

              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-semibold text-fg mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-muted">
                    <Check className="w-4 h-4 text-cyan-500 mr-2" />
                    Experienced Team
                  </li>
                  <li className="flex items-center text-sm text-muted">
                    <Check className="w-4 h-4 text-cyan-500 mr-2" />
                    Timely Delivery
                  </li>
                  <li className="flex items-center text-sm text-muted">
                    <Check className="w-4 h-4 text-cyan-500 mr-2" />
                    24/7 Support
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
