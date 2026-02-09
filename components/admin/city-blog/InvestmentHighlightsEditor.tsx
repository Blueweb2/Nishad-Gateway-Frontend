"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { UploadCloud, Plus, Trash } from "lucide-react";

import { CityBlogSection } from "@/lib/types/city-blog";
import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/utils/cloudinary";

type Props = {
  section: CityBlogSection<"INVESTMENT_HIGHLIGHTS">;
  onChange: (updated: CityBlogSection) => void;
};

export default function InvestmentHighlightsEditor({
  section,
  onChange,
}: Props) {
  const content = section.content;

  /* =========================
     UPDATE CONTENT
  ========================= */
  const updateContent = (newContent: any) => {
    onChange({ ...section, content: newContent });
  };

  /* =========================
     UPDATE SINGLE HIGHLIGHT
  ========================= */
  const updateHighlight = (
    index: number,
    field: "number" | "title" | "imageUrl",
    value: string
  ) => {
    const updated = [...content.highlights];
    updated[index] = { ...updated[index], [field]: value };

    updateContent({ ...content, highlights: updated });
  };

  /* =========================
     ADD HIGHLIGHT
  ========================= */
  const addHighlight = () => {
    updateContent({
      ...content,
      highlights: [
        ...content.highlights,
        {
          number: String(content.highlights.length + 1).padStart(2, "0"),
          title: "",
          imageUrl: "",
        },
      ],
    });
  };

  /* =========================
     REMOVE HIGHLIGHT
  ========================= */
  const removeHighlight = (index: number) => {
    const updated = content.highlights.filter(
      (_: any, i: number) => i !== index
    );

    updateContent({ ...content, highlights: updated });
  };

  /* =========================
     IMAGE UPLOAD
  ========================= */
  const handleImageUpload = async (
    file: File,
    index: number
  ) => {
    try {
      toast.loading("Uploading image...", {
        id: `highlight-upload-${index}`,
      });

      const uploaded = await uploadToCloudinarySigned(
        file,
        "nishad-gateway/cities/investment"
      );

      const optimizedUrl = cloudinaryAutoWebp(
        uploaded.secure_url
      );

      updateHighlight(index, "imageUrl", optimizedUrl);

      toast.success("Image uploaded", {
        id: `highlight-upload-${index}`,
      });
    } catch (err: any) {
      toast.error(
        err?.message || "Upload failed",
        { id: `highlight-upload-${index}` }
      );
    }
  };

  return (
    <div className="space-y-8 mt-6">

      {/* =========================
          HEADING
      ========================= */}
      <input
        placeholder="Section Heading"
        value={content.heading}
        onChange={(e) =>
          updateContent({
            ...content,
            heading: e.target.value,
          })
        }
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      {/* =========================
          DESCRIPTION
      ========================= */}
      <textarea
        placeholder="Section Description"
        value={content.description}
        onChange={(e) =>
          updateContent({
            ...content,
            description: e.target.value,
          })
        }
        rows={4}
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      {/* =========================
          HIGHLIGHTS
      ========================= */}
      <div className="space-y-6">

        <div className="flex justify-between items-center">
          <h3 className="text-white font-medium">
            Highlights
          </h3>

          <button
            onClick={addHighlight}
            className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300"
          >
            <Plus size={16} />
            Add Highlight
          </button>
        </div>

        {content.highlights.map((item: any, index: number) => (
          <div
            key={index}
            className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/60">
                Highlight {index + 1}
              </span>

              <button
                onClick={() => removeHighlight(index)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash size={16} />
              </button>
            </div>

            {/* Number */}
            <input
              placeholder="Number (e.g. 01)"
              value={item.number}
              onChange={(e) =>
                updateHighlight(index, "number", e.target.value)
              }
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
            />

            {/* Title */}
            <input
              placeholder="Highlight Title"
              value={item.title}
              onChange={(e) =>
                updateHighlight(index, "title", e.target.value)
              }
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
            />

            {/* Image Upload */}
            <div className="flex flex-col md:flex-row gap-4">

              <input
                value={item.imageUrl}
                readOnly
                placeholder="Image will appear here"
                className="flex-1 px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
              />

              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-semibold cursor-pointer">
                <UploadCloud className="w-4 h-4" />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file)
                      handleImageUpload(file, index);
                  }}
                />
              </label>
            </div>

            {/* Preview */}
            {item.imageUrl && (
              <div className="relative mt-3 w-full h-[200px] rounded-xl overflow-hidden border border-white/10">
                <Image
                  src={item.imageUrl}
                  alt="Highlight Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
