import { notFound } from "next/navigation";
import CityBlogRenderer from "@/components/user/city-blog/CityBlogRenderer";
import { getCityBlogBySlugServer } from "@/lib/api/public/cityBlog.server";

type PageProps = {
  params: {
    citySlug: string;
  };
};

export default async function CityPage({ params }: PageProps) {
  const { citySlug } = params;

  if (!citySlug) notFound();

  const data = await getCityBlogBySlugServer(citySlug);

  if (!data || !data.city) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <CityBlogRenderer sections={data.sections || []} />
    </main>
  );
}
