"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { UploadCloud, Trash2, Plus } from "lucide-react";

import type { FutureOutlookSectionContent } from "@/lib/types/city-blog";
import RichTextEditor from "../common/RichTextEditor";
import ImagePicker from "../common/ImagePicker";

type Props = {
  content: FutureOutlookSectionContent;
  onChange: (content: FutureOutlookSectionContent) => void;
};

export default function FutureOutlookEditor({
  content,
  onChange,
}: Props) {

  /* ================= SAFE UPDATE SLIDE ================= */
const updateSlide = (
  index: number,
  updates: Partial<FutureOutlookSectionContent["slides"][0]>
) => {
  onChange({
    ...content,
    slides: content.slides.map((slide, i) =>
      i === index ? { ...slide, ...updates } : slide
    ),
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
          imageAlt: "",
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


  /* ================= REMOVE IMAGE ================= */


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
           className="rounded-xl border border-white/10 bg-black/30 p-6 space-y-6 hover:border-white/20 transition"
          >
            <p className="text-xs text-white/50 tracking-widest">
              SLIDE {String(index + 1).padStart(2, "0")}
            </p>

            {/* Title */}
            <input
              value={slide.title || ""}
              onChange={(e) =>
                updateSlide(index, { title: e.target.value })
              }
              placeholder="Metro Expansion"
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
            />

            {/* Description */}
            <div className="space-y-2">
              <p className="text-xs text-white/60">
                Slide Description
              </p>

              <RichTextEditor
                value={slide.description || ""}
                onChange={(val) =>
                  updateSlide(index, { description: val })
                }
              />
            </div>


            {/* CTA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={slide.ctaText || ""}
                onChange={(e) =>
                  updateSlide(index, { ctaText: e.target.value })
                }
                placeholder="CTA Text"
                className="px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
              />

              <input
                value={slide.ctaLink || ""}
                onChange={(e) =>
                  updateSlide(index, { ctaLink: e.target.value })
                }
                placeholder="/metro-expansion"
                className="px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
              />
            </div>

            {/* ================= IMAGE BLOCK ================= */}
        <div className="space-y-2">
  <p className="text-xs text-white/60">Slide Image</p>

<ImagePicker
  folder="nishad-gateway/cities/future-outlook"
  value={
    slide.imageUrl
      ? {
          url: slide.imageUrl,
          alt: slide.imageAlt || "",
          publicId: slide.imagePublicId,
        }
      : null
  }
 onChange={(val) => {
  updateSlide(index, {
    imageUrl: val?.url ?? "",
    imagePublicId: val?.publicId ?? undefined,
    imageAlt: val?.alt || slide.title || "Future outlook image",
  });
}}
/>
<p className="text-[10px] text-white/40">
  Add descriptive alt text for SEO & accessibility
</p>
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
