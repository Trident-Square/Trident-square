import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Arrow from '@/components/site/Arrow'
import CtaBand from '@/components/site/CtaBand'
import JsonLd from '@/components/site/JsonLd'
import WorkCard from '@/components/site/WorkCard'
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

      <section className="container pt-28 sm:pt-36">
        <nav aria-label="Breadcrumb" className="eyebrow flex items-center gap-2">
          <Link href="/work" className="hover:text-ink">Work</Link>
          <span aria-hidden>/</span>
          <span className="text-ink">{p.name}</span>
        </nav>
        <h1 className="display mt-7 text-[clamp(3rem,9vw,8rem)]">{p.name}</h1>
        <p className="lede mt-6 max-w-3xl text-ink-2">{p.summary}</p>

        <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-6 text-[14px] sm:grid-cols-4">
          <div><dt className="text-muted">Client</dt><dd className="mt-1 font-medium">{p.client}</dd></div>
          <div><dt className="text-muted">Industry</dt><dd className="mt-1 font-medium">{p.industry}</dd></div>
          <div><dt className="text-muted">Year</dt><dd className="mt-1 font-medium">{p.year}</dd></div>
          <div>
            <dt className="text-muted">Services</dt>
            <dd className="mt-1 flex flex-col font-medium">
              {svc.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="link-underline w-fit">{s.name}</Link>
              ))}
            </dd>
          </div>
        </dl>
      </section>

      <section className="container mt-14">
        {p.demo ? (
          <div className={p.orientation === 'portrait' ? 'flex justify-center bg-ink py-10' : ''}>
            <video
              src={encodeURI(p.demo)}
              poster={p.poster}
              controls
              playsInline
              preload="none"
              className={
                p.orientation === 'portrait'
                  ? 'max-h-[78vh] '
                  : 'aspect-video w-full bg-ink object-cover'
              }
            >
              <track kind="captions" />
            </video>
          </div>
        ) : (
          <WorkCard project={p} size="lg" />
        )}
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">Product demo — screen recording</p>
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

      <section className="border-t border-line">
        <Link href={`/work/${next.slug}`} className="container group flex items-center justify-between gap-6 py-14">
          <span>
            <span className="eyebrow">Next case study</span>
            <span className="mt-3 block text-[clamp(2rem,5vw,4rem)] display transition-colors group-hover:text-cobalt">
              {next.name}
            </span>
          </span>
          <Arrow className="h-8 w-8 transition-transform group-hover:translate-x-2" />
        </Link>
      </section>

      <CtaBand />
    </>
  )
}
