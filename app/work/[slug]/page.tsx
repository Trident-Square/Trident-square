import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Arrow from '@/components/site/Arrow'
import CtaBand from '@/components/site/CtaBand'
import JsonLd from '@/components/site/JsonLd'
import MediaReveal from '@/components/site/MediaReveal'
import PageHero from '@/components/site/PageHero'
import { breadcrumbs, pageMetadata, projectSchema } from '@/lib/seo'
import { getService } from '@/lib/services'
import { getProject, projects } from '@/lib/work'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug)
  if (!p) return {}
  return pageMetadata({
    title: `${p.name} Case Study — ${p.industry}`,
    description: p.summary,
    path: `/work/${p.slug}`,
    image: p.poster,
  })
}

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).slug)
  if (!p) notFound()
  const svc = p.services.map(getService).filter((s) => s !== undefined)
  const idx = projects.findIndex((x) => x.slug === p.slug)
  const next = projects[(idx + 1) % projects.length]

  return (
    <>
      <JsonLd
        data={[
          projectSchema(p),
          breadcrumbs([
            { name: 'Work', path: '/work' },
            { name: p.name, path: `/work/${p.slug}` },
          ]),
        ]}
      />

      <PageHero
        crumbs={[{ label: 'Work', href: '/work' }, { label: p.name }]}
        title={p.name}
        meta={[
          { k: 'Client', v: p.client },
          { k: 'Industry', v: p.industry },
          { k: 'Year', v: p.year },
          {
            k: 'Services',
            v: (
              <span className="flex flex-col lg:items-end">
                {svc.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="link-underline w-fit">{s.name}</Link>
                ))}
              </span>
            ),
          },
        ]}
        intro={<p className="text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-snug tracking-[-0.015em] text-ink">{p.summary}</p>}
      />

      <section className="container mt-16 sm:mt-24">
        {p.poster ? (
          <MediaReveal
            poster={p.poster}
            video={p.loop}
            alt={`${p.name} — ${p.summary}`}
            priority
            fit={p.orientation === 'portrait' ? 'contain' : 'cover'}
            className="aspect-[4/3] sm:aspect-[21/10]"
          />
        ) : (
          <div className="flex aspect-[21/10] flex-col justify-end bg-cobalt p-8 text-white sm:p-12">
            <span className="display text-[clamp(5rem,14vw,13rem)] leading-[0.8]">{p.results[0].value}</span>
            <span className="mt-3 text-[18px] text-white/75">{p.results[0].label}</span>
          </div>
        )}
        {p.demo ? (
          <details className="group mt-4">
            <summary className="btn-ghost cursor-pointer">
              <span className="group-open:hidden">▶ Watch the full demo</span>
              <span className="hidden group-open:inline">Hide demo</span>
            </summary>
            <div className={p.orientation === 'portrait' ? 'mt-4 flex justify-center bg-ink py-10' : 'mt-4'}>
              <video
                src={encodeURI(p.demo)}
                poster={p.poster}
                controls
                playsInline
                preload="none"
                className={p.orientation === 'portrait' ? 'max-h-[78vh]' : 'aspect-video w-full bg-ink object-cover'}
              >
                <track kind="captions" />
              </video>
            </div>
          </details>
        ) : null}
      </section>

      <section className="container py-24 sm:py-28">
        <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
          {p.results.map((r) => (
            <div key={r.label} className="bg-paper p-8">
              <p className="text-5xl display sm:text-6xl">{r.value}</p>
              <p className="mt-3 text-[15px] text-muted">{r.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">The challenge</p>
          </div>
          <p className="text-[clamp(1.35rem,2.4vw,2rem)] leading-snug tracking-[-0.02em] lg:col-span-8">{p.challenge}</p>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">What we built</p>
          </div>
          <ol className="border-t border-line lg:col-span-8">
            {p.solution.map((s, i) => (
              <li key={s} className="flex gap-6 border-b border-line py-5">
                <span className="pt-1 font-mono text-[12px] text-cobalt">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[17px] leading-relaxed">{s}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Stack</p>
          </div>
          <div className="lg:col-span-8">
            <ul className="flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <li key={t} className="border border-line px-3.5 py-1.5 text-[14px]">{t}</li>
              ))}
            </ul>
            {p.links?.length ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {p.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="btn-ghost min-h-[40px] px-4 text-[14px]">
                    {l.label} ↗
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-paper-2/70">
        <Link href={`/work/${next.slug}`} className="container group grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Next case study</p>
            <p className="display mt-4 text-[clamp(3.5rem,9vw,8rem)] transition-colors group-hover:text-cobalt">{next.name}</p>
            <p className="mt-4 max-w-md text-[16.5px] leading-relaxed text-muted">{next.summary}</p>
            <span className="btn-primary mt-8">
              View case <Arrow />
            </span>
          </div>
          <div className="lg:col-span-6">
            {next.poster ? (
              <MediaReveal poster={next.poster} video={next.loop} alt={next.name} parallax={false} fit={next.orientation === 'portrait' ? 'contain' : 'cover'} className="aspect-[16/10]" />
            ) : (
              <div className="flex aspect-[16/10] items-end bg-cobalt p-8 text-white">
                <span className="display text-[clamp(4rem,9vw,8rem)] leading-[0.8]">{next.results[0].value}</span>
              </div>
            )}
          </div>
        </Link>
      </section>

      <CtaBand />
    </>
  )
}
