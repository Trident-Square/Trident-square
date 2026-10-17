import CtaBand from '@/components/site/CtaBand'
import JsonLd from '@/components/site/JsonLd'
import PageHero from '@/components/site/PageHero'
import Reveal from '@/components/site/Reveal'
import SectionHead from '@/components/site/SectionHead'
import ServiceCards from '@/components/site/ServiceCards'
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
      <PageHero
        crumbs={[{ label: 'Services' }]}
        title={<>Ten services.<br /><span className="text-cobalt">One team.</span></>}
        meta={[
          { k: 'Talks', v: 'Voice AI · Chatbots' },
          { k: 'Thinks', v: 'AI agents · Automation' },
          { k: 'Ships', v: 'Software · Web · Mobile · E-com' },
          { k: 'Base', v: 'Design · Cloud' },
        ]}
        intro="Automation, AI and every kind of software under one roof — from a single workflow that saves your team ten hours a week to the platform your whole business runs on."
      />

      <section className="container py-20 sm:py-28">
        <ServiceCards />
      </section>

      <section className="bg-paper-2/70 py-24 sm:py-32">
        <div className="container">
          <Reveal>
            <SectionHead index="02" label="How it fits" title="Three prongs. One shaft." intro="Everything we do fits on our logo." />
          </Reveal>
          <Reveal className="mt-16" delay={100}>
            <TridentServices />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
