import Image from 'next/image'
import Link from 'next/link'
import Arrow from './Arrow'
import { getProject } from '@/lib/work'
import { cn } from '@/lib/utils'

/**
 * "What we build" as pictures, not paragraphs. Each tile carries a tiny live
 * illustration of the thing itself so a skimming visitor gets it in a glance.
 */
export default function BuildBento() {
  const gigtap = getProject('gigtap')!
  const trendify = getProject('trendify')!

  return (
    <div className="grid auto-rows-[minmax(300px,auto)] gap-3 md:grid-cols-3 md:gap-4">
      <Tile href="/services/voice-ai-agents" n="01" title="Voice AI agents" hook="Calls customers, takes calls, books and confirms — in Hindi & English." className="md:col-span-2" dark>
        <VoiceViz />
      </Tile>
      <Tile href="/services/ai-chatbot-development" n="02" title="Chatbots" hook="Website & WhatsApp bots trained on your business.">
        <ChatViz />
      </Tile>
      <Tile href="/services/custom-software-development" n="03" title="Custom software" hook="CRMs, ERPs, portals, SaaS — built around how you work.">
        <DashViz />
      </Tile>
      <Tile href="/services/business-process-automation" n="04" title="AI agents & automation" hook="Orders, invoices, leads and reports that move on their own." className="md:col-span-2" accent>
        <FlowViz />
      </Tile>
      <Tile href="/services/web-development" n="05" title="Websites & e-commerce" hook="Fast, SEO-ready sites and stores that sell." className="md:col-span-2">
        <div className="relative mx-5 mt-2 overflow-hidden border border-ink/15 bg-white shadow-[0_30px_60px_-30px_rgba(17,17,16,0.4)] transition-transform duration-700 group-hover:-translate-y-2">
          <div className="flex items-center gap-1.5 border-b border-ink/10 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-ink/15" />
            <span className="h-2 w-2 rounded-full bg-ink/15" />
            <span className="h-2 w-2 rounded-full bg-ink/15" />
            <span className="ml-3 h-4 flex-1 bg-paper-2 px-2 font-mono text-[9.5px] leading-4 text-muted">gigtap.in</span>
          </div>
          <div className="relative aspect-[16/7]">
            <video src={gigtap.loop} poster={gigtap.poster} autoPlay muted loop playsInline preload="none" className="absolute inset-0 h-full w-full object-cover object-top" />
          </div>
        </div>
      </Tile>
      <Tile href="/services/mobile-app-development" n="06" title="Mobile apps" hook="iOS & Android from one codebase.">
        <div className="flex justify-center pt-1">
          <div className="relative w-[46%] overflow-hidden rounded-[22px] border-[5px] border-ink bg-ink shadow-[0_30px_60px_-25px_rgba(17,17,16,0.5)] transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-[-3deg]">
            <div className="relative aspect-[9/17]">
              <Image src={trendify.poster!} alt="" fill sizes="200px" className="object-cover" />
              <video src={trendify.loop} autoPlay muted loop playsInline preload="none" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </Tile>
    </div>
  )
}

function Tile({
  href,
  n,
  title,
  hook,
  children,
  className,
  dark,
  accent,
}: {
  href: string
  n: string
  title: string
  hook: string
  children: React.ReactNode
  className?: string
  dark?: boolean
  accent?: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative flex flex-col overflow-hidden border transition-colors duration-300',
        dark ? 'border-ink bg-ink text-paper' : accent ? 'border-cobalt bg-cobalt text-white' : 'border-ink/15 bg-white hover:border-ink',
        className
      )}
    >
      <div className="relative z-[1] flex items-start justify-between gap-6 p-6 sm:p-7">
        <div>
          <span className={cn('font-mono text-[11px]', dark || accent ? 'text-white/50' : 'text-muted')}>{n}</span>
          <h3 className="display mt-2 text-[clamp(2rem,3.4vw,3rem)]">{title}</h3>
          <p className={cn('mt-2 max-w-sm text-[15px] leading-snug', dark || accent ? 'text-white/70' : 'text-muted')}>{hook}</p>
        </div>
        <span
          className={cn(
            'grid h-10 w-10 shrink-0 place-items-center border transition-all duration-300 group-hover:rotate-[-45deg]',
            dark || accent ? 'border-white/25 group-hover:bg-white group-hover:text-ink' : 'border-ink/15 group-hover:bg-ink group-hover:text-paper'
          )}
        >
          <Arrow />
        </span>
      </div>
      <div className="mt-auto pb-6">{children}</div>
    </Link>
  )
}

