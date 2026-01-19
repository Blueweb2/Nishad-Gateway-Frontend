export type WhySlide = {
  title: string;
  description: string;
  image: string;
};

export type FAQ = {
  q: string;
  a: string;
};

export type EntityRow = {
  entityType: string;
  ownership: string;
  bestFor: string;
  capital: string;
  regulatoryBody: string;
  timeToSetup: string;
  icon?: string;
};

export type Section = {
  heading: string;
  text: string;
  image?: string;
};

export type SubServiceContent = {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroButtonText: string;
  heroButtonLink: string;
  heroImage: string;

  whyHeading: string;
  whySlides: WhySlide[];
  whyCtaText: string;
  whyCtaLink: string;

  entityTableHeading: string;
  entityTableRows: EntityRow[];

  introHeading: string;
  introText: string;

  sections: Section[];
  faqHeading?: string;
  faqs: FAQ[];
};
