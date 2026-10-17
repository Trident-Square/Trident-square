import type { Metadata, Viewport } from 'next'
import { Archivo, JetBrains_Mono } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import JsonLd from '@/components/site/JsonLd'
import SmoothScroll from '@/components/site/SmoothScroll'
import WhatsAppFloat from '@/components/site/WhatsAppFloat'
import { organizationGraph } from '@/lib/seo'
import { site } from '@/lib/site'

// Archivo's width axis gives us both a condensed industrial display face and a normal-width text face from one file.
const sans = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-sans', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Trident Square — Automation, AI & Custom Software Development Company',
    template: '%s | Trident Square',
  },
  description:
    'Automation, AI and custom software development company in Noida, India. Business automation, AI agents, chatbots, web, e-commerce and mobile apps.',
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: 'technology',
  keywords: [
    'business automation company India',
    'AI agent development company',
    'workflow automation services',
    'AI development company India',
    'voice AI agent',
    'AI chatbot development',
    'custom software development company Noida',
    'software development company Noida',
    'mobile app development',
    'web development company',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: site.url,
    siteName: site.name,
    title: 'Trident Square — Automation, AI & custom software',
    description: site.description,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  icons: { icon: '/trident-remove-bg.png', apple: '/trident-remove-bg.png' },
  formatDetection: { telephone: true, email: true, address: true },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
}

export const viewport: Viewport = {
  themeColor: '#F6F4EF',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <JsonLd data={organizationGraph()} />
        <SmoothScroll />
        <Header />
        <main id="main" className="relative z-[1]">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <Analytics />
        <GoogleAnalytics gaId={site.gaId} />
      </body>
    </html>
  )
}
