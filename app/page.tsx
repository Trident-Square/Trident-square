import Hero from '@/components/home/Hero'
import SiteCanvas from '@/components/layout/SiteCanvas'
import WhyUs from '@/components/home/WhyUs'
import Services from '@/components/home/Services'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import CustomSolutionCTA from '@/components/home/CustomSolutionCTA'

export default function Home() {
  return (
    <SiteCanvas>
      <Hero />
      <div className="relative z-[1]">
        <WhyUs />
        <Services />
        <FeaturedProjects />
        <CustomSolutionCTA />
      </div>
    </SiteCanvas>
  )
}
