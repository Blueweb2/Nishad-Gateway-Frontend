"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

// ✅ Sections
import HeroSection from "@/components/user/services/SubServiceTemplate/sections/HeroSection";
import WhySliderSection from "@/components/user/services/SubServiceTemplate/sections/WhySliderSection";
import EntityTableSection from "@/components/user/services/SubServiceTemplate/sections/EntityTableSection";
import EntityTypesSliderSection from "@/components/user/services/SubServiceTemplate/sections/EntityTypesSliderSection";
import OwnershipSliderSection from "@/components/user/services/SubServiceTemplate/sections/OwnershipSliderSection";
import EntityChooseSection from "@/components/user/services/SubServiceTemplate/sections/EntityChooseSection";
import DocumentsRequiredSection from "@/components/user/services/SubServiceTemplate/sections/DocumentsRequiredSection";
import LocationsSliderSection from "@/components/user/services/SubServiceTemplate/sections/LocationsSliderSection";

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
  title: string;
  subtitle: string;
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

type EntityTypeSlide = {
  title: string;
  image: string;
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

// Documents Required Types
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

type LocationSlide = {
  title: string;
  description: string;
  image: string;
  tag?: string;
  link?: string;
};

// ============================
// MAIN CONTENT TYPE
// ============================
export type SubServiceContent = {
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
  entityTableRows: EntityRow[];

  // ENTITY TYPES SLIDER
  entityTypesHeading: string;
  entityTypesDescription: string;
  entityTypesSlides: EntityTypeSlide[];

  // OWNERSHIP SLIDER
  ownershipHeading: string;
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

  // LOCATIONS SLIDER ✅
  locationsHeading: string;
  locationsSubheading: string;
  locationsSlides: LocationSlide[];

  // INTRO / EXTRA SECTIONS
  introHeading: string;
  introText: string;
  sections: Section[];

  // FAQ
  faqHeading?: string;
  faqs: FAQ[];
};

type Props = {
  content: SubServiceContent;
};

export default function SubServiceTemplate({ content }: Props) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="w-full bg-[#050505] text-white">
      {/* HERO */}
      <HeroSection
        heroTitle={content.heroTitle}
        heroSubtitle={content.heroSubtitle}
        heroDescription={content.heroDescription}
        heroButtonText={content.heroButtonText}
        heroButtonLink={content.heroButtonLink}
        heroImage={content.heroImage}
      />

      {/* WHY */}
      <WhySliderSection
        whyHeading={content.whyHeading}
        whySlides={content.whySlides}
        whyCtaText={content.whyCtaText}
        whyCtaLink={content.whyCtaLink}
      />

      {/* ENTITY TABLE */}
      <EntityTableSection
        entityTableHeading={content.entityTableHeading}
        entityTableRows={content.entityTableRows}
      />

      {/* ENTITY TYPES */}
      <EntityTypesSliderSection
        entityTypesHeading={content.entityTypesHeading}
        entityTypesDescription={content.entityTypesDescription}
        entityTypesSlides={content.entityTypesSlides}
      />

      {/* OWNERSHIP */}
      <OwnershipSliderSection
        ownershipHeading={content.ownershipHeading}
        ownershipSlides={content.ownershipSlides}
      />

      {/* ENTITY CHOOSE */}
      <EntityChooseSection
        entityChooseHeading={content.entityChooseHeading}
        entityChooseSubheading={content.entityChooseSubheading}
        entityChooseQuestions={content.entityChooseQuestions}
      />

      {/* DOCUMENTS REQUIRED */}
      <DocumentsRequiredSection
        documentsHeading={content.documentsHeading}
        documentsSubheading={content.documentsSubheading}
        documentEntityTabs={content.documentEntityTabs}
        documentGroups={content.documentGroups}
      />

      {/* LOCATIONS SLIDER */}
      <LocationsSliderSection
        locationsHeading={content.locationsHeading}
        locationsSubheading={content.locationsSubheading}
        locationsSlides={content.locationsSlides}
      />

      {/* FAQ */}
      <section className="w-full py-16 bg-white text-black">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            {content.faqHeading || "Frequently Asked Questions"}
          </h2>

          <div className="mt-10 border-t border-gray-200">
            {content.faqs?.length === 0 ? (
              <p className="text-gray-500 mt-6">No FAQs added yet.</p>
            ) : (
              content.faqs.map((faq, idx) => {
                const open = openFaqIndex === idx;

                return (
                  <div key={idx} className="border-b border-gray-200 py-6">
                    <button
                      onClick={() => setOpenFaqIndex(open ? null : idx)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <p
                        className={`text-lg font-medium ${
                          open ? "text-teal-700" : "text-gray-900"
                        }`}
                      >
                        {faq.q}
                      </p>

                      <span className="ml-4">
                        {open ? (
                          <Minus className="w-5 h-5 text-teal-700" />
                        ) : (
                          <Plus className="w-5 h-5 text-gray-500" />
                        )}
                      </span>
                    </button>

                    {open && (
                      <p className="mt-3 text-sm text-gray-600 leading-relaxed max-w-2xl">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
