import Image from "next/image";
import { CardsBlock as CardsBlockType } from "@/lib/types/ministry";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type Props = {
  block: CardsBlockType;
};

export default function CardsBlock({ block }: Props) {

  return (
    <div className="space-y-8">

      {block.heading && (
        <h2 className="text-2xl font-semibold">
          {block.heading}
        </h2>
      )}

      <div className="grid md:grid-cols-3 gap-6">

        {block.cards?.map((card, i) => (
          <div
            key={i}
            className="p-6 border rounded-xl space-y-4"
          >

            {card.iconSvg && (
              <Image
                src={cloudinaryAutoWebp(card.iconSvg)}
                alt={card.alt || ""}
                width={40}
                height={40}
              />
            )}

            <p className="text-gray-600">
              {card.description}
            </p>

          </div>
        ))}

      </div>

      {block.bottomText && (
        <p className="text-gray-500 text-sm">
          {block.bottomText}
        </p>
      )}

    </div>
  );

}