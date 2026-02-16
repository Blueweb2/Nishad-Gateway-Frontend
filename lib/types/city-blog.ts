// lib/types/city-blog.ts

/* ======================================================
   SECTION TYPES (MUST MATCH BACKEND ENUM EXACTLY)
====================================================== */

export type CityBlogSectionType =
  | "HERO"
  | "CATEGORIES"
  | "VISION"
  | "INVESTMENT_HIGHLIGHTS"
  | "BUSINESS_SETUP_OPTIONS"
  | "INFRASTRUCTURE"
  | "LANDMARKS"
  | "FOOD_GUIDE"
  | "TRANSPORTATION_GUIDE"
  | "EXPANDABLE_SNAPSHOT"
  | "FUTURE_OUTLOOK";

/* ======================================================
   SECTION CONTENT TYPES
====================================================== */

/* ---------- HERO ---------- */

export type HeroSectionContent = {
  heading: string;
  subheading: string;
  backgroundImage: string;
  backgroundImagePublicId?: string;   // ✅ ADD THIS
  ctaText: string;
  ctaLink?: string;
};



/* ---------- CATEGORIES ---------- */

export type CategoriesSectionContent = {
  heading: string;
  introText: string;
};


export type VisionSectionContent = {
  heading: string;
  content: string;
  imageUrl: string;
  imagePublicId?: string;
};


/* ---------- InvestmentHighlights ---------- */

export type InvestmentHighlightsContent = {
  mainHeading: string;
  description: string;

  cards: {
    mainImage: string;
    mainImagePublicId?: string;  // ✅ ADD

    subImage: string;
    subImagePublicId?: string;   // ✅ ADD

    title: string;
    subText: string;
  }[];
};



/* ---------- BUSINESS SETUP OPTIONS ---------- */

export type BusinessSetupOptionsContent = {
  heading: string;
  description: string;

  options: {
    title: string;
    link: string;           // required

  }[];

  decisionFlow?: string;    // ✅ optional
  bottomText?: string;      // ✅ optional
};



export type InfrastructureSectionContent = {
  heading: string;
  description: string;

  slides: {
    imageUrl: string;
    imagePublicId?: string;
    title: string;
    text: string;
  }[];
};




export type LandmarksSectionContent = {
  heading: string;
  ctaText?: string;
  ctaLink?: string;
  items: {
    title: string;
    description: string;
    link: string;
  }[];
};




export type FoodGuideSectionContent = {
  heading: string;

  filters: {
    label: string;

    items: {
      imageUrl: string;
      imagePublicId?: string;
      title: string;
      description: string;
      link: string;
    }[];
  }[];
};

// TransportationGuide

export type TransportationGuideSectionContent = {
  heading: string;

  slides: {
    label: string; // "By Air", "By Road", etc.

    backgroundImage: string;
    backgroundImagePublicId?: string;

    title: string; // "Highways connect across KSA"
    link: string;  // detail blog page link
  }[];
};


export type ExpandableSnapshotSectionContent = {
  heading: string;

  cards: {
    imageUrl: string;
    imagePublicId?: string;
    caption: string;
  }[];
};




/* ---------- FAQ ---------- */

export type FutureOutlookSectionContent = {
  heading: string;

  slides: {
    title: string;         // Metro Expansion
    description: string;
    imageUrl: string;
    imagePublicId?: string;
    ctaText: string;
    ctaLink: string;
  }[];
};


/* ---------- CTA ---------- */



/* ======================================================
   CONTENT MAP (TYPE-SAFE LINKING)
====================================================== */

export type CityBlogSectionContentMap = {
  HERO: HeroSectionContent;
  CATEGORIES: CategoriesSectionContent;
  VISION: VisionSectionContent;
  INVESTMENT_HIGHLIGHTS: InvestmentHighlightsContent;
  BUSINESS_SETUP_OPTIONS: BusinessSetupOptionsContent;
  INFRASTRUCTURE: InfrastructureSectionContent;
  LANDMARKS: LandmarksSectionContent;
  FOOD_GUIDE:FoodGuideSectionContent;
  TRANSPORTATION_GUIDE:TransportationGuideSectionContent
  EXPANDABLE_SNAPSHOT:ExpandableSnapshotSectionContent
  FUTURE_OUTLOOK: FutureOutlookSectionContent;
  

};

/* ======================================================
   GENERIC SECTION TYPE
====================================================== */

export type CityBlogSection<
  T extends CityBlogSectionType = CityBlogSectionType
> = {
  id: string;
  type: T;
  title?: string;
  content: CityBlogSectionContentMap[T];
  order: number;
  isActive: boolean;
};

/* ======================================================
   FULL BLOG TYPE (OPTIONAL BUT RECOMMENDED)
====================================================== */

export type CityBlog = {
  city: {
    _id: string;
    cityName: string;
    citySlug: string;
  };
  sections: CityBlogSection[];
  status: "DRAFT" | "PUBLISHED";
};