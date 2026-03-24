"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

import { TransportationGuideSectionContent } from "@/lib/types/city-blog";
import ImagePicker from "../common/ImagePicker";

type Props = {
  content: TransportationGuideSectionContent;
  onChange: (updated: TransportationGuideSectionContent) => void;
};

export default function TransportationGuideEditor({
  content,
  onChange,
}: Props) {

  /* ================= UPDATE HELPERS ================= */

  const updateContent = (
    newContent: TransportationGuideSectionContent
  ) => {
    onChange(newContent);
  };

  const updateSlide = (
    index: number,
    field: keyof TransportationGuideSectionContent["slides"][0],
    value: string
  ) => {
    const updatedSlides = [...content.slides];
    updatedSlides[index] = {
      ...updatedSlides[index],
      [field]: value,
    };

    updateContent({
      ...content,
      slides: updatedSlides,
    });
  };

  /* ================= ADD SLIDE ================= */

  const addSlide = () => {
    updateContent({
      ...content,
      slides: [
        ...content.slides,
        {
          label: "",
          backgroundImage: "",
          backgroundImagePublicId: undefined,
          backgroundImageAlt: "",
          title: "",
          link: "",
        },
      ],
    });
  };

  /* ================= REMOVE SLIDE ================= */

  const removeSlide = (index: number) => {
    const updatedSlides = content.slides.filter(
      (_, i) => i !== index
    );

    updateContent({
      ...content,
      slides: updatedSlides,
    });
  };

  /* ================= IMAGE UPLOAD ================= */



  /* ================= REMOVE IMAGE ================= */



  /* ================= RENDER ================= */

  return (
    <div className="space-y-6 mt-4">

      {/* ===== SECTION HEADING ===== */}
      <input
        placeholder="Section Heading (e.g., How To Get Riyadh)"
        value={content.heading}
        onChange={(e) =>
          updateContent({
            ...content,
            heading: e.target.value,
          })
        }
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      {/* ===== ADD BUTTON ===== */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={addSlide}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-semibold"
        >
          <Plus size={16} />
          Add Transportation Method
        </button>
      </div>

      {/* ===== SLIDES ===== */}
      {content.slides.map((slide, index) => (
        <div
          key={index}
          className="rounded-xl border border-white/10 bg-black/30 p-5 space-y-4"
        >
          {/* Label */}
          <input
            placeholder="Label (By Air, By Road...)"
            value={slide.label}
            onChange={(e) =>
              updateSlide(index, "label", e.target.value)
            }
            className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
          />

          {/* Title */}
          <input
            placeholder="Slide Title"
            value={slide.title}
            onChange={(e) =>
              updateSlide(index, "title", e.target.value)
            }
            className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
          />

          {/* Link */}
          <input
            placeholder="Detail Page Link"
            value={slide.link}
            onChange={(e) =>
              updateSlide(index, "link", e.target.value)
            }
            className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
          />

          <div className="space-y-2">
            <p className="text-xs text-white/60">Background Image</p>

            <ImagePicker
              folder="nishad-gateway/cities/transportation"
              value={
                slide.backgroundImage
                  ? {
                    url: slide.backgroundImage,
                    alt: slide.backgroundImageAlt || "",
                    publicId: slide.backgroundImagePublicId,
                  }
                  : null
              }
              onChange={(val) => {
                const updatedSlides = [...content.slides];
                updatedSlides[index] = {
                  ...updatedSlides[index],
                  backgroundImage: val?.url ?? "",
                  backgroundImagePublicId: val?.publicId ?? undefined,
                  backgroundImageAlt:
                    val?.alt ||
                    slide.title ||
                    content.heading ||
                    "Transportation image",
                };

                updateContent({
                  ...content,
                  slides: updatedSlides,
                });
              }}
            />

            <p className="text-[10px] text-white/40">
              Add alt text for SEO & accessibility
            </p>

            {!slide.backgroundImageAlt && slide.backgroundImage && (
              <p className="text-xs text-yellow-400">
                ⚠️ Missing alt text
              </p>
            )}
          </div>

          {/* Remove Slide */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => removeSlide(index)}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Remove Method
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
