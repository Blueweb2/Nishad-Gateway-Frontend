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
    <section className="bg-[#efefef] py-[8vh]" data-navbar="light">
      <div className="w-[90vw] mx-auto">

        {/* HEADING */}
        <h2 className="text-center text-[2.4vw] font-semibold mb-[6vh]">
          {heading}
        </h2>

        {/* FLEX EXPAND LAYOUT */}
        <div className="flex gap-[2vw] h-[65vh]">

          {cards.map((card, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                onMouseEnter={() => setActiveIndex(index)}
                className={`
                  relative 
                  rounded-[1.5vw] 
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

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Caption */}
                <div className="absolute bottom-[3vh] left-[2vw] right-[2vw] w-40 text-white text-[1vw] transition-opacity duration-500 z-20">
                  {card.caption}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/10" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
