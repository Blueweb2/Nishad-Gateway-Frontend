"use client";

import { Trash2, Plus, Upload } from "lucide-react";
import toast from "react-hot-toast";

import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

import {
  SliderBlock,
  SlideItem,
  MinistryBlock,
} from "@/lib/types/ministry";

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

  const addSlide = () => {
    updateSlides([
      ...slides,
      {
        title: "",
        description: "",
        image: "",
        imagePublicId: "",
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

  const handleImageUpload = async (file: File, index: number) => {
    try {
      const upload = await uploadToCloudinarySigned(
        file,
        "nishad-gateway/ministries/slides"
      );

      const updated = [...slides];
      updated[index].image = upload.secure_url;
      updated[index].imagePublicId = upload.public_id;

      updateSlides(updated);

      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    }
  };

  const deleteImage = async (index: number) => {
    const publicId = slides[index].imagePublicId;

    try {
      await fetch("/api/delete-cloudinary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });

      const updated = [...slides];
      updated[index].image = "";
      updated[index].imagePublicId = "";

      updateSlides(updated);

      toast.success("Image deleted");
    } catch {
      toast.error("Failed to delete image");
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
          className="border border-green-700/20 rounded-lg p-5 bg-[#0f150f] space-y-4"
        >

          {/* Slide Header */}
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

          {/* Alt + Upload */}
          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Image Alt Text"
              value={slide.alt || ""}
              onChange={(e) =>
                updateField(index, "alt", e.target.value)
              }
              className="input"
            />

            <label className="flex items-center justify-center gap-2 border border-green-700/40 rounded-lg cursor-pointer py-2 hover:bg-green-900/20">
              <Upload size={16} />
              Upload Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, index);
                }}
              />
            </label>

          </div>

          {/* Preview */}
          {slide.image && (
            <div className="flex items-center gap-4">

              <img
                src={cloudinaryAutoWebp(slide.image)}
                alt={slide.alt || slide.title || "Slide image"}
                className="w-32 h-20 object-cover rounded-lg border border-green-700/20"
              />

              <button
                type="button"
                onClick={() => deleteImage(index)}
                className="flex items-center gap-2 text-red-400 text-sm"
              >
                <Trash2 size={14} />
                Delete Image
              </button>

            </div>
          )}

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