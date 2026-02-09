// lib/api/public/cityBlog.server.ts

export async function getCityBlogBySlugServer(slug: string) {
  if (!slug) return null;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  console.log("API_URL:", API_URL);
  

  try {
    const res = await fetch(
      `${API_URL}/cities/slug/${slug}/blog`,
  


      { cache: "no-store" }
    );
    console.log("Response in CityBlogRenderer.server.ts:", res);
    console.log("Fetching:", `${API_URL}/cities/slug/${slug}/blog`);
    

    if (!res.ok) {
      console.error("Fetch failed:", res.status);
      return null;
    }

    const data = await res.json();

    console.log("City blog data:", data); 

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
