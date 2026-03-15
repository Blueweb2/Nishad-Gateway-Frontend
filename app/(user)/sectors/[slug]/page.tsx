import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getSectorBySlugPublic } from "@/lib/api/public/sectors.api";
import { SectorBlock } from "@/lib/types/sector.types";
import { getCities } from "@/lib/api/public/city.api";
import Loading from "./loading";

const LocationsSliderSection = dynamic(
  () => import("@/components/user/ui/LocationsSliderSection"),
  { loading: () => <Loading /> }
);

const MinistriesSection = dynamic(
  () => import("@/components/user/home/MinistriesSection"),
  { loading: () => <Loading /> }
);

const SectorBlockRenderer = dynamic(
  () => import("@/components/user/sectors/SectorBlockRenderer"),
  { loading: () => <Loading /> }
);

interface Props {
  params: Promise<{ slug: string }>;
};


/* ================= SEO ================= */

export async function generateMetadata({ params }: Props) {
  const { slug } = await params; // ✅ unwrap

  const sector = await getSectorBySlugPublic(slug);
  if (!sector) return {};

  return {
    title: sector.metaTitle || sector.title,
    description: sector.metaDescription || sector.excerpt,
  };
};

/* ================= PAGE ================= */






export default async function SectorDetailPage({ params }: Props) {
  const { slug } = await params;

  const [sectorRes, cities] = await Promise.all([
    getSectorBySlugPublic(slug),
    getCities(),
  ]);

  if (!sectorRes) notFound();
  // 🔥 Separate FAQ block
  const faqBlock = sectorRes.blocks?.find(
    (block: SectorBlock) => block.type === "faq"
  );

  const otherBlocks = sectorRes.blocks?.filter(
    (block: SectorBlock) => block.type !== "faq"
  );
  console.log("BLOCKS:", sectorRes.blocks);

  return (
    <main className="bg-white w-full mx-auto ">

      {/* 🔹 Render all blocks except FAQ */}
      {otherBlocks?.map((block: SectorBlock, index: number) => (
        <SectorBlockRenderer
          key={block._id ?? `block-${index}`}
          block={block}
          cities={cities}
        />
      ))}

      {/* 🔹 Always show locations section */}
      {cities.length > 0 && (
        <LocationsSliderSection
          locationsHeading="Start Your Business Anywhere in Saudi Arabia"
          locationsSubheading="Entity selection and licensing can be completed regardless of your chosen city or economic zone."
          cities={cities}
        />
      )}

      <div className="w-full bg-black mx-auto">
        <MinistriesSection />
      </div >
      
      {/* 🔹 Render FAQ always at bottom */}
      {faqBlock && (
        <SectorBlockRenderer
          key={faqBlock._id}
          block={faqBlock}
          cities={cities}
        />
      )}

    </main>
  );
}