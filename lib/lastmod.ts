/**
 * The date each page's content last really changed (YYYY-MM-DD), sent to Google as
 * <lastmod> in the sitemap. When you change a page, update its date here.
 *
 * Why it matters: if every deploy marks every page as "changed today", Google learns
 * the dates are meaningless and ignores them — then real updates are picked up slowly.
 * Blog posts use their own `date` / `updated` fields instead.
 */
export const lastmod = {
  home: '2026-10-24',
  services: '2026-10-17',
  /** Every /services/[slug] page (content lives in lib/services.ts). */
  servicePages: '2026-10-17',
  partners: '2026-11-06',
  work: '2026-11-12',
  /** Every /work/[slug] page unless listed in workPages. */
  workPagesDefault: '2026-11-12',
  workPages: {} as Record<string, string>,
  about: '2026-10-17',
  contact: '2026-10-24',
}