function VoiceViz() {
  return (
    <div className="flex flex-col gap-4 px-6 sm:px-7 md:flex-row md:items-end">
      <div className="flex h-20 flex-1 items-center gap-[3px]" aria-hidden>
        {Array.from({ length: 64 }).map((_, i) => (
          <span
            key={i}
            className="h-full flex-1 origin-center animate-wave bg-cobalt-ink"
            style={{ animationDelay: `${(i * 97) % 1000}ms`, opacity: 0.35 + ((i * 37) % 60) / 100 }}
          />
        ))}
      </div>
      <div className="w-full max-w-[280px] space-y-2 text-[13px]">
        <p className="border border-white/10 bg-white/[0.06] px-3 py-2">“Namaste! Kal 7 baje ki bus confirm hai?”</p>
        <p className="ml-auto w-fit bg-cobalt px-3 py-2 text-white">“Haan ji, confirm.”</p>
      </div>
    </div>
  )
}

function ChatViz() {
  return (
    <div className="space-y-2 px-6 text-[13px] sm:px-7">
      <p className="w-fit max-w-[85%] bg-paper-2 px-3 py-2">What’s the price for 500 units?</p>
      <p className="ml-auto w-fit max-w-[85%] bg-ink px-3 py-2 text-paper">₹42 each with free shipping. Want a quote on WhatsApp?</p>
      <p className="flex w-fit gap-1 bg-paper-2 px-3 py-3" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1.5 w-1.5 animate-typing rounded-full bg-ink/60" style={{ animationDelay: `${i * 160}ms` }} />
        ))}
      </p>
    </div>
  )
}

function DashViz() {
  const bars = [40, 62, 48, 75, 58, 88, 70, 95]
  return (
    <div className="px-6 sm:px-7">
      <div className="grid grid-cols-2 gap-2 text-[12px]">
        <div className="border border-ink/10 p-2.5">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted">Revenue</p>
          <p className="condensed text-xl font-bold">₹18.4L</p>
        </div>
        <div className="border border-ink/10 p-2.5">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted">Orders</p>
          <p className="condensed text-xl font-bold">1,284</p>
        </div>
      </div>
      <div className="mt-2 flex h-20 items-end gap-1.5 border border-ink/10 p-2.5" aria-hidden>
        {bars.map((h, i) => (
          <span key={i} className={cn('flex-1 origin-bottom animate-grow', i === bars.length - 1 ? 'bg-cobalt' : 'bg-ink/80')} style={{ height: `${h}%`, animationDelay: `${i * 180}ms` }} />
        ))}
      </div>
    </div>
  )
}

function FlowViz() {
  const steps = ['New order', 'Invoice', 'Tally', 'Shipping', 'WhatsApp']
  return (
    <div className="px-6 sm:px-7">
      <div className="relative flex items-center justify-between gap-2">
        <div aria-hidden className="absolute left-0 right-0 top-1/2 h-px bg-white/30" />
        <span aria-hidden className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 animate-flow rounded-full bg-white shadow-[0_0_14px_4px_rgba(255,255,255,0.6)]" />
        {steps.map((s, i) => (
          <span
            key={s}
            className={cn('relative whitespace-nowrap border border-white/30 bg-cobalt px-2.5 py-2 font-mono text-[10.5px] uppercase tracking-[0.08em] sm:px-3.5 sm:text-[11.5px]', i > 2 && 'hidden sm:inline')}
          >
            <span className="mr-1.5 text-white/50">{i + 1}</span>
            {s}
          </span>
        ))}
      </div>
      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-white/60">3.1 s · 0 manual steps · runs 24/7</p>
    </div>
  )
}
