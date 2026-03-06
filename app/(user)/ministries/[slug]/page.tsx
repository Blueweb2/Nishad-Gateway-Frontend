import { getMinistryBySlug } from "@/lib/api/public/ministries.api";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";



import { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ministry = await getMinistryBySlug(params.slug);

  if (!ministry) {
    return {
      title: "Ministry",
    };
  }

  const title = ministry.title;
  const description =
    ministry.shortDesc ||
    "Learn about Saudi ministries, authorities, and regulatory institutions.";

  const image =
    ministry.coverImage
      ? cloudinaryAutoWebp(ministry.coverImage)
      : `/api/og/ministries/${ministry.slug}`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function MinistryPage({ params }: Props) {
  const ministry = await getMinistryBySlug(params.slug);

  if (!ministry) return notFound();
  console.log("MINISTRY DATA:", ministry);

  return (
    <div className="bg-white min-h-screen">

      {/* COVER IMAGE */}
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

        {/* TITLE */}
        <h1 className="text-4xl font-semibold mb-6">
          {ministry.title}
        </h1>

        {/* SHORT DESC */}
        {ministry.shortDesc && (
          <p className="text-gray-500 mb-12">
            {ministry.shortDesc}
          </p>
        )}

        {/* BLOCKS */}
        <div className="space-y-16">

          {ministry.blocks?.map((block: any, index: number) => {

            /* CONTENT BLOCK */
            if (block.type === "content") {
              return (
                <div
                  key={index}
                  className="rich-text max-w-none"
                  dangerouslySetInnerHTML={{ __html: block.content }}
                />
              );
            }

            /* SLIDER BLOCK */
            if (block.type === "slider") {
              return (
                <div key={index} className="space-y-6">

                  {block.heading && (
                    <h2 className="text-2xl font-semibold">
                      {block.heading}
                    </h2>
                  )}

                  <div className="grid md:grid-cols-3 gap-6">
                    {block.slides?.map((slide: any, i: number) => (
                      <div key={i} className="space-y-3">

                        {slide.image && (
                          <Image
                            src={cloudinaryAutoWebp(slide.image)}
                            alt={slide.alt || slide.title}
                            width={400}
                            height={260}
                            className="rounded-xl object-cover"
                          />
                        )}

                        <h3 className="font-semibold">
                          {slide.title}
                        </h3>

                        {slide.description && (
                          <p className="text-gray-500 text-sm">
                            {slide.description}
                          </p>
                        )}

                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            /* CARDS BLOCK */
            if (block.type === "cards") {
              return (
                <div key={index} className="space-y-8">

                  {block.heading && (
                    <h2 className="text-2xl font-semibold">
                      {block.heading}
                    </h2>
                  )}

                  <div className="grid md:grid-cols-3 gap-6">
                    {block.cards?.map((card: any, i: number) => (
                      <div
                        key={i}
                        className="p-6 border rounded-xl space-y-4"
                      >

                        {card.iconSvg && (
                          <img
                            src={cloudinaryAutoWebp(card.iconSvg)}
                            alt={card.alt || ""}
                            className="w-10 h-10"
                          />
                        )}

                        <p className="text-gray-600">
                          {card.description}
                        </p>

                      </div>
                    ))}
                  </div>

                  {block.bottomText && (
                    <p className="text-gray-500 text-sm">
                      {block.bottomText}
                    </p>
                  )}

                </div>
              );
            }

            /* FAQ BLOCK */
            if (block.type === "faq") {
              return (
                <div key={index} className="grid md:grid-cols-2 gap-10">

                  {block.faqImage && (
                    <Image
                      src={cloudinaryAutoWebp(block.faqImage)}
                      alt={block.faqImageAlt || "FAQ"}
                      width={600}
                      height={500}
                      className="rounded-3xl object-cover"
                    />
                  )}

                  <div className="space-y-6">
                    {block.faqs?.map((faq: any, i: number) => (
                      <div key={i} className="border-b pb-4">

                        <h3 className="font-medium">
                          {faq.q}
                        </h3>

                        <p className="text-gray-500 text-sm mt-2">
                          {faq.a}
                        </p>

                      </div>
                    ))}
                  </div>

                </div>
              );
            }

            return null;
          })}
        </div>

      </div>
    </div>
  );
}