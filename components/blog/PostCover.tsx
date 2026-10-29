import CoverArt, { isDevice } from './CoverArt'
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
  // Device mockups take the right side, so the headline stacks on the left instead of spreading across.
  const device = post.art ? isDevice(post.art) : false
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
          {device ? null : <span>Trident Square · Blog</span>}
        </div>
        <div
          className={cn(
            'relative z-10 flex flex-col gap-4',
            device ? (size === 'card' ? 'max-w-[58%]' : 'sm:max-w-[58%]') : size !== 'card' && 'sm:flex-row sm:items-end sm:justify-between sm:gap-10'
          )}
        >
          <p
            className={cn(
              'display whitespace-nowrap transition-transform duration-700 ease-[cubic-bezier(.2,.75,.15,1)] group-hover:-translate-y-1',
              size === 'card' && 'text-[clamp(3rem,5.5vw,4.25rem)]',
              size === 'feature' && 'text-[clamp(4.5rem,10vw,8.5rem)]',
              size === 'hero' && 'text-[clamp(5rem,15vw,13rem)]'
            )}
          >
            {post.coverWord}
          </p>
          <p
            className={cn(
              'font-medium leading-snug tracking-[-0.01em] opacity-90',
              size === 'card' && 'max-w-[26ch] text-[14px]',
              size === 'feature' && 'max-w-[22ch] text-[clamp(1rem,1.6vw,1.35rem)]',
              size === 'hero' && 'max-w-[24ch] text-[clamp(1.1rem,2vw,1.75rem)]',
              size !== 'card' && !device && 'sm:border-l sm:border-current/30',
              size === 'feature' && !device && 'sm:pb-3 sm:pl-5',
              size === 'hero' && !device && 'sm:pb-5 sm:pl-6'
            )}
          >
            {post.coverLine}
          </p>
        </div>
      </div>

      {post.art && !device ? (
        <div
          className={cn(
            'absolute',
            size === 'card' && 'right-5 top-11 w-[40%]',
            size === 'feature' && 'right-8 top-[22%] hidden w-[42%] sm:block lg:right-10',
            size === 'hero' && 'right-[6%] top-[15%] hidden w-[34%] sm:block'
          )}
        >
          <CoverArt art={post.art} size={size} />
        </div>
      ) : null}
      {post.art && device ? (
        <div
          className={cn(
            'absolute transition-transform duration-700 ease-[cubic-bezier(.2,.75,.15,1)] group-hover:-translate-y-2',
            post.art === 'chatbot' ? 'w-[42%]' : 'w-[32%]',
            size === 'card' && 'right-[5%] top-[16%]',
            size === 'feature' && 'right-[7%] top-[13%]',
            size === 'hero' && cn('right-[7%] top-[11%] hidden sm:block', post.art === 'chatbot' ? 'w-[36%]' : 'w-[24%]')
          )}
        >
          <CoverArt art={post.art} size={size} />
        </div>
      ) : null}

      {/* crop marks */}
      {['left-3 top-3 border-l border-t', 'right-3 top-3 border-r border-t', 'bottom-3 left-3 border-b border-l', 'bottom-3 right-3 border-b border-r'].map((c) => (
        <span key={c} className={cn('absolute h-3 w-3 border-current opacity-50', c)} />
      ))}
    </div>
  )
}
