import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" aria-label="Trident Square — home" className={cn('group inline-flex items-center gap-2.5', className)}>
      <Image src="/trident-remove-bg.png" alt="" width={28} height={30} priority className="h-[30px] w-auto" />
      <span className={cn('text-[17px] font-semibold tracking-[-0.03em]', inverted ? 'text-paper' : 'text-ink')}>
        Trident Square
      </span>
    </Link>
  )
}
