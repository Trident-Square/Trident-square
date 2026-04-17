'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Check, ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { getContactPhoneDisplay } from '@/lib/contact'

const fieldClass =
  'w-full min-h-[2.75rem] rounded-xl border border-zinc-200/90 bg-zinc-50 px-3.5 py-3 text-base text-fg shadow-inner shadow-zinc-900/[0.03] transition-all duration-200 placeholder:text-muted/55 sm:min-h-[2.875rem] sm:px-4 ' +
  'hover:border-indigo-300 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ' +
  'dark:border-slate-600 dark:bg-[#070a12] dark:shadow-none dark:placeholder:text-muted/60 ' +
  'dark:hover:border-indigo-400/45 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/25'

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
      {children}
    </label>
  )
}

export type ContactInquiryFormProps = {
  /** Unique id prefix for fields (e.g. `engage` in modal) */
  idPrefix?: string
  /** Tighter spacing and smaller message area */
  compact?: boolean
  successVariant?: 'page' | 'modal'
  /** Modal: called after user taps Done on success (typically close + session dismiss) */
  onSuccessClose?: () => void
  className?: string
}

export default function ContactInquiryForm({
  idPrefix = '',
  compact = false,
  successVariant = 'page',
  onSuccessClose,
  className,
}: ContactInquiryFormProps) {
  const fid = (name: string) => (idPrefix ? `${idPrefix}-${name}` : name)
  const phoneDisplay = getContactPhoneDisplay()
  const phonePlaceholder = phoneDisplay || 'Your phone number'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitted(true)
    setSending(false)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const resetForm = () => {
    setSubmitted(false)
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    })
  }

  const gap = compact ? 'space-y-4 sm:space-y-5' : 'space-y-5 sm:space-y-6'
  const gridGap = compact ? 'gap-4 sm:gap-5' : 'gap-5 sm:gap-6'
  const msgRows = compact ? 4 : 5

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleSubmit}
            className={gap}
          >
            <div className={cn('grid grid-cols-1 sm:grid-cols-2', gridGap)}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: compact ? 0.02 : 0.05 }}
              >
                <FieldLabel htmlFor={fid('name')}>
                  Name <span className="text-accent">*</span>
                </FieldLabel>
                <input
                  type="text"
                  id={fid('name')}
                  name="name"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="Your name"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: compact ? 0.04 : 0.08 }}
              >
                <FieldLabel htmlFor={fid('email')}>
                  Email <span className="text-accent">*</span>
                </FieldLabel>
                <input
                  type="email"
                  id={fid('email')}
                  name="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="you@company.com"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: compact ? 0.06 : 0.11 }}
            >
              <FieldLabel htmlFor={fid('phone')}>Phone</FieldLabel>
              <input
                type="tel"
                id={fid('phone')}
                name="phone"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                className={fieldClass}
                placeholder={phonePlaceholder}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: compact ? 0.08 : 0.14 }}
            >
              <FieldLabel htmlFor={fid('subject')}>
                Subject <span className="text-accent">*</span>
              </FieldLabel>
              <div className="relative">
                <select
                  id={fid('subject')}
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className={cn(fieldClass, 'cursor-pointer appearance-none pr-11')}
                >
                  <option value="">Choose a topic</option>
                  <option value="web">Web development</option>
                  <option value="app">App development</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="design">UI / UX design</option>
                  <option value="other">Something else</option>
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-accent/80"
                  aria-hidden
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: compact ? 0.1 : 0.17 }}
            >
              <FieldLabel htmlFor={fid('message')}>
                Message <span className="text-accent">*</span>
              </FieldLabel>
              <textarea
                id={fid('message')}
                name="message"
                rows={msgRows}
                required
                value={formData.message}
                onChange={handleChange}
                className={cn(fieldClass, compact ? 'min-h-[6.5rem] resize-y' : 'min-h-[7rem] resize-y sm:min-h-[8.5rem]')}
                placeholder="Goals, timeline, budget range, links to references — anything that helps us respond with clarity."
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: compact ? 0.12 : 0.2 }}
              className={cn(
                'flex flex-col gap-4 border-t border-indigo-100 pt-5 dark:border-slate-600/60 sm:pt-6',
                !compact && 'sm:pt-8 md:flex-row md:items-center md:justify-between'
              )}
            >
              <p
                className={cn(
                  'text-xs leading-relaxed text-muted',
                  !compact && 'order-2 md:order-1 md:max-w-[20rem] lg:max-w-xs'
                )}
              >
                By sending this form you agree we may contact you about your inquiry. We never share your details with
                third parties.
              </p>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={sending}
                className={cn(
                  'w-full shrink-0 sm:min-h-[3rem]',
                  !compact && 'order-1 md:order-2 md:w-auto md:min-w-[11.5rem]'
                )}
              >
                {sending ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="mr-2 inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                      aria-hidden
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <Send className="ml-2 h-4 w-4" aria-hidden />
                  </>
                )}
              </Button>
            </motion.div>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 22, stiffness: 320 }}
            className={cn(
              'flex flex-col items-center px-1 text-center',
              compact ? 'py-6 sm:py-8' : 'py-8 sm:py-10 md:py-14'
            )}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 14, stiffness: 220, delay: 0.06 }}
              className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-600/35 ring-1 ring-white/25 dark:shadow-indigo-950/60 sm:mb-6 sm:h-16 sm:w-16"
            >
              <Check className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2.5} aria-hidden />
            </motion.div>
            <h3 className="text-lg font-semibold tracking-tight text-fg sm:text-xl md:text-2xl">Message received</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted sm:mt-3 sm:text-base">
              Thanks for reaching out. We&apos;ll review your note and get back within one business day — often sooner.
            </p>
            {successVariant === 'modal' ? (
              <Button
                type="button"
                variant="primary"
                size="md"
                className="mt-6 w-full max-w-xs sm:w-auto"
                onClick={() => {
                  onSuccessClose?.()
                }}
              >
                Close
              </Button>
            ) : (
              <Button
                type="button"
                variant="secondary"
                size="md"
                fullWidth
                className="mt-8 sm:w-auto sm:min-w-[12rem]"
                onClick={resetForm}
              >
                Send another message
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
