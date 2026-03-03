"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EntityChooseQuestion } from "@/lib/types/entityChoose.types";

type Props = {
  entityChooseHeading: string;
  entityChooseSubheading: string;
  entityChooseQuestions: EntityChooseQuestion[];
};

export default function EntityChooseSection({
  entityChooseHeading,
  entityChooseSubheading,
  entityChooseQuestions,
}: Props) {
  if (!entityChooseQuestions?.length) return null;

  return (
    <section className="w-full py-20 bg-[#f3f3f3]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Heading */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-semibold text-black">
            {entityChooseHeading}
          </h2>

          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            {entityChooseSubheading}
          </p>
        </div>

        {/* Horizontal Cards */}
        <div className="mt-12 flex gap-6 overflow-x-auto pb-4 scroll-smooth">
          {entityChooseQuestions.map((item, index) => (
            <div
              key={index}
              className="
                min-w-[260px] md:min-w-[300px]
                bg-white
                rounded-3xl
                px-8 py-10
                shadow-sm
                hover:shadow-md
                transition
              "
            >
              {/* Description */}
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                {item.description}
              </p>

              {/* Arrow Button */}
              <div className="mt-10 flex justify-end">
                <Link
                  href={item.linkUrl}
                  className="
                    w-12 h-12
                    rounded-full
                    border border-gray-300
                    flex items-center justify-center
                    hover:bg-[#0b6a66]
                    hover:text-white
                    transition
                  "
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}