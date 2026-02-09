import { notFound } from "next/navigation";
import CityBlogRenderer from "@/components/user/city-blog/CityBlogRenderer";
import { getCityBlogBySlugServer } from "@/lib/api/public/cityBlog.server";



export default async function CityPage({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}) {
  const { citySlug } = await params; // ✅ MUST await in Next 15

  const data = await getCityBlogBySlugServer(citySlug);
  console.log("City page data:", data);
  

  if (!data) return notFound();

  return (
    <main>
      <CityBlogRenderer
        citySlug={citySlug}
        sections={data.sections}
        categories={data.categories || []}
        
      />
    </main>
  );
}

