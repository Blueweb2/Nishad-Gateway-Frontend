"use client";

import Link from "next/link";
import DOMPurify from "dompurify";
import { useMemo } from "react";

type Props = {
  citySlug: string;
  heading: string;
  introText: string;
  categories: {
    name: string;
    slug: string;
  }[];
};

export default function CategoriesSection({
  citySlug,
  heading,
  introText,
  categories,
}: Props) {
const cleanIntro = useMemo(() => {
  if (!introText) return "";

  if (typeof window === "undefined") {
    return introText;
  }

  const DOMPurify = require("dompurify");
  return DOMPurify.sanitize(introText);
}, [introText]);



  return (
    <section className="bg-white py-[clamp(60px,8vw,120px)]">
      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] grid md:grid-cols-2 gap-[clamp(32px,6vw,80px)]">

        {/* LEFT SIDE */}
        <div>
          <h2 className="font-bold mb-[clamp(16px,3vw,32px)] text-[clamp(1.8rem,3.5vw,2.5rem)]">
            {heading}
          </h2>

          <div className="flex flex-wrap gap-x-[clamp(16px,2vw,32px)] gap-y-[clamp(10px,1.5vw,20px)] text-[clamp(0.9rem,1.1vw,1rem)] text-gray-700">
            {categories.map((cat, index) => (
              <div key={cat.slug} className="flex items-center gap-3">

                <Link
                  href={`/cities/${citySlug}/${cat.slug}`}
                  className="
                    relative
                    pb-1
                    border-b
                    border-gray-300
                    hover:border-black
                    hover:text-black
                    transition-all
                    duration-300
                  "
                >
                  {cat.name}
                </Link>

                {index !== categories.length - 1 && (
                  <span className="text-gray-400 text-xs">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="
            rich-text
            text-gray-600
            leading-relaxed
            text-[clamp(0.95rem,1.2vw,1.1rem)]
          "
          dangerouslySetInnerHTML={{ __html: cleanIntro }}
        />

      </div>
    </section>
  );
}
