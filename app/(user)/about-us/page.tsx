import AboutHero from "@/components/user/about/AboutHero";
import AboutTeam from "@/components/user/about/AboutTeam";
import BrandValues from "@/components/user/about/BrandValues";
import BusinessVerticals from "@/components/user/about/BusinessVerticals";
import SaudiExpansion from "@/components/user/about/SaudiExpansion";
import Testimonials from "@/components/user/about/Testimonials";
import IndroSection from "@/components/user/about/IndroSection"

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <IndroSection />
      <AboutTeam />
      <SaudiExpansion />
      <BusinessVerticals />
      <BrandValues />
      <Testimonials />
    </>
  );
}