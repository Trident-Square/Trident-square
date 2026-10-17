import Link from 'next/link'
import Arrow from '@/components/site/Arrow'
import FaqSection from '@/components/site/FaqSection'
import PageHero from '@/components/site/PageHero'
import JsonLd from '@/components/site/JsonLd'
import LeadForm from '@/components/site/LeadForm'
import PartnerCalculator from '@/components/site/PartnerCalculator'
import { breadcrumbs, faqSchema, pageMetadata, partnerProgramSchema } from '@/lib/seo'
import { services, type Faq } from '@/lib/services'
import { partnerProgram as pp, whatsappHref } from '@/lib/site'

const lakh = pp.boostThresholdInr / 100_000

export const metadata = pageMetadata({
  title: `Partner Programme — Earn ${pp.referral.base}–${pp.referral.boosted}% on Software Referrals`,
  description: `Refer clients who need AI agents, chatbots, apps or custom software and earn ${pp.referral.base}–${pp.referral.boosted}% of the project value. White-label options for agencies. Paid within ${pp.payoutDays} days.`,
  path: '/partners',
  keywords: ['software referral program India', 'IT referral commission', 'white label software development', 'AI agency partner program', 'affiliate program software development'],
})

const tracks = [
  {
    tag: 'For anyone with a network',
    name: 'Referral partner',
    rate: `${pp.referral.base}–${pp.referral.boosted}%`,
    rateLabel: 'of project value',
    points: [
      'Introduce the client — we handle scoping, proposal, delivery and support',
      `${pp.referral.base}% on every closed deal`,
      `${pp.referral.boosted}% on deals of ₹${lakh} lakh+ and on every deal after your first ${pp.boostAfterDeals}`,
      `${pp.referral.base}% of monthly retainers for ${pp.recurringMonths} months`,
      'No targets, no fees, no cap on earnings',
    ],
  },
  {
    tag: 'For agencies & consultants',
    name: 'White-label partner',
    rate: `${pp.whiteLabelMargin.min}–${pp.whiteLabelMargin.max}%`,
    rateLabel: 'margin you keep',
    points: [
      'Sell AI agents and software under your own brand',
      `Partner price list built so you keep a ${pp.whiteLabelMargin.min}–${pp.whiteLabelMargin.max}% margin`,
      'Our engineers deliver; you own the client relationship',
      'NDA, unbranded staging links and docs in your name',
      'Optional joint calls with our tech lead for complex deals',
    ],
  },
]

const steps = [
  { title: 'Apply in two minutes', text: 'Fill the form below. We send a one-page partner agreement and your personal referral link within a day.' },
  { title: 'Make the introduction', text: 'Share your link, add us to a WhatsApp group or email intro. The lead is registered to you from that moment.' },
  { title: 'We scope and close', text: 'Our engineers run the discovery call and proposal. You’re kept in the loop on every step — no work needed from you.' },
  { title: 'You get paid', text: `When the client pays a milestone, your share for that milestone lands in your bank or UPI within ${pp.payoutDays} days.` },
]

const whoFits = [
  'Marketing & digital agencies',
  'CA, CS & consulting firms',
  'Freelance developers & designers',
  'IT & ERP resellers',
  'Business coaches & incubators',
  'Startup founders & operators',
  'Ex-colleagues in tech',
  'Industry associations',
]

const faqs: Faq[] = [
  { q: 'How much commission do I earn?', a: `${pp.referral.base}% of the project value for every client you refer who signs with us. Deals worth ₹${lakh} lakh or more, and every deal after your first ${pp.boostAfterDeals}, earn ${pp.referral.boosted}%. Monthly retainers earn ${pp.referral.base}% for the first ${pp.recurringMonths} months.` },
  { q: 'When and how do I get paid?', a: `Commission is paid per milestone, within ${pp.payoutDays} days of the client’s payment clearing, by bank transfer or UPI (India) or Wise/PayPal (international). Commission is calculated on the amount the client actually pays, excluding GST and third-party costs like hosting or API usage.` },
  { q: 'Do I need to sell or know the technology?', a: 'No. Just make the introduction. Our engineers handle discovery, proposal, pricing and delivery. If you want to stay involved, you’re welcome on the calls.' },
  { q: 'How do you track that the lead came from me?', a: 'Every partner gets a personal referral link and code. Any lead you introduce by link, email or WhatsApp is registered to you, and we confirm registration in writing. Attribution lasts 12 months from the introduction.' },
  { q: 'What is the difference between referral and white-label?', a: 'Referral partners introduce clients to Trident Square and earn a commission. White-label partners sell under their own brand and set their own price; we deliver behind the scenes at a partner rate that leaves them a 30–35% margin.' },
  { q: 'Is there any fee or minimum target?', a: 'No fees, no targets and no exclusivity. Refer one client a year or twenty.' },
  { q: 'What kind of clients can I refer?', a: 'Any business that needs AI agents, voice bots, chatbots, custom software, web apps, mobile apps or product design — in India or abroad. The client must be new to Trident Square.' },
]

