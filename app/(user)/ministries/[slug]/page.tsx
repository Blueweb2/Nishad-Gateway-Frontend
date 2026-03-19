import dynamic from "next/dynamic";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import Loading from "./loading";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";
import { getMinistryBySlug } from "@/lib/api/public/ministries.api";

const BlockRenderer = dynamic(
  () => import("@/components/user/ministries/blocks/BlockRenderer"),
  { loading: () => <Loading /> }
);

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

    <div className="max-w-8xl mx-auto  pt-28 " data-navbar="light">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        {/* Breadcrumb */}
        <div className="overflow-x-auto hide-scrollbar">
          <div className="flex items-center gap-2 text-sm text-gray-500 whitespace-nowrap hide-scrollbar">
            <div className="text-sm text-gray-500 flex items-center overflow-x-auto gap-2">
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
          </div>
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
              className="w-full h-[320px] md:h-[420px] object-cover"
              priority
            />

            {/* Gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Title - bottom left */}
            <div className="absolute bottom-6 left-6">
              <h1 className="text-2xl md:text-4xl font-semibold text-white max-w-xl">
                {ministry.title}
              </h1>
            </div>

            {/* Logo */}
            {ministry.logo && (
              <div
                className="
                  absolute 
                  top-4 right-4
                  md:top-auto md:bottom-6 md:right-6
                  bg-black/90 backdrop-blur rounded-lg p-2 md:p-3
                "
              >
                <Image
                  src={cloudinaryAutoWebp(ministry.logo)}
                  alt={ministry.logoAlt || ministry.title}
                  width={100}
                  height={100}
                  className="object-contain sm:h-[70px] md:h-[100px]"
                />
              </div>
            )}

          </div>
        )}

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