"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type EntityChooseQuestion = {
  question: string;
  options: { label: string; value: string }[];
  selectedValue?: string;
};

type Props = {
  entityChooseHeading: string;
  entityChooseSubheading: string;
  entityChooseQuestions: EntityChooseQuestion[];
};

export default function EntityChooseSection({
  entityChooseHeading,
  entityChooseSubheading,
  entityChooseQuestions,
}: Props) {
  const questions = useMemo(
    () => entityChooseQuestions || [],
    [entityChooseQuestions]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const scrollerRef = useRef<HTMLDivElement | null>(null);

  // init selected values from backend
  useEffect(() => {
    const initial: Record<number, string> = {};
    questions.forEach((q, i) => {
      if (q.selectedValue) initial[i] = q.selectedValue;
    });
    setAnswers(initial);
  }, [questions]);

  const handleSelect = (qIndex: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: value }));
    setActiveIndex(qIndex);
  };

  const getOptionClass = (
    isActiveCard: boolean,
    isSelected: boolean,
    optionIndex: number
  ) => {
    // screenshot style:
    // - active card = dark green
    // - selected = cyan (for "No") and green (for "Yes") feel
    if (!isActiveCard) {
      return `
        border border-gray-300 text-gray-700
        hover:bg-gray-100
      `;
    }

    if (isSelected) {
      // make first option cyan, second green (nice UX)
      if (optionIndex === 0) {
        return `
          bg-cyan-400 text-black border border-cyan-400
          shadow-md
        `;
      }
      return `
        bg-green-600 text-white border border-green-600
        shadow-md
      `;
    }

    return `
      border border-white/40 text-white/90
      hover:bg-white/10
    `;
  };

  if (!questions.length) return null;

  return (
    <section className="w-full py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Heading */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-semibold text-black">
            {entityChooseHeading || "How to Choose the Right Entity Type"}
          </h2>

          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            {entityChooseSubheading ||
              "Answer a few key questions to identify the most suitable structure for your business."}
          </p>
        </div>

        {/* Cards Scroll */}
        <div className="mt-10">
          <div
            ref={scrollerRef}
            className="
              flex gap-6 overflow-x-auto pb-4
              scroll-smooth
              [&::-webkit-scrollbar]:h-2
              [&::-webkit-scrollbar-thumb]:bg-gray-200
              [&::-webkit-scrollbar-track]:bg-transparent
            "
          >
            {questions.map((q, qIndex) => {
              const isActiveCard = qIndex === activeIndex;
              const selectedValue = answers[qIndex];

              return (
                <div
                  key={qIndex}
                  onClick={() => setActiveIndex(qIndex)}
                  className={`
                    min-w-[280px] md:min-w-[320px]
                    rounded-[26px]
                    px-8 py-8
                    transition-all duration-300
                    cursor-pointer
                    shadow-sm
                    ${
                      isActiveCard
                        ? "bg-[#0b6a66] text-white shadow-lg"
                        : "bg-[#f7f7f7] text-black"
                    }
                  `}
                >
                  {/* Question */}
                  <p
                    className={`text-base md:text-lg leading-relaxed ${
                      isActiveCard ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {q.question}
                  </p>

                  {/* Options */}
                  <div className="mt-8 flex gap-4">
                    {(q.options || []).slice(0, 2).map((opt, optIndex) => {
                      const isSelected = selectedValue === opt.value;

                      return (
                        <button
                          key={optIndex}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelect(qIndex, opt.value);
                          }}
                          className={`
                            w-[74px] h-[74px]
                            rounded-[22px]
                            flex items-center justify-center
                            text-sm font-medium
                            transition
                            ${getOptionClass(
                              isActiveCard,
                              isSelected,
                              optIndex
                            )}
                          `}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Optional small helper */}
          <p className="text-center text-xs text-gray-400 mt-4">
            Tip: Scroll horizontally to answer all questions.
          </p>
        </div>
      </div>
    </section>
  );
}
