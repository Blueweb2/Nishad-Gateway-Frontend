export type ListingStatus = "draft" | "published" | "archived";

export type ListingInput = {
  title: string;
  slug?: string;

  description?: string;

  image?: string;
  publicId?: string;

  address?: string;
  phone?: string;
  website?: string;

  isFeatured?: boolean;

  order?: number;

  status?: ListingStatus;
};