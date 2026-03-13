"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CityCard({ city }: any) {
  return (
    <Link
      href={`/cities/${city.citySlug}`}
      className="group flex flex-row md:flex-col items-start md:items-center gap-4 px-4 py-5"
    >
      {/* IMAGE */}
      <div className="flex-shrink-0 rounded-[80px] overflow-hidden">
        <Image
          src={city.cityImage || "/citiesbg.webp"}
          alt={city.cityName}
          width={90}
          height={130}
          className="object-cover w-[90px] h-[130px] md:w-[130px] md:h-[200px] group-hover:scale-105 transition"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col justify-between flex-1">
        {/* TITLE + ARROW */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg md:text-2xl font-medium leading-tight">
            {city.cityName}
          </h3>

          <span className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center group-hover:bg-gray-100">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className="text-xs md:text-sm text-gray-500 mt-2">
          {city.description}
        </p>
      </div>
    </Link>
  );
}