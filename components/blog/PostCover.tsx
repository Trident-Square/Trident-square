import type { Post } from '@/lib/blog'
import { cn } from '@/lib/utils'

const tones = {
  cobalt: 'bg-cobalt text-white',
  ink: 'bg-ink text-paper',
  signal: 'bg-signal text-white',
} as const

/**
 * Generated cover art: blueprint grid, crop marks, category label and one huge word.
 * Keeps every post on-brand without needing a photo.
 */
export default function PostCover({ post, size = 'card', className }: { post: Post; size?: 'card' | 'feature' | 'hero'; className?: string }) {
  return (
    <div className={cn('relative isolate overflow-hidden', tones[post.tone], className)} aria-hidden>
      <div
        className="absolute inset-0 -z-10 opacity-[0.14]"
        style={{
          backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: size === 'card' ? '28px 28px' : '44px 44px',
        }}
      />
      <div className="absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full bg-white/15 blur-3xl transition-transform duration-700 group-hover:scale-125" />

      <div className={cn('flex h-full flex-col justify-between', size === 'card' ? 'p-5' : 'p-7 sm:p-10')}>
        <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.14em] opacity-75">
          <span>{post.category}</span>
          <span>Trident Square · Blog</span>
        </div>
        <p
          className={cn(
            'display whitespace-nowrap transition-transform duration-700 ease-[cubic-bezier(.2,.75,.15,1)] group-hover:-translate-y-1',
            size === 'card' && 'text-[clamp(4rem,9vw,6.5rem)]',
            size === 'feature' && 'text-[clamp(5rem,12vw,10rem)]',
            size === 'hero' && 'text-[clamp(6rem,19vw,17rem)]'
          )}
        >
          {post.coverWord}
        </p>
      </div>

      {/* crop marks */}
      {['left-3 top-3 border-l border-t', 'right-3 top-3 border-r border-t', 'bottom-3 left-3 border-b border-l', 'bottom-3 right-3 border-b border-r'].map((c) => (
        <span key={c} className={cn('absolute h-3 w-3 border-current opacity-50', c)} />
      ))}
    </div>
  )
}
