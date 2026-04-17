'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Globe, Smartphone, ShoppingCart, Palette, ChevronLeft, Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import SiteCanvas from '@/components/layout/SiteCanvas'

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
    technologies: ['React Native', 'Firebase'],
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
      <SiteCanvas>
        <div className="relative z-[1] flex min-h-[50vh] items-center justify-center px-4 py-24 pt-[max(6rem,calc(4rem+env(safe-area-inset-top,0px)+1rem))] sm:pt-24">
          <div className="mx-auto max-w-md text-center">
            <h1 className="mb-3 text-2xl font-bold text-fg sm:text-3xl">Service not found</h1>
            <p className="mb-8 text-sm leading-relaxed text-muted sm:text-base">
              The service you&apos;re looking for doesn&apos;t exist or may have moved.
            </p>
            <Button href="/services" variant="primary" size="lg" className="min-h-[2.875rem] w-full max-w-xs sm:w-auto">
              Back to services
            </Button>
          </div>
        </div>
      </SiteCanvas>
    )
  }

  const Icon = service.icon

  return (
    <SiteCanvas>
      <div className="relative z-[1] min-w-0 pb-14 pt-[max(6rem,calc(4rem+env(safe-area-inset-top,0px)+1rem))] sm:pb-16 sm:pt-20 lg:pb-20 lg:pt-24">
        <div className="container mx-auto min-w-0 max-w-7xl px-3.5 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="mb-6 inline-flex min-h-[2.75rem] items-center gap-2 rounded-xl px-1 py-2 text-sm font-semibold text-accent transition-colors hover:bg-indigo-50/80 hover:text-fg active:bg-indigo-100/80 sm:mb-8 sm:min-h-0 sm:px-0 sm:text-base dark:hover:bg-white/[0.06] dark:hover:text-indigo-200"
          >
            <ChevronLeft className="h-5 w-5 shrink-0" aria-hidden />
            Back to services
          </Link>

          <div className="grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
            <div className="min-w-0 lg:col-span-7 xl:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-600/25 sm:h-14 sm:w-14 lg:h-16 lg:w-16 dark:from-indigo-500 dark:to-blue-500 dark:shadow-indigo-950/40">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" aria-hidden />
                </div>

                <h1 className="text-balance text-2xl font-bold leading-tight tracking-tight text-fg sm:text-3xl md:text-4xl lg:text-5xl">
                  {service.title}
                </h1>

                <p className="mt-4 text-base leading-relaxed text-muted sm:mt-5 sm:text-lg md:text-xl">
                  {service.longDescription}
                </p>

                <div className="card-subtle mt-8 rounded-2xl border border-border/80 p-5 sm:mt-10 sm:rounded-3xl sm:p-6 lg:p-8">
                  <h2 className="mb-4 text-lg font-bold text-fg sm:mb-6 sm:text-xl md:text-2xl">Key features</h2>
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex min-w-0 items-start gap-2.5">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                        <span className="text-sm leading-snug text-fg sm:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-subtle mt-6 rounded-2xl border border-border/80 p-5 sm:mt-8 sm:rounded-3xl sm:p-6 lg:p-8">
                  <h2 className="mb-4 text-lg font-bold text-fg sm:mb-6 sm:text-xl md:text-2xl">
                    Technologies we use
                  </h2>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {service.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="rounded-xl border border-border bg-card px-3 py-2 text-xs text-muted sm:px-4 sm:text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <aside className="min-w-0 lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 lg:self-start xl:top-28">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="card-subtle rounded-2xl border border-border/80 p-5 sm:rounded-3xl sm:p-6 lg:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Pricing</p>
                <div className="mt-2">
                  <span className="text-2xl font-bold gradient-text sm:text-3xl">{service.price}</span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                  Get a customized quote for your requirements—we&apos;ll respond with scope and next steps.
                </p>

                <Button href="/contact" variant="primary" size="lg" fullWidth className="mt-6 min-h-[2.875rem] sm:mt-8">
                  Get started
                </Button>

                <div className="mt-6 border-t border-border pt-6 sm:mt-8 sm:pt-8">
                  <h3 className="mb-3 text-sm font-semibold text-fg sm:mb-4 sm:text-base">Why teams choose us</h3>
                  <ul className="space-y-3">
                    {['Experienced team', 'Timely delivery', 'Clear communication'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted sm:text-base">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </div>
    </SiteCanvas>
  )
}
