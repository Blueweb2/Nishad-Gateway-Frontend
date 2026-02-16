"use client";

import { Plus, Trash2, UploadCloud } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useState } from "react";

import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/utils/cloudinary";
import type { ExpandableSnapshotSectionContent } from "@/lib/types/city-blog";

type Props = {
  content: ExpandableSnapshotSectionContent;
  onChange: (updated: ExpandableSnapshotSectionContent) => void;
};

export default function ExpandableSnapshotEditor({
  content,
  onChange,
}: Props) {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

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

  /* ================= IMAGE UPLOAD ================= */
  const uploadImage = async (file: File, index: number) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    try {
      setUploadingIndex(index);
      toast.loading("Uploading image...", { id: "snapshot-upload" });

      const uploaded = await uploadToCloudinarySigned(
        file,
        "nishad-gateway/cities/snapshot"
      );

      const updated = [...content.cards];
      updated[index] = {
        ...updated[index],
        imageUrl: cloudinaryAutoWebp(uploaded.secure_url),
        imagePublicId: uploaded.public_id,
      };

      onChange({ ...content, cards: updated });

      toast.success("Image uploaded", { id: "snapshot-upload" });
    } catch (err: any) {
      toast.error(err?.message || "Upload failed", {
        id: "snapshot-upload",
      });
    } finally {
      setUploadingIndex(null);
    }
  };

  const removeImage = (index: number) => {
    updateCard(index, "imageUrl", "");
    updateCard(index, "imagePublicId", "");
  };

  return (
    <div className="space-y-6 mt-4">

      {/* ================= HEADING ================= */}
      <input
        placeholder="Section heading"
        value={content.heading}
        onChange={(e) =>
          onChange({ ...content, heading: e.target.value })
        }
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      {/* ================= CARDS ================= */}
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

          {/* Upload Area */}
          <div>
            <p className="text-xs text-white/60 mb-2">
              Snapshot Image
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                value={card.imageUrl}
                readOnly
                placeholder="Image will appear here after upload"
                className="flex-1 px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
              />

              <label
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold cursor-pointer transition
                  ${
                    uploadingIndex === index
                      ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                      : "bg-white/10 hover:bg-white/20 border-white/10 text-white"
                  }`}
              >
                <UploadCloud className="w-4 h-4" />
                {uploadingIndex === index
                  ? "Uploading..."
                  : "Upload Image"}

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  disabled={uploadingIndex === index}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadImage(file, index);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
          </div>

          {/* Image Preview */}
          {card.imageUrl && (
            <div className="relative w-full h-[220px] rounded-xl overflow-hidden border border-white/10">
              <Image
                src={card.imageUrl}
                alt="Preview"
                fill
                className="object-cover"
              />

              {uploadingIndex !== index && (
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-3 right-3 bg-black/70 hover:bg-black text-white p-2 rounded-full transition"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          )}

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

      {/* Add Card Button */}
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
