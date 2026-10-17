import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Arrow from '@/components/site/Arrow'
import CtaBand from '@/components/site/CtaBand'
import FaqSection from '@/components/site/FaqSection'
import JsonLd from '@/components/site/JsonLd'
import LeadForm from '@/components/site/LeadForm'
import MediaReveal from '@/components/site/MediaReveal'
import PageHero from '@/components/site/PageHero'
import Reveal from '@/components/site/Reveal'
import SectionHead from '@/components/site/SectionHead'
import WorkGrid from '@/components/site/WorkGrid'
import { breadcrumbs, faqSchema, pageMetadata, serviceSchema } from '@/lib/seo'
import { getService, groups, services } from '@/lib/services'
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
  const group = groups.find((g) => g.id === s.group)!
  const hero = work.find((p) => p.loop)

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

      <PageHero
        crumbs={[{ label: 'Services', href: '/services' }, { label: s.name }]}
        title={s.name}
        meta={[
          { k: 'Prong', v: `${group.n} — ${group.verb}` },
          { k: 'Timeline', v: s.timeline },
          { k: 'Engagement', v: 'Fixed scope or team' },
        ]}
        intro={
          <>
            <p className="text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-snug tracking-[-0.015em] text-ink">{s.h1}</p>
            <p className="mt-5 text-[17px] leading-relaxed text-muted">{s.lede}</p>
            <a href="#enquire" className="btn-primary mt-8">
              Get a quote <Arrow />
            </a>
          </>
        }
      />

      {hero?.poster ? (
        <section className="container mt-16 sm:mt-24">
          <Link href={`/work/${hero.slug}`} className="group block">
            <MediaReveal
              poster={hero.poster}
              video={hero.loop}
              alt={`${hero.name} — built with ${s.name}`}
              fit={hero.orientation === 'portrait' ? 'contain' : 'cover'}
              className="aspect-[4/3] sm:aspect-[21/9]"
            >
              <span className="absolute bottom-0 left-0 bg-paper px-3 py-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink transition-colors group-hover:bg-cobalt group-hover:text-white">
                Built with {s.short.toLowerCase()} — {hero.name} →
              </span>
            </MediaReveal>
          </Link>
        </section>
      ) : null}

      <section className="container py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-28">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted"><span className="text-cobalt">01 / </span>Why it matters</p>
              <div className="mt-6 space-y-5 text-[18px] leading-relaxed text-ink-2">
                {s.body.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted"><span className="text-cobalt">02 / </span>What you get</p>
            </Reveal>
            <ol className="mt-6 border-t border-ink">
              {s.deliverables.map((d, i) => (
                <Reveal as="li" key={d} delay={i * 50} className="grid grid-cols-[3rem_1fr] items-baseline border-b border-ink/15 py-5">
                  <span className="font-mono text-[12px] text-cobalt">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[clamp(1.1rem,1.6vw,1.35rem)] font-medium leading-snug">{d}</span>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-paper sm:py-32">
        <div className="container">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/50"><span className="text-cobalt-ink">03 / </span>Where it pays off</p>
            <h2 className="h2 mt-5 max-w-[16ch]">Common use cases</h2>
          </Reveal>
          <div className="mt-14 grid gap-px bg-paper/15 sm:grid-cols-2">
            {s.useCases.map((u, i) => (
              <Reveal key={u.title} delay={i * 80} className="group bg-ink p-8 transition-colors duration-500 hover:bg-cobalt sm:p-10">
                <span className="font-mono text-[11px] text-paper/40">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="display mt-6 text-[clamp(2rem,3.4vw,3rem)]">{u.title}</h3>
                <p className="mt-3 max-w-md text-[16px] leading-relaxed text-paper/65 group-hover:text-white/85">{u.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14 border-t border-paper/15 pt-6">
            <p className="font-mono text-[11px] uppercase leading-loose tracking-[0.12em] text-paper/50">
              <span className="text-paper">Tools we use — </span>
              {s.stack.join(' / ')}
            </p>
          </Reveal>
        </div>
      </section>

      {work.length > 1 ? (
        <section className="container py-24 sm:py-32">
          <Reveal>
            <SectionHead index="04" label="Proof" title="Related work" />
          </Reveal>
          <div className="mt-16">
            <WorkGrid projects={work.slice(0, 2)} />
          </div>
        </section>
      ) : null}

      <FaqSection faqs={s.faqs} label={`${s.name} — FAQ`} />

      <section id="enquire" className="scroll-mt-20 bg-paper-2/70 py-24 sm:py-32">
        <div className="container grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Get a quote</p>
            <h2 className="h2 mt-5">Tell us about your project</h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-muted">An engineer replies within one business day, with questions or a first estimate.</p>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={100}>
            <LeadForm defaultService={s.name} />
          </Reveal>
        </div>
      </section>

      <section className="container py-24 sm:py-32">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Other services</p>
        </Reveal>
        <ul className="mt-6 border-t border-ink">
          {others.map((o) => (
            <li key={o.slug} className="border-b border-ink/15">
              <Link href={`/services/${o.slug}`} className="group flex items-center justify-between gap-6 py-4">
                <span className="display text-[clamp(1.6rem,3vw,2.5rem)] transition-[color,transform] duration-500 group-hover:translate-x-3 group-hover:text-cobalt">{o.name}</span>
                <span className="hidden text-[14px] text-muted sm:block">{o.hook}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  )
}
