import { BrandStorySection } from "./brand-story-section"
import { CoffeeGuideSection } from "./coffee-guide-section"
import { FeaturedCoffeeSection } from "./featured-coffee-section"
import { HomeHero } from "./home-hero"

export const HomePage = () => (
  <>
    <HomeHero />
    <FeaturedCoffeeSection />
    <BrandStorySection />
    <CoffeeGuideSection />
  </>
)
