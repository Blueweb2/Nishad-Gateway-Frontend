"use client";

import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type Card = {
  icon: string;
  description: string;
};

type Props = {
  block: {
    type: "cards";
    heading: string;
    subText?: string;
    bottomText?: string;
    cards: Card[];
  };
  blocks: any[];
  setBlocks: (blocks: any[]) => void;
};

export default function CardsBlockEditor({
  block,
  blocks,
  setBlocks,
}: Props) {

  const cards = block.cards || [];

  const updateBlock = (data: any) => {
    const updated = blocks.map((b) =>
      b === block ? { ...b, ...data } : b
    );
    setBlocks(updated);
  };

  const updateCards = (newCards: Card[]) => {
    updateBlock({ cards: newCards });
  };

  const addCard = () => {
    updateCards([
      ...cards,
      { icon: "", description: "" },
    ]);
  };

  const removeCard = (index: number) => {
    updateCards(cards.filter((_, i) => i !== index));
  };

  const updateField = (
    index: number,
    field: keyof Card,
    value: string
  ) => {
    const updated = [...cards];
    updated[index][field] = value;

    updateCards(updated);
  };

  const handleUpload = async (file: File, index: number) => {
    try {
      const upload = await uploadToCloudinarySigned(
        file,
        "ministries/cards"
      );

      updateField(index, "icon", upload.secure_url);

      toast.success("Icon uploaded");
    } catch {
      toast.error("Upload failed");
    }
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
            className="border border-green-700/20 rounded-lg p-4 space-y-3"
          >

            {/* Upload icon */}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file, index);
              }}
              className="input"
            />

            {/* Icon preview */}

            {card.icon && (
              <img
                src={cloudinaryAutoWebp(card.icon)}
                className="w-14 h-14 object-contain"
              />
            )}

            {/* Description */}

            <textarea
              placeholder="Card description"
              value={card.description}
              onChange={(e) =>
                updateField(
                  index,
                  "description",
                  e.target.value
                )
              }
              rows={2}
              className="input"
            />

            {/* Remove */}

            <button
              type="button"
              onClick={() => removeCard(index)}
              className="flex items-center gap-2 text-red-400 text-sm"
            >
              <Trash2 size={14} />
              Remove Card
            </button>
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