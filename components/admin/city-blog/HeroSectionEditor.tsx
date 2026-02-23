"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { UploadCloud, Trash2 } from "lucide-react";
import { useState } from "react";

import { HeroSectionContent } from "@/lib/types/city-blog";
import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type Props = {
  content: HeroSectionContent;
  onChange: (content: HeroSectionContent) => void;
};

export default function HeroSectionEditor({ content, onChange }: Props) {
  const [uploading, setUploading] = useState(false);

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = async (file: File) => {
    if (uploading) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    try {
      setUploading(true);
      toast.loading("Uploading image...", { id: "hero-upload" });

      const uploaded = await uploadToCloudinarySigned(
        file,
        "nishad-gateway/cities/hero"
      );

      const imageUrl = cloudinaryAutoWebp(uploaded.secure_url);

      // 🔥 Only update state
      // Backend will clean old image on Save
      onChange({
        ...content,
        backgroundImage: imageUrl,
        backgroundImagePublicId: uploaded.public_id,
      });

      toast.success("Image uploaded", { id: "hero-upload" });

    } catch (err: any) {
      toast.error(err?.message || "Upload failed", {
        id: "hero-upload",
      });
    } finally {
      setUploading(false);
    }
  };

  /* ================= IMAGE REMOVE ================= */
  const handleRemoveImage = () => {
    if (!content.backgroundImage) return;

    // 🔥 Only clear state
    onChange({
      ...content,
      backgroundImage: "",
      backgroundImagePublicId: undefined,
    });
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

          <input
            value={content.backgroundImage}
            readOnly
            placeholder="Image will appear here after upload"
            className="flex-1 px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
          />

          <label
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold cursor-pointer transition
              ${uploading
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-white/10 hover:bg-white/20 border-white/10 text-white"
              }`}
          >
            <UploadCloud className="w-4 h-4" />
            {uploading ? "Uploading..." : "Upload Image"}

            <input
              type="file"
              accept="image/*"
              hidden
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
                e.target.value = "";
              }}
            />
          </label>
        </div>

        {content.backgroundImage && (
          <div className="relative mt-4 w-full h-[200px] rounded-xl overflow-hidden border border-white/10">

            <Image
              src={content.backgroundImage}
              alt="Hero Preview"
              fill
              className="object-cover"
            />

            {!uploading && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-3 right-3 bg-black/70 hover:bg-black text-white p-2 rounded-full transition"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* CTA */}
      <input
        placeholder="CTA text"
        value={content.ctaText}
        onChange={(e) =>
          onChange({ ...content, ctaText: e.target.value })
        }
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      {/* CTA Link */}
      <input
        placeholder="CTA link"
        value={content.ctaLink || ""}
        onChange={(e) =>
          onChange({ ...content, ctaLink: e.target.value })
        }
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

    </div>
  );
}
