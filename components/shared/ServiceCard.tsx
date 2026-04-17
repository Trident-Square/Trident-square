'use client'

import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'

interface ServiceCardProps {
  service: {
    href: string
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
    price: string
    features: string[]
  }
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon

  return (
    <Link
      href={service.href}
      className="group relative block h-full min-h-0 min-w-0 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg dark:focus-visible:ring-indigo-400/50 dark:focus-visible:ring-offset-slate-900 sm:rounded-3xl"
    >
      <article className="relative flex h-full min-h-[17rem] flex-col overflow-hidden rounded-2xl border border-indigo-100/80 bg-gradient-to-b from-card via-card to-indigo-50/50 p-5 pt-7 shadow-md shadow-indigo-900/[0.04] ring-1 ring-indigo-900/[0.03] transition-[transform,box-shadow,border-color] duration-300 active:scale-[0.99] group-hover:-translate-y-1 group-hover:border-indigo-200 group-hover:shadow-xl group-hover:shadow-indigo-500/15 dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 dark:ring-white/[0.04] dark:group-hover:border-slate-500 dark:group-hover:shadow-black/40 sm:min-h-0 sm:rounded-3xl sm:p-6 sm:pt-8 lg:p-8 lg:pt-9">
        <div
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-teal-500 opacity-90 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
        <div className="mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-105 dark:from-indigo-500 dark:to-blue-500 dark:shadow-indigo-950/40 sm:h-12 sm:w-12">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
        </div>
        <h3 className="text-base font-semibold leading-snug text-fg sm:text-lg">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.description}</p>
        <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-accent">{service.price}</p>
        <ul className="mt-3 space-y-2">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-2" aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <span className="mt-5 inline-flex min-h-[2.75rem] items-center gap-1.5 text-sm font-semibold text-accent transition group-hover:gap-2 sm:min-h-0">
          {service.href.startsWith('/contact') ? 'Discuss project' : 'View details'}
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
        </span>
      </article>
    </Link>
  )
}
