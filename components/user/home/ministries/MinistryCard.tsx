"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type Ministry = {
  _id: string;
  title: string;
  slug: string;
  shortDesc?: string;
  logo?: string;
  logoAlt?: string;
};

export default function MinistryCard({ ministry }: { ministry: Ministry }) {

  return (
    <div
      className="
        group relative w-full max-w-[300px] h-[420px]
        rounded-[160px] bg-[#0f0f0f]
        px-8 py-10 flex flex-col items-center text-center
        transition-all duration-300 overflow-hidden
      "
    >

      {/* LOGO */}
      {ministry.logo && (
        <div className="mb-6 py-6">
          <Image
            src={cloudinaryAutoWebp(ministry.logo)}
            alt={ministry.logoAlt || ministry.title}
            width={120}
            height={120}
          />
        </div>
      )}

      {/* DOT */}
      <div className="w-1.5 h-1.5 rounded-full bg-[#0fb9b1] mb-6" />

      {/* TITLE */}
      <h3 className="text-sm font-medium mb-4">{ministry.title}</h3>

      {/* DESCRIPTION */}
      <p className="text-xs text-white/60 leading-relaxed">
        {ministry.shortDesc}
      </p>

      {/* LINK */}
      <div
        className="
        absolute bottom-8
        opacity-0 translate-y-2
        transition-all duration-300
        group-hover:opacity-100
        group-hover:translate-y-0
      "
      >
        <Link
          href={`/ministries/${ministry.slug}`}
          prefetch
          className="
            w-10 h-10 rounded-full
            border border-white/30
            flex items-center justify-center
            hover:bg-white/10 transition
          "
        >
          <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  );
}