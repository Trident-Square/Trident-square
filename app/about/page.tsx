import CtaBand from '@/components/site/CtaBand'
import PageHero from '@/components/site/PageHero'
import Reveal from '@/components/site/Reveal'
import SectionHead from '@/components/site/SectionHead'
import WordMarquee from '@/components/site/WordMarquee'
import JsonLd from '@/components/site/JsonLd'
import { breadcrumbs, pageMetadata } from '@/lib/seo'
import { absoluteUrl, site } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'About — AI & Software Engineering Studio in Noida',
  description:
    'Trident Square is an AI and software engineering studio in Noida, India building AI agents, voice AI and custom software for startups and businesses worldwide.',
  path: '/about',
})

const principles = [
  { title: 'Engineers talk to clients', text: 'The person on your calls is the person writing your code. No account managers relaying messages.' },
  { title: 'Working software every week', text: 'You get a live link every Friday. Progress is something you click, not a status report.' },
  { title: 'AI where it earns its place', text: 'We will tell you when a simple rule or a form beats a language model — and save you the money.' },
  { title: 'You own everything', text: 'Your repository, your cloud, your data and full IP from day one. Leaving us is easy, which is why clients stay.' },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbs([{ name: 'About', path: '/about' }]),
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            url: absoluteUrl('/about'),
            name: `About ${site.name}`,
            about: { '@id': `${site.url}/#organization` },
          },
        ]}
      />

      <PageHero
        crumbs={[{ label: 'About' }]}
        title={<>A studio<br />that <span className="text-cobalt">ships.</span></>}
        meta={[
          { k: 'Products shipped', v: site.projectsDelivered },
          { k: 'Headquarters', v: 'Sector 62, Noida' },
          { k: 'Working with', v: 'India · US · UK · Middle East' },
          { k: 'Languages we build in', v: 'Hindi · English' },
        ]}
        intro={
          <div className="space-y-5">
            <p className="text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-snug tracking-[-0.015em] text-ink">
              We started because we kept seeing the same thing: businesses paying for impressive demos that never made it into daily use.
            </p>
            <p className="text-[17px] leading-relaxed text-muted">
              So we built the opposite kind of studio — engineers who stay close to the problem, ship working software every
              week and measure success by whether people actually use what we build. {site.projectsDelivered} products later,
              that includes automation systems running whole back offices, voice agents making real calls, hiring platforms
              used by thousands of workers and computer vision on live sports footage.
            </p>
          </div>
        }
      />

      <div className="mt-24 sm:mt-32">
        <WordMarquee words={['Automate', 'Integrate', 'Design', 'Engineer', 'Ship', 'Support']} />
      </div>

      <section className="container py-24 sm:py-32">
        <Reveal>
          <SectionHead index="01" label="How we work" title="Four things we won’t compromise on." />
        </Reveal>
        <ol className="mt-16 border-t border-ink">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 70} className="group grid gap-4 border-b border-ink/15 py-10 transition-colors sm:grid-cols-12 sm:gap-10">
              <span className="display text-[clamp(3.5rem,7vw,6rem)] leading-[0.8] text-transparent transition-colors duration-500 group-hover:text-cobalt sm:col-span-2" style={{ WebkitTextStroke: '1.5px rgb(var(--ink))' }}>
                0{i + 1}
              </span>
              <h3 className="display text-[clamp(2rem,3.6vw,3.25rem)] sm:col-span-5">{p.title}</h3>
              <p className="max-w-md text-[17px] leading-relaxed text-muted sm:col-span-5">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <CtaBand />
    </>
  )
}

