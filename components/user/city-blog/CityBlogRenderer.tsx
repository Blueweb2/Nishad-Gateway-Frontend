import type {
  CityBlogSection,
  CategoriesSectionContent,
  HeroSectionContent,
  VisionSectionContent
} from "@/lib/types/city-blog";

import HeroSection from "./HeroSection";
import CategoriesSection from "./CategoriesSection";
import VisionSection from "./VisionSection";

type Props = {
  citySlug: string;
  sections: CityBlogSection[];
  categories: {
    name: string;
    slug: string;
  }[];
};

export default function CityBlogRenderer({
  citySlug,
  sections,
  categories,
}: Props) {
  return (
    <>
      {sections
        .filter((s) => s.isActive)
        .sort((a, b) => a.order - b.order)
        .map((section, index) => {
          switch (section.type) {
            case "HERO": {
              const content = section.content as HeroSectionContent;
              return <HeroSection key={`hero-${index}`} content={content} />;
            }

            case "CATEGORIES": {
              const content = section.content as CategoriesSectionContent;
              return (
                <CategoriesSection
                  key={`categories-${index}`}
                  citySlug={citySlug}
                  heading={content.heading}
                  introText={content.introText}
                  categories={categories}
                />
              );
            }

            case "VISION": {
              const content = section.content as VisionSectionContent;
              return (
                <VisionSection
                  key={`vision-${index}`}
                  heading={content.heading}
                  content={content.content}
                  imageUrl={content.imageUrl}
                />
              );
            }

            default:
              return null;
          }

        })}
    </>
  );
}
