import { notFound } from "next/navigation";
import type { Metadata } from "next";

import CityBlogRenderer from "@/components/user/city-blog/CityBlogRenderer";
import { getCityBlogBySlugServer } from "@/lib/api/public/cityBlog.server";
import { HeroSectionContent } from "@/lib/types/city-blog";

type PageProps = {
  params: {
    citySlug: string;
  };
};

/* =========================
   SEO METADATA (SERVER)
========================= */
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { citySlug } = await params;

  if (!citySlug) return {};

  let data;
  try {
    data = await getCityBlogBySlugServer(citySlug);
  } catch {
    return {};
  }

  if (!data?.city) return {};

  const hero = data.sections?.find(
    (s: any) => s.type === "HERO"
  )?.content as HeroSectionContent | undefined;

  return {
    title:
      hero?.heading ||
      `Business Setup in ${data.city.cityName} | Nishad Gateway`,
    description:
      hero?.subheading ||
      `Complete guide to business setup, lifestyle, and opportunities in ${data.city.cityName}.`,
  };
}

/* =========================
   PAGE RENDER
========================= */
export default async function CityPage({ params }: PageProps) {
  const { citySlug } = await params;

  if (!citySlug) notFound();

  const data = await getCityBlogBySlugServer(citySlug);

  if (!data?.city) notFound();

  return (
    <main className="min-h-screen">
      <CityBlogRenderer sections={data.sections || []} />
    </main>
  );
}