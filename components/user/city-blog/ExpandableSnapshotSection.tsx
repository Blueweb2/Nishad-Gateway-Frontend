"use client";

import { useState } from "react";
import Image from "next/image";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type Card = {
  imageUrl: string;
  caption: string;
};

type Props = {
  heading: string;
  cards: Card[];
};

export default function ExpandableSnapshotSection({
  heading,
  cards,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);


  return (
    <section className="bg-[#efefef] py-12 md:py-[8vh]" data-navbar="light">
      <div className="w-[92%] md:w-[90vw] mx-auto">

        {/* HEADING */}
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-[2.4vw] font-semibold mb-10 md:mb-[6vh]">
          {heading}
        </h2>

        {/* DESKTOP / TABLET EXPAND LAYOUT */}
        <div className="hidden md:flex gap-4 md:gap-[2vw] h-[420px] lg:h-[65vh]">

          {cards.map((card, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                onMouseEnter={() => setActiveIndex(index)}
                className={`
                  relative
                  rounded-xl lg:rounded-[1.5vw]
                  overflow-hidden
                  cursor-pointer
                  transition-all
                  duration-700
                  ease-in-out
                  ${isActive ? "flex-[2]" : "flex-[1]"}
                `}
              >

                {/* Image */}
                <Image
                  src={cloudinaryAutoWebp(card.imageUrl)}
                  alt={card.caption}
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Caption */}
                <div className="absolute bottom-6 left-5 right-5 text-white text-sm lg:text-[1vw] max-w-[180px] z-20">
                  {card.caption}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/10" />

              </div>
            );
          })}

        </div>


        {/* MOBILE SCROLL VERSION */}
        <div className="flex md:hidden gap-4 overflow-x-auto hide-scrollbar">

          {cards.map((card, index) => (
            <div
              key={index}
              className="relative min-w-[260px] h-[340px] rounded-xl overflow-hidden shrink-0"
            >

              <Image
                src={cloudinaryAutoWebp(card.imageUrl)}
                alt={card.caption}
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/30" />

              <div className="absolute bottom-5 left-4 right-4 text-white text-sm z-20">
                {card.caption}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

            </div>
          ))}

        </div>

      </div>
    </section>
  );

};