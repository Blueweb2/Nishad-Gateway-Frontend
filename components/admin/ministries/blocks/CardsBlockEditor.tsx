"use client";

import { Plus, Trash2 } from "lucide-react";

import {
  CardsBlock,
  MinistryBlock,
  CardItem,
} from "@/lib/types/ministry";

import ImagePicker from "../common/ImagePicker";

type Props = {
  block: CardsBlock;
  blocks: MinistryBlock[];
  setBlocks: React.Dispatch<React.SetStateAction<MinistryBlock[]>>;
};

export default function CardsBlockEditor({
  block,
  blocks,
  setBlocks,
}: Props) {

  const cards: CardItem[] = block.cards || [];

  const updateBlock = (data: Partial<CardsBlock>) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === block.id && b.type === "cards"
          ? { ...b, ...data }
          : b
      )
    );
  };

  const updateCards = (newCards: CardItem[]) => {
    updateBlock({ cards: newCards });
  };

  const addCard = () => {
    updateCards([
      ...cards,
      {
        iconSvg: "",
        iconPublicId: undefined,
        description: "",
        alt: "",
      },
    ]);
  };

  const removeCard = (index: number) => {
    updateCards(cards.filter((_, i) => i !== index));
  };

  const updateField = (
    index: number,
    field: keyof CardItem,
    value: string
  ) => {
    const updated = [...cards];
    updated[index][field] = value;
    updateCards(updated);
  };

  return (
    <div className="border border-green-700/30 rounded-xl p-6 bg-[#0b0f0b] space-y-6">

      <h3 className="text-lg font-semibold text-green-300">
        Cards Block
      </h3>

      {/* Heading */}
      <input
        type="text"
        placeholder="Main Heading"
        value={block.heading || ""}
        onChange={(e) =>
          updateBlock({ heading: e.target.value })
        }
        className="input"
      />

      {/* Sub text */}
      <input
        type="text"
        placeholder="Sub text"
        value={block.subText || ""}
        onChange={(e) =>
          updateBlock({ subText: e.target.value })
        }
        className="input"
      />

      {/* Cards */}
      <div className="space-y-4">

        {cards.map((card, index) => (
          <div
            key={index}
            className="border border-green-700/20 rounded-xl p-5 bg-[#0f150f] space-y-4"
          >

            {/* Header */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-400 font-medium">
                Card {index + 1}
              </span>

              <button
                type="button"
                onClick={() => removeCard(index)}
                className="flex items-center gap-1 text-red-400 text-xs hover:text-red-300"
              >
                <Trash2 size={14} />
                Remove
              </button>
            </div>

            {/* ICON PICKER */}
            <div className="space-y-2">
              <p className="text-sm text-white/60">Icon</p>

              <ImagePicker
                folder="nishad-gateway/ministries/cards"
                value={
                  card.iconSvg
                    ? {
                        url: card.iconSvg,
                        alt: card.alt || "",
                        publicId: card.iconPublicId,
                      }
                    : null
                }
                onChange={(val) => {
                  const updated = [...cards];

                  updated[index] = {
                    ...updated[index],
                    iconSvg: val?.url ?? "",
                    iconPublicId: val?.publicId,
                    alt:
                      val?.alt ||
                      updated[index].description ||
                      "Card icon",
                  };

                  updateCards(updated);
                }}
              />

              {!card.alt && card.iconSvg && (
                <p className="text-xs text-yellow-400">
                  ⚠️ Missing alt text
                </p>
              )}
            </div>

            {/* Description */}
            <textarea
              placeholder="Card description"
              value={card.description}
              onChange={(e) =>
                updateField(index, "description", e.target.value)
              }
              rows={2}
              className="input"
            />

          </div>
        ))}

      </div>

      {/* Add card */}
      <button
        type="button"
        onClick={addCard}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm"
      >
        <Plus size={16} />
        Add Card
      </button>

      {/* Bottom text */}
      <textarea
        placeholder="Bottom description"
        value={block.bottomText || ""}
        onChange={(e) =>
          updateBlock({ bottomText: e.target.value })
        }
        rows={3}
        className="input"
      />

    </div>
  );
}