const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* =========================================
   TYPES
========================================= */

export interface PublicCategoryBlog {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  readingTime?: number;
  isFeatured?: boolean;
  createdAt?: string;
}

export interface PublicCategoryBlogListResponse {
  city: {
    cityName: string;
    slug: string;
  };
  category: {
    name: string;
    slug: string;
  };
  featured?: PublicCategoryBlog | null;
  blogs: PublicCategoryBlog[];
}

export interface PublicSingleBlogResponse {
  city: {
    cityName: string;
    slug: string;
  };
  category: {
    name: string;
    slug: string;
  };
  blog: PublicCategoryBlog;
  related: PublicCategoryBlog[];
  recommended: PublicCategoryBlog[];
}

/* =========================================
   GET CATEGORY BLOG LIST
   /cities/:citySlug/:categorySlug
========================================= */

export async function getCategoryBlogs(
  citySlug: string,
  categorySlug: string
): Promise<PublicCategoryBlogListResponse | null> {

  console.log("API URL:", API_URL);
  const res = await fetch(

    
    `${API_URL}/cities/${citySlug}/${categorySlug}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) return null;

  return res.json();
}

/* =========================================
   GET SINGLE BLOG
   /cities/:citySlug/:categorySlug/:blogSlug
========================================= */

export async function getCategoryBlog(
  citySlug: string,
  categorySlug: string,
  blogSlug: string
): Promise<PublicSingleBlogResponse | null> {
  const res = await fetch(
    `${API_URL}/cities/${citySlug}/${categorySlug}/${blogSlug}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) return null;

  return res.json(); // 🔥 RETURN FULL RESPONSE
}
