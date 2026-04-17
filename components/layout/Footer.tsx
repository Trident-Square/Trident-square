'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { transition } from '@/lib/motion'
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import { getContactEmail, getContactPhoneDisplay, getTelHref, getWhatsAppChatUrl } from '@/lib/contact'
import { WhatsAppIcon } from '@/components/layout/WhatsAppFloat'

const mainLinks = [
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Contact', href: '/contact' },
]

const serviceLinks = [
  { name: 'Web Development', href: '/services/web' },
  { name: 'App Development', href: '/services/app' },
  { name: 'E-Commerce', href: '/services/ecommerce' },
  { name: 'UI/UX Design', href: '/services/design' },
]

const socialExternal = [
  {
    href: 'https://www.linkedin.com/company/trident-square/',
    icon: Linkedin,
    label: 'Trident Square on LinkedIn',
  },
  {
    href: 'https://www.instagram.com/tridentsquare/',
    icon: Instagram,
    label: 'Trident Square on Instagram',
  },
  {
    href: 'https://www.facebook.com/profile.php?id=61574509445613',
    icon: Facebook,
    label: 'Trident Square on Facebook',
  },
] as const

export default function Footer() {
  const reduce = useReducedMotion()
  const contactEmail = getContactEmail()
  const telHref = getTelHref()
  const phoneDisplay = getContactPhoneDisplay()
  const whatsappHref = getWhatsAppChatUrl()

  return (
    <motion.footer
      className="relative shrink-0 border-t border-border bg-card"
      initial={reduce ? undefined : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={transition(reduce, 0.5)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top CTA strip */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-12 lg:py-16 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-border"
        >
          <div>
            <h3 className="text-2xl font-bold text-fg mb-1">Ready to build?</h3>
            <p className="text-muted">Let&apos;s turn your idea into a product.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-semibold text-accent hover:underline"
          >
            Get in touch
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </motion.div> */}

        {/* Links grid */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2 min-w-0 md:col-span-1"
          >
            <Link href="/" className="text-xl font-semibold inline-block mb-4 tracking-tight">
            Trident
            <span className="bg-gradient-to-r from-indigo-600 to-teal-600 bg-clip-text text-transparent dark:from-indigo-300 dark:to-teal-300">
              Square
            </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-5 max-w-xs">
              Intelligent digital solutions. We build products that scale.
            </p>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-fg">Follow us</p>
            <div className="flex flex-wrap gap-3">
              {socialExternal.map(({ href, icon, label }) => (
                <SocialLink key={href} href={href} icon={icon} label={label} />
              ))}
              {whatsappHref ? (
                <SocialLink href={whatsappHref} icon={WhatsAppIcon} label="Chat on WhatsApp" />
              ) : null}
            </div>
          </motion.div>

          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-fg uppercase tracking-wider mb-4">Navigate</h4>
            <ul className="space-y-3">
              {mainLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted hover:text-accent transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-fg uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted hover:text-accent transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 min-w-0 md:col-span-1">
            <h4 className="text-sm font-semibold text-fg uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-muted">Bhutani 62 Avenue, Block - C, Phase 2, Industrial Area, Sector 62, Noida, Uttar Pradesh 201309</span>
              </li>
              {telHref && phoneDisplay ? (
                <li>
                  <a href={telHref} className="flex items-center gap-3 text-muted hover:text-accent transition-colors text-sm">
                    <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                    {phoneDisplay}
                  </a>
                </li>
              ) : null}
              {contactEmail ? (
                <li>
                  <a href={`mailto:${contactEmail}`} className="flex items-center gap-3 text-muted hover:text-accent transition-colors text-sm">
                    <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                    {contactEmail}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-border text-center text-muted text-sm">
          <p>&copy; {new Date().getFullYear()} Trident Square. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  )
}

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="flex h-5 w-5 items-center justify-center rounded-xl bg-accent-soft/50 text-muted transition-colors duration-300 hover:bg-accent/20 hover:text-accent dark:bg-accent-soft/20"
    >
      <Icon className="h-5 w-5" />
    </motion.a>
  )
}
