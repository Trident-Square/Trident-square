import Image from 'next/image'
import Link from 'next/link'
import { Check } from 'lucide-react'
import Arrow from './Arrow'
import Reveal from './Reveal'
import { groups, servicesIn } from '@/lib/services'
import { cn } from '@/lib/utils'

/**
 * The services page body: one section per trident prong, each service a card
 * whose top half is a small live picture of the thing itself.
 */
export default function ServiceCards() {
  return (
    <div className="space-y-24 sm:space-y-32">
      {groups.map((g) => {
        const list = servicesIn(g.id)
        return (
          <section key={g.id} aria-labelledby={`grp-${g.id}`}>
            <Reveal className="grid gap-4 border-t border-ink pt-5 sm:grid-cols-12 sm:items-end">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:col-span-3">
                <span className="text-cobalt">{g.n}</span> — {g.title}
              </p>
              <h2 id={`grp-${g.id}`} className="display text-[clamp(3rem,7vw,6rem)] sm:col-span-6">
                {g.verb}
              </h2>
              <p className="text-[15.5px] leading-relaxed text-muted sm:col-span-3 sm:text-right">{g.line}</p>
            </Reveal>

            <div className={cn('mt-10 grid gap-4 sm:gap-5', list.length === 1 ? 'md:grid-cols-1' : list.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-4')}>
              {list.map((s, i) => (
                <Reveal key={s.slug} delay={i * 80}>
                  <Link href={`/services/${s.slug}`} className="group flex h-full flex-col border border-ink/15 bg-white transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-ink hover:shadow-[0_30px_60px_-35px_rgba(17,17,16,0.45)]">
                    <div className="relative h-48 overflow-hidden border-b border-ink/10 bg-paper-2/60">
                      <Viz slug={s.slug} />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="display text-[clamp(1.8rem,2.4vw,2.3rem)] transition-colors group-hover:text-cobalt">{s.name}</h3>
                        <span className="grid h-10 w-10 shrink-0 place-items-center border border-ink/15 transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                          <Arrow />
                        </span>
                      </div>
                      <p className="mt-2 text-[15.5px] text-ink-2">{s.hook}</p>
                      <ul className="mt-5 space-y-2 border-t border-ink/10 pt-4">
                        {s.deliverables.slice(0, 3).map((d) => (
                          <li key={d} className="flex gap-2.5 text-[14px] leading-snug text-muted">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cobalt" strokeWidth={2.5} />
                            {d}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-auto pt-6 font-mono text-[10.5px] uppercase tracking-[0.12em] text-cobalt">{s.timeline}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

/* Small live pictures, one per service */

function Viz({ slug }: { slug: string }) {
  switch (slug) {
    case 'voice-ai-agents':
      return (
        <div className="absolute inset-0 flex flex-col justify-center gap-3 bg-ink px-6">
          <div className="flex h-14 items-center gap-[3px]">
            {Array.from({ length: 40 }).map((_, i) => (
              <span key={i} className="h-full flex-1 animate-wave bg-cobalt-ink" style={{ animationDelay: `${(i * 97) % 1000}ms`, opacity: 0.4 + ((i * 37) % 60) / 100 }} />
            ))}
          </div>
          <p className="w-fit bg-white/10 px-3 py-1.5 text-[12.5px] text-paper">“Namaste! Booking confirm hai?”</p>
        </div>
      )
    case 'ai-chatbot-development':
      return (
        <div className="absolute inset-0 flex flex-col justify-center gap-2 px-6 text-[12.5px]">
          <p className="w-fit bg-white px-3 py-2 shadow-sm">Price for 500 units?</p>
          <p className="ml-auto w-fit max-w-[80%] bg-ink px-3 py-2 text-paper">₹42 each, free shipping. Send a quote on WhatsApp?</p>
          <p className="flex w-fit gap-1 bg-white px-3 py-2.5 shadow-sm">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-1.5 w-1.5 animate-typing rounded-full bg-ink/60" style={{ animationDelay: `${i * 160}ms` }} />
            ))}
          </p>
        </div>
      )
    case 'ai-agent-development':
      return (
        <div className="absolute inset-0 flex flex-col justify-center bg-ink px-6 font-mono text-[11.5px] leading-relaxed text-paper/80">
          {[
            ['read_email()', 'new RFQ'],
            ['crm.lookup()', 'existing client'],
            ['quote.draft()', '₹3.8L'],
            ['send_for_approval()', '✓'],
          ].map(([f, o], i) => (
            <p key={f} className="flex justify-between gap-3 animate-[fade_.6s_ease_both]" style={{ animationDelay: `${i * 200}ms` }}>
              <span><span className="text-cobalt-ink">▸</span> {f}</span>
              <span className="text-paper/45">{o}</span>
            </p>
          ))}
        </div>
      )
    case 'business-process-automation':
      return (
        <div className="absolute inset-0 flex flex-col justify-center bg-cobalt px-6 text-white">
          <div className="relative flex items-center justify-between">
            <span className="absolute inset-x-0 top-1/2 h-px bg-white/35" />
            <span className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 animate-flow rounded-full bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.6)]" />
            {['Order', 'Invoice', 'Tally', 'WhatsApp'].map((t) => (
              <span key={t} className="relative border border-white/40 bg-cobalt px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em]">{t}</span>
            ))}
          </div>
          <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/65">0 manual steps · runs 24/7</p>
        </div>
      )
    case 'custom-software-development':
      return (
        <div className="absolute inset-0 grid grid-cols-[1fr_2fr] gap-2 p-5">
          <div className="space-y-1.5 bg-ink p-2.5">
            {[70, 50, 60, 40].map((w, i) => (
              <span key={i} className={cn('block h-1.5', i === 0 ? 'bg-cobalt-ink' : 'bg-paper/25')} style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              {[['Revenue', '₹18.4L'], ['Orders', '1,284']].map(([k, v]) => (
                <div key={k} className="bg-white p-2 shadow-sm">
                  <p className="font-mono text-[9px] uppercase text-muted">{k}</p>
                  <p className="condensed text-lg font-bold leading-none">{v}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-1 items-end gap-1 bg-white p-2 shadow-sm">
              {[40, 62, 48, 75, 58, 90].map((h, i) => (
                <span key={i} className={cn('flex-1 origin-bottom animate-grow', i === 5 ? 'bg-cobalt' : 'bg-ink')} style={{ height: `${h}%`, animationDelay: `${i * 160}ms` }} />
              ))}
            </div>
          </div>
        </div>
      )
    case 'web-development':
      return (
        <div className="absolute inset-x-6 bottom-0 top-6 overflow-hidden border border-ink/15 bg-white shadow-[0_20px_40px_-25px_rgba(17,17,16,0.5)] transition-transform duration-700 group-hover:-translate-y-2">
          <div className="flex items-center gap-1.5 border-b border-ink/10 px-3 py-2">
            {[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 rounded-full bg-ink/15" />)}
            <span className="ml-2 h-3.5 flex-1 bg-paper-2" />
          </div>
          <div className="relative h-full">
            <Image src="/work/gigtap.jpg" alt="" fill sizes="400px" className="object-cover object-top" />
          </div>
        </div>
      )
    case 'mobile-app-development':
      return (
        <div className="absolute inset-0 flex items-end justify-center gap-4 pt-5">
          {['/work/trendify.jpg', '/work/nowochat.jpg'].map((src, i) => (
            <div
              key={src}
              className={cn('relative w-[88px] overflow-hidden rounded-[16px] border-[4px] border-ink bg-ink transition-transform duration-700', i ? 'translate-y-6 group-hover:translate-y-3' : 'group-hover:-translate-y-2')}
            >
              <div className="relative aspect-[9/18]">
                <Image src={src} alt="" fill sizes="100px" className="object-cover object-top" />
              </div>
            </div>
          ))}
        </div>
      )
    case 'ecommerce-development':
      return (
        <div className="absolute inset-0 grid grid-cols-3 gap-2 p-5">
          {['Kurta', 'Sneakers', 'Watch'].map((p, i) => (
            <div key={p} className="flex flex-col bg-white p-2 shadow-sm">
              <span className={cn('flex-1', ['bg-[#e9d5c3]', 'bg-[#cfd8e3]', 'bg-[#d9d4c7]'][i])} />
              <span className="mt-1.5 text-[11px] font-medium">{p}</span>
              <span className="font-mono text-[10px] text-muted">₹{[1299, 2499, 3999][i]}</span>
            </div>
          ))}
          <span className="absolute right-4 top-3 flex items-center gap-1 bg-cobalt px-2 py-1 font-mono text-[10px] text-white">
            Cart · 3
          </span>
        </div>
      )
    case 'ui-ux-design':
      return (
        <div className="absolute inset-0 p-5">
          <div className="grid h-full grid-cols-3 grid-rows-3 gap-2">
            <span className="col-span-3 border-2 border-dashed border-ink/25" />
            <span className="row-span-2 border-2 border-dashed border-ink/25" />
            <span className="col-span-2 row-span-2 grid place-items-center border-2 border-cobalt bg-cobalt/5">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-cobalt">Component · 8px grid</span>
            </span>
          </div>
        </div>
      )
    case 'cloud-devops':
      return (
        <div className="absolute inset-0 flex flex-col justify-center gap-4 bg-ink px-6 text-paper">
          <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.08em]">
            {['Build', 'Test', 'Deploy'].map((t, i) => (
              <span key={t} className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 border border-paper/20 px-2 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal" /> {t}
                </span>
                {i < 2 ? <span className="text-paper/40">→</span> : null}
              </span>
            ))}
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-paper/50">Uptime · 30 days</p>
            <div className="mt-1.5 flex gap-[2px]">
              {Array.from({ length: 30 }).map((_, i) => (
                <span key={i} className={cn('h-5 flex-1', i === 17 ? 'bg-[#f59e0b]' : 'bg-signal')} />
              ))}
            </div>
          </div>
        </div>
      )
    default:
      return null
  }
}
