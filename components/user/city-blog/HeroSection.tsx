"use client";

import Link from "next/link";
import Image from "next/image";
import { cloudinaryAutoWebp } from "@/utils/cloudinary";
import type { HeroSectionContent } from "@/lib/types/city-blog";

type Props = {
  content: HeroSectionContent;
};

export default function HeroSection({ content }: Props) {
  const isExternal = content.ctaLink?.startsWith("http");

  return (
    <section className="relative h-[98vh] text-white overflow-hidden">

      {/* Background Image */}
      <Image
        src={cloudinaryAutoWebp(content.backgroundImage)}
        alt={content.heading || "Hero Image"}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-8xl mx-auto px-6 pt-40">
        <h1 className="text-5xl font-bold mb-4">
          {content.heading}
        </h1>

        <p className="text-lg max-w-xl">
          {content.subheading}
        </p>

        {content.ctaText && content.ctaLink && (
          isExternal ? (
            <a
              href={content.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block bg-green-600 px-6 py-3 rounded-full hover:bg-green-500 transition"
            >
              {content.ctaText}
            </a>
          ) : (
            <Link
              href={content.ctaLink}
              className="mt-8 inline-block bg-green-600 px-6 py-3 rounded-full hover:bg-green-500 transition"
            >
              {content.ctaText}
            </Link>
          )
        )}
      </div>

    </section>
  );
}
