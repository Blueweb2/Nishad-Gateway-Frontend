import BusinessGrowth from "@/components/home/BusinessGrowth";
import HeroSection from "@/components/home/HeroSection";
import WhySaudi from "@/components/home/WhySaudi";
import KeyServices from "@/components/home/KeyServices";
import Cities from "@/components/home/Cities";
import Consultant from "@/components/home/Consultant";
import Stats from "@/components/home/Stats";
import CaseStudies from "@/components/home/CaseStudies";
import FinalCTA from "@/components/home/FinalCTA";
import Insights from "@/components/home/Insights";
import PreloaderProvider from "@/components/shared/PreloaderProvider";

export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden">
      <PreloaderProvider>
      <HeroSection />
      <WhySaudi />
      <BusinessGrowth />
      <KeyServices />
      <Cities />
      <Consultant />
      <Stats />
      <CaseStudies />
      <Insights />
      <FinalCTA />
      </PreloaderProvider>
    
    </main>
  );
}
