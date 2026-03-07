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

    <div className="max-w-8xl mx-auto px-6 pt-28 space-y-10" data-navbar="light">
<div className="max-w-5xl mx-auto px-6 space-y-10">
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
    {/* Cover Image with Title + Logo Overlay */}
{ministry.coverImage && (
  <div className="relative w-full overflow-hidden rounded-3xl">

    {/* Cover Image */}
    <Image
      src={cloudinaryAutoWebp(ministry.coverImage)}
      alt={ministry.coverAlt || ministry.title}
      width={1400}
      height={600}
      className="w-full h-[420px] object-cover"
      priority
    />

    {/* Gradient overlay for readability */}
    <div className="absolute inset-0 " />

    {/* Title bottom left */}
    <div className="absolute bottom-6 left-6">
      <h1 className="text-3xl md:text-4xl font-semibold text-white max-w-2xl">
        {ministry.title}
      </h1>
    </div>

    {/* Logo bottom right */}
    {ministry.logo && (
      <div className="absolute bottom-6 right-6 bg-black/90 backdrop-blur rounded-xl p-3">
        <Image
          src={cloudinaryAutoWebp(ministry.logo)}
          alt={ministry.logoAlt || ministry.title}
          width={150}
          height={60}
          className="object-contain"
        />
      </div>
    )}

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
      </div>

      {/* Dynamic Blocks */}
      {ministry.blocks?.map((block, index) => (
        <BlockRenderer key={block.id ?? `block-${index}`} block={block} />
      ))}

    </div>
  );
}