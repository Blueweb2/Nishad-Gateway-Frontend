import dynamic from "next/dynamic";

const PreloaderProvider = dynamic(() => import("@/components/user/shared/PreloaderProvider"));
const LazySection = dynamic(() => import("@/components/user/shared/LazySection"));
const Navbar = dynamic(() => import("@/components/user/shared/Navbar"));
const HeroSection = dynamic(() => import("@/components/user/home/HeroSection"));
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

      {/* Lazy loaded sections */}
      <PreloaderProvider>

        {/* Critical content */}
        <HeroSection />

        <LazySection>
          <WhySaudi />
        </LazySection>

        <LazySection>
          <BusinessGrowth />
        </LazySection>

        <LazySection>
          <CitiesSection />
        </LazySection>

        <LazySection>
          <KeyServices />
        </LazySection>

        <LazySection>
          <Consultant />
        </LazySection>

        <LazySection>
          <MinistriesSection />
        </LazySection>

        <LazySection>
          <CaseStudies />
        </LazySection>

        <LazySection>
          <Insights />
        </LazySection>

        <LazySection>
          <FinalCTA />
        </LazySection>
      </PreloaderProvider>
    </main>
  );
}