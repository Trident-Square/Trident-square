import { ImageResponse } from 'next/og'
import { getPost, posts, readingMinutes } from '@/lib/blog'

export const alt = 'Trident Square blog'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

const bg = { cobalt: '#1E4BD8', ink: '#111110', signal: '#12A096' } as const

/** Share card per post: tone colour, category, title and the cover word. */
export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug)
  const tone = p ? bg[p.tone] : bg.ink
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: tone,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          color: '#F6F4EF',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 26 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontWeight: 600 }}>
            <div style={{ width: 16, height: 16, borderRadius: 8, background: '#F6F4EF' }} />
            Trident Square · Blog
          </div>
          <div style={{ display: 'flex', opacity: 0.75 }}>{p ? `${p.category} · ${readingMinutes(p)} min read` : ''}</div>
        </div>
        <div style={{ display: 'flex', fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>{p?.title ?? 'Trident Square'}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 24, opacity: 0.8 }}>
          <span>tridentsquare.com/blog</span>
          {/* The bundled OG font has no ₹ glyph, so non-ASCII cover words are left out. */}
          <span style={{ fontSize: 120, fontWeight: 800, lineHeight: 0.8, opacity: 0.35 }}>{p && /^[\x20-\x7E]+$/.test(p.coverWord) ? p.coverWord : ''}</span>
        </div>
      </div>
    ),
    size
  )
}
