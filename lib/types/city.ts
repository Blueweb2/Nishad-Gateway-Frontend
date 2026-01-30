export type CityTag = "ARTICLE" | "FEATURED" | "TRENDING";

export const CITY_TAGS: CityTag[] = [
  "ARTICLE",
  "FEATURED",
  "TRENDING",
];

export interface CityForm {
  cityName: string;
  citySlug: string;
  cityImage: string;
  bestSuitedFor: string;
  focus: string;
  tag: CityTag;
  order: number;
  isActive: boolean;
}
