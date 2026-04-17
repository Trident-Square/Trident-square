/** Dispatched on `window`; `ContactEngagementModal` listens and opens the inquiry dialog. */
export const OPEN_CONTACT_ENGAGEMENT_MODAL = 'trident:open-contact-engagement-modal'

export function openContactEngagementModal(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(OPEN_CONTACT_ENGAGEMENT_MODAL))
}
