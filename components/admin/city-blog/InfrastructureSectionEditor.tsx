"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { UploadCloud, Plus, Trash, Trash2 } from "lucide-react";
import { adminAxios } from "@/lib/http/adminAxios";
import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/utils/cloudinary";
import type {
  CityBlogSection,
  InfrastructureSectionContent,
} from "@/lib/types/city-blog";
import RichTextEditor from "../common/RichTextEditor";

type Props = {
  section: CityBlogSection<"INFRASTRUCTURE">;
  onChange: (updated: CityBlogSection) => void;
};

export default function InfrastructureSectionEditor({
  section,
  onChange,
}: Props) {
  const content = section.content as InfrastructureSectionContent;
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const updateContent = (newContent: InfrastructureSectionContent) => {
    onChange({ ...section, content: newContent });
  };

  const updateSlide = (index: number, updates: any) => {
    const updated = [...content.slides];
    updated[index] = { ...updated[index], ...updates };
    updateContent({ ...content, slides: updated });
  };

  const addSlide = () => {
    updateContent({
      ...content,
      slides: [
        ...content.slides,
        { imageUrl: "", title: "", text: "" },
      ],
    });
  };

  const removeSlide = async (index: number) => {
    const slide = content.slides[index];

    if (slide.imagePublicId) {
      try {
        await adminAxios.delete("/upload/delete", {
          data: { publicId: slide.imagePublicId },
        });
      } catch {
        console.warn("Image cleanup failed");
      }
    }

    updateContent({
      ...content,
      slides: content.slides.filter((_, i) => i !== index),
    });
  };

  const handleImageUpload = async (file: File, index: number) => {
    try {
      setUploadingIndex(index);
      toast.loading("Uploading...", { id: `infra-${index}` });

      const oldPublicId = content.slides[index].imagePublicId;

      const uploaded = await uploadToCloudinarySigned(
        file,
        "nishad-gateway/cities/infrastructure"
      );

      const optimized = cloudinaryAutoWebp(uploaded.secure_url);

      updateSlide(index, {
        imageUrl: optimized,
        imagePublicId: uploaded.public_id,
      });

      if (oldPublicId) {
        await adminAxios.delete("/upload/delete", {
          data: { publicId: oldPublicId },
        });
      }

      toast.success("Uploaded", { id: `infra-${index}` });
    } catch {
      toast.error("Upload failed", { id: `infra-${index}` });
    } finally {
      setUploadingIndex(null);
    }
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
        className="bg-black/30 p-6 rounded-2xl border border-white/10 space-y-4"
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
          value={slide.title}
          onChange={(e) =>
            updateSlide(index, { title: e.target.value })
          }
          className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500 transition"
        />

        {/* Text */}
     <div className="space-y-2">
  <p className="text-sm text-white/60">Slide Description</p>

  <RichTextEditor
    value={slide.text}
    onChange={(val) =>
      updateSlide(index, { text: val })
    }
  />
</div>


        {/* Upload */}
        <label
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition
            ${uploadingIndex === index
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-white/10 hover:bg-white/20 border-white/10 text-white"
            }`}
        >
          <UploadCloud size={16} />
          {uploadingIndex === index ? "Uploading..." : "Upload Image"}

          <input
            type="file"
            hidden
            accept="image/*"
            disabled={uploadingIndex === index}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file, index);
              e.target.value = "";
            }}
          />
        </label>

        {/* Preview */}
     {slide.imageUrl && (
  <div className="relative mt-4 w-full h-[200px] rounded-xl overflow-hidden border border-white/10">
    
    <Image
      src={slide.imageUrl}
      alt="Slide Preview"
      fill
      className="object-cover"
    />

    {/* Delete Button */}
    {uploadingIndex !== index && (
      <button
        type="button"
        onClick={() =>
          updateSlide(index, {
            imageUrl: "",
            imagePublicId: undefined,
          })
        }
        className="absolute top-3 right-3 bg-black/70 hover:bg-black text-white p-2 rounded-full transition"
      >
        <Trash2 size={16} />
      </button>
    )}
  </div>
)}

      </div>
    ))}
  </div>
);

}
