import Image from "next/image";
import { CardsBlock as CardsBlockType } from "@/lib/types/ministry";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type Props = {
  block: CardsBlockType;
};

export default function CardsBlock({ block }: Props) {
  return (
    <section className="py-20 bg-[#f7f7f7] w-full">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-12">

        {/* Heading */}
        {block.heading && (
          <h2 className="text-5xl font-semibold">
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
        <div className="grid md:grid-cols-3 gap-8">

          {block.cards?.map((card, i) => {

            const isMiddle = i === 1;

            return (
              <div
                key={i}
                className={`rounded-3xl p-10 flex flex-col items-center text-center transition
                ${isMiddle
                    ? "bg-[#176b67] text-white shadow-xl scale-105"
                    : "bg-white text-gray-700 shadow-sm"
                  }`}
              >

                {card.iconSvg && (
                  <Image
                    src={cloudinaryAutoWebp(card.iconSvg)}
                    alt={card.alt || ""}
                    width={50}
                    height={50}
                    className="mb-6"
                  />
                )}

                <p className="text-lg leading-relaxed max-w-xs">
                  {card.description}
                </p>

              </div>
            );
          })}

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
}