import HeroSection from "@/src/components/client/ui/HeroSection";
import IntroSection from "@/src/components/server/IntroSection";
import FeaturedSection from "@/src/components/server/FeaturedSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <FeaturedSection />
    </>
  );
}
