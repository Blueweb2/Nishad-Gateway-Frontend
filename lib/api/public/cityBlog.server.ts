// lib/api/cityBlog.server.ts

export async function getCityBlogBySlugServer(slug: string) {
  if (!slug) {
    throw new Error("City slug is required");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cities/slug/${slug}/blog`,
    {
      cache: "no-store", // change to 'force-cache' or revalidate later if needed
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch city blog: ${res.status}`);
  }

  return res.json();
}