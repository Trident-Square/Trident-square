import Link from 'next/link'
import Arrow from '@/components/site/Arrow'
import Inline from './Inline'
import { slugify, type Block } from '@/lib/blog'
import { cn } from '@/lib/utils'

/** Renders a post's typed blocks with the article typography in globals.css (.article). */
export default function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="article">
      {blocks.map((b, i) => {
        switch (b.t) {
          case 'p':
            return <p key={i}><Inline text={b.text} /></p>
          case 'h2':
            return (
              <h2 key={i} id={slugify(b.text)} className="group scroll-mt-28">
                <a href={`#${slugify(b.text)}`} className="no-underline">
                  {b.text}
                  <span aria-hidden className="ml-2 text-cobalt opacity-0 transition-opacity group-hover:opacity-100">#</span>
                </a>
              </h2>
            )
          case 'h3':
            return <h3 key={i}>{b.text}</h3>
          case 'ul':
            return <ul key={i}>{b.items.map((it, j) => <li key={j}><Inline text={it} /></li>)}</ul>
          case 'ol':
            return <ol key={i}>{b.items.map((it, j) => <li key={j}><Inline text={it} /></li>)}</ol>
          case 'quote':
            return (
              <blockquote key={i}>
                <p><Inline text={b.text} /></p>
                {b.by ? <footer>— {b.by}</footer> : null}
              </blockquote>
            )
          case 'callout':
            return (
              <aside key={i} className={cn('not-article my-10 border-l-[3px] p-6 sm:p-7', b.tone === 'warn' ? 'border-[#d97706] bg-[#fdf6ea]' : 'border-cobalt bg-cobalt/[0.06]')}>
                <p className={cn('font-mono text-[11px] uppercase tracking-[0.14em]', b.tone === 'warn' ? 'text-[#b45309]' : 'text-cobalt')}>
                  {b.tone === 'warn' ? 'Watch out' : 'Tip'}
                </p>
                <p className="mt-2 text-[18px] font-semibold tracking-[-0.01em] text-ink">{b.title}</p>
                <p className="mt-2 text-[16px] leading-relaxed text-ink-2"><Inline text={b.text} /></p>
              </aside>
            )
          case 'table':
            return (
              <figure key={i} className="not-article my-10">
                <div className="overflow-x-auto border border-line bg-white">
                  <table className="w-full min-w-[540px] border-collapse text-left text-[15px]">
                    <thead>
                      <tr className="bg-ink text-paper">
                        {b.head.map((h, j) => (
                          <th key={j} scope="col" className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.1em]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.rows.map((r, j) => (
                        <tr key={j} className="border-t border-line">
                          {r.map((c, k) => (
                            <td key={k} className={cn('px-4 py-3.5 align-top leading-snug', k === 0 ? 'font-medium text-ink' : 'text-ink-2')}>
                              <Inline text={c} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {b.caption ? <figcaption className="mt-3 text-[13.5px] leading-relaxed text-muted">{b.caption}</figcaption> : null}
              </figure>
            )
          case 'stats':
            return (
              <dl key={i} className="not-article my-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
                {b.items.map((s) => (
                  <div key={s.l} className="bg-paper p-5 sm:p-6">
                    <dt className="sr-only">{s.l}</dt>
                    <dd>
                      <span className="display block text-[clamp(2.5rem,5vw,3.5rem)] text-cobalt">{s.v}</span>
                      <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{s.l}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            )
          case 'cta':
            return (
              <Link key={i} href={b.href} className="not-article group my-12 block bg-ink p-7 text-paper transition-colors hover:bg-cobalt sm:p-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/55 group-hover:text-white/70">Trident Square</p>
                <p className="display mt-3 text-[clamp(2rem,4vw,2.75rem)]">{b.title}</p>
                <p className="mt-3 max-w-lg text-[16px] leading-relaxed text-paper/70 group-hover:text-white/85">{b.text}</p>
                <span className="btn mt-6 bg-paper text-ink">
                  {b.label} <Arrow />
                </span>
              </Link>
            )
        }
      })}
    </div>
  )
}
