"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export type FAQ = {
  q: string;
  a: string;
};

type Props = {
  faqHeading?: string;
  faqs: FAQ[];
};

export default function FaqSection({ faqHeading, faqs }: Props) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="w-full py-16 bg-white text-black">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-10">
        <h2 className="text-3xl md:text-4xl font-bold">
          {faqHeading || "Frequently Asked Questions"}
        </h2>

        <div className="mt-10 border-t border-gray-200">
          {faqs.map((faq, idx) => {
            const open = openFaqIndex === idx;

            return (
              <div key={idx} className="border-b border-gray-200 py-6">
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

                  <span className="ml-4">
                    {open ? (
                      <Minus className="w-5 h-5 text-teal-700" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-500" />
                    )}
                  </span>
                </button>

                {open && (
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed max-w-2xl">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
