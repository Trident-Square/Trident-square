import Arrow from '@/components/site/Arrow'
import JsonLd from '@/components/site/JsonLd'
import PageHero from '@/components/site/PageHero'
import LeadForm from '@/components/site/LeadForm'
import { breadcrumbs, pageMetadata } from '@/lib/seo'
import { absoluteUrl, phoneHref, site, whatsappHref } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Contact — Book a Free Consultation',
  description: `Talk to an engineer about your AI agent, app or software project. Free 30-minute consultation. Call ${site.phoneDisplay} or visit us in Sector 62, Noida.`,
  path: '/contact',
})

const mapQuery = encodeURIComponent(`Bhutani 62 Avenue, Sector 62, Noida, Uttar Pradesh 201309`)

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbs([{ name: 'Contact', path: '/contact' }]),
          { '@context': 'https://schema.org', '@type': 'ContactPage', url: absoluteUrl('/contact'), about: { '@id': `${site.url}/#organization` } },
        ]}
      />
      <PageHero
        crumbs={[{ label: 'Contact' }]}
        title={<>Let’s <span className="text-cobalt">talk.</span></>}
        intro="A free 30-minute call with an engineer. You’ll leave with a rough plan, a price range and an honest opinion — even if that opinion is “you don’t need us”."
      />
      <section className="container pb-24 pt-16 sm:pb-32 sm:pt-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="grid gap-px border border-ink bg-ink">
              {[
                { k: 'WhatsApp', v: 'Message us — fastest reply', href: whatsappHref('Hi Trident Square, I’d like to discuss a project.'), ext: true },
                { k: 'Call', v: site.phoneDisplay, href: phoneHref },
                ...(site.email ? [{ k: 'Email', v: site.email, href: `mailto:${site.email}` }] : []),
              ].map((c) => (
                <a
                  key={c.k}
                  href={c.href}
                  {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center justify-between gap-6 bg-paper p-6 transition-colors duration-300 hover:bg-ink hover:text-paper"
                >
                  <span>
                    <span className="block font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted group-hover:text-paper/50">{c.k}</span>
                    <span className="display mt-1 block text-[1.9rem]">{c.v}</span>
                  </span>
                  <Arrow className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-45" />
                </a>
              ))}
            </div>
            <dl className="mt-10 border-t border-ink/15 text-[15px]">
              <Row label="Visit">
                <address className="not-italic">
                  {site.address.street}, {site.address.locality}, {site.address.region} {site.address.postalCode}
                </address>
              </Row>
              <Row label="Hours">Mon–Sat, 10:00–19:00 IST</Row>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <LeadForm />
          </div>
        </div>

        <div className="mt-20 overflow-hidden border border-line">
          <iframe
            title="Trident Square office location on Google Maps"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="h-[360px] w-full grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6rem_1fr] gap-4 border-b border-ink/15 py-4">
      <dt className="text-muted">{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}
