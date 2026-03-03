"use client";

import { useState } from "react";

// Sections
import HeroSection from "@/components/user/services/SubServiceTemplate/sections/HeroSection";
import WhySliderSection from "@/components/user/services/SubServiceTemplate/sections/WhySliderSection";
import EntityTableSection from "@/components/user/services/SubServiceTemplate/sections/EntityTableSection";
import EntityTypesSliderSection from "@/components/user/services/SubServiceTemplate/sections/EntityTypesSliderSection";
import OwnershipSliderSection from "@/components/user/services/SubServiceTemplate/sections/OwnershipSliderSection";
import EntityChooseSection from "@/components/user/services/SubServiceTemplate/sections/EntityChooseSection";
import DocumentsRequiredSection from "@/components/user/services/SubServiceTemplate/sections/DocumentsRequiredSection";
import LocationsSliderSection from "@/components/user/ui/LocationsSliderSection";
import FaqSection from "./sections/FaqSection";
import { EntityChooseQuestion } from "@/lib/types/entityChoose.types";


/* ============================
   TYPES
============================ */

type Section = {
  heading: string;
  text: string;
  image?: string;
};

type WhySlide = {
  title: string;
  description: string;
  image: string;
};

type OwnershipSlide = {
  title: string;
  leftText?: string;
  rightText?: string;
  image: string;
};

type EntityRow = {
  entityType: string;
  ownership: string;
  bestFor: string;
  capital: string;
  regulatoryBody: string;
  timeToSetup: string;
  icon?: string;
};

type EntityTableColumn = {
  key: string;
  label: string;
};

type EntityTypeSlide = {
  title: string;
  mainImage: string;
  subImage: string;
  description?: string;
};



type FAQ = {
  q: string;
  a: string;
};

type DocumentTab = {
  label: string;
  value: string;
};

type DocumentCard = {
  title: string;
  items: string[];
  icon?: string;
};

type DocumentGroup = {
  entityValue: string;
  cards: DocumentCard[];
};

type City = {
  _id: string;
  cityName: string;
  citySlug: string;
  cityImage?: string;
  description?: string;
  tag?: "ARTICLE" | "FEATURED" | "TRENDING";
};

/* ============================
   MAIN CONTENT TYPE
============================ */

export type SubServiceContent = {
  sectionOrder?: string[];

  // HERO
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroButtonText: string;
  heroButtonLink: string;
  heroImage: string;

  // WHY
  whyHeading: string;
  whySlides: WhySlide[];
  whyCtaText: string;
  whyCtaLink: string;

  // ENTITY TABLE (Dynamic columns supported)
  entityTableHeading: string;
  entityTableColumns?: EntityTableColumn[];
  entityTableRows: EntityRow[];

  // ENTITY TYPES
  entityTypesHeading: string;
  entityTypesDescription: string;
  entityTypesSlides: EntityTypeSlide[];

  // OWNERSHIP
  ownershipHeading: string;
  ownershipTabOneLabel?: string;
  ownershipTabTwoLabel?: string;
  ownershipSlides: OwnershipSlide[];

  // ENTITY CHOOSE
  entityChooseHeading: string;
  entityChooseSubheading: string;
  entityChooseQuestions: EntityChooseQuestion[];

  // DOCUMENTS
  documentsHeading: string;
  documentsSubheading: string;
  documentEntityTabs: DocumentTab[];
  documentGroups: DocumentGroup[];

  // LOCATIONS
  locationsHeading: string;
  locationsSubheading: string;

  // EXTRA
  introHeading: string;
  introText: string;
  sections: Section[];

  // FAQ
  faqHeading?: string;
  faqs: FAQ[];
  faqImage?: string;
  faqCtaText?: string;
};

type Props = {
  content: SubServiceContent;
  cities: City[];
};

