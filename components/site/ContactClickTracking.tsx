'use client'

import { useEffect } from 'react'
import { site } from '@/lib/site'

/**
 * Sends a GA4 event whenever someone taps our WhatsApp or phone number, anywhere on the site.
 * One delegated listener instead of an onClick on every link, so new buttons are tracked automatically.
 * Only links to our own number count — the blog's "share on WhatsApp" (wa.me/?text=…) is ignored.
 */
export default function ContactClickTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a || !window.gtag) return
      const href = a.getAttribute('href') ?? ''
      const event = href.includes(`wa.me/${site.phoneE164}`) ? 'whatsapp_click' : href.startsWith('tel:') ? 'phone_click' : null
      if (!event) return
      const where = a.closest('header') ? 'header' : a.closest('footer') ? 'footer' : a.closest('form, [role="status"]') ? 'lead_form' : a.dataset.track ?? 'page'
      window.gtag('event', event, {
        link_location: where,
        link_text: (a.textContent?.trim() || a.getAttribute('aria-label') || '').slice(0, 60),
        page_path: window.location.pathname,
      })
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])
  return null
}