export default function PartnersPage() {
  return (
    <>
      <JsonLd data={[partnerProgramSchema(), faqSchema(faqs), breadcrumbs([{ name: 'Partner programme', path: '/partners' }])]} />

      <PageHero
        crumbs={[{ label: 'Partner programme' }]}
        title={<>Bring a client.<br />Earn <span className="text-cobalt">{pp.referral.base}–{pp.referral.boosted}%.</span></>}
        meta={[
          { k: 'Top commission', v: `${pp.referral.boosted}%` },
          { k: 'Payout', v: `${pp.payoutDays} days after client pays` },
          { k: 'Retainers', v: `${pp.recurringMonths} months recurring` },
          { k: 'To join', v: '₹0 · no targets' },
        ]}
        intro={
          <>
            <p className="text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-snug tracking-[-0.015em] text-ink">
              Know a business that needs automation, an AI agent, an app or custom software? Introduce them.
            </p>
            <p className="mt-5 text-[17px] leading-relaxed text-muted">
              We do the selling and the building. You earn {pp.referral.base}% of what they pay — {pp.referral.boosted}% on bigger or repeat deals.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#apply" className="btn-cobalt">Become a partner <Arrow /></a>
              <a href="#calculator" className="btn-ghost">Calculate earnings</a>
            </div>
          </>
        }
      />

      {/* TRACKS */}
      <section className="container py-24 sm:py-32">
        <p className="eyebrow"><span className="text-cobalt">01 / </span>Two ways to partner</p>
        <h2 className="h2 mt-6 max-w-[18ch]">Pick the model that fits how you work</h2>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {tracks.map((t, i) => (
            <article
              key={t.name}
              className={i === 0 ? 'bg-ink p-8 text-paper sm:p-10' : 'border border-line bg-white p-8 sm:p-10'}
            >
              <p className={i === 0 ? 'eyebrow text-paper/55' : 'eyebrow'}>{t.tag}</p>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.03em]">{t.name}</h3>
              <p className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className={`whitespace-nowrap display text-7xl sm:text-8xl ${i === 0 ? 'text-cobalt-ink' : 'text-cobalt'}`}>{t.rate}</span>
                <span className={i === 0 ? 'text-paper/60' : 'text-muted'}>{t.rateLabel}</span>
              </p>
              <ul className={`mt-8 border-t ${i === 0 ? 'border-paper/15' : 'border-line'}`}>
                {t.points.map((pt) => (
                  <li key={pt} className={`flex gap-3 border-b py-3.5 text-[15.5px] ${i === 0 ? 'border-paper/15 text-paper/85' : 'border-line'}`}>
                    <span aria-hidden className={i === 0 ? 'text-cobalt-ink' : 'text-cobalt'}>→</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="scroll-mt-20 bg-paper-2/60 py-24 sm:py-32">
        <div className="container">
          <p className="eyebrow"><span className="text-cobalt">02 / </span>What it’s worth</p>
          <h2 className="h2 mt-6 max-w-[18ch]">See what one introduction pays</h2>
          <div className="mt-14">
            <PartnerCalculator />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container py-24 sm:py-32">
        <p className="eyebrow"><span className="text-cobalt">03 / </span>How it works</p>
        <h2 className="h2 mt-6 max-w-[18ch]">You introduce. We do everything else.</h2>
        <ol className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="bg-paper p-7 sm:p-8">
              <span className="grid h-9 w-9 place-items-center bg-ink font-mono text-[13px] text-paper">{i + 1}</span>
              <h3 className="mt-10 text-xl font-semibold tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-24 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">What you can refer</p>
            <ul className="mt-6 border-t border-line">
              {services.map((s) => (
                <li key={s.slug} className="border-b border-line">
                  <Link href={`/services/${s.slug}`} className="flex items-center justify-between py-4 text-[17px] hover:text-cobalt">
                    {s.name} <Arrow className="h-4 w-4 opacity-40" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Who partners with us</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {whoFits.map((w) => (
                <li key={w} className="border border-line px-4 py-2 text-[15px]">{w}</li>
              ))}
            </ul>
            <div className="mt-10 border border-line bg-white p-7">
              <p className="text-[15px] font-medium">Our promise to partners</p>
              <ul className="mt-4 space-y-2.5 text-[15px] text-muted">
                <li>Written lead registration within 24 hours</li>
                <li>Full visibility on deal status and client payments</li>
                <li>We never go around you to your client</li>
                <li>Your client gets the same senior team as our direct clients</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* APPLY */}
      <section id="apply" className="scroll-mt-20 bg-ink py-24 text-paper sm:py-32">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-paper/55">Apply</p>
            <h2 className="h2 mt-6">Become a partner today</h2>
            <p className="mt-5 leading-relaxed text-paper/65">
              Already have a lead? Mention it in the form — we’ll register it to you straight away.
            </p>
            <a
              href={whatsappHref('Hi, I’d like to join the Trident Square partner programme.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-8 border border-paper/25 text-paper hover:bg-paper hover:text-ink"
            >
              Or apply on WhatsApp
            </a>
          </div>
          <div className="text-ink lg:col-span-8">
            <LeadForm kind="partner" />
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs} title="Partner questions." label="Partner FAQ" />
      <p className="container -mt-16 pb-24 text-[13px] leading-relaxed text-muted lg:pl-[calc(33.333%+2.5rem)]">
        Commission applies to new clients introduced by a registered partner and is paid on amounts received, excluding
        taxes and pass-through costs. Full terms are in the partner agreement.
      </p>
    </>
  )
}
