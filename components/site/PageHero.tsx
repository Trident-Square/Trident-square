import Link from 'next/link'
import { cn } from '@/lib/utils'

/**
 * Shared hero for inner pages: breadcrumb row, very large condensed title,
 * intro on the right, optional meta list. Keeps every page on one rhythm.
 */
export default function PageHero({
  crumbs,
  title,
  intro,
  meta,
  children,
  className,
}: {
  crumbs: { label: string; href?: string }[]
  title: React.ReactNode
  intro?: React.ReactNode
  meta?: { k: string; v: React.ReactNode }[]
  children?: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn('container pt-28 sm:pt-36', className)}>
      <nav aria-label="Breadcrumb" className="flex items-center justify-between border-b border-ink pb-3 font-mono text-[11px] uppercase tracking-[0.14em]">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="text-muted hover:text-ink">Home</Link></li>
          {crumbs.map((c) => (
            <li key={c.label} className="flex items-center gap-2">
              <span aria-hidden className="text-muted">/</span>
              {c.href ? <Link href={c.href} className="text-muted hover:text-ink">{c.label}</Link> : <span>{c.label}</span>}
            </li>
          ))}
        </ol>
        <span className="hidden text-muted sm:inline">Trident Square — Noida</span>
      </nav>

      <h1 className="display mt-10 animate-[title-in_1.1s_cubic-bezier(.2,.75,.15,1)_both] text-[clamp(3.25rem,10vw,10rem)] sm:mt-14">{title}</h1>

      {intro || meta ? (
        <div className="mt-12 grid gap-10 border-t border-ink/15 pt-8 lg:grid-cols-12">
          {meta ? (
            <dl className="grid grid-cols-2 gap-6 lg:col-span-5 lg:grid-cols-1 lg:gap-4">
              {meta.map((m) => (
                <div key={m.k} className="lg:flex lg:items-baseline lg:justify-between lg:border-b lg:border-ink/10 lg:pb-3">
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">{m.k}</dt>
                  <dd className="mt-1 text-[15.5px] font-medium lg:mt-0 lg:text-right">{m.v}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          {intro ? <div className={cn('lede text-ink-2', meta ? 'lg:col-span-6 lg:col-start-7' : 'lg:col-span-7 lg:col-start-6')}>{intro}</div> : null}
        </div>
      ) : null}
      {children}
    </section>
  )
}
