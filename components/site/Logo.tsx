import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

/** Mark + wordmark. "Trident" carries the weight, "Square" sits lighter beside it. */
export default function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" aria-label="Trident Square — home" className={cn('group inline-flex items-center gap-2.5 outline-offset-4', className)}>
      <Image
        src="/trident-remove-bg.png"
        alt=""
        width={30}
        height={32}
        priority
        className="h-8 w-auto transition-transform duration-500 ease-[cubic-bezier(.2,.75,.15,1)] group-hover:-rotate-6"
      />
      <span className={cn('text-[20px] leading-none tracking-[-0.035em]', inverted ? 'text-paper' : 'text-ink')}>
        <span className="font-bold">Trident</span>
        <span className="font-normal opacity-60"> Square</span>
      </span>
    </Link>
  )
}
