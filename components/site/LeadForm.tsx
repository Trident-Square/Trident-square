'use client'

import { useState } from 'react'
import Arrow from './Arrow'
import { services } from '@/lib/services'
import { whatsappHref } from '@/lib/site'
import { cn } from '@/lib/utils'

type Kind = 'project' | 'partner'
type Status = 'idle' | 'sending' | 'sent' | 'error'

const budgets = ['Under ₹3 lakh', '₹3–10 lakh', '₹10–25 lakh', '₹25 lakh+', 'Not sure yet']
const partnerTypes = ['Referral partner', 'White-label / reseller agency', 'Freelancer or consultant', 'Other']

/**
 * One form for both project enquiries and partner sign-ups. Posts to /api/lead,
 * which forwards to the configured webhook / email. If delivery fails we hand
 * the visitor a prefilled WhatsApp link so the lead is never lost.
 */
export default function LeadForm({ kind = 'project', defaultService }: { kind?: Kind; defaultService?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [fallback, setFallback] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>
    setStatus('sending')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, page: window.location.pathname, ...data }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      form.reset()
      window.gtag?.('event', kind === 'partner' ? 'partner_signup' : 'generate_lead', { method: 'form' })
    } catch {
      const summary = Object.entries(data)
        .filter(([k, v]) => v && k !== 'company_website')
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n')
      setFallback(whatsappHref(`${kind === 'partner' ? 'Partner enquiry' : 'Project enquiry'}\n${summary}`))
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="border border-line bg-white p-8 sm:p-10" role="status">
        <p className="eyebrow text-signal">Received</p>
        <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
          {kind === 'partner' ? 'Welcome aboard — almost.' : 'Thanks. We’re on it.'}
        </h3>
        <p className="mt-3 max-w-md leading-relaxed text-muted">
          {kind === 'partner'
            ? 'We’ll send your partner agreement and referral link within one business day.'
            : 'A senior engineer (not a salesperson) will reply within one business day with questions or a first estimate.'}
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-ghost mt-8">
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="relative border border-line bg-white p-6 sm:p-9">
      {/* Honeypot: hidden from people, irresistible to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" />
        <Field label="Work email" name="email" type="email" required autoComplete="email" />
        <Field label="Phone / WhatsApp" name="phone" type="tel" autoComplete="tel" required={kind === 'partner'} />
        <Field label="Company" name="company" autoComplete="organization" />

        {kind === 'project' ? (
          <>
            <Select label="What do you need?" name="service" defaultValue={defaultService ?? ''} required>
              <option value="" disabled>Choose one</option>
              {services.map((s) => (
                <option key={s.slug} value={s.name}>{s.name}</option>
              ))}
              <option value="Not sure">Not sure yet</option>
            </Select>
            <Select label="Budget" name="budget" defaultValue="">
              <option value="" disabled>Choose a range</option>
              {budgets.map((b) => <option key={b}>{b}</option>)}
            </Select>
          </>
        ) : (
          <>
            <Select label="Partnership type" name="partner_type" defaultValue="" required>
              <option value="" disabled>Choose one</option>
              {partnerTypes.map((b) => <option key={b}>{b}</option>)}
            </Select>
            <Field label="City / country" name="location" />
          </>
        )}
      </div>

      <div className="mt-5">
        <label className="field-label" htmlFor={`${kind}-message`}>
          {kind === 'partner' ? 'Tell us about your network or a lead you have in mind' : 'What are you building?'}
        </label>
        <textarea
          id={`${kind}-message`}
          name="message"
          rows={5}
          required={kind === 'project'}
          className="field resize-y"
          placeholder={
            kind === 'partner'
              ? 'e.g. I run a CA firm with 40 SME clients, two of them want WhatsApp automation…'
              : 'The problem, who it’s for, any deadline. Links welcome.'
          }
        />
      </div>

      <div className="mt-7 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[12.5px] leading-relaxed text-muted">
          We reply within one business day. Your details are used only to respond to you — never sold or shared.
        </p>
        <button type="submit" disabled={status === 'sending'} className={cn('btn-primary shrink-0', status === 'sending' && 'opacity-70')}>
          {status === 'sending' ? 'Sending…' : kind === 'partner' ? 'Apply as partner' : 'Send enquiry'}
          <Arrow />
        </button>
      </div>

      {status === 'error' ? (
        <p className="mt-5 bg-paper-2 p-4 text-[14px]" role="alert">
          Couldn’t send just now.{' '}
          <a href={fallback} target="_blank" rel="noopener noreferrer" className="font-medium text-cobalt underline">
            Send the same details on WhatsApp
          </a>{' '}
          — it takes one tap.
        </p>
      ) : null}
    </form>
  )
}

function Field({ label, name, ...rest }: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="field-label" htmlFor={name}>
        {label}
        {rest.required ? <span className="text-cobalt"> *</span> : null}
      </label>
      <input id={name} name={name} className="field" {...rest} />
    </div>
  )
}

function Select({ label, name, children, ...rest }: { label: string; name: string; children: React.ReactNode } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label className="field-label" htmlFor={name}>
        {label}
        {rest.required ? <span className="text-cobalt"> *</span> : null}
      </label>
      <select id={name} name={name} className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22><path d=%22M4 6l4 4 4-4%22 stroke=%22%23605e58%22 fill=%22none%22 stroke-width=%221.5%22/></svg>')] bg-[length:16px] bg-[right_14px_center] bg-no-repeat pr-10" {...rest}>
        {children}
      </select>
    </div>
  )
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}
