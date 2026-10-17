import { cn } from '@/lib/utils'

/** Numbered section header: "02 / Selected work" over a large heading. */
export default function SectionHead({
  index,
  label,
  title,
  intro,
  className,
  dark,
  as: Tag = 'h2',
}: {
  index?: string
  label: string
  title: React.ReactNode
  intro?: React.ReactNode
  className?: string
  dark?: boolean
  as?: 'h1' | 'h2'
}) {
  return (
    <div className={cn('grid gap-6 lg:grid-cols-12 lg:gap-10', className)}>
      <p className={cn('eyebrow lg:col-span-3 lg:pt-3', dark && 'text-paper/55')}>
        {index ? <span className={dark ? 'text-cobalt-ink' : 'text-cobalt'}>{index} / </span> : null}
        {label}
      </p>
      <div className="lg:col-span-9">
        <Tag className={cn('h2 max-w-[18ch]', dark && 'text-paper')}>{title}</Tag>
        {intro ? <p className={cn('lede mt-5 max-w-2xl', dark && 'text-paper/65')}>{intro}</p> : null}
      </div>
    </div>
  )
}
