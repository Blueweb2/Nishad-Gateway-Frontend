// lib/api/public/cityBlog.server.ts

export async function getCityBlogBySlugServer(slug: string) {
  if (!slug) return null;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!API_URL) {
    console.error("NEXT_PUBLIC_API_URL is not defined");
    return null;
  }

  try {
    const res = await fetch(
      `${API_URL}/cities/slug/${slug}/blog`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Fetch failed:", res.status);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
