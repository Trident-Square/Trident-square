import { FileText, MessageCircle, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Tiny live illustrations that sit inside the hero headline, one per thing we
 * build. Everything is sized in `em`, so they scale with the headline.
 */

function Frame({ className, delay = 0, children }: { className?: string; delay?: number; children: React.ReactNode }) {
  return (
    <span
      aria-hidden
      className={cn(
        'relative mx-[0.06em] inline-flex h-[0.74em] translate-y-[-0.02em] overflow-hidden align-baseline',
        'animate-[inline-open_1.1s_cubic-bezier(.7,0,.15,1)_both]',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </span>
  )
}

/** Order → invoice → WhatsApp, with a packet running along the line. */
export function AutomationGlyph({ className, delay }: { className?: string; delay?: number }) {
  const steps = [ShoppingCart, FileText, MessageCircle]
  return (
    <Frame delay={delay} className={cn('w-[1.95em] bg-cobalt', className)}>
      <span className="relative flex w-full items-center justify-between px-[0.14em]">
        <span className="absolute inset-x-[0.3em] top-1/2 h-[0.012em] min-h-px bg-white/45" />
        <span className="absolute inset-x-[0.3em] top-1/2">
          <span className="absolute top-0 block h-[0.07em] w-[0.07em] -translate-x-1/2 -translate-y-1/2 animate-flow rounded-full bg-white shadow-[0_0_0.12em_0.04em_rgba(255,255,255,0.8)]" />
        </span>
        {steps.map((Icon, i) => (
          <span key={i} className="relative grid h-[0.36em] w-[0.36em] place-items-center border-[0.012em] border-white/50 bg-cobalt text-white">
            <Icon className="h-[0.17em] w-[0.17em]" strokeWidth={2} />
          </span>
        ))}
      </span>
      <span className="absolute left-[0.1em] top-[0.07em] font-mono text-[0.075em] font-medium uppercase tracking-[0.1em] text-white/70">auto</span>
    </Frame>
  )
}

/** A voice agent speaking: live waveform. */
export function AiGlyph({ className, delay }: { className?: string; delay?: number }) {
  return (
    <Frame delay={delay} className={cn('w-[1.35em] items-center justify-center gap-[0.025em] bg-ink px-[0.1em]', className)}>
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="h-[0.38em] w-[0.035em] origin-center animate-wave bg-cobalt-ink"
          style={{ animationDelay: `${(i * 113) % 900}ms` }}
        />
      ))}
      <span className="absolute left-[0.1em] top-[0.07em] font-mono text-[0.075em] font-medium uppercase tracking-[0.1em] text-paper/60">ai · hi/en</span>
      <span className="absolute right-[0.1em] top-[0.09em] h-[0.06em] w-[0.06em] animate-pulse-dot rounded-full bg-signal" />
    </Frame>
  )
}

/** A software window with a chart that keeps growing. */
export function SoftwareGlyph({ className, delay }: { className?: string; delay?: number }) {
  const bars = [45, 70, 55, 85, 65, 100]
  return (
    <Frame delay={delay} className={cn('w-[1.25em] flex-col border-[0.02em] border-ink bg-white', className)}>
      <span className="flex h-[0.14em] shrink-0 items-center gap-[0.03em] border-b-[0.012em] border-ink/15 px-[0.06em]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-[0.04em] w-[0.04em] rounded-full bg-ink/25" />
        ))}
      </span>
      <span className="flex flex-1 items-end gap-[0.04em] px-[0.09em] pb-[0.08em] pt-[0.06em]">
        {bars.map((h, i) => (
          <span
            key={i}
            className={cn('flex-1 origin-bottom animate-grow', i === bars.length - 1 ? 'bg-cobalt' : 'bg-ink')}
            style={{ height: `${h}%`, animationDelay: `${i * 170}ms` }}
          />
        ))}
      </span>
    </Frame>
  )
}
