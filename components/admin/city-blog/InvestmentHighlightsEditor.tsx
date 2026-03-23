"use client";

import { Plus, Trash } from "lucide-react";

import type {
  CityBlogSection,
  InvestmentHighlightsContent,
} from "@/lib/types/city-blog";


import RichTextEditor from "../common/RichTextEditor";
import MiniTextEditor from "../common/MiniTextEditor";
import ImagePicker from "../common/ImagePicker";


type Props = {
  section: CityBlogSection<"INVESTMENT_HIGHLIGHTS">;
  onChange: (updated: CityBlogSection) => void;
};

export default function InvestmentHighlightsEditor({
  section,
  onChange,
}: Props) {
  const content = section.content as InvestmentHighlightsContent;


  /* ================= UPDATE CONTENT ================= */
  const updateContent = (newContent: InvestmentHighlightsContent) => {
    onChange({ ...section, content: newContent });
  };

  /* ================= UPDATE CARD FIELD ================= */
  const updateCardField = (
    index: number,
    updates: Partial<InvestmentHighlightsContent["cards"][number]>
  ) => {
    const updated = [...content.cards];
    updated[index] = { ...updated[index], ...updates };

    updateContent({ ...content, cards: updated });
  };

  /* ================= ADD CARD ================= */
  const addCard = () => {
    updateContent({
      ...content,
      cards: [
        ...content.cards,
        {
          mainImage: "",
          mainImagePublicId: undefined,
          mainImageAlt: "",
          title: "",
          subText: "",
          subImage: "",
        }
      ],
    });
  };

  /* ================= REMOVE CARD ================= */
  const removeCard = (index: number) => {
    // 🔥 Only update state — backend cleans images on save
    const updated = content.cards.filter((_, i) => i !== index);
    updateContent({ ...content, cards: updated });
  };



  return (
    <div className="space-y-8 mt-6">

      {/* ================= MAIN HEADING ================= */}
      <input
        placeholder="Main Heading"
        value={content.mainHeading}
        onChange={(e) =>
          updateContent({
            ...content,
            mainHeading: e.target.value,
          })
        }
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      {/* ================= DESCRIPTION ================= */}
      <MiniTextEditor
        value={content.description || ""}
        onChange={(val) =>
          updateContent({
            ...content,
            description: val,
          })
        }
      />
      {/* ================= CARDS ================= */}
      <div className="space-y-6">

        <div className="flex justify-between items-center">
          <h3 className="text-white font-medium">Cards</h3>

          <button
            type="button"
            onClick={addCard}
            className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300"
          >
            <Plus size={16} />
            Add Card
          </button>
        </div>

        {content.cards.map((card, index) => {

          return (
            <div
              key={index}
              className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4"
            >

              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">
                  Card {index + 1}
                </span>

                <button
                  type="button"
                  onClick={() => removeCard(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash size={16} />
                </button>
              </div>

              {/* Title */}
              <input
                placeholder="Card Title"
                value={card.title}
                onChange={(e) =>
                  updateCardField(index, { title: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
              />

              {/* Sub Text */}
              <div className="space-y-2">
                <p className="text-sm text-white/60">Card Sub Text</p>

                <RichTextEditor
                  value={card.subText}
                  onChange={(val) =>
                    updateCardField(index, { subText: val })
                  }
                />
              </div>

              {/* MAIN IMAGE */}
              <div className="space-y-2">
                <p className="text-sm text-white/60">Main Image</p>

                <ImagePicker
                  folder="nishad-gateway/cities/investment"
                  value={
                    card.mainImage
                      ? {
                        url: card.mainImage,
                        alt: card.mainImageAlt || "",
                        publicId: card.mainImagePublicId,
                      }
                      : null
                  }
                  onChange={(val) => {
                    updateCardField(index, {
                      mainImage: val?.url ?? "",
                      mainImagePublicId: val?.publicId ?? undefined,
                      mainImageAlt:
                        val?.alt ||
                        card.title ||
                        content.mainHeading ||
                        "Investment highlight image",
                    });
                  }}
                />
                {!card.mainImage && (
                  <p className="text-xs text-red-400">
                    ⚠️ Image required
                  </p>
                )}

                <p className="text-[10px] text-white/40">
                  Add alt text for SEO & accessibility
                </p>

                {!card.mainImageAlt && card.mainImage && (
                  <p className="text-xs text-yellow-400">
                    ⚠️ Missing alt text
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
