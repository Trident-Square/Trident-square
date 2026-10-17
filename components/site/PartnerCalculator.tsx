'use client'

import { useMemo, useState } from 'react'
import { partnerProgram as pp } from '@/lib/site'
import { cn } from '@/lib/utils'

const INR_PER_USD = 84

const presets = [
  { label: 'AI chatbot', inr: 300_000 },
  { label: 'Voice agent', inr: 600_000 },
  { label: 'Custom CRM', inr: 1_000_000 },
  { label: 'SaaS MVP', inr: 1_800_000 },
]

function formatInr(n: number) {
  if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(2).replace(/\.?0+$/, '')} Cr`
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(2).replace(/\.?0+$/, '')} L`
  return `₹${Math.round(n).toLocaleString('en-IN')}`
}

function formatUsd(n: number) {
  return `$${Math.round(n / INR_PER_USD).toLocaleString('en-US')}`
}

export default function PartnerCalculator() {
  const [value, setValue] = useState(1_000_000)
  const [deals, setDeals] = useState(3)

  const { rate, perDeal, total } = useMemo(() => {
    // Every deal over the threshold earns the boosted rate; below it, deals after the
    // first `boostAfterDeals` are boosted too.
    let total = 0
    for (let i = 1; i <= deals; i++) {
      const boosted = value >= pp.boostThresholdInr || i > pp.boostAfterDeals
      total += value * ((boosted ? pp.referral.boosted : pp.referral.base) / 100)
    }
    const rate = value >= pp.boostThresholdInr ? pp.referral.boosted : pp.referral.base
    return { rate, perDeal: value * (rate / 100), total }
  }, [value, deals])

  return (
    <div className="grid overflow-hidden border border-line bg-white lg:grid-cols-2">
      <div className="p-7 sm:p-10">
        <p className="eyebrow">Earnings calculator</p>

        <label htmlFor="deal-value" className="mt-8 flex items-baseline justify-between gap-4">
          <span className="text-[15px] font-medium">Project value</span>
          <span className="font-mono text-[15px] tabular-nums">
            {formatInr(value)} <span className="text-muted">· {formatUsd(value)}</span>
          </span>
        </label>
        <input
          id="deal-value"
          type="range"
          min={100_000}
          max={5_000_000}
          step={50_000}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="mt-4 w-full accent-[rgb(var(--cobalt))]"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => setValue(p.inr)}
              className={cn(
                'border px-3 py-1.5 text-[13px] transition-colors',
                value === p.inr ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink'
              )}
            >
              {p.label} · {formatInr(p.inr)}
            </button>
          ))}
        </div>

        <label htmlFor="deal-count" className="mt-10 flex items-baseline justify-between gap-4">
          <span className="text-[15px] font-medium">Deals you refer in a year</span>
          <span className="font-mono text-[15px] tabular-nums">{deals}</span>
        </label>
        <input
          id="deal-count"
          type="range"
          min={1}
          max={12}
          value={deals}
          onChange={(e) => setDeals(Number(e.target.value))}
          className="mt-4 w-full accent-[rgb(var(--cobalt))]"
        />
        <p className="mt-8 text-[13px] leading-relaxed text-muted">
          {pp.referral.base}% on every closed deal. {pp.referral.boosted}% on deals of {formatInr(pp.boostThresholdInr)}+ and on
          every deal after your first {pp.boostAfterDeals}. Commission is on the amount the client actually pays, excluding GST.
        </p>
      </div>

      <div className="relative flex flex-col justify-between gap-10 bg-ink p-7 text-paper sm:p-10 grain">
        <div className="relative z-[1]">
          <p className="eyebrow text-paper/55">You earn per deal</p>
          <p className="mt-3 text-[clamp(2.75rem,6vw,4.5rem)] display leading-none tabular-nums" aria-live="polite">
            {formatInr(perDeal)}
          </p>
          <p className="mt-2 font-mono text-[13px] text-paper/55">
            {rate}% · ≈ {formatUsd(perDeal)}
          </p>
        </div>
        <div className="relative z-[1] border-t border-paper/15 pt-8">
          <p className="eyebrow text-paper/55">Your year, at {deals} deal{deals > 1 ? 's' : ''}</p>
          <p className="mt-3 text-[clamp(2.25rem,5vw,3.5rem)] display leading-none text-cobalt-ink tabular-nums">
            {formatInr(total)}
          </p>
          <p className="mt-2 font-mono text-[13px] text-paper/55">≈ {formatUsd(total)} · paid within {pp.payoutDays} days of each client payment</p>
        </div>
      </div>
    </div>
  )
}
