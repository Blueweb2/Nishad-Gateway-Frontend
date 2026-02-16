import Link from "next/link";
import { BusinessSetupOptionsContent } from "@/lib/types/city-blog";
import { ArrowRight } from "lucide-react";

type Props = BusinessSetupOptionsContent;

export default function BusinessSetupOptionsSection({
  heading,
  description,
  options,
  decisionFlow,
  bottomText,
}: Props) {
  return (
    <section className="py-24 bg-[#f4f4f4] text-center">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-4xl font-bold mb-4">
          {heading}
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-12">
          {description}
        </p>

        {/* Cards */}
<div className="flex gap-6  pb-6 scrollbar-hide">
  {options.map((item, i) => (
    <Link
      key={i}
      href={item.link}
      className="
        w-[260px]
        h-[260px]
        p-6
        rounded-2xl
        bg-white
        shadow-md
        transition-all
        duration-300
        hover:bg-teal-700
        hover:text-white
        hover:shadow-xl
        hover:scale-105
        flex
        items-center
        justify-between
        group
      "
    >
      <h3 className="font-semibold text-lg transition-colors duration-300">
        {item.title}
      </h3>

      {/* Arrow Button */}
      <div
        className="
          w-12 h-14
          rounded-full
          border
          border-gray-300
          flex
          items-center
          justify-center
          transition-all
          duration-300
          group-hover:border-white
          group-hover:bg-white/20
        "
      >
        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>
    </Link>
  ))}
</div>

        {/* Decision Flow (Optional) */}
        {decisionFlow && (
          <p className="mt-10 text-gray-700 font-medium">
            {decisionFlow}
          </p>
        )}

        {/* Bottom Text (Optional) */}
        {bottomText && (
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            {bottomText}
          </p>
        )}

      </div>
    </section>
  );
}
