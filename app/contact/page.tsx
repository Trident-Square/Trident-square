'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react'
import {
  getContactEmail,
  getContactPhoneDisplay,
  getTelHref,
} from '@/lib/contact'
import SiteCanvas from '@/components/layout/SiteCanvas'
import ContactInquiryForm from '@/components/contact/ContactInquiryForm'
import { cn } from '@/lib/utils'

const OFFICE_ADDRESS =
  'Bhutani 62 Avenue, Block - C, Phase 2, Industrial Area, Sector 62, Noida, Uttar Pradesh 201309'
const MAP_LINK =
  'https://maps.google.com/?q=Bhutani+62+Avenue,+Block+-+C,+Phase+2,+Industrial+Area,+Sector+62,+Noida,+Uttar+Pradesh+201309'

/* Light: Project-inquiry look for both cards. Dark: Studio look for both cards. Inputs match card in dark. */
const contactCardShell =
  'rounded-2xl border border-indigo-200/80 bg-white shadow-[0_22px_55px_-18px_rgba(30,41,59,0.18)] ring-1 ring-indigo-950/[0.04] sm:rounded-3xl ' +
  'dark:border-slate-600/55 dark:bg-[#070a12] dark:shadow-[0_24px_60px_-18px_rgba(0,0,0,0.65)] dark:ring-slate-950/80'

/* text-base on fields avoids iOS zoom on focus; min-h ~44px touch target */
export default function ContactPage() {
  const contactEmail = getContactEmail()
  const telHref = getTelHref()
  const phoneDisplay = getContactPhoneDisplay()

  return (
    <SiteCanvas>
      <div className="relative z-[1] pt-16 sm:pt-20 lg:pt-24">
        <div className="container mx-auto max-w-6xl min-w-0 px-3.5 pb-16 sm:px-6 sm:pb-20 lg:max-w-7xl lg:px-8 lg:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-8 sm:mb-10 lg:mb-14"
          >
            <p className="premium-eyebrow mb-3 text-muted sm:mb-4">
              <span className="premium-eyebrow-bar" />
              Get in touch
            </p>
            <h1 className="max-w-3xl text-[1.65rem] font-bold leading-tight tracking-tight text-fg sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              Contact <span className="gradient-text">us</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base md:text-lg">
              Have a project in mind? Tell us what you&apos;re building — we read every message and usually reply within
              one business day.
            </p>
          </motion.div>

          <div className="grid min-w-0 grid-cols-1 items-start gap-8 sm:gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
            {/* Form */}
            <div className="min-w-0 md:col-span-1 lg:col-span-7">
              <div
                className={cn(
                  contactCardShell,
                  'overflow-hidden p-4 sm:p-6 md:p-7 lg:p-8 xl:p-10'
                )}
              >
                <div className="mb-6 flex flex-col gap-3 border-b border-indigo-100 pb-6 dark:border-slate-600/60 sm:mb-8 sm:flex-row sm:items-start sm:gap-3 sm:pb-8">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-teal-500/10 text-accent ring-1 ring-indigo-500/10 dark:from-indigo-400/20 dark:to-teal-500/10 dark:ring-indigo-400/15 sm:h-11 sm:w-11 sm:rounded-2xl">
                    <MessageSquare className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0 sm:pt-0.5">
                    <h2 className="text-base font-semibold tracking-tight text-fg sm:text-lg">Project inquiry</h2>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      Fields marked with an asterisk are required. Prefer WhatsApp? Use the chat bubble anytime.
                    </p>
                  </div>
                </div>

                <ContactInquiryForm successVariant="page" />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="min-w-0 md:col-span-1 md:static lg:col-span-5 lg:sticky lg:top-24 lg:self-start xl:top-28">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.45 }}
                className={cn(contactCardShell, 'p-4 sm:p-6 md:p-7 lg:p-8')}
              >
                <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted sm:text-sm sm:tracking-[0.16em]">
                  Studio
                </h2>
                <p className="mt-1.5 text-base font-semibold tracking-tight text-fg sm:mt-2 sm:text-lg">TridentSquare</p>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-3">
                  Based in Noida. We work with teams across India and abroad — async-first, clear communication, fixed
                  milestones.
                </p>

                <ul className="mt-6 divide-y divide-indigo-200/60 dark:divide-slate-600/55 sm:mt-8">
                  <li className="flex gap-3 pb-5 sm:gap-4 sm:pb-6">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/15 to-teal-500/10 text-accent ring-1 ring-indigo-500/10 dark:from-indigo-400/20 dark:to-teal-500/10 sm:h-11 sm:w-11 sm:rounded-xl">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="text-sm font-semibold text-fg">Visit us</h3>
                      <a
                        href={MAP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-sm leading-relaxed text-muted transition-colors hover:text-accent active:opacity-90"
                      >
                        <span className="block text-pretty">{OFFICE_ADDRESS}</span>
                        <span className="mt-2 inline-block text-xs font-semibold text-accent">Open in Google Maps →</span>
                      </a>
                    </div>
                  </li>

                  {contactEmail ? (
                    <li className="flex gap-3 py-5 sm:gap-4 sm:py-6">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/15 to-teal-500/10 text-accent ring-1 ring-indigo-500/10 dark:from-indigo-400/20 dark:to-teal-500/10 sm:h-11 sm:w-11 sm:rounded-xl">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <h3 className="text-sm font-semibold text-fg">Email</h3>
                        <a
                          href={`mailto:${contactEmail}`}
                          className="mt-1 block break-all text-sm text-muted transition-colors hover:text-accent"
                        >
                          {contactEmail}
                        </a>
                      </div>
                    </li>
                  ) : null}

                  {telHref && phoneDisplay ? (
                    <li className="flex gap-3 py-5 sm:gap-4 sm:py-6">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/15 to-teal-500/10 text-accent ring-1 ring-indigo-500/10 dark:from-indigo-400/20 dark:to-teal-500/10 sm:h-11 sm:w-11 sm:rounded-xl">
                        <Phone className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <h3 className="text-sm font-semibold text-fg">Phone</h3>
                        <a href={telHref} className="mt-1 block text-sm text-muted transition-colors hover:text-accent">
                          {phoneDisplay}
                        </a>
                      </div>
                    </li>
                  ) : null}

                  <li className="flex gap-3 pt-5 sm:gap-4 sm:pt-6">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/15 to-teal-500/10 text-accent ring-1 ring-indigo-500/10 dark:from-indigo-400/20 dark:to-teal-500/10 sm:h-11 sm:w-11 sm:rounded-xl">
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                    </span>
                    <div className="pt-0.5">
                      <h3 className="text-sm font-semibold text-fg">Hours</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">Sun–Sat · 9:00 AM – 10:00 PM (IST)</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50/70 px-3.5 py-3 shadow-sm dark:border-slate-600/50 dark:bg-[#0d121f] dark:shadow-none sm:mt-8 sm:rounded-2xl sm:px-4">
                  <p className="text-xs font-medium leading-relaxed text-fg/90 dark:text-indigo-100/90">
                    <span className="font-semibold text-accent dark:text-indigo-200">Typical reply:</span> under 24 hours
                    on business days. For urgent work, mention your deadline in the message.
                  </p>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </div>
    </SiteCanvas>
  )
}
