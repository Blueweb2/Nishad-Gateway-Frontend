import { notFound } from "next/navigation";
import { getSectorBySlugPublic } from "@/lib/api/public/sectors.api";
import SectorBlockRenderer from "@/components/user/sectors/SectorBlockRenderer";
import { SectorBlock } from "@/lib/types/sector.types";
import { getCities } from "@/lib/api/public/city.api";
import { City } from "@/lib/types/city";

interface Props {
  params: { slug: string };
}

/* ================= SEO ================= */

export async function generateMetadata({ params }: Props) {
  const sector = await getSectorBySlugPublic(params.slug);
  if (!sector) return {};

  return {
    title: sector.metaTitle || sector.title,
    description: sector.metaDescription || sector.excerpt,
    openGraph: {
      title: sector.metaTitle || sector.title,
      description: sector.metaDescription || sector.excerpt,
      images: [
        {
          url:
            sector.ogImage ||
            sector.coverImage?.url ||
            "/default-og.jpg",
        },
      ],
    },
  };
}

/* ================= PAGE ================= */

export default async function SectorDetailPage({ params }: Props) {
  const [sectorRes, citiesRes] = await Promise.all([
    getSectorBySlugPublic(params.slug),
    getCities(),
  ]);

  if (!sectorRes) notFound();

  const cities: City[] = citiesRes || [];

  console.log("SECTOR CITIES:", cities);

  return (
    <main className="bg-white">
      {sectorRes.blocks?.map((block: SectorBlock) => (
        <SectorBlockRenderer
          key={block._id}
          block={block}
          cities={cities}
        />
      ))}
    </main>
  );
}