"use client";

import DOMPurify from "dompurify";
import Image from "next/image";
import { cloudinaryAutoWebp } from "@/utils/cloudinary";

type Props = {
  heading: string;
  content: string;
  imageUrl: string;
};

export default function VisionSection({
  heading,
  content,
  imageUrl,
}: Props) {
  const cleanContent = DOMPurify.sanitize(content);

  return (
    <section className="bg-black py-24 text-white">
      <div className="max-w-8xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
            {heading}
          </h2>

          <div
            className="rich-text text-gray-300 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: cleanContent }}
          />
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">

            <Image
              src={cloudinaryAutoWebp(imageUrl)}
              alt="Vision Image"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
            />

          </div>
        </div>

      </div>
    </section>
  );
}
