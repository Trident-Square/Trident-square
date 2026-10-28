import Arrow from '@/components/site/Arrow'
import FaqSection from '@/components/site/FaqSection'
import PageHero from '@/components/site/PageHero'
import JsonLd from '@/components/site/JsonLd'
import LeadForm from '@/components/site/LeadForm'
import { breadcrumbs, faqSchema, pageMetadata, partnerProgramSchema } from '@/lib/seo'
import type { Faq } from '@/lib/services'
import { partnerProgram as pp, whatsappHref } from '@/lib/site'
import { cn } from '@/lib/utils'

export const metadata = pageMetadata({
  title: `Partner Programme — Earn up to ${pp.share.max}% on Software Projects`,
  description: `Bring clients who need AI agents, chatbots, apps or custom software and earn up to ${pp.share.max}% of the net project value. Paid within ${pp.payoutDays} business days of each client payment.`,
  path: '/partners',
  keywords: ['software referral program India', 'IT referral commission', 'software agency partner program', 'AI agency partner program', 'affiliate program software development'],
})

const DECK = '/partner-deck.html'

const steps = [
  { title: 'Register the lead', text: `Share the client brief. We confirm in writing within 24 hours — the lead is protected for you for ${pp.leadProtectionMonths / 12} year.` },
  { title: 'We scope & build', text: 'Our engineers fix price, milestones and your share upfront, then deliver.' },
  { title: 'You get paid', text: `Your share for each milestone, usually within ${pp.payoutTypicalDays} business days of the client’s payment (${pp.payoutDays} at most).` },
]

const faqs: Faq[] = [
  { q: 'How much do I earn?', a: `Up to ${pp.share.max}% of the net project value, depending on size: ${pp.slabs.map((s) => `${s.min}–${s.max}% for ${s.label.toLowerCase()}`).join(', ')}. Slabs are indicative — the exact share is agreed per project after scoping and confirmed in writing before work starts.` },
  { q: 'What is the net project value?', a: 'The project value minus pass-through costs the project needs and nobody controls: servers, verification/KYC APIs, telephony, AI model usage and third-party licences. On an ₹8 lakh project with ₹2 lakh of such costs, your share is calculated on ₹6 lakh. The partner deck walks through the full example.' },
  { q: 'When and how do I get paid?', a: `Per milestone, as the client pays — you don’t wait for the project to finish. Payouts usually go out within ${pp.payoutTypicalDays} business days of the client’s payment clearing, and at most ${pp.payoutDays}, by bank transfer or UPI (India) or international transfer. Each payout comes with a breakdown of the client payment, exclusions and your share.` },
  { q: 'Can you show a milestone example?', a: 'A ₹10 lakh project (excluding GST) with ₹30,000 of agreed third-party costs has a net value of ₹9.7 lakh. At an agreed 20%, your total is ₹1,94,000. If the client pays 30% / 40% / 30%, you receive ₹58,200, ₹77,600 and ₹58,200 as each milestone is paid.' },
  { q: 'How is my lead protected?', a: `Once we confirm your lead in writing, it is registered to you for ${pp.leadProtectionMonths / 12} year from that date. If the client signs any time in that year — even if they later contact us directly — you earn your share. If two partners introduce the same client, the first registration counts. Clients who were already in touch with us before your introduction aren’t eligible.` },
  { q: 'Is there a limit, fee or target?', a: 'No referral limit, no fees, no targets and no exclusivity. We never approach your client directly. Focus on businesses with a genuine need and a realistic budget.' },
  { q: 'Is there a bonus for high performers?', a: `Yes. Partners who bring more than ₹${pp.bonus.revenueInr / 100_000} lakh in project revenue, or close more than ${pp.bonus.projects} projects, in a month qualify for a performance bonus. The amount and how revenue and projects are counted are confirmed in writing. Strong partners can also move to a higher commission rate at the annual partnership review.` },
  { q: 'What if a client pays late, or the project runs past 12 months?', a: 'Your commission continues on every eligible payment until the full project amount is received, however long that takes. New projects or separately quoted work from the same client have their commission agreed in writing. There is no recurring commission on ongoing services.' },
  { q: 'What if a client stops paying?', a: 'You never cover a client’s unpaid invoice or a loss outside your control. Commission is paid only on amounts we actually receive and retain, and a client missing a later payment does not mean returning commission already earned on cleared payments. How a genuine refund or payment reversal is handled is set out in the partner agreement.' },
]

