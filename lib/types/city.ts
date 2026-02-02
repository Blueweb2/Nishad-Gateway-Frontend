export type CityTag = "ARTICLE" | "FEATURED" | "TRENDING";

export const CITY_TAGS: CityTag[] = [
  "ARTICLE",
  "FEATURED",
  "TRENDING",
];

// Used for ADMIN FORM
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


//  Used for PUBLIC API / UI
export interface City {
  _id: string;
  cityName: string;
  citySlug: string;
  cityImage?: string;
  bestSuitedFor?: string;
  focus?: string;
  tag: CityTag;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}