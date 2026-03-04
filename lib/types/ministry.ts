export type Ministry = {
  _id: string;
  title: string;
  slug: string;
  shortDesc?: string;
  logo?: string;
  coverImage?: string;
  blocks?: MinistryBlock[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type MinistryBlock =
  | ContentBlock
  | SliderBlock
  | CardsBlock;

export type ContentBlock = {
  id?: string;
  type: "content";
  content: string;
};

export type SliderBlock = {
  id?: string;
  type: "slider";

  heading?: string;
  subText?: string;

  slides: SlideItem[];
};

export type SlideItem = {
  title: string;
  description?: string;
  image: string;
};

export type CardsBlock = {
  id?: string;
  type: "cards";

  heading?: string;
  subText?: string;
  bottomText?: string;

  cards: CardItem[];
};

export type CardItem = {
  icon?: string;
  description: string;
};