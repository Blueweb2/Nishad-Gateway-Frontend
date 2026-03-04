"use client";

import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";

import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type Slide = {
  title: string;
  description: string;
  image: string;
};

type Props = {
  block: {
    type: "slider";
    slides: Slide[];
  };
  blocks: any[];
  setBlocks: (blocks: any[]) => void;
};

export default function SliderBlockEditor({
  block,
  blocks,
  setBlocks,
}: Props) {
  const slides = block.slides || [];

  const updateSlides = (newSlides: Slide[]) => {
    const updated = blocks.map((b) =>
      b === block ? { ...b, slides: newSlides } : b
    );

    setBlocks(updated);
  };

  const addSlide = () => {
    updateSlides([
      ...slides,
      { title: "", description: "", image: "" },
    ]);
  };

  const removeSlide = (index: number) => {
    updateSlides(slides.filter((_, i) => i !== index));
  };

  const updateField = (
    index: number,
    field: keyof Slide,
    value: string
  ) => {
    const updated = [...slides];
    updated[index][field] = value;

    updateSlides(updated);
  };

  const handleImageUpload = async (
    file: File,
    index: number
  ) => {
    try {
      const upload = await uploadToCloudinarySigned(
        file,
        "ministries/slides"
      );

      updateField(index, "image", upload.secure_url);

      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    }
  };

  return (
    <div className="border border-green-700/30 rounded-xl p-6 space-y-6 bg-[#0b0f0b]">

      <h3 className="text-lg font-semibold text-green-300">
        Slider Block
      </h3>

      {slides.map((slide, index) => (
        <div
          key={index}
          className="border border-green-700/20 rounded-lg p-4 space-y-3"
        >

          {/* Title */}
          <input
            type="text"
            placeholder="Slide Title"
            value={slide.title}
            onChange={(e) =>
              updateField(index, "title", e.target.value)
            }
            className="input"
          />

          {/* Description */}
          <textarea
            placeholder="Slide Description"
            value={slide.description}
            onChange={(e) =>
              updateField(index, "description", e.target.value)
            }
            rows={3}
            className="input"
          />

          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file, index);
            }}
            className="input"
          />

          {/* Preview */}
          {slide.image && (
            <img
              src={cloudinaryAutoWebp(slide.image)}
              className="w-40 rounded-lg border border-green-700/20"
            />
          )}

          {/* Delete */}
          <button
            type="button"
            onClick={() => removeSlide(index)}
            className="flex items-center gap-2 text-red-400 text-sm"
          >
            <Trash2 size={14} />
            Remove Slide
          </button>
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