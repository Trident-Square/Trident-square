'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Linkedin, Instagram, Github, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'

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

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-card">
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
            className="col-span-2 md:col-span-1"
          >
            <Link href="/" className="text-2xl font-bold gradient-text inline-block mb-4">
              Trident Square
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6 max-w-xs">
              Intelligent digital solutions. We build products that scale.
            </p>
            {/* <div className="flex gap-3">
              <SocialLink href="#" icon={Facebook} />
              <SocialLink href="#" icon={Twitter} />
              <SocialLink href="#" icon={Linkedin} />
              <SocialLink href="#" icon={Instagram} />
              <SocialLink href="#" icon={Github} />
            </div> */}
          </motion.div>

          <div>
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

          <div>
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

          <div>
            <h4 className="text-sm font-semibold text-fg uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-muted">PEACE HOUSE, Alpha 1, Greater Noida, Uttar Pradesh 201310, India</span>
              </li>
              <li>
                <a href="tel:+916388443418" className="flex items-center gap-3 text-muted hover:text-accent transition-colors text-sm">
                  <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                  +91 6388443418
                </a>
              </li>
              <li>
                <a href="mailto:admin@trident.com" className="flex items-center gap-3 text-muted hover:text-accent transition-colors text-sm">
                  <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                  admin@trident.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-muted text-sm">
          <p>&copy; {new Date().getFullYear()} Trident Square. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon: Icon }: { href: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 rounded-xl bg-accent-soft/50 dark:bg-accent-soft/20 flex items-center justify-center text-muted hover:text-accent hover:bg-accent/20 transition-colors duration-300"
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  )
}
