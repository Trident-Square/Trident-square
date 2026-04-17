import Hero from '@/components/home/Hero'
import SiteCanvas from '@/components/layout/SiteCanvas'
import WhyUs from '@/components/home/WhyUs'
import Services from '@/components/home/Services'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import CustomSolutionCTA from '@/components/home/CustomSolutionCTA'
import AnniversaryOffer from '@/components/home/AnniversaryOffer'

export default function Home() {
  return (
    <SiteCanvas>
      <Hero />
      <div className="relative z-[1]">
        <AnniversaryOffer />
        <WhyUs />
        <Services />
        <FeaturedProjects />
        <CustomSolutionCTA />
      </div>
    </SiteCanvas>
  )
}
