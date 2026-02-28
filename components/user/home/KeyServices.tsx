"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FadeUpScroll from "../ui/FadeUpScroll";
import { getPublicSectors } from "@/lib/api/public/sectors.api";

interface Sector {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  coverImage: {
    url: string;
    alt: string;
  };
}

export default function KeyServices() {
  const [sectors, setSectors] = useState<Sector[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPublicSectors();
      setSectors(data);
    };

    fetchData();
  }, []);

  return (
    <section
      className="w-full bg-[#84817F] text-white"
      data-navbar="light"
      data-menu="dark-text"
    >
      <div className="max-w-8xl mx-auto px-6 py-24">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-16">
          <FadeUpScroll delay={0.1}>
            <h2 className="text-[30px] font-semibold">
              Top Investment Sectors in Saudi Arabia
            </h2>
          </FadeUpScroll>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-8">
          {sectors.map((sector) => (
            <Card
              key={sector._id}
              slug={sector.slug}
              icon={sector.coverImage?.url}
              title={sector.title}
              description={sector.excerpt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({
  icon,
  title,
  description,
  slug,
}: {
  icon: string;
  title: string;
  description: string;
  slug: string;
}) {
  return (
    <Link href={`/sectors/${slug}`}>
      <div
        className="
        group
        bg-[#908D8C]
        hover:bg-[#096C6C]
        transition-all duration-300 ease-out
        rounded-2xl
        p-6
        w-full
        min-h-[280px]
        cursor-pointer
        flex flex-col justify-between
      "
      >
        {/* Top Row */}
        <div className="flex items-start justify-between">
          {icon && (
            <Image
              src={icon}
              alt={title}
              width={50}
              height={50}
            />
          )}

          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>

        <div className="mt-6 relative">
          {/* Title (Default State) */}
          <p
            className="
              text-[14px] font-medium text-white
              absolute bottom-2 left-0 leading-[16px] uppercase
              transition-all duration-300
              opacity-100 translate-y-0
              group-hover:opacity-5
              group-hover:translate-y-5
            "
          >
            {title}
          </p>

          {/* Hover Description */}
          <div
            className="
              text-white text-sm leading-[16px]
              opacity-0 translate-y-4
              transition-all duration-300
              group-hover:opacity-100
              group-hover:translate-y-0
            "
          >
            <p className="text-[14px] font-medium pb-2.5 uppercase">
              {title}
            </p>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}