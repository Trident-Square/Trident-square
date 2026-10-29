import { cn } from '@/lib/utils'

type Size = 'card' | 'feature' | 'hero'
export type Art = 'wave' | 'whatsapp' | 'chatbot' | 'app'

/** Device mockups bleed off the bottom edge; the waveform floats. PostCover places them accordingly. */
export const isDevice = (art: Art) => art !== 'wave'

/**
 * Topic illustration drawn in markup, so covers stay sharp and need no photos:
 * a live-call waveform, a WhatsApp chat, a website chatbot or an app home screen.
 * Mockups are sized in em, so one font-size per cover size scales the whole thing.
 */
export default function CoverArt({ art, size }: { art: Art; size: Size }) {
  if (art === 'wave') return <Wave size={size} />
  const scale = size === 'card' ? 'text-[6px]' : size === 'feature' ? 'text-[8.5px]' : 'text-[11px]'
  // Messages pop in once everywhere; the typing dots only loop on hover in cards.
  const live = size === 'hero' ? '' : '[&_.animate-bounce]:[animation-play-state:paused] group-hover:[&_.animate-bounce]:[animation-play-state:running]'
  return (
    <div className={cn(scale, live)}>
      {art === 'whatsapp' ? <WhatsApp /> : art === 'chatbot' ? <Chatbot /> : <AppHome />}
    </div>
  )
}

const WAVE = [0.3, 0.55, 0.8, 0.45, 0.95, 0.6, 0.35, 0.7, 1, 0.65, 0.4, 0.85, 0.5, 0.3, 0.75, 0.95, 0.55, 0.4, 0.7, 0.9, 0.45, 0.3, 0.6, 0.85, 0.5, 0.35, 0.65, 0.4]

function Wave({ size }: { size: Size }) {
  const small = size === 'card'
  const bars = small ? WAVE.slice(0, 18) : WAVE
  return (
    <div>
      <p className={cn('flex items-center gap-2 font-mono uppercase tracking-[0.14em] opacity-85', small ? 'text-[9.5px]' : 'text-[11px]')}>
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#ef4444]" />
        Live call · 00:42
      </p>
      <div className={cn('mt-3 flex items-center gap-[3px]', small ? 'h-12' : size === 'feature' ? 'h-24 gap-1' : 'h-32 gap-[5px]')}>
        {bars.map((h, i) => (
          <span
            key={i}
            className={cn(
              'block h-full flex-1 origin-center rounded-full bg-current',
              size !== 'hero' && '[animation-play-state:paused] group-hover:[animation-play-state:running]'
            )}
            style={{ '--h': h, transform: `scaleY(${h})`, animation: `cover-wave 1.2s ease-in-out ${(i % 7) * 110}ms infinite` } as React.CSSProperties}
          />
        ))}
      </div>
      {!small ? (
        <p className={cn('mt-3 opacity-80', size === 'hero' ? 'text-[16px]' : 'text-[13px]')}>“Namaste! Your seat 14B is confirmed for tonight.”</p>
      ) : null}
    </div>
  )
}

/* ---------- shared bits ---------- */