export default function PartnersPage() {
  return (
    <>
      <JsonLd data={[partnerProgramSchema(), faqSchema(faqs), breadcrumbs([{ name: 'Partner programme', path: '/partners' }])]} />

      <PageHero
        crumbs={[{ label: 'Partner programme' }]}
        title={<>Bring a client.<br />Earn up to <span className="text-cobalt">{pp.share.max}%.</span></>}
        meta={[
          { k: 'Partner share', v: `Up to ${pp.share.max}% of net value` },
          { k: 'Payout', v: `Usually ${pp.payoutTypicalDays}, max ${pp.payoutDays} business days` },
          { k: 'Lead protection', v: `${pp.leadProtectionMonths / 12} year from registration` },
          { k: 'To join', v: '₹0 · no targets' },
        ]}
        intro={
          <>
            <p className="text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-snug tracking-[-0.015em] text-ink">
              Know a business that needs automation, an AI agent, an app or custom software? Introduce them.
            </p>
            <p className="mt-5 text-[17px] leading-relaxed text-muted">
              We do the scoping and the building. You earn up to {pp.share.max}% of every project — the bigger the project, the bigger your share.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={DECK} target="_blank" rel="noopener noreferrer" className="btn-cobalt">View partner deck <Arrow /></a>
              <a href="#apply" className="btn-ghost">Become a partner</a>
            </div>
          </>
        }
      />

      {/* DECK + SHARE */}
      <section className="container py-24 sm:py-28">
        <a href={DECK} target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden bg-ink text-paper">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 animate-glow rounded-full bg-cobalt/40 blur-3xl" />
          <div className="relative grid lg:grid-cols-12">
            <div className="p-8 sm:p-12 lg:col-span-7 lg:p-14">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-paper/55">Partner deck · 2 min read</p>
              <h2 className="display mt-6 text-[clamp(2.75rem,6vw,5rem)]">Everything a partner needs, in one page.</h2>
              <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-paper/65">
                Who we are, what you can sell, live projects, your share with a worked example, and the terms. Read it online or
                download the PDF to share.
              </p>
              <span className="btn mt-10 bg-paper text-ink group-hover:bg-cobalt group-hover:text-white">
                Open partner deck <Arrow />
              </span>
            </div>
            <div className="border-t border-paper/15 lg:col-span-5 lg:border-l lg:border-t-0">
              <p className="px-8 pt-8 font-mono text-[11px] uppercase tracking-[0.12em] text-paper/55 sm:px-12 lg:px-10">Your share · net project value</p>
              <ul className="mt-4">
                {pp.slabs.map((s, i) => (
                  <li key={s.label} className="flex items-baseline justify-between gap-4 border-t border-paper/15 px-8 py-5 sm:px-12 lg:px-10">
                    <span className="text-[15px] text-paper/70">{s.label}</span>
                    <span className={cn('display whitespace-nowrap text-[clamp(2.5rem,4vw,3.25rem)]', i === pp.slabs.length - 1 && 'text-cobalt-ink')}>
                      {s.min}–{s.max}%
                    </span>
                  </li>
                ))}
              </ul>
              <p className="border-t border-paper/15 px-8 py-5 text-[13px] leading-relaxed text-paper/50 sm:px-12 lg:px-10">
                Indicative; agreed per project. Calculated after pass-through costs. No recurring commission.
              </p>
            </div>
          </div>
        </a>

        <ol className="mt-6 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="bg-paper p-7 sm:p-8">
              <span className="grid h-9 w-9 place-items-center bg-ink font-mono text-[13px] text-paper">{i + 1}</span>
              <h3 className="mt-8 text-xl font-semibold tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
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
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappHref('Hi, I’d like to join the Trident Square partner programme.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border border-paper/25 text-paper hover:bg-paper hover:text-ink"
              >
                Apply on WhatsApp
              </a>
              <a href={DECK} target="_blank" rel="noopener noreferrer" className="btn border border-paper/25 text-paper hover:bg-paper hover:text-ink">
                Partner deck ↗
              </a>
            </div>
          </div>
          <div className="text-ink lg:col-span-8">
            <LeadForm kind="partner" />
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs} title="Partner questions." label="Partner FAQ" />
      <p className="container -mt-16 pb-24 text-[13px] leading-relaxed text-muted lg:pl-[calc(33.333%+2.5rem)]">
        Partner share applies to new clients introduced by a registered partner and is paid on net amounts received, excluding
        taxes and pass-through costs. Slabs are indicative; full terms are in the partner agreement.
      </p>
    </>
  )
}
