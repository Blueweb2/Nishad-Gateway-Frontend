import { notFound } from "next/navigation";
import { getSectorBySlugPublic } from "@/lib/api/public/sectors.api";
import SectorBlockRenderer from "@/components/user/sectors/SectorBlockRenderer";
import { SectorBlock } from "@/lib/types/sector.types";
import { getCities } from "@/lib/api/public/city.api";
import { City } from "@/lib/types/city";
import Stats from "@/components/user/home/Stats";
import LocationsSliderSection from "@/components/user/ui/LocationsSliderSection";

interface Props {
  params: Promise<{ slug: string }>;
}


/* ================= SEO ================= */

export async function generateMetadata({ params }: Props) {
  const { slug } = await params; // ✅ unwrap

  const sector = await getSectorBySlugPublic(slug);
  if (!sector) return {};

  return {
    title: sector.metaTitle || sector.title,
    description: sector.metaDescription || sector.excerpt,
  };
}

/* ================= PAGE ================= */






export default async function SectorDetailPage({ params }: Props) {
  const { slug } = await params;

  const [sectorRes, cities] = await Promise.all([
    getSectorBySlugPublic(slug),
    getCities(),
  ]);

  if (!sectorRes) notFound();

return (
  <main className="bg-white">
    {sectorRes.blocks?.map((block: SectorBlock) => (
      <SectorBlockRenderer
        key={block._id}
        block={block}
        cities={cities}
      />
    ))}

    {/* 🔥 Always show locations section */}
    {cities.length > 0 && (
      <LocationsSliderSection
        locationsHeading="Start Your Business Anywhere in Saudi Arabia"
        locationsSubheading="Entity selection and licensing can be completed regardless of your chosen city or economic zone."
        cities={cities}
      />
    )}
    <Stats />
  </main>
);
}