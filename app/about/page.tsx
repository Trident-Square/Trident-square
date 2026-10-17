import CtaBand from '@/components/site/CtaBand'
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

      <section className="container pt-28 sm:pt-36">
        <p className="eyebrow">About</p>
        <h1 className="display mt-7 max-w-[14ch] text-[clamp(2.75rem,7.5vw,6.75rem)]">
          A studio that <span className="mark-word text-cobalt">ships</span>.
        </h1>
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="space-y-5 text-[18px] leading-relaxed text-ink-2 lg:col-span-7">
            <p>
              Trident Square is an AI and software engineering studio based in Sector 62, Noida. We started because we kept
              seeing the same thing: businesses paying for impressive AI demos that never made it into daily use.
            </p>
            <p>
              So we built the opposite kind of studio — engineers who stay close to the problem, ship working software every
              week and measure success by whether people actually use what we build. {site.projectsDelivered} products later,
              that includes voice agents making real calls, hiring platforms used by thousands of workers and computer vision
              running on live sports footage.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-px self-start overflow-hidden border border-line bg-line lg:col-span-4 lg:col-start-9">
            {[
              [site.projectsDelivered, 'products shipped'],
              ['HI · EN', 'languages we build in'],
              ['Noida', 'headquarters'],
              ['Weekly', 'live demos'],
            ].map(([v, l]) => (
              <div key={l} className="bg-paper p-6">
                <dt className="sr-only">{l}</dt>
                <dd>
                  <span className="block text-3xl display">{v}</span>
                  <span className="mt-1 block text-[13.5px] text-muted">{l}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container py-24 sm:py-32">
        <p className="eyebrow"><span className="text-cobalt">01 / </span>How we work</p>
        <h2 className="h2 mt-6 max-w-[16ch]">Four things we won’t compromise on</h2>
        <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {principles.map((p, i) => (
            <div key={p.title} className="border-t-2 border-ink pt-6">
              <span className="font-mono text-[12px] text-cobalt">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{p.title}</h3>
              <p className="mt-3 max-w-md text-[16px] leading-relaxed text-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  )
}

