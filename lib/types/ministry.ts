export type Ministry = {
  _id: string;
  title: string;
  slug: string;
  shortDesc?: string;

  logo?: string;
  logoPublicId?: string;
  logoAlt?: string;

  coverImage?: string;
  coverImagePublicId?: string;
  coverAlt?: string;

  blocks?: MinistryBlock[];

  isActive: boolean;

  createdAt?: string;
  updatedAt?: string;
};

export type MinistryBlock =
  | ContentBlock
  | SliderBlock
  | CardsBlock
  | FAQBlock;

export type ContentBlock = {
  id: string;
  type: "content";
  content: string;
};

export type SliderBlock = {
  id: string;
  type: "slider";

  heading?: string;
  subText?: string;

  slides: SlideItem[];
};

export type SlideItem = {
  title: string;
  description?: string;

  image: string;
  imagePublicId?: string;

  alt?: string;
};

export type CardsBlock = {
  id: string;
  type: "cards";

  heading?: string;
  subText?: string;
  bottomText?: string;

  cards: CardItem[];
};

export type CardItem = {
  iconSvg?: string;
  iconPublicId?: string;

  description: string;
  alt?: string;
};

export type FAQBlock = {
  id: string;
  type: "faq";

  faqImage?: string;
  faqImagePublicId?: string;

  faqImageAlt?: string;

  faqs: FAQItem[];
};

export type FAQItem = {
  q: string;
  a: string;
};