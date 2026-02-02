"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";

export type FAQ = {
  q: string;
  a: string;
};

type Props = {
  faqHeading?: string;
  faqs: FAQ[];
  faqImage?: string;
  faqCtaText?: string;
};

export default function FaqSection({
  faqHeading,
  faqs,
  faqImage,
  faqCtaText,
}: Props) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
<section className="w-full pt-32 pb-20 bg-[#f5f5f5] relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* LEFT SIDE */}
        <div className="relative rounded-[32px] overflow-hidden h-[500px] lg:h-[600px]">

          {faqImage && (
            <Image
              src={faqImage}
              alt="FAQ"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          )}

          {/* CTA CARD */}
          <div className="absolute bottom-10 left-10 bg-white rounded-3xl p-8 shadow-xl max-w-md">
            <p className="text-xs tracking-wide text-gray-500 uppercase">
              Contact Us
            </p>

            <h3 className="mt-3 text-2xl font-semibold text-black leading-snug">
              {faqCtaText || "Need clarity on your entity type?"}
            </h3>

            <Link
              href="/contact"
              className="inline-block mt-6 px-6 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            {faqHeading || "Frequently Asked Questions"}
          </h2>

          <div className="mt-10 border-t border-gray-300">
            {faqs.map((faq, idx) => {
              const open = openFaqIndex === idx;

              return (
                <div key={idx} className="border-b border-gray-300 py-6">
                  <button
                    onClick={() => setOpenFaqIndex(open ? null : idx)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <p
                      className={`text-lg font-medium ${
                        open ? "text-teal-700" : "text-gray-900"
                      }`}
                    >
                      {faq.q}
                    </p>

                    {open ? (
                      <Minus className="w-5 h-5 text-teal-700" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-500" />
                    )}
                  </button>

                  {open && (
                    <p className="mt-3 text-sm text-gray-600 leading-relaxed max-w-xl">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
