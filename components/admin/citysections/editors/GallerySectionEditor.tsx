"use client";

import Image from "next/image";
import { UploadCloud, Trash2 } from "lucide-react";
import { useState } from "react";
import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import toast from "react-hot-toast";

type ImageItem = {
  url: string;
  caption?: string;
};

type Props = {
  content: {
    images: ImageItem[];
  };
  onChange: (content: any) => void;
};

export default function GallerySectionEditor({
  content,
  onChange,
}: Props) {
  const [uploading, setUploading] = useState(false);

  const images = content.images || [];

  const addImage = async (file: File) => {
    try {
      setUploading(true);

      const uploaded = await uploadToCloudinarySigned(
        file,
        "city-blog/gallery"
      );

      onChange({
        images: [
          ...images,
          { url: uploaded.secure_url, caption: "" },
        ],
      });

      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const updateCaption = (index: number, caption: string) => {
    const updated = [...images];
    updated[index].caption = caption;

    onChange({ images: updated });
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    onChange({ images: updated });
  };

  return (
    <div className="space-y-6">

      {/* Upload */}
      <label className="flex items-center justify-center h-32 border border-dashed border-white/20 rounded-lg cursor-pointer">
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
            addImage(e.target.files[0])
          }
        />
      </label>

      {/* Images */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="space-y-2"
          >
            <div className="relative h-32 rounded-lg overflow-hidden">
              <Image
                src={img.url}
                alt="gallery"
                fill
                className="object-cover"
              />
            </div>

            <input
              value={img.caption || ""}
              placeholder="Caption"
              onChange={(e) =>
                updateCaption(index, e.target.value)
              }
              className="w-full px-2 py-1 text-sm bg-white/5 border border-white/10 rounded"
            />

            <button
              onClick={() => removeImage(index)}
              className="text-red-400 text-xs flex items-center gap-1"
            >
              <Trash2 size={12} />
              Remove
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}