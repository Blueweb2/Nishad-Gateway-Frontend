import type {
  CityBlogSection,
  CategoriesSectionContent,
  HeroSectionContent,
  VisionSectionContent,
  InvestmentHighlightsContent,
  BusinessSetupOptionsContent,
  InfrastructureSectionContent,
  LandmarksSectionContent,
  FoodGuideSectionContent,
  TransportationGuideSectionContent,
   ExpandableSnapshotSectionContent,
   FutureOutlookSectionContent,
} from "@/lib/types/city-blog";

import HeroSection from "./HeroSection";
import CategoriesSection from "./CategoriesSection";
import VisionSection from "./VisionSection";
import InvestmentHighlightsSection from "./InvestmentHighlightsSection";
import BusinessSetupOptionsSection from "./BusinessSetupOptionsSection";
import InfrastructureSection from "./InfrastructureSection";
import LandmarksSection from "./LandmarksSection";
import FoodGuideSection from "./FoodGuideSection";
import TransportationGuideSection from "./TransportationGuideSection";
import ExpandableSnapshotSection from "./ExpandableSnapshotSection";
import FutureOutlookSection from "./FutureOutlookSection";


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
                  {...content}
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

            case "INFRASTRUCTURE": {
              const content =
                section.content as InfrastructureSectionContent;

              return (
                <InfrastructureSection
                  key={section.id}
                  content={content}
                />
              );
            }

            case "LANDMARKS": {
              const content =
                section.content as LandmarksSectionContent;

              return (
                <LandmarksSection
                  key={section.id}
                  content={content}
                />
              );
            }

            // case "FOOD_GUIDE": {
            //   const content =
            //     section.content as FoodGuideSectionContent;

            //   return (
            //     <FoodGuideSection
            //       key={section.id}
            //       content={content}
            //     />
            //   );
            // }

            case "TRANSPORTATION_GUIDE": {
              const content =
                section.content as TransportationGuideSectionContent;

              return (
                <TransportationGuideSection
                  key={section.id}
                  content={content}   // ✅ FIXED
                />
              );
            }

            case "EXPANDABLE_SNAPSHOT": {
  const content =
    section.content as ExpandableSnapshotSectionContent;

  return (
    <ExpandableSnapshotSection
      key={section.id}
      heading={content.heading}
      cards={content.cards}
    />
  );
}


  case "FUTURE_OUTLOOK":
              return (
                <FutureOutlookSection
                  key={section.id}
                  content={section.content as FutureOutlookSectionContent}
                />
              );


            default:
              return null;
          }
        })}
    </>
  );
}
