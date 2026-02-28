"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

interface Props {
  data: any;
  onChange: (data: any) => void;
}

export default function HeroBlockEditor({ data, onChange }: Props) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Only images allowed");
      return;
    }

    try {
      setUploading(true);

      const uploaded = await uploadToCloudinarySigned(
        file,
        "nishad-gateway/cities/hero",
      );

      const imageUrl = cloudinaryAutoWebp(uploaded.secure_url);

      onChange({
        ...data,
        backgroundImage: imageUrl,
        backgroundImagePublicId: uploaded.public_id,
      });

      toast.success("Hero image uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 border border-gray-700 p-4 rounded-lg">

      {/* Title */}
      <input
        placeholder="Hero Title"
        value={data.title}
        onChange={(e) =>
          onChange({ ...data, title: e.target.value })
        }
        className="w-full p-3 bg-[#111] border border-gray-700 rounded"
      />

      {/* Description */}
      <textarea
        placeholder="Hero Description"
        value={data.description}
        onChange={(e) =>
          onChange({ ...data, description: e.target.value })
        }
        rows={3}
        className="w-full p-3 bg-[#111] border border-gray-700 rounded"
      />

      {/* Background Upload */}
      <div>
        <label className="text-sm block mb-2">
          Background Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
          disabled={uploading}
          className="w-full p-2 bg-[#111] border border-gray-700 rounded"
        />

        {data.backgroundImage && (
          <img
            src={data.backgroundImage}
            alt="Preview"
            className="mt-4 rounded-lg h-40 object-cover"
          />
        )}
      </div>
    </div>
  );
}