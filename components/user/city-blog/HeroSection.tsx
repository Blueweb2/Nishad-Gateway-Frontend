"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";
import type { HeroSectionContent } from "@/lib/types/city-blog";

type Props = {
  content: HeroSectionContent;
};

export default function HeroSection({ content }: Props) {
  const isExternal = content.ctaLink?.startsWith("http");

  return (
    <section
      className="relative flex justify-center"
    >
      {/* Container with rounded hero like screenshot */}
      <div className="relative w-full mx-auto px-3">
        <div className="relative h-[80vh] rounded-b-[32px] overflow-hidden">

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
          <div className="relative z-10 h-full flex items-center ">
            <div className="mt-20 pl-4 pb-10 lg:pb-0 lg:pl-12 lg:mt-0">

              <motion.h1
                initial={{ x: 120, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="rich-text-light text-5xl md:text-6xl font-semibold leading-none mb-6 mt-5 text-white"
                dangerouslySetInnerHTML={{
                  __html: content.heading?.trim()
                    ? content.heading
                    : "Default Heading Text",
                }}
              />

              <motion.div
                initial={{ x: 120, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: "easeIn" }}
                className="rich-text text-lg md:text-xl text-white/90 max-w-xl leading-none"
                dangerouslySetInnerHTML={{
                  __html: content.subheading?.trim()
                    ? content.subheading
                    : "",
                }}
              />

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