function Phone({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-[3.4em] bg-[#0d0d0c] p-[0.7em] shadow-[0_3em_6em_-1.5em_rgba(0,0,0,0.55)] ring-1 ring-white/20', className)}>
      <div className="relative overflow-hidden rounded-[2.8em] bg-white text-[#111110]">
        <div className="absolute left-1/2 top-[0.8em] z-10 h-[1.6em] w-[6em] -translate-x-1/2 rounded-full bg-[#0d0d0c]" />
        {children}
      </div>
    </div>
  )
}

function StatusBar({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-between px-[2.2em] pb-[0.6em] pt-[1em] text-[1.15em] font-semibold', className)}>
      <span>9:41</span>
      <span className="flex items-center gap-[0.35em]">
        <span className="flex items-end gap-[0.12em]">
          {[0.4, 0.6, 0.8, 1].map((h) => (
            <span key={h} className="w-[0.22em] rounded-[0.1em] bg-current" style={{ height: `${h * 0.8}em` }} />
          ))}
        </span>
        <span className="h-[0.8em] w-[1.6em] rounded-[0.25em] border border-current p-[0.1em]">
          <span className="block h-full w-3/4 rounded-[0.12em] bg-current" />
        </span>
      </span>
    </div>
  )
}

function Typing({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-[0.3em] rounded-[1em] px-[1em] py-[0.8em]', className)}>
      {[0, 160, 320].map((d) => (
        <span key={d} className="h-[0.55em] w-[0.55em] animate-bounce rounded-full bg-current opacity-60" style={{ animationDelay: `${d}ms` }} />
      ))}
    </span>
  )
}

const Ticks = () => (
  <svg viewBox="0 0 16 11" className="inline h-[0.8em] w-[1.15em] fill-[#53bdeb]" aria-hidden>
    <path d="M11.07.66 5.4 7.6 2.84 5.2 1.8 6.3l3.7 3.5L12.2 1.6zM14.9.66 9.2 7.6l-.8-.75-1.05 1.1 1.95 1.85L16 1.6z" />
  </svg>
)

/* ---------- WhatsApp chat ---------- */

function WhatsApp() {
  return (
    <Phone className="rotate-[6deg]">
      <div className="bg-[#008069] text-white">
        <StatusBar />
        <div className="flex items-center gap-[0.8em] px-[1.4em] pb-[1em] pt-[0.4em]">
          <span className="text-[1.6em] leading-none">‹</span>
          <span className="grid h-[3em] w-[3em] place-items-center rounded-full bg-white/90 text-[1.1em] font-bold text-[#008069]">SE</span>
          <span className="min-w-0">
            <span className="flex items-center gap-[0.35em] text-[1.3em] font-semibold leading-tight">
              Sharma Electronics
              <span className="grid h-[0.95em] w-[0.95em] place-items-center rounded-full bg-[#25d366] text-[0.6em]">✓</span>
            </span>
            <span className="block text-[1em] opacity-80">typing…</span>
          </span>
        </div>
      </div>
      <div
        className="space-y-[0.8em] bg-[#efeae2] px-[1.2em] pb-[8em] pt-[1.2em] text-[1.2em] leading-snug"
        style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '1.2em 1.2em' }}
      >
        <p className="mx-auto w-fit rounded-[0.6em] bg-white/80 px-[0.8em] py-[0.2em] text-[0.8em] text-[#54656f]">TODAY</p>
        <Bubble side="in" time="10:41">Hi, is my order #2041 shipped?</Bubble>
        <div className="ml-auto w-[82%] animate-[cover-pop_.5s_ease-out_both] [animation-delay:.3s]">
          <Bubble side="out" time="10:41">
            Yes! Shipped via Delhivery today. Arriving <b>Thu, 31 Oct</b>.
          </Bubble>
          <p className="mt-[0.3em] rounded-[0.6em] bg-white py-[0.5em] text-center font-medium text-[#008069] shadow-sm">Track order</p>
        </div>
        <div className="animate-[cover-pop_.5s_ease-out_both] [animation-delay:.9s]">
          <Bubble side="in" time="10:42">Great, thank you!</Bubble>
        </div>
        <Typing className="bg-[#d9fdd3] text-[#008069]" />
      </div>
    </Phone>
  )
}

function Bubble({ side, time, children }: { side: 'in' | 'out'; time: string; children: React.ReactNode }) {
  return (
    <p
      className={cn(
        'w-fit max-w-[82%] rounded-[0.8em] px-[0.8em] py-[0.5em] shadow-[0_1px_0_rgba(0,0,0,0.08)]',
        side === 'in' ? 'rounded-tl-none bg-white' : 'ml-auto max-w-full rounded-tr-none bg-[#d9fdd3]'
      )}
    >
      {children}
      <span className="ml-[0.6em] inline-flex translate-y-[0.2em] items-center gap-[0.2em] whitespace-nowrap text-[0.72em] text-[#667781]">
        {time}
        {side === 'out' ? <Ticks /> : null}
      </span>
    </p>
  )
}

/* ---------- Website chatbot widget ---------- */

