"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { UploadCloud } from "lucide-react";

import { HeroSectionContent } from "@/lib/types/city-blog";
import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/utils/cloudinary";

type Props = {
  content: HeroSectionContent;
  onChange: (content: HeroSectionContent) => void;
};

export default function HeroSectionEditor({ content, onChange }: Props) {
  const handleImageUpload = async (file: File) => {
    try {
      toast.loading("Uploading image...", { id: "hero-upload" });

      const uploaded = await uploadToCloudinarySigned(
        file,
        "nishad-gateway/cities/hero"
      );

      const imageUrl = cloudinaryAutoWebp(uploaded.secure_url);

      onChange({
        ...content,
        backgroundImage: imageUrl,
      });

      toast.success("Image uploaded", { id: "hero-upload" });
    } catch (err: any) {
      toast.error(err?.message || "Upload failed", {
        id: "hero-upload",
      });
    }
  };

  return (
    <div className="space-y-4 mt-4">
      {/* Heading */}
      <input
        placeholder="Hero heading"
        value={content.heading}
        onChange={(e) =>
          onChange({ ...content, heading: e.target.value })
        }
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      {/* Subheading */}
      <textarea
        placeholder="Hero subheading"
        value={content.subheading}
        onChange={(e) =>
          onChange({ ...content, subheading: e.target.value })
        }
        rows={3}
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      {/* Image Upload */}
      <div>
        <p className="text-xs text-white/60 mb-2">
          Background Image
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          {/* URL Field */}
          <input
            value={content.backgroundImage}
            readOnly
            placeholder="Image will appear here after upload"
            className="flex-1 px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
          />

          {/* Upload Button */}
          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-semibold cursor-pointer">
            <UploadCloud className="w-4 h-4" />
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
            />
          </label>
        </div>

        {/* Preview */}
        {content.backgroundImage && (
          <div className="relative mt-4 w-full h-[200px] rounded-xl overflow-hidden border border-white/10">
            <Image
              src={content.backgroundImage}
              alt="Hero Preview"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* CTA */}
      <input
        placeholder="CTA text (e.g. Calculate Your KSA Expansion Cost)"
        value={content.ctaText}
        onChange={(e) =>
          onChange({ ...content, ctaText: e.target.value })
        }
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />
    </div>
  );
}