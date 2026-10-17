import CtaBand from '@/components/site/CtaBand'
import JsonLd from '@/components/site/JsonLd'
import PageHero from '@/components/site/PageHero'
import WorkGrid from '@/components/site/WorkGrid'
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
      <PageHero
        crumbs={[{ label: 'Work' }]}
        title={<>Shipped.<br />Used. <span className="text-cobalt">Measured.</span></>}
        meta={[
          { k: 'Case studies', v: String(projects.length) },
          { k: 'Industries', v: 'Hiring · Travel · Sports · Consumer · Hospitality' },
          { k: 'Footage', v: 'Real product recordings' },
        ]}
        intro="A selection of AI products, automation systems and platforms we designed and engineered end to end. Every clip is a screen recording of the real thing."
      />

      <section className="container py-24 sm:py-32">
        <WorkGrid projects={projects} />
      </section>

      <CtaBand title="Want your product on this page next?" />
    </>
  )
}
