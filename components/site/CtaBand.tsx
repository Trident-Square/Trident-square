import Link from 'next/link'
import Arrow from './Arrow'
import Reveal from './Reveal'
import { phoneHref, site, whatsappHref } from '@/lib/site'

/** Closing call to action: one huge line you can click, and the direct ways to reach us. */
export default function CtaBand({ title = 'Let’s build the thing that runs itself.' }: { title?: string; text?: string }) {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div className="container py-24 sm:py-36">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/50">Start a project</p>
          <h2 className="display mt-8 max-w-[15ch] text-[clamp(3rem,8.5vw,8.5rem)]">{title}</h2>
        </Reveal>

        <Reveal delay={150}>
          <Link
            href="/contact"
            className="group mt-14 flex items-center justify-between gap-6 border-y border-paper/20 py-6 transition-colors hover:border-cobalt sm:py-8"
          >
            <span className="display text-[clamp(2rem,5vw,4.5rem)] transition-colors group-hover:text-cobalt-ink">Book a free call</span>
            <span className="grid h-14 w-14 shrink-0 place-items-center bg-paper text-ink transition-all duration-500 group-hover:rotate-[-45deg] group-hover:bg-cobalt group-hover:text-white sm:h-20 sm:w-20">
              <Arrow className="h-6 w-6" />
            </span>
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-6 font-mono text-[12px] uppercase tracking-[0.1em] text-paper/60 sm:grid-cols-3">
          <a href={whatsappHref('Hi Trident Square, I’d like to discuss a project.')} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
            → WhatsApp
          </a>
          <a href={phoneHref} className="hover:text-paper">→ {site.phoneDisplay}</a>
          <span>→ Reply within one business day</span>
        </div>
      </div>
    </section>
  )
}
