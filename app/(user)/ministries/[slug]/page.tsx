import { getMinistryBySlug } from "@/lib/api/public/ministries.api";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

import BlockRenderer from "@/components/user/ministries/blocks/BlockRenderer";
import { MinistryBlock } from "@/lib/types/ministry";

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
    <div className="bg-white min-h-screen">

      {ministry.coverImage && (
        <div className="max-w-7xl mx-auto px-6 pt-24">

          <div className="rounded-3xl overflow-hidden">
            <Image
              src={cloudinaryAutoWebp(ministry.coverImage)}
              alt={ministry.coverAlt || ministry.title}
              width={1400}
              height={600}
              className="w-full h-[420px] object-cover"
            />
          </div>

        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 py-14">

        <h1 className="text-4xl font-semibold mb-6">
          {ministry.title}
        </h1>

        {ministry.shortDesc && (
          <p className="text-gray-500 mb-12">
            {ministry.shortDesc}
          </p>
        )}

        <div className="space-y-16">

          {ministry.blocks?.map((block: MinistryBlock) => (
            <BlockRenderer key={block.id} block={block} />
          ))}

        </div>

      </div>

    </div>
  );

}
