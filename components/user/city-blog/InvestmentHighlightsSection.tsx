"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus } from "lucide-react";

type Props = {
  mainHeading: string;
  description: string;
  cards: {
    mainImage: string;
    subImage: string;
    title: string;
    subText: string;
  }[];
};

export default function InvestmentHighlightsSection({
  mainHeading,
  description,
  cards,
}: Props) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-24 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Section */}
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          <h2 className="text-4xl font-bold leading-tight">
            {mainHeading}
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            {description}
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-16">
          {cards.map((card, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div key={index} className="relative group">

                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src={card.mainImage}
                    alt={card.title}
                    width={700}
                    height={500}
                    className="object-cover w-full h-[420px] transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>

                {/* Floating Sub Image */}
                <div className="absolute -bottom-12 left-8 w-40 h-40 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                  <Image
                    src={card.subImage}
                    alt={`${card.title} sub`}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* White Expandable Card */}
                <div
                  className={`mt-20 bg-white rounded-2xl p-6 shadow-md max-w-md transition-all duration-300 ${
                    isExpanded ? "pb-8" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                      {card.title}
                    </h3>

                    <button
                      onClick={() => toggleCard(index)}
                      className="w-9 h-9 flex items-center justify-center rounded-full border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition"
                    >
                      <Plus
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isExpanded ? "rotate-45" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isExpanded
                        ? "max-h-40 opacity-100 mt-4"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {card.subText}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