function Chatbot() {
  return (
    <div className="-rotate-[4deg] overflow-hidden rounded-[1.6em] bg-white text-[#111110] shadow-[0_3em_6em_-1.5em_rgba(0,0,0,0.5)] ring-1 ring-black/5">
      <div className="flex items-center gap-[0.9em] bg-[#111110] px-[1.6em] py-[1.3em] text-white">
        <span className="relative grid h-[3.2em] w-[3.2em] place-items-center rounded-full bg-gradient-to-br from-[#5b7cff] to-[#1f3fd1]">
          <svg viewBox="0 0 24 24" className="h-[1.7em] w-[1.7em] fill-white" aria-hidden>
            <path d="M12 2l1.8 5.6L19.5 9.5l-5.7 1.9L12 17l-1.8-5.6L4.5 9.5l5.7-1.9z" />
          </svg>
          <span className="absolute bottom-0 right-0 h-[0.9em] w-[0.9em] rounded-full bg-[#22c55e] ring-2 ring-[#111110]" />
        </span>
        <span>
          <span className="block text-[1.35em] font-semibold leading-tight">AI Assistant</span>
          <span className="block text-[1em] opacity-70">Online · replies instantly</span>
        </span>
        <span className="ml-auto text-[1.6em] opacity-60">×</span>
      </div>
      <div className="space-y-[0.9em] bg-[#f6f6f3] px-[1.4em] py-[1.4em] text-[1.2em] leading-snug">
        <p className="ml-auto w-fit max-w-[78%] rounded-[1em] rounded-br-[0.25em] bg-cobalt px-[1em] py-[0.6em] text-white">Do you deliver to Pune?</p>
        <div className="max-w-[86%] animate-[cover-pop_.5s_ease-out_both] [animation-delay:.3s]">
          <p className="rounded-[1em] rounded-bl-[0.25em] bg-white px-[1em] py-[0.6em] shadow-sm">
            Yes! Pune orders arrive in <b>2–3 days</b>, and shipping is free above ₹999.
          </p>
          <p className="mt-[0.4em] inline-flex items-center gap-[0.4em] rounded-full border border-black/10 bg-white px-[0.8em] py-[0.2em] text-[0.8em] text-[#54544f]">
            <span className="h-[0.8em] w-[0.65em] rounded-[0.1em] border border-current" />
            shipping-policy.pdf
          </p>
        </div>
        <div className="flex flex-wrap gap-[0.5em] text-[0.9em] animate-[cover-pop_.5s_ease-out_both] [animation-delay:.8s]">
          {['Track my order', 'Talk to a human'].map((s) => (
            <span key={s} className="rounded-full border border-cobalt/40 bg-white px-[0.9em] py-[0.35em] font-medium text-cobalt">
              {s}
            </span>
          ))}
        </div>
        <Typing className="bg-white text-cobalt shadow-sm" />
      </div>
      <div className="flex items-center gap-[0.8em] border-t border-black/5 px-[1.4em] py-[1em]">
        <span className="flex-1 text-[1.15em] text-[#9a9a94]">Type a message…</span>
        <span className="grid h-[2.6em] w-[2.6em] place-items-center rounded-full bg-cobalt text-[1.2em] text-white">↑</span>
      </div>
    </div>
  )
}

/* ---------- App home screen ---------- */

function AppHome() {
  const tiles = [
    { l: 'Book', c: 'bg-[#e8edff] text-cobalt' },
    { l: 'Orders', c: 'bg-[#e3f7ef] text-[#0f8a5f]' },
    { l: 'Offers', c: 'bg-[#fff1e0] text-[#c26a00]' },
    { l: 'Help', c: 'bg-[#f3e8ff] text-[#7c3aed]' },
  ]
  return (
    <Phone className="rotate-[6deg]">
      <StatusBar />
      <div className="px-[1.6em] pb-[8em] pt-[0.6em]">
        <p className="text-[1em] text-[#77776f]">Good morning</p>
        <p className="text-[2em] font-bold leading-tight tracking-[-0.02em]">Hi, Priya</p>
        <div className="mt-[1em] flex items-center gap-[0.6em] rounded-[1em] bg-[#f2f2ee] px-[1em] py-[0.8em] text-[1.1em] text-[#9a9a94]">
          <span className="h-[0.9em] w-[0.9em] rounded-full border-[0.15em] border-current" />
          Search services
        </div>
        <div className="mt-[1.2em] grid grid-cols-4 gap-[0.7em]">
          {tiles.map((t) => (
            <div key={t.l} className="text-center">
              <span className={cn('mx-auto grid aspect-square w-full place-items-center rounded-[1em]', t.c)}>
                <span className="h-[1.3em] w-[1.3em] rounded-[0.35em] bg-current opacity-80" />
              </span>
              <span className="mt-[0.3em] block text-[0.95em] font-medium">{t.l}</span>
            </div>
          ))}
        </div>
        <div className="mt-[1.3em] animate-[cover-pop_.5s_ease-out_both] rounded-[1.2em] bg-cobalt p-[1.2em] text-white [animation-delay:.3s]">
          <p className="text-[0.9em] uppercase tracking-[0.12em] opacity-75">Booking confirmed</p>
          <p className="mt-[0.2em] text-[1.4em] font-semibold leading-tight">AC service · Sat, 2 Nov</p>
          <p className="mt-[0.2em] text-[1em] opacity-80">10:00 – 11:00 AM · ₹499 paid</p>
          <span className="mt-[0.8em] inline-block rounded-full bg-white px-[1em] py-[0.35em] text-[1em] font-semibold text-cobalt">Track technician</span>
        </div>
        <div className="mt-[1em] flex items-center gap-[0.9em] rounded-[1.2em] border border-black/5 p-[1em] shadow-sm animate-[cover-pop_.5s_ease-out_both] [animation-delay:.7s]">
          <span className="grid h-[2.8em] w-[2.8em] place-items-center rounded-full bg-[#e3f7ef] text-[1.2em] text-[#0f8a5f]">★</span>
          <span className="flex-1">
            <span className="block text-[1.15em] font-semibold">Rate your last service</span>
            <span className="block text-[0.95em] text-[#77776f]">Deep cleaning · 28 Oct</span>
          </span>
        </div>
      </div>
    </Phone>
  )
}
