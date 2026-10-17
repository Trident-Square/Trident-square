import Link from 'next/link'
import Arrow from '@/components/site/Arrow'
import CtaBand from '@/components/site/CtaBand'
import FaqList from '@/components/site/FaqList'
import HeroConsole from '@/components/site/HeroConsole'
import JsonLd from '@/components/site/JsonLd'
import SectionHead from '@/components/site/SectionHead'
import TridentServices from '@/components/site/TridentServices'
import WorkIndex from '@/components/site/WorkIndex'
import { faqSchema } from '@/lib/seo'
import type { Faq } from '@/lib/services'
import { partnerProgram, site } from '@/lib/site'
import { projects } from '@/lib/work'

const footnotes = [
  ['1', 'Talks', 'Voice agents and chatbots that speak to your customers — in Hindi, English and Hinglish.'],
  ['2', 'Thinks', 'Automation systems and AI agents that run your workflows — CRM, ERP, Tally, WhatsApp, documents, reports.'],
  ['3', 'Ships', 'Custom software, SaaS, web, e-commerce and mobile apps — every kind of software your business runs on.'],
]

const titleBlock = [
  ['Products shipped', site.projectsDelivered],
  ['Voice reply time', '< 2 s'],
  ['Languages', 'HI · EN'],
  ['Demos', 'Weekly'],
  ['Code ownership', 'Yours'],
]

/** Segments are sized by how long each phase actually takes. */
const timeline = [
  { span: 1, when: 'Day 0', title: 'Free scoping call', text: '30 minutes with an engineer. A rough plan, a price range and an honest view on whether AI is the right tool.' },
  { span: 1.4, when: 'Week 1', title: 'Discovery sprint', text: 'We map the workflow, design the screens or call flow, and fix scope and price.' },
  { span: 3.4, when: 'Weeks 2–8', title: 'Build in the open', text: 'A live staging link every Friday. You test real software, not slides. Change course early and cheaply.' },
  { span: 1.6, when: 'Launch +', title: 'Ship & improve', text: 'Production launch, monitoring and a 30-day warranty. Then support or a dedicated team.' },
]

const models = [
  { name: 'Fixed scope', fit: 'MVPs · agents · websites', text: 'Agreed scope, fixed price, milestone payments. You know the total before we start.' },
  { name: 'Dedicated team', fit: 'Evolving products', text: 'Engineers, a designer and a PM working as your product team. Scale with 30 days’ notice.' },
  { name: 'AI sprint', fit: 'Testing an idea', text: 'Two to three weeks to prototype one AI workflow on your real data, with a go/no-go report.' },
]

