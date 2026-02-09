import type {
  CityBlogSection,
  CategoriesSectionContent,
  HeroSectionContent,
  VisionSectionContent,
  InvestmentHighlightsContent,
  BusinessSetupOptionsContent, // ✅ ADD THIS
} from "@/lib/types/city-blog";

import HeroSection from "./HeroSection";
import CategoriesSection from "./CategoriesSection";
import VisionSection from "./VisionSection";
import InvestmentHighlightsSection from "./InvestmentHighlightsSection";
import BusinessSetupOptionsSection from "./BusinessSetupOptionsSection";

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
        .map((section) => {
          switch (section.type) {

            case "HERO": {
              const content = section.content as HeroSectionContent;
              return (
                <HeroSection
                  key={section.id}
                  content={content}
                />
              );
            }

            case "CATEGORIES": {
              const content =
                section.content as CategoriesSectionContent;
              return (
                <CategoriesSection
                  key={section.id}
                  citySlug={citySlug}
                  heading={content.heading}
                  introText={content.introText}
                  categories={categories}
                />
              );
            }

            case "VISION": {
              const content =
                section.content as VisionSectionContent;
              return (
                <VisionSection
                  key={section.id}
                  heading={content.heading}
                  content={content.content}
                  imageUrl={content.imageUrl}
                />
              );
            }

            case "INVESTMENT_HIGHLIGHTS": {
              const content =
                section.content as InvestmentHighlightsContent;
              return (
                <InvestmentHighlightsSection
                  key={section.id}
                  heading={content.heading}
                  description={content.description}
                  highlights={content.highlights}
                />
              );
            }

            case "BUSINESS_SETUP_OPTIONS": {
              const content =
                section.content as BusinessSetupOptionsContent;

              return (
                <BusinessSetupOptionsSection
                  key={section.id}
                  {...content}
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
