import { cn } from '@/lib/utils'

/** A small live window set inside a headline, the height of a capital letter. */
export default function InlineMedia({ video, poster, className, delay = 0 }: { video: string; poster: string; className?: string; delay?: number }) {
  return (
    <span
      aria-hidden
      className={cn('relative mx-[0.06em] hidden sm:inline-block h-[0.74em] w-[1.5em] translate-y-[-0.02em] overflow-hidden bg-ink align-baseline', 'animate-[inline-open_1.1s_cubic-bezier(.7,0,.15,1)_both]', className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      <video src={video} poster={poster} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
    </span>
  )
}
