import SiteCanvas from '@/components/layout/SiteCanvas'
import Services from '@/components/home/Services'

export default function ServicesPage() {
  return (
    <SiteCanvas>
      <div className="relative z-[1] min-w-0 pt-[max(6rem,calc(4rem+env(safe-area-inset-top,0px)+1rem))] sm:pt-20 lg:pt-24">
        <Services />
      </div>
    </SiteCanvas>
  )
}
