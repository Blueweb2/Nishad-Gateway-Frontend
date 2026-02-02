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

export type EntityTypeSlide = {
  title: string;
  mainImage: string;
  subImage: string;
  description?: string;
};

export type OwnershipSlide = {
  title: string;
  leftText?: string;
  rightText?: string;
  image: string;
};

export type DocumentTab = {
  label: string;
  value: string;
};

export type DocumentCard = {
  title: string;
  items: string[];
  icon?: string;
};

export type DocumentGroup = {
  entityValue: string;
  cards: DocumentCard[];
};

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

  // ENTITY TABLE
  entityTableHeading: string;
  entityTableRows: EntityRow[];

  // ENTITY TYPES
  entityTypesHeading?: string;
  entityTypesDescription?: string;
  entityTypesSlides?: EntityTypeSlide[];

  // OWNERSHIP
  ownershipHeading?: string;
  ownershipTabOneLabel?: string;
  ownershipTabTwoLabel?: string;
  ownershipSlides?: OwnershipSlide[];

  // ENTITY CHOOSE
  entityChooseHeading?: string;
  entityChooseSubheading?: string;
  entityChooseQuestions?: any[];

  // DOCUMENTS
  documentsHeading?: string;
  documentsSubheading?: string;
  documentEntityTabs?: DocumentTab[];
  documentGroups?: DocumentGroup[];

  // LOCATIONS
  locationsHeading?: string;
  locationsSubheading?: string;

  // INTRO / EXTRA
  introHeading?: string;
  introText?: string;
  sections?: Section[];

  // FAQ
  faqHeading?: string;
  faqs: FAQ[];
  faqImage?: string;
  faqCtaText?: string;
};
