import Link from 'next/link'
import Arrow from '@/components/site/Arrow'
import CtaBand from '@/components/site/CtaBand'
import CountUp from '@/components/site/CountUp'
import FaqSection from '@/components/site/FaqSection'
import InlineMedia from '@/components/site/InlineMedia'
import MediaReveal from '@/components/site/MediaReveal'
import JsonLd from '@/components/site/JsonLd'
import Reveal from '@/components/site/Reveal'
import SectionHead from '@/components/site/SectionHead'
import ServiceIndex from '@/components/site/ServiceIndex'
import WordMarquee from '@/components/site/WordMarquee'
import WorkGrid from '@/components/site/WorkGrid'
import { faqSchema } from '@/lib/seo'
import type { Faq } from '@/lib/services'
import { partnerProgram } from '@/lib/site'
import { getProject } from '@/lib/work'

/** Segments are sized by how long each phase actually takes. */
const tools = ['WhatsApp', 'Shopify', 'Tally', 'Zoho', 'HubSpot', 'Razorpay', 'Google Sheets', 'Salesforce', 'Twilio', 'Exotel', 'OpenAI', 'Claude', 'n8n', 'Zapier', 'AWS', 'Firebase']

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
  const gigtap = getProject('gigtap')!
  const instabus = getProject('instabus')!
  const trendify = getProject('trendify')!
  const gamecam = getProject('gamecam')!
  const work = ['gigtap', 'instabus', 'trendify', 'nowochat'].map((s) => getProject(s)!)

  return (
    <>
      <JsonLd data={faqSchema(faqs)} />

      {/* ───────── HERO ───────── */}
      <section className="container pt-24 sm:pt-28">
        <div className="grid grid-cols-2 border-b border-ink pb-3 font-mono text-[11px] uppercase tracking-[0.14em] sm:grid-cols-3">
          <span>Trident Square®</span>
          <span className="hidden text-center text-muted sm:block">Automation · AI · Software</span>
          <span className="text-right text-muted">Noida → Worldwide</span>
        </div>

        <h1 className="display mt-10 text-[clamp(2.6rem,7.7vw,8.4rem)] sm:mt-14">
          <span className="block animate-[title-in_1s_cubic-bezier(.2,.75,.15,1)_both]">
            We build
            <InlineMedia video={gigtap.loop!} poster={gigtap.poster!} delay={500} />
            automation,
          </span>
          <span className="block animate-[title-in_1s_cubic-bezier(.2,.75,.15,1)_120ms_both]">
            <InlineMedia video={instabus.loop!} poster={instabus.poster!} delay={700} className="ml-0" />
            AI <span className="text-cobalt">&amp;</span> software
            <InlineMedia video={trendify.loop!} poster={trendify.poster!} delay={900} className="w-[0.9em]" />
          </span>
          <span className="block animate-[title-in_1s_cubic-bezier(.2,.75,.15,1)_240ms_both] text-ink/25">
            that runs your business.
          </span>
        </h1>

        {/* On phones the inline windows would break the lines — show them as a strip instead. */}
        <div className="mt-8 grid grid-cols-3 gap-2 sm:hidden" aria-hidden>
          {[gigtap, instabus, trendify].map((p) => (
            <div key={p.slug} className="relative aspect-[4/5] overflow-hidden bg-ink">
              <video src={p.loop} poster={p.poster} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-10 border-t border-ink/15 pt-8 lg:grid-cols-12">
          <p className="max-w-md text-[18px] leading-relaxed text-ink-2 lg:col-span-5">
            One studio for everything from a single automation that saves your team ten hours a week to the platform your
            whole company runs on. Built in Noida, shipped worldwide.
          </p>
          <div className="flex flex-wrap items-start gap-3 lg:col-span-4">
            <Link href="/contact" className="btn-primary">
              Book a free call <Arrow />
            </Link>
            <Link href="/work" className="btn-ghost">
              See the work
            </Link>
          </div>
          <dl className="grid grid-cols-3 gap-4 lg:col-span-3">
            {[
              [<CountUp key="a" to={25} suffix="+" />, 'Products shipped'],
              [<CountUp key="b" to={10} />, 'Services'],
              [<CountUp key="c" to={partnerProgram.referral.boosted} suffix="%" />, 'Partner payout'],
            ].map(([v, l], i) => (
              <div key={i}>
                <dd className="display text-[2.4rem] leading-none">{v}</dd>
                <dt className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted">{l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────── FEATURED ───────── */}
      <section className="container mt-16 sm:mt-24">
        <Link href={`/work/${gamecam.slug}`} className="group block">
          <MediaReveal poster={gamecam.poster} video={gamecam.loop} alt={`${gamecam.name} — ${gamecam.summary}`} priority className="aspect-[4/3] sm:aspect-[21/9]">
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 bg-gradient-to-t from-black/70 to-transparent p-5 pt-24 text-white sm:p-8">
              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/70">Featured case — {gamecam.industry}</p>
                <p className="display mt-2 text-[clamp(2.25rem,5vw,4.5rem)]">{gamecam.name}</p>
                <p className="mt-1 max-w-lg text-[15px] text-white/80">{gamecam.summary}</p>
              </div>
              <span className="grid h-14 w-14 shrink-0 place-items-center bg-white text-ink transition-all duration-500 group-hover:rotate-[-45deg] group-hover:bg-cobalt group-hover:text-white">
                <Arrow className="h-5 w-5" />
              </span>
            </div>
          </MediaReveal>
        </Link>
      </section>

      <div className="mt-24 sm:mt-32">
        <WordMarquee words={['Automation', 'AI agents', 'Voice bots', 'Chatbots', 'Custom software', 'Web apps', 'Mobile apps', 'E-commerce', 'Cloud']} />
      </div>

      {/* ───────── SERVICES ───────── */}
      <section className="container py-24 sm:py-32">
        <Reveal>
          <SectionHead index="01" label="What we build" title="If it runs your business, we build it." intro="Hover a service to see something we shipped with it." />
        </Reveal>
        <div className="mt-16">
          <ServiceIndex />
        </div>
        <Reveal className="mt-14 border-t border-ink/15 pt-6">
          <p className="font-mono text-[11px] uppercase leading-loose tracking-[0.12em] text-muted">
            <span className="text-ink">Works with — </span>
            {tools.join(' / ')}
          </p>
        </Reveal>
      </section>

      {/* ───────── WORK ───────── */}
      <section className="bg-paper-2/70 py-24 sm:py-32">
        <div className="container">
          <Reveal>
            <SectionHead index="02" label="Selected work" title="Shipped. Used. Measured." intro="Real products and real screen recordings — no mock-ups, no stock footage." />
          </Reveal>
          <div className="mt-16 sm:mt-24">
            <WorkGrid projects={work} />
          </div>
          <Reveal className="mt-20 flex justify-center">
            <Link href="/work" className="btn-primary">
              All case studies <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ───────── APPROACH ───────── */}
      <section className="container py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted"><span className="text-cobalt">03 / </span>How we work</p>
                <h2 className="h2 mt-5 max-w-[11ch]">Idea to live product, in weeks.</h2>
                <p className="lede mt-6 max-w-sm">Weekly demos on a live link, a fixed price before we start, and code that belongs to you from day one.</p>
              </Reveal>
            </div>
          </div>
          <ol className="lg:col-span-7">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.title} delay={i * 60} className="grid grid-cols-[auto_1fr] gap-6 border-t border-ink py-8 sm:gap-10 sm:py-10">
                <span className="display text-[clamp(3.5rem,7vw,6rem)] leading-[0.8] text-transparent" style={{ WebkitTextStroke: '1.5px rgb(var(--ink))' }}>
                  0{i + 1}
                </span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-cobalt">{t.when}</p>
                  <h3 className="display mt-2 text-[clamp(1.9rem,3vw,2.75rem)]">{t.title}</h3>
                  <p className="mt-3 max-w-md text-[16px] leading-relaxed text-muted">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="mt-20 grid gap-px border border-ink bg-ink md:grid-cols-3">
          {models.map((m, i) => (
            <Reveal key={m.name} delay={i * 90} className="group bg-paper p-7 transition-colors duration-500 hover:bg-ink hover:text-paper sm:p-9">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted group-hover:text-paper/50">{m.fit}</p>
              <h3 className="display mt-6 text-[2.75rem]">{m.name}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-muted group-hover:text-paper/65">{m.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────── PARTNERS ───────── */}
      <section className="container pb-8">
        <Reveal>
          <Link href="/partners" className="group relative block overflow-hidden bg-cobalt text-white">
            <div className="relative grid lg:grid-cols-12">
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
                <p className="display text-right text-[clamp(6rem,16vw,15rem)] leading-[0.78] transition-transform duration-700 group-hover:-translate-y-2">
                  {partnerProgram.referral.boosted}
                  <span className="text-white/40">%</span>
                </p>
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand />
    </>
  )
}
