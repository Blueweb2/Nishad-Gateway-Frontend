import Image from "next/image";
import { SliderBlock as SliderBlockType } from "@/lib/types/ministry";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type Props = {
  block: SliderBlockType;
};

export default function SliderBlock({ block }: Props) {

  return (
    <div className="space-y-6">

      {block.heading && (
        <h2 className="text-2xl font-semibold">
          {block.heading}
        </h2>
      )}

      <div className="grid md:grid-cols-3 gap-6">

        {block.slides?.map((slide, i) => (
          <div key={i} className="space-y-3">

            {slide.image && (
              <Image
                src={cloudinaryAutoWebp(slide.image)}
                alt={slide.alt || slide.title}
                width={400}
                height={260}
                className="rounded-xl object-cover"
              />
            )}

            <h3 className="font-semibold">
              {slide.title}
            </h3>

            {slide.description && (
              <p className="text-gray-500 text-sm">
                {slide.description}
              </p>
            )}

          </div>
        ))}

      </div>
    </div>
  );

}