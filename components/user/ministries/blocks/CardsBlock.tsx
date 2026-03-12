import Image from "next/image";
import { CardsBlock as CardsBlockType } from "@/lib/types/ministry";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type Props = {
  block: CardsBlockType;
};

export default function CardsBlock({ block }: Props) {
  return (
    <section className="py-12 lg:py-20 bg-[#f7f7f7] w-full">
      <div className="max-w-7xl mx-auto text-center space-y-12">

        {/* Heading */}
        {block.heading && (
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
            {block.heading}
          </h2>
        )}

        {/* Sub Text */}
        {block.subText && (
          <p className="text-gray-600 max-w-xl mx-auto">
            {block.subText}
          </p>
        )}

        {/* Cards */}
        <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 hide-scrollbar">

          {block.cards?.map((card, i) => (
            <div
              key={i}
              className="
                snap-start
                min-w-[260px] sm:min-w-[300px] md:min-w-0
                group
                rounded-3xl
                p-8 md:p-10
                flex flex-col items-center text-center
                transition-all duration-300
                bg-white text-gray-700 shadow-sm
                hover:bg-[#176b67] hover:text-white
                hover:shadow-xl hover:scale-105
              "
            >
              {/* Icon */}
              {card.iconSvg && (
                <Image
                  src={cloudinaryAutoWebp(card.iconSvg)}
                  alt={card.alt || ""}
                  width={50}
                  height={50}
                  className="mb-6 transition filter invert group-hover:invert-0"
                />
              )}

              {/* Description */}
              <p className="text-base md:text-lg leading-relaxed max-w-xs">
                {card.description}
              </p>

            </div>
          ))}
        </div>

        {/* Bottom Text */}
        {block.bottomText && (
          <p className="text-gray-600 text-sm max-w-3xl mx-auto">
            {block.bottomText}
          </p>
        )}

      </div>
    </section>
  );
};