"use client";

import { useState } from "react";

// ✅ Sections
import HeroSection from "@/components/user/services/SubServiceTemplate/sections/HeroSection";
import WhySliderSection from "@/components/user/services/SubServiceTemplate/sections/WhySliderSection";
import EntityTableSection from "@/components/user/services/SubServiceTemplate/sections/EntityTableSection";
import EntityTypesSliderSection from "@/components/user/services/SubServiceTemplate/sections/EntityTypesSliderSection";
import OwnershipSliderSection from "@/components/user/services/SubServiceTemplate/sections/OwnershipSliderSection";
import EntityChooseSection from "@/components/user/services/SubServiceTemplate/sections/EntityChooseSection";
import DocumentsRequiredSection from "@/components/user/services/SubServiceTemplate/sections/DocumentsRequiredSection";
import LocationsSliderSection from "@/components/user/services/SubServiceTemplate/sections/LocationsSliderSection";
import FaqSection from "./sections/FaqSection";

// ============================
// TYPES
// ============================
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
  title: string; // capsule title
  leftText?: string; // left side text
  rightText?: string; // right side text
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

type EntityChooseQuestion = {
  question: string;
  options: { label: string; value: string }[];
  selectedValue?: string;
};

type FAQ = {
  q: string;
  a: string;
};

// documents required types
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
  bestSuitedFor?: string;
  tag?: "ARTICLE" | "FEATURED" | "TRENDING";
};


