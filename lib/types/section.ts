export type SectionType =
  | "HERO"
  | "TEXT"
  | "IMAGE"
  | "GALLERY"
  | "CARDS"
  | "TABLE"
  | "LISTINGS"
  | "CALLOUT";

export type Section = {
  id: string;
  type: SectionType;
  title?: string;
  order: number;
  content: any;
};

