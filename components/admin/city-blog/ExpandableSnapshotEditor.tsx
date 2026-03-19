"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import ImagePicker from "../common/ImagePicker";

import type { ExpandableSnapshotSectionContent } from "@/lib/types/city-blog";

type Props = {
  content: ExpandableSnapshotSectionContent;
  onChange: (updated: ExpandableSnapshotSectionContent) => void;
};

export default function ExpandableSnapshotEditor({
  content,
  onChange,
}: Props) {

  /* ================= UPDATE CARD ================= */
  const updateCard = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...content.cards];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...content, cards: updated });
  };

  /* ================= ADD CARD ================= */
  const addCard = () => {
    onChange({
      ...content,
      cards: [
        ...content.cards,
        { imageUrl: "", imagePublicId: "", caption: "" },
      ],
    });
  };

  /* ================= REMOVE CARD ================= */
  const removeCard = (index: number) => {
    onChange({
      ...content,
      cards: content.cards.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6 mt-4">

      {/* HEADING */}
      <input
        placeholder="Section heading"
        value={content.heading}
        onChange={(e) =>
          onChange({ ...content, heading: e.target.value })
        }
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      {/* CARDS */}
      {content.cards.map((card, index) => (
        <div
          key={index}
          className="rounded-xl border border-white/10 bg-black/30 p-5 space-y-4"
        >

          {/* Caption */}
          <input
            placeholder="Caption text"
            value={card.caption}
            onChange={(e) =>
              updateCard(index, "caption", e.target.value)
            }
            className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
          />

          {/* Image Picker */}
          <div>
            <p className="text-xs text-white/60 mb-2">
              Snapshot Image
            </p>

            <ImagePicker
              value={
                card.imageUrl
                  ? {
                      url: card.imageUrl,
                      publicId: card.imagePublicId,
                      alt: card.caption || "",
                    }
                  : null
              }
              folder="nishad-gateway/cities/snapshot"
              onChange={(img) => {
                const updated = [...content.cards];

                updated[index] = {
                  ...updated[index],
                  imageUrl: img?.url || "",
                  imagePublicId: img?.publicId || "",
                };

                onChange({ ...content, cards: updated });
              }}
            />
          </div>

          {/* Remove Card */}
          <button
            onClick={() => removeCard(index)}
            className="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm"
          >
            <Trash2 size={16} />
            Remove Card
          </button>
        </div>
      ))}

      {/* Add Card */}
      <button
        onClick={addCard}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition"
      >
        <Plus size={16} />
        Add Snapshot Card
      </button>
    </div>
  );
}