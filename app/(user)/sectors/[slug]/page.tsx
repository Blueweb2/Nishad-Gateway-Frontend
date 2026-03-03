import { notFound } from "next/navigation";
import { getSectorBySlugPublic } from "@/lib/api/public/sectors.api";
import SectorBlockRenderer from "@/components/user/sectors/SectorBlockRenderer";
import { SectorBlock } from "@/lib/types/sector.types";
import Stats from "@/components/user/home/Stats";
import LocationsSliderSection from "@/components/user/ui/LocationsSliderSection";
import SubServiceTemplate from "@/components/user/services/SubServiceTemplate/SubServiceTemplate";

interface Props {
  params: Promise<{ slug: string }>;
}


/* ================= SEO ================= */

export async function generateMetadata({ params }: Props) {
  const { slug } = await params; // 👈 unwrap first

  const sector = await getSectorBySlugPublic(slug);
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
  const { slug } = await params;

  const sector = await getSectorBySlugPublic(slug);
  if (!sector) notFound();



  // Default block rendering
  return (
    <main className="bg-white">
      {sector.blocks?.map((block: SectorBlock) => (
        <SectorBlockRenderer
          key={block._id}
          block={block}
        />
      ))}
    </main>
  );
}

function getPublicCities() {
  throw new Error("Function not implemented.");
}
