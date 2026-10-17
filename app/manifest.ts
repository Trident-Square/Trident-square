import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#F6F4EF',
    theme_color: '#111110',
    icons: [{ src: '/trident-remove-bg.png', sizes: '480x519', type: 'image/png' }],
  }
}
