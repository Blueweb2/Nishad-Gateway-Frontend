import dynamic from "next/dynamic";

import HeroSection from "@/components/user/home/HeroSection";
import Navbar from "@/components/user/shared/Navbar";
import PreloaderProvider from "@/components/user/shared/PreloaderProvider";

const WhySaudi = dynamic(() => import("@/components/user/home/WhySaudi"));
const BusinessGrowth = dynamic(() => import("@/components/user/home/BusinessGrowth"));
const CitiesSection = dynamic(() => import("@/components/user/home/cities/CitiesSection"));
const KeyServices = dynamic(() => import("@/components/user/home/KeyServices"));
const Consultant = dynamic(() => import("@/components/user/home/Consultant"));
const MinistriesSection = dynamic(() => import("@/components/user/home/MinistriesSection"));
const CaseStudies = dynamic(() => import("@/components/user/home/CaseStudies"));
const Insights = dynamic(() => import("@/components/user/home/Insights"));
const FinalCTA = dynamic(() => import("@/components/user/home/FinalCTA"));

export default function Page() {
  return (
    <main className="w-full">
      <Navbar />

      <PreloaderProvider>
        <HeroSection />
        <WhySaudi />
        <BusinessGrowth />
        <CitiesSection />
        <KeyServices />
        <Consultant />
        <MinistriesSection />
        <CaseStudies />
        <Insights />
        <FinalCTA />
      </PreloaderProvider>
    </main>
  );
}