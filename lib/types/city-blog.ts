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
  | "FEATURE_CARDS"
  | "STATS"
  | "IMAGE_TEXT"
  | "BUSINESS"
  | "LIFESTYLE"
  | "STEPS"
  | "PLACES_GRID"
  | "FAQ"
  | "CTA";

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



/* ---------- FEATURE CARDS ---------- */

export type FeatureCardsSectionContent = {
  cards: {
    title: string;
    description: string;
    icon?: string;
  }[];
};

/* ---------- STATS ---------- */

export type StatsSectionContent = {
  stats: {
    label: string;
    value: string;
  }[];
};

/* ---------- IMAGE + TEXT ---------- */

export type ImageTextSectionContent = {
  heading?: string;
  description: string;
  image: string;
  imagePosition?: "left" | "right";
};

/* ---------- BUSINESS ---------- */

export type BusinessSectionContent = {
  heading?: string;
  points: string[];
};

/* ---------- LIFESTYLE ---------- */

export type LifestyleSectionContent = {
  heading?: string;
  description: string;
};

/* ---------- STEPS ---------- */

export type StepsSectionContent = {
  steps: {
    title: string;
    description: string;
  }[];
};


/* ---------- PLACES GRID ---------- */

export type PlacesGridSectionContent = {
  places: {
    name: string;
    image: string;
  }[];
};

/* ---------- FAQ ---------- */

export type FAQSectionContent = {
  faqs: {
    question: string;
    answer: string;
  }[];
};

/* ---------- CTA ---------- */

export type CTASectionContent = {
  text: string;
  buttonText: string;
  link: string;
};

/* ======================================================
   CONTENT MAP (TYPE-SAFE LINKING)
====================================================== */

export type CityBlogSectionContentMap = {
  HERO: HeroSectionContent;
  CATEGORIES: CategoriesSectionContent;
  VISION: VisionSectionContent;
INVESTMENT_HIGHLIGHTS: InvestmentHighlightsContent;
BUSINESS_SETUP_OPTIONS: BusinessSetupOptionsContent;
  FEATURE_CARDS: FeatureCardsSectionContent;
  STATS: StatsSectionContent;
  IMAGE_TEXT: ImageTextSectionContent;
  BUSINESS: BusinessSectionContent;
  LIFESTYLE: LifestyleSectionContent;
  STEPS: StepsSectionContent;
  INFRASTRUCTURE: InfrastructureSectionContent;
  PLACES_GRID: PlacesGridSectionContent;
  FAQ: FAQSectionContent;
  CTA: CTASectionContent;
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