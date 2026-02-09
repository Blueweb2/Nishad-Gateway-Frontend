"use client";

import Image from "next/image";

type Props = {
  heading: string;
  description: string;
  highlights: {
    number: string;
    title: string;
    imageUrl: string;
  }[];
};

export default function InvestmentHighlightsSection({
  heading,
  description,
  highlights,
}: Props) {
  return (
    <section className="py-24 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          <h2 className="text-4xl font-bold leading-tight">
            {heading}
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="relative rounded-3xl overflow-hidden shadow-lg group"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={600}
                height={500}
                className="object-cover w-full h-[420px]"
              />

              <div className="absolute inset-0 bg-black/40 flex items-end p-8">
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <span className="text-sm text-gray-400">
                    {item.number}
                  </span>
                  <h3 className="text-xl font-semibold mt-2">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
