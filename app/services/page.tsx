import Link from 'next/link'
import Arrow from '@/components/site/Arrow'
import CtaBand from '@/components/site/CtaBand'
import JsonLd from '@/components/site/JsonLd'
import TridentServices from '@/components/site/TridentServices'
import { breadcrumbs, pageMetadata } from '@/lib/seo'
import { services } from '@/lib/services'
import { absoluteUrl } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'AI & Software Development Services',
  description:
    'Business process automation, AI agents, chatbots, voice AI, custom software, web, e-commerce and mobile apps, UI/UX design and cloud — from Trident Square, Noida.',
  path: '/services',
})

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbs([{ name: 'Services', path: '/services' }]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: services.map((s, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: s.name,
              url: absoluteUrl(`/services/${s.slug}`),
            })),
          },
        ]}
      />
      <section className="container pt-32 sm:pt-40">
        <p className="eyebrow">Services</p>
        <h1 className="display mt-6 max-w-[14ch] text-[clamp(2.75rem,7.5vw,6.5rem)]">
          AI and software, <span className="mark-word text-cobalt">built to last</span>
        </h1>
        <p className="lede mt-8 max-w-2xl">
          Automation, AI and software under one roof — from a single workflow that saves your team ten hours a week
          to the platform your whole business runs on.
        </p>
      </section>

      <section className="container pt-20 sm:pt-28">
        <TridentServices />
      </section>

      <section className="container py-20 sm:py-28">
        <h2 className="h2 mb-12">Every service, in detail</h2>
        <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
          {services.map((s, i) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="group flex min-h-[320px] flex-col bg-paper p-8 transition-colors hover:bg-white sm:p-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[12px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-cobalt">{s.timeline}</span>
              </div>
              <h2 className="mt-12 text-3xl font-semibold tracking-[-0.03em] transition-colors group-hover:text-cobalt sm:text-4xl">
                {s.name}
              </h2>
              <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-muted">{s.lede}</p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                {s.stack.slice(0, 5).map((t) => (
                  <li key={t} className="border border-line px-3 py-1 text-[12.5px] text-muted">{t}</li>
                ))}
              </ul>
              <span className="mt-8 flex items-center gap-2 text-[15px] font-medium">
                Learn more <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
          <Link href="/contact" className="group flex min-h-[320px] flex-col justify-between bg-ink p-8 text-paper sm:p-10">
            <span className="eyebrow text-paper/55">Not sure which?</span>
            <span className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Describe the problem. We’ll tell you what to build — and what not to.</span>
            <span className="flex items-center gap-2 text-[15px] font-medium">Book a free call <Arrow /></span>
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
