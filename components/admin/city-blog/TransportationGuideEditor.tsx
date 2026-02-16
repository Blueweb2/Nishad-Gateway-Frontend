"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { UploadCloud, Trash2, Plus } from "lucide-react";

import { TransportationGuideSectionContent } from "@/lib/types/city-blog";
import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/utils/cloudinary";

type Props = {
  content: TransportationGuideSectionContent;
  onChange: (updated: TransportationGuideSectionContent) => void;
};

export default function TransportationGuideEditor({
  content,
  onChange,
}: Props) {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

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
          backgroundImagePublicId: "",
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

  const handleImageUpload = async (
    file: File,
    index: number
  ) => {
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
      toast.loading("Uploading image...", {
        id: `transport-upload-${index}`,
      });

      const uploaded = await uploadToCloudinarySigned(
        file,
        "nishad-gateway/cities/transportation"
      );

      const imageUrl = cloudinaryAutoWebp(uploaded.secure_url);

      const updatedSlides = [...content.slides];
      updatedSlides[index] = {
        ...updatedSlides[index],
        backgroundImage: imageUrl,
        backgroundImagePublicId: uploaded.public_id,
      };

      updateContent({
        ...content,
        slides: updatedSlides,
      });

      toast.success("Image uploaded", {
        id: `transport-upload-${index}`,
      });
    } catch (err: any) {
      toast.error(
        err?.message || "Upload failed",
        { id: `transport-upload-${index}` }
      );
    } finally {
      setUploadingIndex(null);
    }
  };

  /* ================= REMOVE IMAGE ================= */

  const handleRemoveImage = (index: number) => {
    const updatedSlides = [...content.slides];
    updatedSlides[index] = {
      ...updatedSlides[index],
      backgroundImage: "",
      backgroundImagePublicId: undefined,
    };

    updateContent({
      ...content,
      slides: updatedSlides,
    });
  };

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

          {/* Image Upload */}
          <div>
            <p className="text-xs text-white/60 mb-2">
              Background Image
            </p>

            <div className="flex flex-col md:flex-row gap-4">

              <input
                value={slide.backgroundImage}
                readOnly
                placeholder="Image URL will appear after upload"
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
                    if (file) handleImageUpload(file, index);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>

            {slide.backgroundImage && (
              <div className="relative mt-4 w-full h-[200px] rounded-xl overflow-hidden border border-white/10">

                <Image
                  src={slide.backgroundImage}
                  alt="Transport Preview"
                  fill
                  className="object-cover"
                />

                {uploadingIndex !== index && (
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveImage(index)
                    }
                    className="absolute top-3 right-3 bg-black/70 hover:bg-black text-white p-2 rounded-full transition"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
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
