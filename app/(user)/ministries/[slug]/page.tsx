import Image from "next/image";
import { getMinistryBySlug } from "@/lib/api/public/ministries.api";
import { notFound } from "next/navigation";
import BlockRenderer from "@/components/user/ministries/blocks/BlockRenderer";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";
import Link from "next/link";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function MinistryPage({ params }: Props) {
  const { slug } = await params;

  const ministry = await getMinistryBySlug(slug);

  if (!ministry) return notFound();

  return (

    <div className="max-w-8xl mx-auto px-6 py-28 space-y-10" data-navbar="light">

      {/* Breadcrumb */}
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:text-gray-900">
          Home
        </Link>

        <span>›</span>

        <Link href="/#ministries" className="hover:text-gray-900">
          Government Authorities
        </Link>

        <span>›</span>

        <span className="text-gray-900 font-medium">
          {ministry.title}
        </span>
      </div>

      {/* Cover Image */}
      {ministry.coverImage && (
        <div className="w-full overflow-hidden rounded-3xl">
          <Image
            src={cloudinaryAutoWebp(ministry.coverImage)}
            alt={ministry.coverAlt || ministry.title}
            width={1400}
            height={600}
            className="w-full h-[420px] object-cover"
            priority
          />
        </div>
      )}

      {/* Title */}
      {/* <h1 className="text-4xl font-semibold">
        {ministry.title}
      </h1> */}

      {/* Description */}
      {ministry.shortDesc && (
        <p className="text-gray-500 max-w-7xl">
          {ministry.shortDesc}
        </p>
      )}

      {/* Dynamic Blocks */}
      {ministry.blocks?.map((block, index) => (
        <BlockRenderer key={block.id ?? `block-${index}`} block={block} />
      ))}

    </div>
  );
}