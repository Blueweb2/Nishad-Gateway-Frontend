"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { UploadCloud, Plus, Trash } from "lucide-react";
import { useState } from "react";

import type {
  CityBlogSection,
  InvestmentHighlightsContent,
} from "@/lib/types/city-blog";

import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/utils/cloudinary";
import RichTextEditor from "../common/RichTextEditor";


type Props = {
  section: CityBlogSection<"INVESTMENT_HIGHLIGHTS">;
  onChange: (updated: CityBlogSection) => void;
};

export default function InvestmentHighlightsEditor({
  section,
  onChange,
}: Props) {
  const content = section.content as InvestmentHighlightsContent;

  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

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
          subImage: "",
          subImagePublicId: undefined,
          title: "",
          subText: "",
        },
      ],
    });
  };

  /* ================= REMOVE CARD ================= */
  const removeCard = (index: number) => {
    // 🔥 Only update state — backend cleans images on save
    const updated = content.cards.filter((_, i) => i !== index);
    updateContent({ ...content, cards: updated });
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = async (
    file: File,
    index: number,
    field: "mainImage" | "subImage"
  ) => {
    const uploadId = `card-${index}-${field}`;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    try {
      setUploadingKey(uploadId);

      toast.loading("Uploading image...", { id: uploadId });

      const uploaded = await uploadToCloudinarySigned(
        file,
        "nishad-gateway/cities/investment"
      );

      const optimizedUrl = cloudinaryAutoWebp(uploaded.secure_url);

      // 🔥 Only update state — backend handles old image cleanup
      updateCardField(index, {
        [field]: optimizedUrl,
        [field === "mainImage"
          ? "mainImagePublicId"
          : "subImagePublicId"]: uploaded.public_id,
      });

      toast.success("Image uploaded", { id: uploadId });

    } catch (err: any) {
      toast.error(err?.message || "Upload failed", {
        id: uploadId,
      });
    } finally {
      setUploadingKey(null);
    }
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
    <textarea
  placeholder="Section Description"
  value={content.description}
  onChange={(e) =>
    updateContent({
      ...content,
      description: e.target.value,
    })
  }
  rows={3}
  className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
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
          const mainUploading = uploadingKey === `card-${index}-mainImage`;
          const subUploading = uploadingKey === `card-${index}-subImage`;

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

                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-semibold cursor-pointer">
                  <UploadCloud className="w-4 h-4" />
                  {mainUploading ? "Uploading..." : "Upload Main Image"}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file)
                        handleImageUpload(file, index, "mainImage");
                      e.target.value = "";
                    }}
                  />
                </label>

                {card.mainImage && (
                  <div className="relative w-full h-[200px] rounded-xl overflow-hidden border border-white/10">
                    <Image
                      src={card.mainImage}
                      alt="Main Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* SUB IMAGE */}
              <div className="space-y-2">
                <p className="text-sm text-white/60">Sub Image</p>

                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-semibold cursor-pointer">
                  <UploadCloud className="w-4 h-4" />
                  {subUploading ? "Uploading..." : "Upload Sub Image"}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file)
                        handleImageUpload(file, index, "subImage");
                      e.target.value = "";
                    }}
                  />
                </label>

                {card.subImage && (
                  <div className="relative w-full h-[200px] rounded-xl overflow-hidden border border-white/10">
                    <Image
                      src={card.subImage}
                      alt="Sub Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
