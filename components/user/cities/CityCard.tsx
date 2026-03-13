"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CityCard({ city, index, total }: any) {

  const isLastColumn = index % 3 === 2;
  const hasBottom = index + 3 < total;

  return (
<Link
  href={`/cities/${city.citySlug}`}
  className="relative group flex flex-col justify-between px-6 py-6"
>
      {/* TOP */}
      <div className="flex items-start justify-between text-sm text-gray-400">
        <span className="text-2xl font-light"></span>

        <div className="flex gap-2">
       
           <h3 className="text-xl md:text-2xl font-medium leading-tight">
          {city.cityName}
        </h3>
           <span className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center group-hover:bg-gray-100">
          <ArrowUpRight className="w-4 h-4" />
        </span>
        </div>
      </div>

      {/* IMAGE */}
      <div className="flex justify-center my-6">
        <div className="rounded-[160px] overflow-hidden">
          <Image
            src={city.cityImage || "/citiesbg.webp"}
            alt={city.cityName}
            width={130}
            height={200}
            className="object-cover w-[130px] h-[200px] group-hover:scale-105 transition"
          />
        </div>
      </div>

      {/* TITLE */}
      <div className="flex items-center justify-between gap-6">
        <p className="text-xs md:text-xs lg:text-xs font-small leading-tight">
          {city.description}
        </p>

        {/* <span className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center group-hover:bg-gray-100">
          <ArrowUpRight className="w-4 h-4" />
        </span> */}
      </div>
    </Link>
  );
}