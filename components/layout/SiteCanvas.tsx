'use client'

import HomeAmbient from '@/components/visual/HomeAmbient'

/** Same premium canvas as the homepage: mesh background + grain + animated orbs. */
export default function SiteCanvas({ children }: { children: React.ReactNode }) {
  return (
    <div className="home-flow-bg relative isolate w-full min-w-0 overflow-x-clip">
      <HomeAmbient />
      {children}
    </div>
  )
}
