"use client";

import Image from "next/image";
import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import toast from "react-hot-toast";

type Props = {
  content: {
    title: string;
    subtitle: string;
    image: string;
  };
  onChange: (content: any) => void;
};

export default function HeroSectionEditor({
  content,
  onChange,
}: Props) {
  const [uploading, setUploading] = useState(false);

  const update = (key: string, value: any) => {
    onChange({
      ...content,
      [key]: value,
    });
  };

  const handleUpload = async (file: File) => {
    try {
      setUploading(true);

      const uploaded = await uploadToCloudinarySigned(
        file,
        "city-blog/hero"
      );

      update("image", uploaded.secure_url);

      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* TITLE */}
      <div>
        <label className="text-sm text-white/70">
          Title
        </label>

        <input
          value={content.title || ""}
          onChange={(e) =>
            update("title", e.target.value)
          }
          className="w-full mt-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
        />
      </div>

      {/* SUBTITLE */}
      <div>
        <label className="text-sm text-white/70">
          Subtitle
        </label>

        <textarea
          value={content.subtitle || ""}
          onChange={(e) =>
            update("subtitle", e.target.value)
          }
          rows={3}
          className="w-full mt-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
        />
      </div>

      {/* IMAGE */}
      <div>
        <label className="text-sm text-white/70">
          Hero Image
        </label>

        <label className="flex items-center justify-center h-32 border border-dashed border-white/20 rounded-lg cursor-pointer mt-2">
          <UploadCloud size={18} />

          <span className="ml-2 text-sm text-white/60">
            {uploading ? "Uploading..." : "Upload Image"}
          </span>

          <input
            hidden
            type="file"
            accept="image/*"
            onChange={(e) =>
              e.target.files &&
              handleUpload(e.target.files[0])
            }
          />
        </label>

        {content.image && (
          <div className="relative h-52 mt-4 rounded-lg overflow-hidden">
            <Image
              src={content.image}
              alt="hero"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

    </div>
  );
}