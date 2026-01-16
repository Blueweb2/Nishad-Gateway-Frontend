import BusinessGrowth from "@/components/user/home/BusinessGrowth";
import HeroSection from "@/components/user/home/HeroSection";
import WhySaudi from "@/components/user/home/WhySaudi";
import KeyServices from "@/components/user/home/KeyServices";
import Cities from "@/components/user/home/Cities";
import Consultant from "@/components/user/home/Consultant";
import Stats from "@/components/user/home/Stats";
import CaseStudies from "@/components/user/home/CaseStudies";
import FinalCTA from "@/components/user/home/FinalCTA";
import Insights from "@/components/user/home/Insights";
import PreloaderProvider from "@/components/user/shared/PreloaderProvider";

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
