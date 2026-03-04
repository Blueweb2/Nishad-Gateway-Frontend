"use client";

import toast from "react-hot-toast";
import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  data: {
    items: FAQItem[];
    imageUrl?: string;
    imageAlt?: string;
  };
  onChange: (data: any) => void;
}

export default function FAQBlockEditor({ data, onChange }: Props) {
  /* ================= ITEM UPDATE ================= */
  const updateItem = (index: number, updatedItem: FAQItem) => {
    const updated = [...data.items];
    updated[index] = updatedItem;
    onChange({ ...data, items: updated });
  };

  /* ================= ADD ITEM ================= */
  const addItem = () => {
    onChange({
      ...data,
      items: [...data.items, { question: "", answer: "" }],
    });
  };

  /* ================= REMOVE ITEM ================= */
  const removeItem = (index: number) => {
    const updated = data.items.filter((_, i) => i !== index);
    onChange({ ...data, items: updated });
  };

  /* ================= MOVE ================= */
  const moveItemUp = (index: number) => {
    if (index === 0) return;
    const updated = [...data.items];
    [updated[index - 1], updated[index]] = [
      updated[index],
      updated[index - 1],
    ];
    onChange({ ...data, items: updated });
  };

  const moveItemDown = (index: number) => {
    if (index === data.items.length - 1) return;
    const updated = [...data.items];
    [updated[index + 1], updated[index]] = [
      updated[index],
      updated[index + 1],
    ];
    onChange({ ...data, items: updated });
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = async (file: File) => {
    try {
      const uploaded = await uploadToCloudinarySigned(
        file,
        "nishad-gateway/cities/snapshot"
      );

      const imageUrl = cloudinaryAutoWebp(uploaded.secure_url);

      onChange({
        ...data,
        imageUrl,
        imageAlt: "FAQ Image",
      });

      toast.success("FAQ image uploaded");
    } catch {
      toast.error("Upload failed");
    }
  };

  return (
    <div className="space-y-6 border border-gray-700 p-6 rounded-lg bg-[#0f0f0f]">

      {/* ================= FAQ ITEMS ================= */}
      {data.items.map((item: FAQItem, index: number) => (
        <div
          key={index}
          className="border border-gray-600 p-4 rounded space-y-3 bg-[#111]"
        >
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-400">
              FAQ {index + 1} of {data.items.length}
            </div>

            <div className="flex gap-3 text-xs">
              <button
                onClick={() => moveItemUp(index)}
                className="text-blue-400"
              >
                ↑
              </button>

              <button
                onClick={() => moveItemDown(index)}
                className="text-blue-400"
              >
                ↓
              </button>

              <button
                onClick={() => removeItem(index)}
                className="text-red-400"
              >
                Remove
              </button>
            </div>
          </div>

          <input
            placeholder="Question"
            value={item.question}
            onChange={(e) =>
              updateItem(index, {
                ...item,
                question: e.target.value,
              })
            }
            className="w-full p-2 bg-[#111] border border-gray-700 rounded"
          />

          <textarea
            placeholder="Answer"
            value={item.answer}
            onChange={(e) =>
              updateItem(index, {
                ...item,
                answer: e.target.value,
              })
            }
            rows={4}
            className="w-full p-2 bg-[#111] border border-gray-700 rounded"
          />
        </div>
      ))}

      <button
        onClick={addItem}
        className="bg-blue-600 px-4 py-2 rounded text-white"
      >
        + Add FAQ
      </button>

      {/* ================= IMAGE ================= */}
      <div className="space-y-3">
        <label className="text-sm text-gray-400">
          FAQ Section Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
          }}
          className="w-full"
        />

        {data.imageUrl && (
          <img
            src={data.imageUrl}
            className="h-40 rounded object-cover"
            alt=""
          />
        )}
      </div>
    </div>
  );
}