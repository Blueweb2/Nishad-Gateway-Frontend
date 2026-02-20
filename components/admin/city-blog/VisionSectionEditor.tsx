"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { UploadCloud, Trash2 } from "lucide-react";
import { useState } from "react";

import RichTextEditor from "@/components/admin/common/RichTextEditor";
import { VisionSectionContent } from "@/lib/types/city-blog";

import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";

type Props = {
  content: VisionSectionContent;
  onChange: (content: VisionSectionContent) => void;
};

export default function VisionSectionEditor({
  content,
  onChange,
}: Props) {
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
      toast.loading("Uploading image...", { id: "vision-upload" });

      const uploaded = await uploadToCloudinarySigned(
        file,
        "nishad-gateway/cities/vision"
      );

      // ✅ Store RAW secure_url only
      onChange({
        ...content,
        imageUrl: uploaded.secure_url,
        imagePublicId: uploaded.public_id,
      });

      toast.success("Image uploaded", { id: "vision-upload" });

    } catch (err: any) {
      toast.error(err?.message || "Upload failed", {
        id: "vision-upload",
      });
    } finally {
      setUploading(false);
    }
  };

  /* ================= IMAGE REMOVE ================= */
  const handleRemoveImage = () => {
    if (!content.imageUrl) return;

    onChange({
      ...content,
      imageUrl: "",
      imagePublicId: undefined,
    });
  };

  return (
    <div className="space-y-6 mt-6">

      {/* ================= HEADING ================= */}
      <input
        placeholder="Section Heading"
        value={content.heading || ""}
        onChange={(e) =>
          onChange({ ...content, heading: e.target.value })
        }
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      {/* ================= RICH TEXT ================= */}
      <RichTextEditor
        value={content.content || ""}
        onChange={(value) =>
          onChange({ ...content, content: value })
        }
      />

      {/* ================= IMAGE SECTION ================= */}
      <div>
        <p className="text-xs text-white/60 mb-2">
          Vision Image
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            value={content.imageUrl || ""}
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

        {/* ================= IMAGE PREVIEW ================= */}
        {content.imageUrl && (
          <div className="relative mt-4 w-full h-[220px] rounded-xl overflow-hidden border border-white/10">
            <Image
              src={content.imageUrl}
              alt={content.heading || "Vision Preview"}
              fill
              sizes="100vw"
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
    </div>
  );
}