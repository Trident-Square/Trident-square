import Link from 'next/link'
import Arrow from '@/components/site/Arrow'
import CtaBand from '@/components/site/CtaBand'
import FaqSection from '@/components/site/FaqSection'
import BuildBento from '@/components/site/BuildBento'
import CountUp from '@/components/site/CountUp'
import AutomateSection from '@/components/site/AutomateSection'
import HeroIntro from '@/components/site/HeroIntro'
import JsonLd from '@/components/site/JsonLd'
import Reveal from '@/components/site/Reveal'
import SectionHead from '@/components/site/SectionHead'
import Showreel from '@/components/site/Showreel'
import { faqSchema } from '@/lib/seo'
import type { Faq } from '@/lib/services'
import { partnerProgram } from '@/lib/site'
import { projects } from '@/lib/work'

/** Segments are sized by how long each phase actually takes. */
const tools = ['WhatsApp', 'Shopify', 'Tally', 'Zoho', 'HubSpot', 'Razorpay', 'Google Sheets', 'Salesforce', 'Twilio', 'Exotel', 'OpenAI', 'Claude', 'Gemini', 'Slack', 'Stripe', 'Shiprocket']
const tools2 = ['n8n', 'Make', 'Zapier', 'AWS', 'Google Cloud', 'Firebase', 'PostgreSQL', 'Next.js', 'React Native', 'Flutter', 'Python', 'Node.js', 'WooCommerce', 'Notion', 'Gmail', 'Outlook']

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

      <HeroIntro />

      <Reveal>
        <AutomateSection />
      </Reveal>

      {/* ───────── TOOLS WE CONNECT ───────── */}
      <section aria-label="Tools we integrate with" className="border-y border-line bg-paper py-10">
        <p className="container font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Plugs into the tools you already use</p>
        <div className="mask-fade-x mt-6 space-y-3 overflow-hidden">
          {[tools, tools2].map((row, r) => (
            <ul key={r} className={`flex w-max gap-3 ${r ? 'animate-marquee-rev' : 'animate-marquee'}`}>
              {[...row, ...row].map((t, i) => (
                <li
                  key={i}
                  aria-hidden={i >= row.length}
                  className="condensed whitespace-nowrap border border-ink/10 bg-white px-5 py-2.5 text-[17px] font-bold uppercase tracking-[0.01em] text-ink/80"
                >
                  {t}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* ───────── NUMBERS ───────── */}
      <section className="container py-16 sm:py-20">
        <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {[
            { v: <CountUp to={25} suffix="+" />, l: 'products shipped' },
            { v: <CountUp to={10} />, l: 'services, one team' },
            { v: <>&lt;<CountUp to={2} />s</>, l: 'voice agent reply time' },
            { v: <CountUp to={partnerProgram.referral.boosted} suffix="%" />, l: 'paid to referral partners' },
          ].map((x, i) => (
            <Reveal key={x.l} delay={i * 90} className="border-l border-ink pl-5">
              <dt className="sr-only">{x.l}</dt>
              <dd>
                <span className="display block text-[clamp(3.5rem,8vw,7rem)] leading-[0.85]">{x.v}</span>
                <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{x.l}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* ───────── WHAT WE BUILD ───────── */}
      <section className="container pb-24 sm:pb-32">
        <Reveal>
          <SectionHead index="02" label="What we build" title="If it runs your business, we build it." intro="Automation, AI and every kind of software — one team from first call to launch." />
        </Reveal>
        <Reveal className="mt-14" delay={120}>
          <BuildBento />
        </Reveal>
        <Reveal className="mt-8 flex flex-wrap items-center gap-2" delay={160}>
          <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">Also</span>
          {[
            ['AI agent development', '/services/ai-agent-development'],
            ['E-commerce', '/services/ecommerce-development'],
            ['UI/UX design', '/services/ui-ux-design'],
            ['Cloud & DevOps', '/services/cloud-devops'],
          ].map(([l, h]) => (
            <Link key={h} href={h} className="border border-ink/15 px-3.5 py-2 text-[14px] transition-colors hover:border-ink hover:bg-ink hover:text-paper">
              {l}
            </Link>
          ))}
          <Link href="/services" className="ml-auto flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.1em] hover:text-cobalt">
            All 10 services <Arrow />
          </Link>
        </Reveal>
      </section>

      {/* ───────── SHOWREEL ───────── */}
      <section className="overflow-hidden bg-paper-2/70 py-24 sm:py-32">
        <Reveal className="container">
          <SectionHead index="03" label="Selected work" title="Shipped. Used. Measured." intro="Real products, real screen recordings. Hover to pause, click to read the story." />
        </Reveal>
        <Reveal className="mt-16" delay={120}>
          <Showreel projects={projects} />
        </Reveal>
        <div className="container mt-12">
          <Link href="/work" className="btn-ghost">
            All case studies <Arrow />
          </Link>
        </div>
      </section>

      {/* ───────── PROCESS ───────── */}
      <section className="bg-ink py-24 text-paper sm:py-32">
        <div className="container">
          <Reveal>
            <SectionHead dark index="04" label="How we work" title="Idea to live product, measured in weeks." />
          </Reveal>
          <ol className="mt-16 flex flex-col gap-10 lg:flex-row lg:gap-0">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.title} delay={i * 120} className="lg:pr-6" style={{ flex: t.span }}>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-cobalt-ink">{t.when}</p>
                <div aria-hidden className="relative mt-3 h-3 lg:-mr-6">
                  <span className="absolute inset-y-0 left-0 w-px bg-paper/60" />
                  <span className="absolute left-0 right-2 top-1/2 h-px bg-paper/40" />
                  <span className="absolute inset-y-0 right-2 w-px bg-paper/60" />
                </div>
                <h3 className="condensed mt-6 text-2xl font-bold uppercase">{t.title}</h3>
                <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-paper/60">{t.text}</p>
              </Reveal>
            ))}
          </ol>

          <div className="mt-24 grid gap-px border border-paper/15 bg-paper/15 md:grid-cols-3">
            {models.map((m, i) => (
              <Reveal key={m.name} delay={i * 100} className="bg-ink p-7 sm:p-8">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-paper/45">{m.fit}</p>
                <h3 className="display mt-4 text-[2.5rem]">{m.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-paper/60">{m.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── PARTNERS ───────── */}
      <section className="container py-24 sm:py-32">
        <Reveal>
          <Link href="/partners" className="group relative block overflow-hidden bg-cobalt text-white">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 animate-glow rounded-full bg-white/20 blur-3xl" />
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
