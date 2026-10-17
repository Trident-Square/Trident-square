import FaqList from './FaqList'
import Reveal from './Reveal'
import Arrow from './Arrow'
import type { Faq } from '@/lib/services'
import { phoneHref, site, whatsappHref } from '@/lib/site'

/** FAQ block used across the site: sticky title + help card on the left, accordion on the right. */
export default function FaqSection({ faqs, title = 'Questions, answered.', label = 'FAQ' }: { faqs: Faq[]; title?: string; label?: string }) {
  return (
    <section className="container py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{label}</p>
              <h2 className="h2 mt-5 max-w-[10ch]">{title}</h2>
            </Reveal>
            <Reveal delay={120} className="mt-10 bg-ink p-6 text-paper sm:p-7">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-paper/50">Still deciding?</p>
              <p className="mt-3 text-[19px] font-medium leading-snug">Talk to an engineer, not a salesperson. 30 minutes, free.</p>
              <div className="mt-6 flex flex-col gap-2">
                <a href={whatsappHref('Hi Trident Square, I have a question about a project.')} target="_blank" rel="noopener noreferrer" className="btn justify-between bg-paper text-ink hover:bg-cobalt hover:text-white">
                  WhatsApp us <Arrow />
                </a>
                <a href={phoneHref} className="btn justify-between border border-paper/25 text-paper hover:bg-paper hover:text-ink">
                  Call {site.phoneDisplay} <Arrow />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal className="lg:col-span-8" delay={80}>
          <FaqList faqs={faqs} />
        </Reveal>
      </div>
    </section>
  )
}
