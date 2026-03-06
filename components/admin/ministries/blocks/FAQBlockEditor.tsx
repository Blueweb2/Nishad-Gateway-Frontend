"use client";

import { Plus, Trash2 } from "lucide-react";

export default function FAQBlockEditor({
  block,
  blocks,
  setBlocks,
}: any) {

  const faqs = block.faqs || [];

  const updateBlock = (data: any) => {
    const updated = blocks.map((b: any) =>
      b === block ? { ...b, ...data } : b
    );
    setBlocks(updated);
  };

  const addFAQ = () => {
    updateBlock({
      faqs: [...faqs, { q: "", a: "" }],
    });
  };

  const removeFAQ = (index: number) => {
    updateBlock({
      faqs: faqs.filter((_: any, i: number) => i !== index),
    });
  };

  const updateField = (
    index: number,
    field: "q" | "a",
    value: string
  ) => {
    const updated = [...faqs];
    updated[index][field] = value;
    updateBlock({ faqs: updated });
  };

  return (
    <div className="border border-green-700/30 rounded-xl p-6 space-y-5 bg-[#0b0f0b]">

      <h3 className="text-lg font-semibold text-green-300">
        FAQ Block
      </h3>

      {faqs.map((faq: any, index: number) => (
        <div key={index} className="border p-4 rounded-lg space-y-3">

          <input
            placeholder="Question"
            value={faq.q}
            onChange={(e) =>
              updateField(index, "q", e.target.value)
            }
            className="input"
          />

          <textarea
            placeholder="Answer"
            value={faq.a}
            onChange={(e) =>
              updateField(index, "a", e.target.value)
            }
            rows={3}
            className="input"
          />

          <button
            onClick={() => removeFAQ(index)}
            className="flex items-center gap-2 text-red-400 text-sm"
          >
            <Trash2 size={14} />
            Remove FAQ
          </button>

        </div>
      ))}

      <button
        onClick={addFAQ}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg text-sm"
      >
        <Plus size={16} />
        Add FAQ
      </button>

    </div>
  );
}