/**
 * Contact details from environment (NEXT_PUBLIC_* is inlined for client components).
 *
 * Copy `.env.example` to `.env.local` and set values.
 */

export function getContactEmail(): string {
  return (process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '').trim()
}

/** Digits only, country code included, no + (e.g. 911234567890). Used for tel: and WhatsApp. */
export function getContactPhoneE164Digits(): string {
  return (process.env.NEXT_PUBLIC_CONTACT_PHONE_E164 ?? '').replace(/\D/g, '')
}

/** Shown in UI; falls back to +{E164} when unset. */
export function getContactPhoneDisplay(): string {
  const display = (process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY ?? '').trim()
  if (display) return display
  const d = getContactPhoneE164Digits()
  return d ? `+${d}` : ''
}

export function getTelHref(): string {
  const d = getContactPhoneE164Digits()
  return d ? `tel:+${d}` : ''
}

export function getWhatsAppChatUrl(prefillText?: string): string {
  const d = getContactPhoneE164Digits()
  if (!d) return ''
  const base = `https://wa.me/${d}`
  if (!prefillText) return base
  return `${base}?${new URLSearchParams({ text: prefillText }).toString()}`
}

export function getMailtoHref(subject?: string, body?: string): string {
  const email = getContactEmail()
  if (!email) return ''
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const q = params.toString()
  return q ? `mailto:${email}?${q}` : `mailto:${email}`
}
