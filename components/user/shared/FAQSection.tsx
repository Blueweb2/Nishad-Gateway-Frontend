"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  title?: string;
  items: FAQItem[];
  imageUrl?: string;
  imageAlt?: string;
  ctaTitle?: string;
  ctaButtonText?: string;
  onCtaClick?: () => void;
};

export default function FAQSection({
  title = "Frequently Asked Questions",
  items,
  imageUrl,
  imageAlt = "FAQ image",
  ctaTitle,
  ctaButtonText,
  onCtaClick,
}: FAQSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center" data-navbar="light">
        
 {/* LEFT IMAGE BLOCK */}
{imageUrl && (
  <div className="relative w-full h-[720px] rounded-[32px] overflow-hidden">

    <img
      src={imageUrl}
      alt={imageAlt}
      className="w-full h-full object-cover"
    />

    {/* CTA CARD */}
    {ctaTitle && (
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl px-8 py-6 w-[85%] max-w-md">

        <p className="text-[10px] tracking-widest text-neutral-400 uppercase mb-3">
          Contact Us
        </p>

        <div className="flex items-center justify-between gap-6">
          <h4 className="text-xl font-semibold text-neutral-900 leading-snug">
            {ctaTitle}
          </h4>

          {ctaButtonText && (
<button
  onClick={onCtaClick}
  className="bg-[#0E7C2F] hover:bg-[#0b6a27] text-white text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
>
  {ctaButtonText  || "Talk to an Advisor"}
</button>
          )}
        </div>
      </div>
    )}
  </div>
)}

        {/* RIGHT FAQ */}
        <div>
          <h2 className="text-3xl font-semibold text-neutral-900">
            {title}
          </h2>

          <div className="mt-8 divide-y divide-neutral-200">
            {items.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <div key={index} className="py-5">
                  <button
                    onClick={() =>
                      setActiveIndex(isActive ? null : index)
                    }
                    className="w-full flex items-center justify-between text-left"
                  >
                    <span
                      className={`font-medium ${
                        isActive
                          ? "text-green-700"
                          : "text-neutral-900"
                      }`}
                    >
                      {item.question}
                    </span>

                    {isActive ? (
                      <X className="w-4 h-4 text-green-700" />
                    ) : (
                      <Plus className="w-4 h-4 text-neutral-500" />
                    )}
                  </button>

                  {/* Answer */}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isActive
                        ? "max-h-40 mt-3 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}