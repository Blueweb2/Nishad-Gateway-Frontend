import type { CityBlogSection } from "@/lib/types/city-blog";
import HeroSection from "./HeroSection";

type Props = {
  sections: CityBlogSection[];
};

export default function CityBlogRenderer({ sections }: Props) {
  return (
    <>
      {sections
        .filter((s) => s.isActive)
        .sort((a, b) => a.order - b.order)
        .map((section, index) => {
          switch (section.type) {
            case "HERO":
              return (
                <HeroSection
                  key={`hero-${index}`}
                  content={section.content}
                />
              );

            // later:
            // case "INTRO":
            // case "FAQ":
            // case "CTA":

            default:
              return null;
          }
        })}
    </>
  );
}