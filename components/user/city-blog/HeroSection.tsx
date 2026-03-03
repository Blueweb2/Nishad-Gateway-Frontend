"use client";

import Link from "next/link";
import Image from "next/image";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";
import type { HeroSectionContent } from "@/lib/types/city-blog";

type Props = {
  content: HeroSectionContent;
};

export default function HeroSection({ content }: Props) {
  const isExternal = content.ctaLink?.startsWith("http");

  return (
    <section
      className="relative min-h-screen flex items-center pt-32 pb-10"
      data-navbar="light"
    >
      {/* Container with rounded hero like screenshot */}
      <div className="relative w-full mx-auto px-6">
        <div className="relative h-[80vh] rounded-[32px] overflow-hidden">

          {/* Background Image */}
          <Image
            src={cloudinaryAutoWebp(content.backgroundImage)}
            alt={content.heading || "Hero Image"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* Dark gradient overlay (left fade like screenshot) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/10" />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-2xl px-12">

              <h1 className="text-5xl md:text-6xl font-semibold leading-tight mb-6 text-white">
                {content.heading}
              </h1>

              <p className="text-lg md:text-xl text-white/90 max-w-xl">
                {content.subheading}
              </p>

              {content.ctaText && content.ctaLink && (
                isExternal ? (
                  <a
                    href={content.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-10 inline-flex items-center bg-green-600 hover:bg-green-500 transition px-8 py-4 rounded-full text-base font-medium text-white"
                  >
                    {content.ctaText}
                  </a>
                ) : (
                  <Link
                    href={content.ctaLink}
                    className="mt-10 inline-flex items-center bg-green-600 hover:bg-green-500 transition px-8 py-4 rounded-full text-base font-medium text-white"
                  >
                    {content.ctaText}
                  </Link>
                )
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
