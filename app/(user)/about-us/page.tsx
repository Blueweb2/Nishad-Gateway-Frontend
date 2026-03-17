import dynamic from "next/dynamic";
import Loading from "./loading";

const AboutHero = dynamic(
  () => import("@/components/user/about/AboutHero"),
  { loading: () => <Loading /> }
);

const AboutTeam = dynamic(
  () => import("@/components/user/about/AboutTeam"),
  { loading: () => <Loading /> }
);

const BrandValues = dynamic(
  () => import("@/components/user/about/BrandValues"),
  { loading: () => <Loading /> }
);

const BusinessVerticals = dynamic(
  () => import("@/components/user/about/BusinessVerticals"),
  { loading: () => <Loading /> }
);

const SaudiExpansion = dynamic(
  () => import("@/components/user/about/SaudiExpansion"),
  { loading: () => <Loading /> }
);

const Testimonials = dynamic(
  () => import("@/components/user/about/Testimonials"),
  { loading: () => <Loading /> }
);

const IndroSection = dynamic(
  () => import("@/components/user/about/IndroSection"),
  { loading: () => <Loading /> }
);

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