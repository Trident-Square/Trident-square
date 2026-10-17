import { ImageResponse } from 'next/og'

export const alt = 'Trident Square — AI agents and custom software, engineered in Noida'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F6F4EF',
          color: '#111110',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, fontWeight: 600, letterSpacing: -1 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: '#1E4BD8' }} />
          Trident Square
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 0.95, letterSpacing: -5 }}>AI agents & software</div>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 0.95, letterSpacing: -5, color: '#1E4BD8' }}>that actually ship.</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#605E58' }}>
          <span>AI agents · Voice AI · Chatbots · Custom software · Apps</span>
          <span>Noida, India</span>
        </div>
      </div>
    ),
    size
  )
}
