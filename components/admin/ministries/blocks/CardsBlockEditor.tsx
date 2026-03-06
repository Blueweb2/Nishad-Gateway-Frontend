"use client";

import { Plus, Trash2, Upload } from "lucide-react";
import toast from "react-hot-toast";

import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

import { CardsBlock, MinistryBlock, CardItem } from "@/lib/types/ministry";

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
        iconPublicId: "",
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

  /* ---------- Upload Icon ---------- */

  const handleUpload = async (file: File, index: number) => {
    try {

      const upload = await uploadToCloudinarySigned(
        file,
        "nishad-gateway/ministries/cards"
      );

      const updated = [...cards];

      updated[index].iconSvg = upload.secure_url;
      updated[index].iconPublicId = upload.public_id;

      updateCards(updated);

      toast.success("Icon uploaded");

    } catch {
      toast.error("Upload failed");
    }
  };

  /* ---------- Delete Icon ---------- */

  const deleteIcon = async (index: number) => {

    const publicId = cards[index]?.iconPublicId;
    if (!publicId) return;

    try {

      await fetch("/api/delete-cloudinary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });

      const updated = [...cards];
      updated[index].iconSvg = "";
      updated[index].iconPublicId = "";

      updateCards(updated);

      toast.success("Icon deleted");

    } catch {
      toast.error("Delete failed");
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

      {/* Icon Row */}

      <div className="flex items-center gap-4">

        {/* Icon preview */}

        <div className="w-16 h-16 flex items-center justify-center border border-green-700/30 rounded-lg bg-black/30">

          {card.iconSvg ? (
            <img
              src={cloudinaryAutoWebp(card.iconSvg)}
              alt={card.alt || "Card icon"}
              className="w-10 h-10 object-contain"
            />
          ) : (
            <span className="text-xs text-gray-500">
              No Icon
            </span>
          )}

        </div>

        {/* Upload */}

        <label className="flex items-center gap-2 px-4 py-2 border border-green-700/40 rounded-lg cursor-pointer hover:bg-green-900/20 text-sm">

          <Upload size={16} />
          Upload Icon

          <input
            type="file"
            accept="image/svg+xml,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file, index);
            }}
          />

        </label>

        {/* Delete icon */}

        {card.iconSvg && (
          <button
            type="button"
            onClick={() => deleteIcon(index)}
            className="text-red-400 text-sm hover:text-red-300"
          >
            Delete
          </button>
        )}

      </div>

      {/* Alt text */}

      <input
        type="text"
        placeholder="Icon alt text"
        value={card.alt || ""}
        onChange={(e) =>
          updateField(index, "alt", e.target.value)
        }
        className="input"
      />

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