const faqs: Faq[] = [
  { q: 'What does Trident Square do?', a: 'We are an automation and software engineering company in Noida, India. We build business process automation, AI agents, voice and chat bots, custom software, SaaS, web, e-commerce and mobile apps, plus UI/UX design and cloud — for startups and businesses in India and abroad.' },
  { q: 'How much does an AI agent or app cost?', a: 'Focused AI agents and chatbots usually start around ₹3–6 lakh (US$4k–8k); MVPs for custom software or apps typically range ₹4–15 lakh. You get a fixed quote after a free scoping call.' },
  { q: 'Do you work with clients outside India?', a: 'Yes. We work with clients across India, the US, UK, Europe and the Middle East, with overlapping hours and weekly video demos.' },
  { q: 'Who owns the code?', a: 'You do. Code lives in your repository from the start and full IP transfers to you on payment.' },
  { q: 'Can I earn by referring clients?', a: `Yes. Our partner programme pays ${partnerProgram.referral.base}–${partnerProgram.referral.boosted}% of the project value for every client you introduce who signs with us.` },
]

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />

      {/* ───────── HERO ───────── */}
      <section className="pt-20 sm:pt-24">
        <div className="container">
          <div className="flex items-center justify-between border-b border-ink py-3 font-mono text-[11px] uppercase tracking-[0.12em]">
            <span>Trident Square — AI &amp; software engineering</span>
            <span className="hidden text-muted sm:inline">Noida, India · working worldwide</span>
          </div>

          <h1 className="display mt-8 animate-rise text-[clamp(3.6rem,12.6vw,13rem)] sm:mt-10">
            <span className="block">Software</span>
            <span className="block">
              that talks<sup className="fn">1</sup>,
            </span>
            <span className="block">
              thinks<sup className="fn">2</sup> <span className="text-cobalt">&amp;</span> ships<sup className="fn">3</sup>.
            </span>
          </h1>

          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
            <div className="flex flex-col lg:col-span-5">
              <ol className="border-t border-ink/15">
                {footnotes.map(([n, word, text]) => (
                  <li key={n} className="grid grid-cols-[2rem_1fr] gap-2 border-b border-ink/15 py-4">
                    <span className="font-mono text-[12px] text-cobalt">{n}</span>
                    <p className="text-[15.5px] leading-snug">
                      <strong className="font-semibold">{word}.</strong> <span className="text-muted">{text}</span>
                    </p>
                  </li>
                ))}
              </ol>
              <p className="mt-8 max-w-md text-[17px] leading-relaxed text-ink-2">
                {site.projectsDelivered} products shipped. One partner for everything from a single automation to a full
                software platform — built in Noida for businesses worldwide.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Book a free call <Arrow />
                </Link>
                <Link href="/work" className="btn-ghost">
                  See the work
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7">
              <HeroConsole />
            </div>
          </div>

          {/* Engineering-drawing title block instead of a stat grid */}
          <dl className="mt-16 grid grid-cols-2 gap-px border border-ink bg-ink sm:grid-cols-3 lg:grid-cols-5">
            {titleBlock.map(([k, v]) => (
              <div key={k} className="bg-paper p-4 last:max-sm:col-span-2">
                <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{k}</dt>
                <dd className="display mt-2 text-[2.25rem]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────── THE TRIDENT ───────── */}
      <section className="container py-24 sm:py-32">
        <SectionHead
          index="01"
          label="What we build"
          title="Three prongs. One shaft."
          intro="Automation, AI and every kind of software — and it all fits on our logo. Pick a prong, or bring a problem and we’ll tell you which one it needs."
        />
        <div className="mt-16">
          <TridentServices />
        </div>
      </section>

      {/* ───────── WORK ───────── */}
      <section className="container pb-24 sm:pb-32">
        <SectionHead
          index="02"
          label="Selected work"
          title="Shipped. Used. Measured."
          intro="Hover a project to see the real product. Every clip is a screen recording — no mock-ups, no stock footage."
        />
        <div className="mt-14">
          <WorkIndex projects={projects} />
        </div>
        <Link href="/work" className="btn-ghost mt-10">
          All case studies <Arrow />
        </Link>
      </section>

      {/* ───────── PROCESS ───────── */}
      <section className="bg-ink py-24 text-paper sm:py-32">
        <div className="container">
          <SectionHead dark index="03" label="How we work" title="Idea to live product, measured in weeks." />
          <ol className="mt-16 flex flex-col gap-10 lg:flex-row lg:gap-0">
            {timeline.map((t) => (
              <li key={t.title} className="lg:pr-6" style={{ flex: t.span }}>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-cobalt-ink">{t.when}</p>
                {/* Dimension line: |———| */}
                <div aria-hidden className="relative mt-3 h-3 lg:-mr-6">
                  <span className="absolute inset-y-0 left-0 w-px bg-paper/60" />
                  <span className="absolute left-0 right-2 top-1/2 h-px bg-paper/40" />
                  <span className="absolute inset-y-0 right-2 w-px bg-paper/60" />
                </div>
                <h3 className="condensed mt-6 text-2xl font-bold uppercase">{t.title}</h3>
                <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-paper/60">{t.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-24 grid gap-px border border-paper/15 bg-paper/15 md:grid-cols-3">
            {models.map((m) => (
              <div key={m.name} className="bg-ink p-7 sm:p-8">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-paper/45">{m.fit}</p>
                <h3 className="display mt-4 text-[2.5rem]">{m.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-paper/60">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── PARTNERS ───────── */}
      <section className="container py-24 sm:py-32">
        <Link href="/partners" className="group relative block overflow-hidden bg-cobalt text-white">
          <div className="grid lg:grid-cols-12">
            <div className="p-8 sm:p-12 lg:col-span-7 lg:p-16">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/60">Partner programme</p>
              <h2 className="display mt-6 text-[clamp(2.75rem,6vw,5.5rem)]">Know someone who needs software?</h2>
              <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-white/75">
                Introduce them. We do the selling and the building. You earn {partnerProgram.referral.base}% of the project — {partnerProgram.referral.boosted}% on
                bigger or repeat deals. Agencies can white-label our team.
              </p>
              <span className="btn mt-10 bg-white text-ink group-hover:bg-ink group-hover:text-white">
                How it works <Arrow />
              </span>
            </div>
            <div className="flex items-end justify-end border-t border-white/20 p-8 sm:p-12 lg:col-span-5 lg:border-l lg:border-t-0">
              <p className="display text-right text-[clamp(6rem,16vw,15rem)] leading-[0.78]">
                {partnerProgram.referral.boosted}
                <span className="text-white/40">%</span>
              </p>
            </div>
          </div>
        </Link>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="container pb-24 sm:pb-32">
        <SectionHead index="04" label="FAQ" title="Asked before the first call" />
        <div className="mt-12 lg:ml-[25%]">
          <FaqList faqs={faqs} />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
