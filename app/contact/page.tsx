'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, Check } from 'lucide-react'

const OFFICE_ADDRESS = 'PEACE HOUSE, 6th Cross St, near GATE NO-4, Alpha 1, Greater Noida, Uttar Pradesh 201310, India'
const MAP_LINK = 'https://maps.google.com/?q=PEACE+HOUSE+6th+Cross+St+Alpha+1+Greater+Noida+Uttar+Pradesh+201310'

export default function ContactPage() {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="pt-24 min-h-screen bg-contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14"
        >
          <p className="text-sm font-medium text-muted tracking-wide mb-2">Get in touch</p>
          <h1 className="text-4xl md:text-5xl font-bold text-fg">
            Contact <span className="gradient-text">us</span>
          </h1>
          <p className="text-muted mt-3 max-w-xl">
            Have a project in mind? Send a message and we&apos;ll get back within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form column */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-fg mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-bg border border-border text-fg placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-fg/10 focus:border-fg/30 transition-all"
                      placeholder="Your name"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-fg mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-bg border border-border text-fg placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-fg/10 focus:border-fg/30 transition-all"
                      placeholder="you@company.com"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label htmlFor="phone" className="block text-sm font-medium text-fg mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-bg border border-border text-fg placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-fg/10 focus:border-fg/30 transition-all"
                      placeholder="+91 6388443418"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <label htmlFor="subject" className="block text-sm font-medium text-fg mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-bg border border-border text-fg focus:outline-none focus:ring-2 focus:ring-fg/10 focus:border-fg/30 transition-all"
                    >
                      <option value="">Select</option>
                      <option value="web">Web Development</option>
                      <option value="app">App Development</option>
                      <option value="ecommerce">E-Commerce</option>
                      <option value="design">UI/UX Design</option>
                      <option value="other">Other</option>
                    </select>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-fg mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-bg border border-border text-fg placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-fg/10 focus:border-fg/30 transition-all resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full sm:w-auto min-w-[180px] px-6 py-3.5 rounded-xl bg-fg text-bg font-semibold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-70 transition-opacity"
                    >
                      {sending ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-bg border-t-transparent rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  className="flex flex-col items-center justify-center py-16 px-6 rounded-2xl border border-border bg-card text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-fg text-bg flex items-center justify-center mb-6"
                  >
                    <Check className="w-8 h-8" strokeWidth={2.5} />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-semibold text-fg mb-2"
                  >
                    Message sent
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-muted text-sm max-w-sm"
                  >
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info column */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-fg/10 text-fg shrink-0">
                  <MapPin className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-fg mb-1">Visit us</h3>
                  <a
                    href={MAP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted text-sm leading-relaxed hover:text-fg transition-colors"
                  >
                    {OFFICE_ADDRESS}
                  </a>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-fg/10 text-fg shrink-0">
                  <Mail className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-fg mb-1">Email</h3>
                  <a href="mailto:admin@tridentsquare.com" className="text-muted text-sm hover:text-fg transition-colors">
                    admin@tridentsquare.com
                  </a>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-fg/10 text-fg shrink-0">
                  <Phone className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-fg mb-1">Phone</h3>
                  <a href="tel:+916388443418" className="text-muted text-sm hover:text-fg transition-colors">
                  +91 63884 43418
                  </a>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-start gap-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-fg/10 text-fg shrink-0">
                  <Clock className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-fg mb-1">Hours</h3>
                  <p className="text-muted text-sm">
                    Sun–Sat: 9:00 AM – 10:00 PM<br />
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
