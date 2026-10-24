import { cn } from '@/lib/utils'

type Size = 'card' | 'feature' | 'hero'

/**
 * Topic illustration drawn in markup, coloured by the cover's currentColor:
 * a live-call waveform for voice posts.
 */
export default function CoverArt({ size }: { size: Size }) {
  return <Wave size={size} />
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
              // Cards only animate on hover; the article hero always moves.
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
