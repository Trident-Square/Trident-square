import CtaBand from '@/components/site/CtaBand'
import JsonLd from '@/components/site/JsonLd'
import WorkCard from '@/components/site/WorkCard'
import { breadcrumbs, pageMetadata } from '@/lib/seo'
import { absoluteUrl } from '@/lib/site'
import { projects } from '@/lib/work'

export const metadata = pageMetadata({
  title: 'Case Studies — AI Agents, Voice AI & Apps',
  description:
    'Case studies from Trident Square: AI hiring platform Gigtap, InstaBus voice concierge, Gamecam padel analytics, NowoChat, Trendify and more.',
  path: '/work',
})

export default function WorkPage() {
  const [first, ...rest] = projects
  return (
    <>
      <JsonLd
        data={[
          breadcrumbs([{ name: 'Work', path: '/work' }]),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Trident Square case studies',
            url: absoluteUrl('/work'),
            hasPart: projects.map((p) => ({ '@type': 'CreativeWork', name: p.name, url: absoluteUrl(`/work/${p.slug}`) })),
          },
        ]}
      />
      <section className="container pt-32 sm:pt-40">
        <p className="eyebrow">Work</p>
        <h1 className="display mt-6 max-w-[13ch] text-[clamp(2.75rem,7.5vw,6.5rem)]">
          Shipped, <span className="mark-word text-cobalt">used</span>, measured.
        </h1>
        <p className="lede mt-8 max-w-2xl">
          A selection of AI products and platforms we designed and engineered end to end. The footage is from the real
          products.
        </p>
      </section>

      <section className="container py-20 sm:py-24">
        <WorkCard project={first} size="lg" priority />
        <div className="mt-20 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {rest.map((p) => <WorkCard key={p.slug} project={p} />)}
        </div>
      </section>

      <CtaBand title="Want your product on this page next?" />
    </>
  )
}
