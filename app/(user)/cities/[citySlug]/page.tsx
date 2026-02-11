import { notFound } from "next/navigation";
import CityBlogRenderer from "@/components/user/city-blog/CityBlogRenderer";

export default async function CityPage({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}) {
  const { citySlug } = await params;

  console.log("citySlug:", citySlug);

  // const apiUrl = process.env.API_URL;
  const apiUrl = "https://nishad-gateway-backend.onrender.com/api";
  console.log("PRODUCTION API_URL:", process.env.API_URL);


  console.log("API_URL:", apiUrl);

  if (!apiUrl) {
    console.error("API_URL not defined");
    throw new Error("API_URL missing");
  }

  const res = await fetch(
    `${apiUrl}/cities/slug/${citySlug}/blog`,
    { cache: "no-store" }
  );

  console.log("Backend status:", res.status);

  if (!res.ok) {
    const text = await res.text();
    console.error("Backend error response:", text);
    throw new Error("Backend fetch failed");
  }

  const data = await res.json();
  console.log("Backend data received");

  return (
    <CityBlogRenderer
      citySlug={citySlug}
      sections={data.city?.sections || []}
      categories={data.categories || []}
    />
  );
}

