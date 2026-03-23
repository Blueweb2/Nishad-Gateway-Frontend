"use client";


import { Plus, Trash } from "lucide-react";
import { adminAxios } from "@/lib/http/adminAxios";

import type {
  CityBlogSection,
  InfrastructureSectionContent,
} from "@/lib/types/city-blog";
import RichTextEditor from "../common/RichTextEditor";
import ImagePicker from "../common/ImagePicker";

type Props = {
  section: CityBlogSection<"INFRASTRUCTURE">;
  onChange: (updated: CityBlogSection) => void;
};

export default function InfrastructureSectionEditor({
  section,
  onChange,
}: Props) {
  const content = section.content as InfrastructureSectionContent;

  const updateContent = (newContent: InfrastructureSectionContent) => {
    onChange({ ...section, content: newContent });
  };


  const updateSlide = (index: number, updates: any) => {
    updateContent({
      ...content,
      slides: content.slides.map((slide, i) =>
        i === index ? { ...slide, ...updates } : slide
      ),
    });
  };

  const addSlide = () => {
    updateContent({
      ...content,
      slides: [
        ...content.slides,
        {
          imageUrl: "",
          imagePublicId: undefined,
          imageAlt: "",
          title: "",
          text: "",
        },
      ],
    });
  };

  const removeSlide = (index: number) => {
    updateContent({
      ...content,
      slides: content.slides.filter((_, i) => i !== index),
    });
  };


  return (
    <div className="space-y-6 mt-6">

      {/* SECTION HEADING */}
      <input
        placeholder="Section Heading"
        value={content.heading}
        onChange={(e) =>
          updateContent({ ...content, heading: e.target.value })
        }
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500 transition"
      />

      {/* SECTION DESCRIPTION */}
      <div className="space-y-2">
        <p className="text-sm text-white/60">Section Description</p>

        <RichTextEditor
          value={content.description}
          onChange={(val) =>
            updateContent({
              ...content,
              description: val,
            })
          }
        />
      </div>


      {/* SLIDES HEADER */}
      <div className="flex justify-between items-center pt-4">
        <h3 className="text-white text-lg font-medium">
          Slides
        </h3>

        <button
          onClick={addSlide}
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white transition"
        >
          <Plus size={16} />
          Add Slide
        </button>
      </div>

      {/* SLIDES */}
      {content.slides.map((slide, index) => (
        <div
          key={index}
          className="bg-black/30 p-6 rounded-2xl border border-white/10 space-y-4 hover:border-white/20 transition"
        >
          {/* Slide Header */}
          <div className="flex justify-between items-center">
            <span className="text-white/60 text-sm">
              Slide {index + 1}
            </span>

            <button
              onClick={() => removeSlide(index)}
              className="p-2 rounded-full hover:bg-red-500/20 transition"
            >
              <Trash size={16} className="text-red-400" />
            </button>
          </div>

          {/* Title */}
          <input
            placeholder="Slide Title"
            value={slide.title || ""}
            onChange={(e) =>
              updateSlide(index, { title: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500 transition"
          />

          {/* Text */}
          <div className="space-y-2">
            <p className="text-sm text-white/60">Slide Description</p>

            <RichTextEditor
              value={slide.text || ""}
              onChange={(val) =>
                updateSlide(index, { text: val })
              }
            />
          </div>


          {/* Upload */}
          <div className="space-y-2">
            <p className="text-sm text-white/60">Slide Image</p>

            <ImagePicker
              folder="nishad-gateway/cities/infrastructure"
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
                  imageAlt: val?.alt || slide.title || "Infrastructure image",
                });
              }}
            />
            {!slide.imageAlt && slide.imageUrl && (
              <p className="text-xs text-yellow-400">
                ⚠️ Missing alt text
              </p>
            )}

            <p className="text-[10px] text-white/40">
              Add alt text for SEO & accessibility
            </p>
          </div>

        </div>
      ))}
    </div>
  );

}
