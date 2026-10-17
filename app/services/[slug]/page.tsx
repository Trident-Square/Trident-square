import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Arrow from '@/components/site/Arrow'
import CtaBand from '@/components/site/CtaBand'
import FaqList from '@/components/site/FaqList'
import JsonLd from '@/components/site/JsonLd'
import LeadForm from '@/components/site/LeadForm'
import WorkCard from '@/components/site/WorkCard'
import { breadcrumbs, faqSchema, pageMetadata, serviceSchema } from '@/lib/seo'
import { getService, services } from '@/lib/services'
import { getProject } from '@/lib/work'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug)
  if (!s) return {}
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}`, keywords: s.keywords })
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug)
  if (!s) notFound()
  const work = s.work.map(getProject).filter((p) => p !== undefined)
  const others = services.filter((o) => o.slug !== s.slug)

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(s),
          faqSchema(s.faqs),
          breadcrumbs([
            { name: 'Services', path: '/services' },
            { name: s.name, path: `/services/${s.slug}` },
          ]),
        ]}
      />

      <section className="container pt-28 sm:pt-36">
        <nav aria-label="Breadcrumb" className="eyebrow flex items-center gap-2">
          <Link href="/services" className="hover:text-ink">Services</Link>
          <span aria-hidden>/</span>
          <span className="text-ink">{s.name}</span>
        </nav>
        <h1 className="display mt-7 max-w-[16ch] text-[clamp(2.5rem,6.5vw,5.75rem)]">{s.h1}</h1>
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <p className="lede lg:col-span-7">{s.lede}</p>
          <div className="flex flex-col gap-4 lg:col-span-4 lg:col-start-9">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <span className="text-[14px] text-muted">Timeline</span>
              <span className="text-[15px] font-medium">{s.timeline}</span>
            </div>
            <div className="flex items-center justify-between border-b border-line pb-4">
              <span className="text-[14px] text-muted">Engagement</span>
              <span className="text-[15px] font-medium">Fixed scope or team</span>
            </div>
            <a href="#enquire" className="btn-primary mt-2">
              Get a quote <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="container py-24 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Why it matters</p>
            <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-ink-2">
              {s.body.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow">What you get</p>
            <ul className="mt-6 border-t border-line">
              {s.deliverables.map((d, i) => (
                <li key={d} className="flex gap-5 border-b border-line py-4">
                  <span className="pt-1 font-mono text-[12px] text-cobalt">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[16.5px]">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-paper sm:py-28">
        <div className="container">
          <p className="eyebrow text-paper/55">Where it pays off</p>
          <h2 className="h2 mt-6 max-w-[18ch]">Common use cases</h2>
          <div className="mt-14 grid gap-px overflow-hidden bg-paper/10 sm:grid-cols-2">
            {s.useCases.map((u) => (
              <div key={u.title} className="bg-ink p-8 sm:p-10">
                <h3 className="text-2xl font-semibold tracking-[-0.02em]">{u.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-paper/65">{u.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-14">
            <p className="eyebrow text-paper/55">Tools we use</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {s.stack.map((t) => (
                <li key={t} className="border border-paper/20 px-3.5 py-1.5 text-[13.5px] text-paper/80">{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {work.length ? (
        <section className="container py-24 sm:py-28">
          <p className="eyebrow">Proof</p>
          <h2 className="h2 mt-6">Related work</h2>
          <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
            {work.slice(0, 2).map((p) => <WorkCard key={p.slug} project={p} />)}
          </div>
        </section>
      ) : null}

      <section className="container pb-24 sm:pb-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">FAQ</p>
            <h2 className="h2 mt-6">{s.name}: questions</h2>
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={s.faqs} />
          </div>
        </div>
      </section>

      <section id="enquire" className="scroll-mt-20 bg-paper-2/60 py-24 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Get a quote</p>
            <h2 className="h2 mt-6">Tell us about your project</h2>
            <p className="mt-5 leading-relaxed text-muted">
              Reply within one business day from an engineer, with questions or a first estimate.
            </p>
          </div>
          <div className="lg:col-span-8">
            <LeadForm defaultService={s.name} />
          </div>
        </div>
      </section>

      <section className="container py-20">
        <p className="eyebrow">Other services</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/services/${o.slug}`} className="btn-ghost min-h-[40px] px-4 text-[14px]">{o.name}</Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  )
}
