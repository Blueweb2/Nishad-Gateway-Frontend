"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { UploadCloud, Trash2, Plus } from "lucide-react";

import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/utils/cloudinary";
import type { FutureOutlookSectionContent } from "@/lib/types/city-blog";

type Props = {
  content: FutureOutlookSectionContent;
  onChange: (content: FutureOutlookSectionContent) => void;
};

export default function FutureOutlookEditor({
  content,
  onChange,
}: Props) {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  /* ================= SAFE UPDATE SLIDE ================= */
  const updateSlide = (
    index: number,
    updates: Partial<FutureOutlookSectionContent["slides"][0]>
  ) => {
    const updatedSlides = [...content.slides];

    updatedSlides[index] = {
      ...updatedSlides[index],
      ...updates,
    };

    onChange({
      ...content,
      slides: updatedSlides,
    });
  };

  /* ================= ADD SLIDE ================= */
  const addSlide = () => {
    onChange({
      ...content,
      slides: [
        ...content.slides,
        {
          title: "",
          description: "",
          imageUrl: "",
          imagePublicId: undefined,
          ctaText: "",
          ctaLink: "",
        },
      ],
    });
  };

  /* ================= REMOVE SLIDE ================= */
  const removeSlide = (index: number) => {
    const updatedSlides = content.slides.filter((_, i) => i !== index);

    onChange({
      ...content,
      slides: updatedSlides,
    });
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = async (file: File, index: number) => {
    if (uploadingIndex !== null) return;

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
      toast.loading("Uploading image...", { id: "future-upload" });

      const uploaded = await uploadToCloudinarySigned(
        file,
        "nishad-gateway/cities/future-outlook"
      );

      const imageUrl = cloudinaryAutoWebp(uploaded.secure_url);

      // ✅ Single safe update (FIXED)
      updateSlide(index, {
        imageUrl,
        imagePublicId: uploaded.public_id,
      });

      toast.success("Image uploaded", { id: "future-upload" });
      console.log("Uploaded:", uploaded);

    } catch (err: any) {
      toast.error(err?.message || "Upload failed", {
        id: "future-upload",
      });
    } finally {
      setUploadingIndex(null);
    }
  };

  /* ================= REMOVE IMAGE ================= */
  const removeImage = (index: number) => {
    updateSlide(index, {
      imageUrl: "",
      imagePublicId: undefined,
    });
  };

  return (
    <div className="space-y-10 mt-6">

      {/* ================= SECTION HEADING ================= */}
      <div>
        <p className="text-xs text-white/60 mb-2">
          Section Heading
        </p>

        <input
          value={content.heading}
          onChange={(e) =>
            onChange({ ...content, heading: e.target.value })
          }
          placeholder="Future Outlook"
          className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
        />
      </div>

      {/* ================= SLIDES ================= */}
      <div className="space-y-8">

        {content.slides.map((slide, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-black/30 p-6 space-y-6"
          >
            <p className="text-xs text-white/50 tracking-widest">
              SLIDE {String(index + 1).padStart(2, "0")}
            </p>

            {/* Title */}
            <input
              value={slide.title}
              onChange={(e) =>
                updateSlide(index, { title: e.target.value })
              }
              placeholder="Metro Expansion"
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
            />

            {/* Description */}
            <textarea
              value={slide.description}
              onChange={(e) =>
                updateSlide(index, { description: e.target.value })
              }
              placeholder="Short description"
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
            />

            {/* CTA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={slide.ctaText}
                onChange={(e) =>
                  updateSlide(index, { ctaText: e.target.value })
                }
                placeholder="CTA Text"
                className="px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
              />

              <input
                value={slide.ctaLink}
                onChange={(e) =>
                  updateSlide(index, { ctaLink: e.target.value })
                }
                placeholder="/metro-expansion"
                className="px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
              />
            </div>

            {/* ================= IMAGE BLOCK ================= */}
            <div>
              <p className="text-xs text-white/60 mb-2">
                Slide Image
              </p>

              <div className="flex flex-col md:flex-row gap-4">
                <input
                  value={slide.imageUrl}
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
                  {uploadingIndex === index ? "Uploading..." : "Upload Image"}

                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    disabled={uploadingIndex === index}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, index);
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>

              {slide.imageUrl && (
                <div className="relative mt-4 w-full h-[220px] rounded-xl overflow-hidden border border-white/10">
                  <Image
                    src={slide.imageUrl}
                    alt="Future Outlook Preview"
                    fill
                    sizes="100vw"
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
            </div>

            {/* Remove Slide */}
            {content.slides.length > 1 && (
              <button
                type="button"
                onClick={() => removeSlide(index)}
                className="text-red-400 hover:text-red-300 text-sm flex items-center gap-2"
              >
                <Trash2 size={14} />
                Remove Slide
              </button>
            )}
          </div>
        ))}

        {/* Add Slide */}
        <button
          type="button"
          onClick={addSlide}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm transition"
        >
          <Plus size={16} />
          Add Slide
        </button>

      </div>
    </div>
  );
}
