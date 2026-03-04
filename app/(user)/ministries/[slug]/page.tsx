import { getMinistryBySlug } from "@/lib/api/public/ministries.api";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type Props = {
  params: {
    slug: string;
  };
};

export default async function MinistryPage({ params }: Props) {
  const ministry = await getMinistryBySlug(params.slug);

  if (!ministry) return notFound();

  return (
    <div className="bg-white min-h-screen">

      {/* HERO IMAGE */}
      {ministry.heroImage && (
        <div className="max-w-7xl mx-auto px-6 pt-24">
          <div className="rounded-3xl overflow-hidden">
            <Image
              src={cloudinaryAutoWebp(ministry.heroImage)}
              alt={ministry.title}
              width={1400}
              height={600}
              className="w-full h-[420px] object-cover"
            />
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-14">

        {/* TITLE */}
        <h1 className="text-4xl font-semibold mb-6">
          {ministry.title}
        </h1>

        {/* SHORT DESC */}
        {ministry.shortDesc && (
          <p className="text-gray-500 mb-10">
            {ministry.shortDesc}
          </p>
        )}

        {/* RICH CONTENT */}
        {ministry.content && (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: ministry.content }}
          />
        )}

      </div>
    </div>
  );
}