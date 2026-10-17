import Link from 'next/link'
import Arrow from './Arrow'
import { whatsappHref } from '@/lib/site'

export default function CtaBand({
  title = 'Have a workflow AI should be doing?',
  text = 'Tell us what eats your team’s time. You’ll get a straight answer on what’s possible, what it costs and how long it takes — usually within one business day.',
}: {
  title?: string
  text?: string
}) {
  return (
    <section className="bg-ink text-paper grain">
      <div className="container relative z-[1] py-24 sm:py-32">
        <p className="eyebrow text-paper/55">Start a project</p>
        <h2 className="display mt-6 max-w-[14ch] text-[clamp(3rem,9vw,8.5rem)]">
          {title}
        </h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <p className="max-w-xl text-lg leading-relaxed text-paper/65 lg:col-span-6">{text}</p>
          <div className="flex flex-wrap items-start gap-3 lg:col-span-6 lg:justify-end">
            <Link href="/contact" className="btn-cobalt">
              Book a free consultation <Arrow />
            </Link>
            <a
              href={whatsappHref('Hi Trident Square, I’d like to discuss a project.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-paper/25 text-paper hover:bg-paper hover:text-ink"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
