'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * A real, clickable copy of a client's live site inside a browser or phone
 * frame. Nothing loads until the visitor presses play, so the case-study page
 * stays fast; the iframe is sandboxed so the client site can never navigate or
 * script our page.
 */
export default function LiveFrame({
  url,
  poster,
  label,
  defaultDevice = 'desktop',
  phoneOnly,
  caption,
}: {
  /** Small label shown at the left of the toolbar row */
  caption?: string
  url: string
  poster?: string
  label: string
  defaultDevice?: 'desktop' | 'phone'
  phoneOnly?: boolean
}) {
  const [on, setOn] = useState(false)
  const [device, setDevice] = useState<'desktop' | 'phone'>(phoneOnly ? 'phone' : defaultDevice)
  const host = new URL(url).host

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        {caption ? <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-cobalt">{caption}</p> : <span />}
        <div className="flex flex-wrap items-center gap-2">
        {!phoneOnly ? (
          <div role="group" aria-label="Preview size" className="flex border border-ink/15 p-1">
            {(['desktop', 'phone'] as const).map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={device === d}
                onClick={() => setDevice(d)}
                className={cn('px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors', device === d ? 'bg-ink text-paper' : 'text-ink/60 hover:text-ink')}
              >
                {d}
              </button>
            ))}
          </div>
        ) : null}
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn-ghost min-h-[40px] px-4 text-[13px]">
          Open live ↗
        </a>
        </div>
      </div>

      <div
        className={cn(
          'mx-auto overflow-hidden bg-white shadow-[0_40px_80px_-40px_rgba(17,17,16,0.45)] transition-[max-width] duration-500',
          device === 'phone' ? 'max-w-[412px] rounded-[34px] border-[10px] border-ink' : 'max-w-none border border-ink/15'
        )}
      >
        {device === 'desktop' ? (
          <div className="flex items-center gap-3 border-b border-ink/10 px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden>
              {[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full bg-ink/15" />)}
            </span>
            <span className="flex-1 truncate bg-paper-2 px-3 py-1 font-mono text-[11.5px] text-muted">🔒 {host}</span>
          </div>
        ) : null}
        <div className={cn('relative bg-paper-2', device === 'phone' ? 'h-[720px] max-h-[80vh]' : 'aspect-[16/10]')}>
          {on ? (
            <iframe
              key={device}
              src={url}
              title={`${label} — live`}
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button type="button" onClick={() => setOn(true)} className="group absolute inset-0 block w-full" aria-label={`Load ${label} live here`}>
              {poster ? <Image src={poster} alt="" fill sizes="(min-width:1024px) 80vw, 100vw" className="object-cover object-top" /> : null}
              <span className="absolute inset-0 bg-ink/35 transition-colors group-hover:bg-ink/45" />
              <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap bg-paper px-5 py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-ink shadow-lg transition-transform group-hover:scale-105">
                ▶ Open it live here
              </span>
            </button>
          )}
        </div>
      </div>
      <p className="mt-3 text-center font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
        {host} · loads when you press play
      </p>
    </div>
  )
}
