import { notFound } from "next/navigation";
import CityBlogRenderer from "@/components/user/city-blog/CityBlogRenderer";

export default async function CityPage({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}) {
  const { citySlug } = await params; // ✅ MUST await

  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    console.error("API_URL not defined");
    return notFound();
  }

  const res = await fetch(
    `${apiUrl}/cities/slug/${citySlug}/blog`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    console.error("City blog fetch failed:", res.status);
    return notFound();
  }

  const data = await res.json();

  return (
    <CityBlogRenderer
      citySlug={citySlug}
      sections={data.sections}
      categories={data.categories || []}
    />
  );
}
