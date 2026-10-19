import { NextResponse } from 'next/server'
import { appendFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

/**
 * Receives project enquiries and partner applications.
 *
 * Delivery (any that are configured run in parallel):
 *  - LEAD_WEBHOOK_URL  → JSON POST. Recommended: the Google Apps Script in docs/google-sheet-leads.gs,
 *    which appends a row to a Google Sheet and emails you the lead (free). Also works with
 *    Slack/Discord webhooks, Zapier, Make or n8n. LEAD_WEBHOOK_SECRET is sent as `token`.
 *  - RESEND_API_KEY + LEAD_TO_EMAIL (+ LEAD_FROM_EMAIL) → email via Resend
 * With neither set (local dev) leads are appended to .data/leads.jsonl.
 */

const MAX = 4000
const FIELDS = ['kind', 'page', 'name', 'email', 'phone', 'company', 'service', 'budget', 'partner_type', 'location', 'message'] as const

type Lead = Partial<Record<(typeof FIELDS)[number], string>>

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  // Honeypot filled → pretend success so bots don't retry.
  if (typeof body.company_website === 'string' && body.company_website.trim()) {
    return NextResponse.json({ ok: true })
  }

  const lead: Lead = {}
  for (const f of FIELDS) {
    const v = body[f]
    if (typeof v === 'string' && v.trim()) lead[f] = v.trim().slice(0, MAX)
  }
  lead.kind = lead.kind === 'partner' ? 'partner' : 'project'

  if (!lead.name || !lead.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return NextResponse.json({ ok: false, error: 'Name and a valid email are required' }, { status: 422 })
  }

  const record = { ...lead, receivedAt: new Date().toISOString(), userAgent: req.headers.get('user-agent') ?? '' }
  const subject = `${lead.kind === 'partner' ? '🤝 Partner application' : '🚀 New project enquiry'} — ${lead.name}${lead.company ? ` (${lead.company})` : ''}`
  const text = [subject, '', ...Object.entries(lead).map(([k, v]) => `${k}: ${v}`)].join('\n')

  const jobs: Promise<unknown>[] = []
  const webhook = process.env.LEAD_WEBHOOK_URL
  const resendKey = process.env.RESEND_API_KEY
  const to = process.env.LEAD_TO_EMAIL

  if (webhook) {
    jobs.push(
      fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // `text` makes Slack/Discord-style webhooks render a readable message; the rest is for automations.
        body: JSON.stringify({ text, content: text, ...record, token: process.env.LEAD_WEBHOOK_SECRET ?? '' }),
        redirect: 'follow', // Apps Script answers with a redirect to the result
      }).then(async (r) => {
        if (!r.ok) throw new Error(`webhook ${r.status}`)
        // Apps Script always answers 200, so failures come back as { ok: false } in the body.
        if ((r.headers.get('content-type') ?? '').includes('json')) {
          const body = (await r.json().catch(() => null)) as { ok?: boolean; error?: string } | null
          if (body && body.ok === false) throw new Error(`webhook: ${body.error ?? 'rejected'}`)
        }
      })
    )
  }
  if (resendKey && to) {
    jobs.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.LEAD_FROM_EMAIL ?? 'Trident Square Website <onboarding@resend.dev>',
          to: to.split(',').map((s) => s.trim()),
          reply_to: lead.email,
          subject,
          text,
        }),
      }).then((r) => {
        if (!r.ok) throw new Error(`resend ${r.status}`)
      })
    )
  }

  if (!jobs.length) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[lead] No LEAD_WEBHOOK_URL or RESEND_API_KEY configured — lead not delivered', record)
      return NextResponse.json({ ok: false, error: 'Lead delivery not configured' }, { status: 503 })
    }
    const dir = path.join(process.cwd(), '.data')
    await mkdir(dir, { recursive: true })
    await appendFile(path.join(dir, 'leads.jsonl'), JSON.stringify(record) + '\n')
    console.info('[lead] stored locally', record)
    return NextResponse.json({ ok: true })
  }

  const results = await Promise.allSettled(jobs)
  const delivered = results.some((r) => r.status === 'fulfilled')
  results.forEach((r) => r.status === 'rejected' && console.error('[lead] delivery failed', r.reason))
  return delivered
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ ok: false, error: 'Delivery failed' }, { status: 502 })
}
