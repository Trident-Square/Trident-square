import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  async redirects() {
    // Keep link equity from the old URLs.
    return [
      { source: '/portfolio', destination: '/work', permanent: true },
      { source: '/services/web', destination: '/services/web-development', permanent: true },
      { source: '/services/app', destination: '/services/mobile-app-development', permanent: true },
      { source: '/services/ecommerce', destination: '/services/web-development', permanent: true },
      { source: '/services/design', destination: '/services/ui-ux-design', permanent: true },
      { source: '/partner', destination: '/partners', permanent: true },
      { source: '/affiliate', destination: '/partners', permanent: true },
      { source: '/refer', destination: '/partners', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ]
  },
}

export default nextConfig
