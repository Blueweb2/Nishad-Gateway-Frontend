import Image from "next/image";
import { FAQBlock as FAQBlockType } from "@/lib/types/ministry";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type Props = {
  block: FAQBlockType;
};

export default function FAQBlock({ block }: Props) {

  return (
    <div className="grid md:grid-cols-2 gap-10">

      {block.faqImage && (
        <Image
          src={cloudinaryAutoWebp(block.faqImage)}
          alt={block.faqImageAlt || "FAQ"}
          width={600}
          height={500}
          className="rounded-3xl object-cover"
        />
      )}

      <div className="space-y-6">

        {block.faqs?.map((faq, i) => (
          <div key={i} className="border-b pb-4">

            <h3 className="font-medium">
              {faq.q}
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              {faq.a}
            </p>

          </div>
        ))}

      </div>

    </div>
  );

}