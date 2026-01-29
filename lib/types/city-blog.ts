// lib/types/city-blog.ts

export type CityBlogSectionType =
  | "HERO"
  | "INTRO"
  | "BUSINESS"
  | "LIFESTYLE"
  | "FAQ"
  | "CTA";

/* ---------- Section Content Types ---------- */

export type HeroSectionContent = {
  heading: string;
  subheading: string;
  backgroundImage: string;
  ctaText?: string;
};

export type IntroSectionContent = {
  text: string;
};

export type BusinessSectionContent = {
  points: string[];
};

export type LifestyleSectionContent = {
  description: string;
};

export type FAQSectionContent = {
  faqs: { question: string; answer: string }[];
};

export type CTASectionContent = {
  text: string;
  buttonText: string;
  link: string;
};

/* ---------- Content Map ---------- */

export type CityBlogSectionContentMap = {
  HERO: HeroSectionContent;
  INTRO: IntroSectionContent;
  BUSINESS: BusinessSectionContent;
  LIFESTYLE: LifestyleSectionContent;
  FAQ: FAQSectionContent;
  CTA: CTASectionContent;
};

/* ---------- Generic Section ---------- */

export type CityBlogSection<T extends CityBlogSectionType = CityBlogSectionType> = {
  type: T;
  title?: string;
  content: CityBlogSectionContentMap[T];
  order: number;
  isActive: boolean;
};