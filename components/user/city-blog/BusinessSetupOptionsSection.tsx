import { BusinessSetupOptionsContent } from "@/lib/types/city-blog";

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

        <h2 className="text-4xl font-bold mb-4">
          {heading}
        </h2>

        <p className="text-gray-600 mb-12">
          {description}
        </p>

        <div className="flex gap-6 overflow-x-auto pb-6">
          {options.map((item, i) => (
            <div
              key={i}
              className={`min-w-[260px] p-6 rounded-2xl shadow-md transition ${
                item.isFeatured
                  ? "bg-teal-700 text-white"
                  : "bg-white"
              }`}
            >
              <h3 className="font-semibold text-lg">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        <p className="mt-10 text-gray-700 font-medium">
          {decisionFlow}
        </p>

        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          {bottomText}
        </p>
      </div>
    </section>
  );
}