export default function SubServiceTemplate({ content, cities }: Props) {
  const [openFaqIndex] = useState<number | null>(0);

  /* ============================
     HELPERS
  ============================ */

  const hasText = (v?: string) =>
    typeof v === "string" && v.trim().length > 0;

  const hasArray = (v?: any[]) =>
    Array.isArray(v) && v.length > 0;

  /* ============================
     SECTION ORDER
  ============================ */

  const defaultOrder = [
    "hero",
    "why",
    "entityTable",
    "entityTypes",
    "ownership",
    "entityChoose",
    "documents",
    "locations",
    "faq",
  ];

  let order =
    Array.isArray(content.sectionOrder) &&
    content.sectionOrder.length > 0
      ? content.sectionOrder
      : defaultOrder;

  if (!order.includes("locations")) {
    order = [...order, "locations"];
  }

  /* ============================
     RENDER SECTION
  ============================ */

  const renderSection = (key: string) => {
    switch (key) {
      case "hero":
        if (
          hasText(content.heroTitle) ||
          hasText(content.heroSubtitle) ||
          hasText(content.heroDescription)
        ) {
          return <HeroSection {...content} />;
        }
        return null;

      case "why":
        if (hasText(content.whyHeading) || hasArray(content.whySlides)) {
          return (
            <WhySliderSection
              whyHeading={content.whyHeading}
              whySlides={content.whySlides}
              whyCtaText={content.whyCtaText}
              whyCtaLink={content.whyCtaLink}
            />
          );
        }
        return null;

      case "entityTable":
        if (hasArray(content.entityTableRows)) {
          return (
            <EntityTableSection
              entityTableHeading={content.entityTableHeading}
              entityTableColumns={content.entityTableColumns}
              entityTableRows={content.entityTableRows}
            />
          );
        }
        return null;

      case "entityTypes":
        if (
          hasText(content.entityTypesHeading) ||
          hasArray(content.entityTypesSlides)
        ) {
          return (
            <EntityTypesSliderSection
              entityTypesHeading={content.entityTypesHeading}
              entityTypesDescription={content.entityTypesDescription}
              entityTypesSlides={content.entityTypesSlides}
            />
          );
        }
        return null;

      case "ownership":
        if (hasArray(content.ownershipSlides)) {
          return (
            <OwnershipSliderSection
              ownershipHeading={content.ownershipHeading}
              ownershipSlides={content.ownershipSlides}
              ownershipTabOneLabel={content.ownershipTabOneLabel}
              ownershipTabTwoLabel={content.ownershipTabTwoLabel}
            />
          );
        }
        return null;

      case "entityChoose":
        if (hasArray(content.entityChooseQuestions)) {
          return (
            <EntityChooseSection
              entityChooseHeading={content.entityChooseHeading}
              entityChooseSubheading={content.entityChooseSubheading}
              entityChooseQuestions={content.entityChooseQuestions}
            />
          );
        }
        return null;

      case "documents":
        if (hasArray(content.documentGroups)) {
          return (
            <DocumentsRequiredSection
              documentsHeading={content.documentsHeading}
              documentsSubheading={content.documentsSubheading}
              documentEntityTabs={content.documentEntityTabs}
              documentGroups={content.documentGroups}
            />
          );
        }
        return null;

      case "locations":
        if (!Array.isArray(cities) || cities.length === 0) return null;
        return (
          <LocationsSliderSection
            locationsHeading={content.locationsHeading}
            locationsSubheading={content.locationsSubheading}
            cities={cities}
          />
        );

      case "faq":
        return (
          <FaqSection
            faqHeading={content.faqHeading}
            faqs={content.faqs || []}
            faqImage={content.faqImage}
            faqCtaText={content.faqCtaText}
          />
        );

      default:
        return null;
    }
  };

  /* ============================
     RETURN
  ============================ */

  return (
    <div className="w-full bg-[#050505] text-white">
      {order.map((key) => (
        <div key={key}>{renderSection(key)}</div>
      ))}
    </div>
  );
}
