"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { UploadCloud } from "lucide-react";

import RichTextEditor from "@/components/admin/common/RichTextEditor";
import { VisionSectionContent } from "@/lib/types/city-blog";

import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/utils/cloudinary";

type Props = {
  content: VisionSectionContent;
  onChange: (content: VisionSectionContent) => void;
};

export default function VisionSectionEditor({
  content,
  onChange,
}: Props) {
  /* =========================
     IMAGE UPLOAD
  ========================= */
  const handleImageUpload = async (file: File) => {
    try {
      toast.loading("Uploading image...", { id: "vision-upload" });

      const uploaded = await uploadToCloudinarySigned(
        file,
        "nishad-gateway/cities/vision"
      );

      const optimizedUrl = cloudinaryAutoWebp(
        uploaded.secure_url
      );

      onChange({
        ...content,
        imageUrl: optimizedUrl,
      });

      toast.success("Image uploaded", {
        id: "vision-upload",
      });
    } catch (err: any) {
      toast.error(
        err?.message || "Upload failed",
        { id: "vision-upload" }
      );
    }
  };

  return (
    <div className="space-y-6 mt-6">

      {/* =========================
          HEADING
      ========================= */}
      <input
        placeholder="Section Heading (e.g. A City Designed Around Vision 2030)"
        value={content.heading}
        onChange={(e) =>
          onChange({ ...content, heading: e.target.value })
        }
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      {/* =========================
          RICH TEXT CONTENT
      ========================= */}
      <RichTextEditor
        value={content.content}
        onChange={(value) =>
          onChange({ ...content, content: value })
        }
      />

      {/* =========================
          IMAGE UPLOAD
      ========================= */}
      <div>
        <p className="text-xs text-white/60 mb-2">
          Vision Image
        </p>

        <div className="flex flex-col md:flex-row gap-4">

          {/* URL Field (Read Only) */}
          <input
            value={content.imageUrl}
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
        {content.imageUrl && (
          <div className="relative mt-4 w-full h-[220px] rounded-xl overflow-hidden border border-white/10">
            <Image
              src={content.imageUrl}
              alt="Vision Preview"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

    </div>
  );
}
