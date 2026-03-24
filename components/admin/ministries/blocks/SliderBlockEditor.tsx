"use client";

import { Trash2, Plus } from "lucide-react";

import {
  SliderBlock,
  SlideItem,
  MinistryBlock,
} from "@/lib/types/ministry";

import ImagePicker from "../../common/ImagePicker";

type Props = {
  block: SliderBlock;
  blocks: MinistryBlock[];
  setBlocks: React.Dispatch<React.SetStateAction<MinistryBlock[]>>;
};

export default function SliderBlockEditor({
  block,
  blocks,
  setBlocks,
}: Props) {

  const slides: SlideItem[] = block.slides || [];

  const updateSlides = (newSlides: SlideItem[]) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === block.id ? { ...b, slides: newSlides } : b
      )
    );
  };

  const updateHeading = (value: string) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === block.id ? { ...b, heading: value } : b
      )
    );
  };

  const addSlide = () => {
    updateSlides([
      ...slides,
      {
        title: "",
        description: "",
        image: "",
        imagePublicId: undefined,
        alt: "",
      },
    ]);
  };

  const removeSlide = (index: number) => {
    updateSlides(slides.filter((_, i) => i !== index));
  };

  const updateField = (
    index: number,
    field: keyof SlideItem,
    value: string
  ) => {
    const updated = [...slides];
    updated[index][field] = value;
    updateSlides(updated);
  };

  return (
    <div className="border border-green-700/30 rounded-xl p-6 space-y-6 bg-[#0b0f0b]">

      <h3 className="text-lg font-semibold text-green-300">
        Slider Block
      </h3>

      {/* ================= HEADING ================= */}
      <div className="space-y-1">
        <label className="text-xs text-green-400">
          Slider Heading
        </label>

        <input
          type="text"
          placeholder="Enter section heading"
          value={block.heading || ""}
          onChange={(e) => updateHeading(e.target.value)}
          className="input w-full"
        />
      </div>

      {/* ================= SLIDES ================= */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className="border border-green-700/20 rounded-lg p-5 bg-[#0f150f] space-y-4"
        >

          {/* Header */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-400 font-medium">
              Slide {index + 1}
            </span>

            <button
              type="button"
              onClick={() => removeSlide(index)}
              className="flex items-center gap-1 text-red-500 text-xs"
            >
              <Trash2 size={14} />
              Remove
            </button>
          </div>

          {/* Title */}
          <input
            type="text"
            placeholder="Slide Title"
            value={slide.title}
            onChange={(e) =>
              updateField(index, "title", e.target.value)
            }
            className="input w-full"
          />

          {/* Description */}
          <textarea
            placeholder="Slide Description"
            value={slide.description || ""}
            onChange={(e) =>
              updateField(index, "description", e.target.value)
            }
            rows={3}
            className="input w-full"
          />

          {/* ================= IMAGE PICKER ================= */}
          <div className="space-y-2">
            <p className="text-sm text-white/60">Slide Image</p>

            <ImagePicker
              folder="nishad-gateway/ministries/slides"
              value={
                slide.image
                  ? {
                      url: slide.image,
                      alt: slide.alt || "",
                      publicId: slide.imagePublicId,
                    }
                  : null
              }
              onChange={(val) => {
                const updated = [...slides];

                updated[index] = {
                  ...updated[index],
                  image: val?.url ?? "",
                  imagePublicId: val?.publicId ?? undefined,
                  alt:
                    val?.alt ||
                    slide.title ||
                    "Slider image",
                };

                updateSlides(updated);
              }}
            />

            <p className="text-[10px] text-white/40">
              Add alt text for SEO & accessibility
            </p>

            {!slide.alt && slide.image && (
              <p className="text-xs text-yellow-400">
                ⚠️ Missing alt text
              </p>
            )}
          </div>

        </div>
      ))}

      {/* Add Slide */}
      <button
        type="button"
        onClick={addSlide}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm"
      >
        <Plus size={16} />
        Add Slide
      </button>

    </div>
  );
}