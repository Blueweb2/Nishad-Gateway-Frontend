"use client";

import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { useState } from "react";

export default function ImageUploader({
  imagePreview,
  setImagePreview,
  setForm,
}: any) {

  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: any) => {

    const file = e.target.files?.[0];
    if (!file) return;

    try {

      setUploading(true);

      // preview
      setImagePreview(URL.createObjectURL(file));

      // upload to cloudinary
      const res = await uploadToCloudinarySigned(
        file,
        "nishad-gateway/cities/content"
      );

      setForm((prev: any) => ({
        ...prev,
        image: res.secure_url,
      }));

    } catch (err) {

      console.error(err);
      alert("Image upload failed");

    } finally {

      setUploading(false);

    }

  };

  return (
    <div className="bg-black/40 border border-white/10 rounded-xl p-5 space-y-4">

      <label className="text-sm text-white/70">
        Featured Image
      </label>

      {/* Upload input */}

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="text-sm text-white"
      />

      {/* Uploading indicator */}

      {uploading && (
        <p className="text-xs text-white/60">
          Uploading image...
        </p>
      )}

      {/* Preview */}

      {imagePreview && (
        <div className="relative">

          <img
            src={imagePreview}
            className="rounded-lg w-full object-cover"
          />

        </div>
      )}

    </div>
  );
}