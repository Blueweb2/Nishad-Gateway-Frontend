"use client";

import { Plus, Trash2 } from "lucide-react";

import {
  FAQBlock,
  MinistryBlock,
  FAQItem,
} from "@/lib/types/ministry";

import ImagePicker from "../common/ImagePicker";

type Props = {
  block: FAQBlock;
  blocks: MinistryBlock[];
  setBlocks: React.Dispatch<React.SetStateAction<MinistryBlock[]>>;
};

export default function FAQBlockEditor({
  block,
  blocks,
  setBlocks,
}: Props) {

  const faqs: FAQItem[] = block.faqs || [];

  const updateBlock = (data: Partial<FAQBlock>) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === block.id && b.type === "faq"
          ? { ...b, ...data }
          : b
      )
    );
  };

  /* ---------------- FAQ FUNCTIONS ---------------- */

  const addFAQ = () => {
    updateBlock({
      faqs: [...faqs, { q: "", a: "" }],
    });
  };

  const removeFAQ = (index: number) => {
    updateBlock({
      faqs: faqs.filter((_, i) => i !== index),
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
    <div className="border border-green-700/30 rounded-xl p-6 space-y-6 bg-[#0b0f0b]">

      <h3 className="text-lg font-semibold text-green-300">
        FAQ Block
      </h3>

      {/* ================= IMAGE PICKER ================= */}
      <div className="space-y-2">
        <p className="text-sm text-white/60">FAQ Image</p>

        <ImagePicker
          folder="nishad-gateway/ministries/faq"
          value={
            block.faqImage
              ? {
                  url: block.faqImage,
                  alt: block.faqImageAlt || "",
                  publicId: block.faqImagePublicId,
                }
              : null
          }
          onChange={(val) => {
            updateBlock({
              faqImage: val?.url ?? "",
              faqImagePublicId: val?.publicId ?? undefined,
              faqImageAlt:
                val?.alt || "FAQ illustration",
            });
          }}
        />

        <p className="text-[10px] text-white/40">
          Add alt text for SEO & accessibility
        </p>

        {!block.faqImageAlt && block.faqImage && (
          <p className="text-xs text-yellow-400">
            ⚠️ Missing alt text
          </p>
        )}
      </div>

      {/* ================= FAQ LIST ================= */}
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-green-700/20 p-4 rounded-lg space-y-3 bg-[#0f150f]"
        >

          <input
            placeholder="Question"
            value={faq.q}
            onChange={(e) =>
              updateField(index, "q", e.target.value)
            }
            className="input w-full"
          />

          <textarea
            placeholder="Answer"
            value={faq.a}
            onChange={(e) =>
              updateField(index, "a", e.target.value)
            }
            rows={3}
            className="input w-full"
          />

          <button
            type="button"
            onClick={() => removeFAQ(index)}
            className="flex items-center gap-2 text-red-400 text-sm"
          >
            <Trash2 size={14} />
            Remove FAQ
          </button>

        </div>
      ))}

      {/* Add FAQ */}
      <button
        type="button"
        onClick={addFAQ}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm"
      >
        <Plus size={16} />
        Add FAQ
      </button>

    </div>
  );
}