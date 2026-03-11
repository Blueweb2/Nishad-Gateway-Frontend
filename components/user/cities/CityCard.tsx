"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CityCard({ city, index }: any) {
  return (
    <Link
      href={`/cities/${city.citySlug}`}
      className={`
        relative group
        flex flex-col justify-between
        px-10 py-14
        border-b border-gray-200
        ${index % 2 === 0 ? "md:border-r border-gray-200" : ""}
      `}
    >
      {/* TOP */}
      <div className="flex items-start justify-between text-sm text-gray-400">
        <span className="text-2xl font-light">
          {/* {index + 1} */}
        </span>

        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
            KSA
          </span>
          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
            City
          </span>
        </div>
      </div>

      {/* IMAGE */}
      <div className="flex justify-center my-12">
        <div className="rounded-[120px] overflow-hidden">
          <Image
            src={city.cityImage || "/citiesbg.webp"}
            alt={city.cityName}
            width={250}
            height={280}
            className="object-cover w-[130px] h-[170px] group-hover:scale-105 transition"
          />
        </div>
      </div>

      {/* TITLE */}
      <div className="flex items-center justify-between gap-6">
        <h3 className="text-xl md:text-2xl font-medium leading-tight">
          {city.cityName} 
        </h3>

        <span className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center group-hover:bg-gray-100">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}