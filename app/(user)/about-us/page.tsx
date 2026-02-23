import AboutHero from "@/components/user/about/AboutHero";
import AboutTeam from "@/components/user/about/AboutTeam";
import BrandValues from "@/components/user/about/BrandValues";
import BusinessVerticals from "@/components/user/about/BusinessVerticals";
import SaudiExpansion from "@/components/user/about/SaudiExpansion";
import Testimonials from "@/components/user/about/Testimonials";

export default function AboutPage() {
  return (
    <>
    
      <AboutHero />
       <AboutTeam />
      <SaudiExpansion />
      <BusinessVerticals />
      <BrandValues />
      <Testimonials />
    </>
  );
}