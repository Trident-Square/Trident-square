import type { Faq } from '@/lib/services'
import { cn } from '@/lib/utils'

/** Native <details> accordion — works without JS and keeps answers in the HTML for crawlers. */
export default function FaqList({ faqs, dark }: { faqs: Faq[]; dark?: boolean }) {
  return (
    <div className={cn('border-t', dark ? 'border-paper/15' : 'border-line')}>
      {faqs.map((f) => (
        <details key={f.q} className={cn('group border-b', dark ? 'border-paper/15' : 'border-line')}>
          <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 text-left">
            <h3 className={cn('text-lg font-medium tracking-[-0.01em] sm:text-xl', dark && 'text-paper')}>{f.q}</h3>
            <span
              aria-hidden
              className={cn(
                'relative mt-1.5 h-4 w-4 shrink-0 transition-transform duration-300 group-open:rotate-45',
                'before:absolute before:left-0 before:top-1/2 before:h-px before:w-4 before:bg-current',
                'after:absolute after:left-1/2 after:top-0 after:h-4 after:w-px after:bg-current',
                dark ? 'text-paper' : 'text-ink'
              )}
            />
          </summary>
          <p className={cn('max-w-3xl pb-7 leading-relaxed', dark ? 'text-paper/65' : 'text-muted')}>{f.a}</p>
        </details>
      ))}
    </div>
  )
}
