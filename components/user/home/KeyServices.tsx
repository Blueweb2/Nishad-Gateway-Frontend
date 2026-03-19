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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {

      try {
        setLoading(true)
        const data = await getPublicSectors();
        setSectors(data);
      } catch (error) {
        console.error("Failed to load services", error);
      } finally {
        setLoading(false)
      }

    };

    fetchData();
  }, []);

  // loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-black"></div>
      </div>
    );
  };

  return (
    <section
      className="w-full bg-[#84817F] text-white"
      data-navbar="light"
      data-menu="dark-text"
    >
      <div className="max-w-8xl mx-auto pl-6 pr-0 lg:px-6 py-12 lg:py-24">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8 lg:mb-16">
          <FadeUpScroll delay={0.1}>
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold leading-tight">
              Top Investment Sectors in Saudi Arabia
            </h2>
          </FadeUpScroll>
        </div>

        {/* GRID */}
        <div 
          className="flex md:flex overflow-x-auto gap-6 lg:grid lg:grid-cols-4 xl:grid-cols-5 lg:overflow-visible hide-scrollbar"
        >
          {sectors.length > 0 ? sectors.map((sector) => (
            <div className="min-w-[260px] lg:min-w-0" key={sector._id}>
              <Card
                key={sector._id}
                slug={sector.slug}
                icon={sector.coverImage?.url}
                title={sector.title}
                description={sector.excerpt}
              />
            </div>
          )):
            <div className="flex justify-center items-center text-white">
              Failed to load services. Please try again.
            </div>
          }
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
    <Link 
      href={`/sectors/${slug}`} 
      aria-label={`Explore ${title} sector in Saudi Arabia`}
      title={`${title} sector opportunities in Saudi Arabia`}
    >
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
              alt={`${title} sector in Saudi Arabia`}
              width={50}
              height={50}
              loading="lazy"
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
              hidden lg:block
            "
          >
            {title}
          </p>

          {/* Hover Description */}
          <div
            className=" 
              text-white text-sm leading-[16px]
              lg:opacity-0 lg:translate-y-4
              transition-all duration-300
              lg:group-hover:opacity-100
              lg:group-hover:translate-y-0
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