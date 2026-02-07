export type CityTag = "ARTICLE" | "FEATURED" | "TRENDING";

export const CITY_TAGS: CityTag[] = [
  "ARTICLE",
  "FEATURED",
  "TRENDING",
];

/* ======================================================
   Used for ADMIN FORM (Create / Edit)
====================================================== */

export interface CityForm {
  cityName: string;
  citySlug: string;
  cityImage: string;
  heading: string;
  description: string;
  tag: CityTag;
  order: number;
  isActive: boolean;
}

/* ======================================================
   Used for PUBLIC API / UI
====================================================== */

export interface City {
  _id: string;
  cityName: string;
  citySlug: string;
  cityImage?: string;
  heading: string;
  description: string;
  tag: CityTag;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