// ============================
// MAIN CONTENT TYPE
// ============================
export type SubServiceContent = {
  // ✅ SECTION ORDER (ADMIN REPOSITION SUPPORT)
  sectionOrder?: string[];

  // HERO
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroButtonText: string;
  heroButtonLink: string;
  heroImage: string;

  // WHY SECTION
  whyHeading: string;
  whySlides: WhySlide[];
  whyCtaText: string;
  whyCtaLink: string;

  // ENTITY TABLE
  entityTableHeading: string;
  entityTableColumns?: EntityTableColumn[];
  entityTableRows: EntityRow[];

  // ENTITY TYPES SLIDER
  entityTypesHeading: string;
  entityTypesDescription: string;
  entityTypesSlides: EntityTypeSlide[];

  // OWNERSHIP SLIDER
  ownershipHeading: string;
  ownershipTabOneLabel?: string; // Foreign Ownership
  ownershipTabTwoLabel?: string; // Capital Reality
  ownershipSlides: OwnershipSlide[];

  // ENTITY CHOOSE
  entityChooseHeading: string;
  entityChooseSubheading: string;
  entityChooseQuestions: EntityChooseQuestion[];

  // DOCUMENTS REQUIRED
  documentsHeading: string;
  documentsSubheading: string;
  documentEntityTabs: DocumentTab[];
  documentGroups: DocumentGroup[];

  // LOCATIONS SLIDER
  locationsHeading: string;
  locationsSubheading: string;


  // INTRO / EXTRA SECTIONS
  introHeading: string;
  introText: string;
  sections: Section[];

  // FAQ
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

export default function SubServiceTemplate({
  content,
  cities,
}: Props) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  //  Helpers
  const hasText = (v?: string) => typeof v === "string" && v.trim().length > 0;
  const hasArray = (v?: any[]) => Array.isArray(v) && v.length > 0;

  //  Default order (if admin order not provided)
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

  //  Use admin order if exists
  let order =
    Array.isArray(content.sectionOrder) && content.sectionOrder.length > 0
      ? content.sectionOrder
      : defaultOrder;

  // Ensure locations always exists
  if (!order.includes("locations")) {
    order = [...order, "locations"];
  }



  console.log("Section order:", content.sectionOrder);

  console.log("Cities in template:", cities);

  console.log("TEMPLATE FAQ IMAGE:", content.faqImage);




  //  Render section by key
  const renderSection = (key: string) => {
    switch (key) {
      // ============================
      // HERO
      // ============================
      case "hero":
        return (
          (hasText(content.heroTitle) ||
            hasText(content.heroSubtitle) ||
            hasText(content.heroDescription) ||
            hasText(content.heroButtonText) ||
            hasText(content.heroButtonLink) ||
            hasText(content.heroImage)) && (
            <HeroSection
              heroTitle={content.heroTitle}
              heroSubtitle={content.heroSubtitle}
              heroDescription={content.heroDescription}
              heroButtonText={content.heroButtonText}
              heroButtonLink={content.heroButtonLink}
              heroImage={content.heroImage}
            />
          )
        );

      // ============================
      // WHY
      // ============================
      case "why":
        return (
          (hasText(content.whyHeading) || hasArray(content.whySlides)) && (
            <WhySliderSection
              whyHeading={content.whyHeading}
              whySlides={content.whySlides}
              whyCtaText={content.whyCtaText}
              whyCtaLink={content.whyCtaLink}
            />
          )
        );

      // ============================
      // ENTITY TABLE
      // ============================
      case "entityTable":
        return (
          hasArray(content.entityTableRows) && (
            <EntityTableSection
              entityTableHeading={content.entityTableHeading}
              entityTableColumns={content.entityTableColumns}
              entityTableRows={content.entityTableRows}
            />
          )
        );

      // ============================
      // ENTITY TYPES
      // ============================
      case "entityTypes":
        return (
          (hasText(content.entityTypesHeading) ||
            hasText(content.entityTypesDescription) ||
            hasArray(content.entityTypesSlides)) && (
            <EntityTypesSliderSection
              entityTypesHeading={content.entityTypesHeading}
              entityTypesDescription={content.entityTypesDescription}
              entityTypesSlides={content.entityTypesSlides}
            />
          )
        );

      // ============================
      // OWNERSHIP
      // ============================
      case "ownership":
        return (
          (hasText(content.ownershipHeading) ||
            hasArray(content.ownershipSlides)) && (
            <OwnershipSliderSection
              ownershipHeading={content.ownershipHeading}
              ownershipSlides={content.ownershipSlides}
              ownershipTabOneLabel={content.ownershipTabOneLabel}
              ownershipTabTwoLabel={content.ownershipTabTwoLabel}
            />

          )
        );

      // ============================
      // ENTITY CHOOSE
      // ============================
      case "entityChoose":
        return (
          (hasText(content.entityChooseHeading) ||
            hasText(content.entityChooseSubheading) ||
            hasArray(content.entityChooseQuestions)) && (
            <EntityChooseSection
              entityChooseHeading={content.entityChooseHeading}
              entityChooseSubheading={content.entityChooseSubheading}
              entityChooseQuestions={content.entityChooseQuestions}
            />
          )
        );

      // ============================
      // DOCUMENTS REQUIRED
      // ============================
      case "documents":
        return (
          (hasText(content.documentsHeading) ||
            hasText(content.documentsSubheading) ||
            hasArray(content.documentEntityTabs) ||
            hasArray(content.documentGroups)) && (
            <DocumentsRequiredSection
              documentsHeading={content.documentsHeading}
              documentsSubheading={content.documentsSubheading}
              documentEntityTabs={content.documentEntityTabs}
              documentGroups={content.documentGroups}
            />
          )
        );

      // ============================
      // LOCATIONS SLIDER
      // ============================

      case "locations":
        console.log("Rendering locations section", cities);
        console.log("Cities length:", cities.length);
        console.log("Type of cities:", typeof cities);
        console.log("Is array?", Array.isArray(cities));
        console.log("Actual cities:", cities);

        if (!Array.isArray(cities) || cities.length === 0) {
          return null;
        }

        return (
          <LocationsSliderSection
            locationsHeading={content.locationsHeading}
            locationsSubheading={content.locationsSubheading}
            cities={cities}
          />
        );





      // ============================
      // FAQ
      // ============================
 case "faq":
  return (
    <FaqSection
      faqHeading={content.faqHeading}
      faqs={content.faqs || []}
      faqImage={content.faqImage}
      faqCtaText={content.faqCtaText}
    />
  );


    }
  };

  return (
    <div className="w-full bg-[#050505] text-white">
      {order.map((key) => (
        <div key={key}>{renderSection(key)}</div>
      ))}
    </div>
  );
}
