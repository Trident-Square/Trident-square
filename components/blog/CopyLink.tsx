'use client'

import { useState } from 'react'

/** Copies the article URL; falls back silently where the clipboard is blocked. */
export default function CopyLink({ url }: { url: string }) {
  const [done, setDone] = useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(url).then(
          () => {
            setDone(true)
            setTimeout(() => setDone(false), 1800)
          },
          () => {}
        )
      }}
      className="border border-ink/15 px-3 py-1.5 text-[13px] transition-colors hover:border-ink hover:bg-ink hover:text-paper"
    >
      {done ? 'Copied ✓' : 'Copy link'}
    </button>
  )
}
