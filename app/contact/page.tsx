import JsonLd from '@/components/site/JsonLd'
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
      <section className="container pt-28 pb-24 sm:pt-36 sm:pb-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Contact</p>
            <h1 className="display mt-7 text-[clamp(2.75rem,6.5vw,5.5rem)]">
              Let’s talk about <span className="mark-word text-cobalt">your</span> project.
            </h1>
            <p className="lede mt-8">
              A free 30-minute call with an engineer. You’ll leave with a rough plan, a price range and an honest opinion
              — even if that opinion is “you don’t need us”.
            </p>

            <dl className="mt-12 border-t border-line text-[15px]">
              <Row label="Call">
                <a href={phoneHref} className="link-underline">{site.phoneDisplay}</a>
              </Row>
              <Row label="WhatsApp">
                <a href={whatsappHref('Hi Trident Square, I’d like to discuss a project.')} target="_blank" rel="noopener noreferrer" className="link-underline">
                  Message us
                </a>
              </Row>
              {site.email ? (
                <Row label="Email">
                  <a href={`mailto:${site.email}`} className="link-underline">{site.email}</a>
                </Row>
              ) : null}
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
    <div className="grid grid-cols-[6rem_1fr] gap-4 border-b border-line py-4">
      <dt className="text-muted">{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}
