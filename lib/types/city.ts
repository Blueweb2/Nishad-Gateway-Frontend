export type CityTag = "ARTICLE" | "FEATURED" | "TRENDING";

export const CITY_TAGS: CityTag[] = [
  "ARTICLE",
  "FEATURED",
  "TRENDING",
];

/* ======================================================
   IMAGE TYPE (NEW - reusable everywhere)
====================================================== */
export interface ImageField {
  url: string;
  alt?: string;
  publicId?: string;
}

/* ======================================================
   ADMIN FORM (Create / Edit)
====================================================== */

export interface CityForm {
  cityName: string;
  citySlug: string;

  /* IMAGE */
  cityImage: string;
  cityImageAlt?: string;
  cityImagePublicId?: string;

  /* CONTENT */
  heading: string;
  description: string;

  /* META */
  tag: CityTag;
  order: number;
  isActive: boolean;
}

/* ======================================================
   PUBLIC API / UI
====================================================== */

export interface City {
  _id: string;

  cityName: string;
  citySlug: string;

  /* IMAGE */
  cityImage?: string;
  cityImageAlt?: string;
  cityImagePublicId?: string;

  /* CONTENT */
  heading: string;
  description: string;

  /* META */
  tag: CityTag;
  order: number;
  isActive: boolean;

  createdAt?: string;
  updatedAt?: string;
}