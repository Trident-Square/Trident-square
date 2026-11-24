import JsonLd from '@/components/site/JsonLd'
import PageHero from '@/components/site/PageHero'
import { breadcrumbs, pageMetadata } from '@/lib/seo'
import { absoluteUrl, phoneHref, site } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'How Trident Square collects, uses, protects and deletes personal data of website visitors, clients and partners, in line with the Digital Personal Data Protection Act, 2023.',
  path: '/privacy',
})

const EFFECTIVE = '24 November 2026'
const address = `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}, ${site.address.countryName}`

type Section = { title: string; body: React.ReactNode }

const sections: Section[] = [
  {
    title: 'Who we are',
    body: (
      <p>
        Trident Square (Abhishek Pratap Mall and Akash Kumar, carrying on business as Trident Square) is a software, AI and
        automation studio at {address}. In this policy, “we” and “us” mean Trident Square. We are the data fiduciary for the
        personal data described below. This policy follows the Digital Personal Data Protection Act, 2023 and the Information
        Technology Act, 2000 and its rules.
      </p>
    ),
  },
  {
    title: 'What we collect',
    body: (
      <ul>
        <li>
          <b>Website visitors:</b> anonymous, aggregated usage data (pages viewed, device type, country) through Vercel
          Analytics, which does not use cookies or identify you.
        </li>
        <li>
          <b>Enquiries:</b> the name, email, phone, company and message you enter in our forms, or send us on WhatsApp, email
          or phone.
        </li>
        <li>
          <b>Clients:</b> contact and billing details (including GSTIN where applicable) needed to deliver and invoice a
          project.
        </li>
        <li>
          <b>Partners:</b> name, address, email, phone, PAN, a masked Aadhaar (last 4 digits only), bank account or
          international payout details, and lead and commission records. Partner data is covered in detail by our Partner
          Data Protection Notice (TS/DP/2026/11-01), which forms part of every Partner Agreement.
        </li>
      </ul>
    ),
  },
  {
    title: 'Why we use it',
    body: (
      <ul>
        <li>To reply to your enquiry and give you a quote.</li>
        <li>To deliver, support and invoice projects.</li>
        <li>To verify partners, record leads and pay commission, including tax filings such as TDS where the law requires.</li>
        <li>To keep the website secure and understand, in aggregate, which pages are useful.</li>
      </ul>
    ),
  },
  {
    title: 'What we never do',
    body: (
      <p>
        We never sell your personal data, never share it for anyone else’s marketing, and never use it for profiling or any
        purpose other than those above.
      </p>
    ),
  },
  {
    title: 'Who we share it with',
    body: (
      <>
        <p>Only the service providers we need to run our business, each bound to use the data only for us:</p>
        <ul>
          <li>Vercel — website hosting and anonymous analytics.</li>
          <li>Google Workspace and our email provider — email and the secure sheet where enquiries are recorded.</li>
          <li>WhatsApp (Meta) — only when you choose to message us there.</li>
          <li>Our bank — to send partner payouts.</li>
          <li>Government and tax authorities — only where the law requires it.</li>
        </ul>
        <p>Some providers may store data outside India, with safeguards that meet Indian law.</p>
      </>
    ),
  },
  {
    title: 'How we protect it',
    body: (
      <p>
        Data travels only over encrypted HTTPS. Partner identity and bank details are kept in the Partner Portal behind a
        login with role-based access, and only the two co-founders can see them. They are never kept in spreadsheets or sent
        over WhatsApp. Access to every system we use is limited to the people who need it.
      </p>
    ),
  },
  {
    title: 'How long we keep it',
    body: (
      <ul>
        <li>Enquiries that do not become projects: deleted when no longer needed, and within 24 months of our last contact.</li>
        <li>Client project and invoice records: for as long as Indian tax and accounting law requires (up to 8 years).</li>
        <li>
          Partners: after all commission due has been paid, and with your permission, we delete your Aadhaar and PAN copies,
          bank details, contact details and portal account within 30 days. Only your name, PAN number and payout/TDS entries
          are kept for the period tax law requires (up to 8 years), with restricted access, and then deleted.
        </li>
      </ul>
    ),
  },
  {
    title: 'Data in projects we build',
    body: (
      <p>
        When we build or run software for a client, the data in that software belongs to the client. We act only on the
        client’s written instructions, access it only to build and support the system, and return or delete it when the
        engagement ends.
      </p>
    ),
  },
  {
    title: 'Your rights',
    body: (
      <p>
        You can ask to see, correct or delete your personal data, or withdraw your consent, at any time by writing to{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a>. We reply within 7 working days. Withdrawing consent does not affect
        anything done before it, and records the law requires us to keep are kept only for that period. If you are not
        satisfied with our reply, you may complain to the Data Protection Board of India.
      </p>
    ),
  },
  {
    title: 'Data breaches',
    body: (
      <p>
        If your personal data is ever affected by a security incident, we will tell you promptly, with what happened and the
        steps we have taken, and inform the Data Protection Board as the law requires.
      </p>
    ),
  },
  {
    title: 'Children',
    body: <p>Our services are for businesses. We do not knowingly collect personal data from anyone under 18.</p>,
  },
  {
    title: 'Grievance officer',
    body: (
      <p>
        Abhishek Pratap Mall, Co-founder
        <br />
        <a href={`mailto:${site.email}`}>{site.email}</a> · <a href={phoneHref}>{site.phoneDisplay}</a>
        <br />
        {address}
        <br />
        We acknowledge every grievance within 48 hours and resolve it within 30 days.
      </p>
    ),
  },
  {
    title: 'Changes to this policy',
    body: (
      <p>
        We may update this policy. The date below shows the latest version. We tell partners and active clients about any
        material change by email before it takes effect, and a change never reduces the protections above.
      </p>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbs([{ name: 'Privacy Policy', path: '/privacy' }]),
          { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Privacy Policy', url: absoluteUrl('/privacy'), about: { '@id': `${site.url}/#organization` } },
        ]}
      />
      <PageHero
        crumbs={[{ label: 'Privacy' }]}
        title={<>Privacy <span className="text-cobalt">policy.</span></>}
        intro="How we collect, use, protect and delete personal data — for website visitors, clients and partners."
        meta={[{ k: 'Effective', v: EFFECTIVE }]}
      />
      <section className="container pb-24 pt-16 sm:pb-32 sm:pt-24">
        <div className="max-w-3xl">
          {sections.map((s, i) => (
            <div key={s.title} className="grid gap-3 border-t border-ink/15 py-8 sm:grid-cols-[4rem_1fr]">
              <span className="font-mono text-[12px] text-muted">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h2 className="text-[1.35rem] font-medium leading-snug">{s.title}</h2>
                <div className="mt-3 space-y-3 text-[15.5px] leading-relaxed text-ink-2 [&_a]:underline [&_a]:underline-offset-2 [&_b]:font-medium [&_b]:text-ink [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                  {s.body}
                </div>
              </div>
            </div>
          ))}
          <p className="border-t border-ink/15 pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Last updated {EFFECTIVE}</p>
        </div>
      </section>
    </>
  )
}
