"use client";

import { Plus, Trash2 } from "lucide-react";
import ImagePicker from "../../common/ImagePicker";


type ImageItem = {
  url: string;
  publicId?: string;
  alt?: string;
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
  const images = content.images || [];

  /* ================= ADD IMAGE ================= */
  const addImage = () => {
    onChange({
      images: [
        ...images,
        {
          url: "",
          publicId: undefined,
          alt: "",
        },
      ],
    });
  };

  /* ================= UPDATE IMAGE ================= */
  const updateImage = (index: number, value: any) => {
    const updated = [...images];

    updated[index] = {
      url: value?.url ?? "",
      publicId: value?.publicId ?? undefined,
      alt: value?.alt ?? "",
    };

    onChange({ images: updated });
  };

  /* ================= REMOVE IMAGE ================= */
  const removeImage = (index: number) => {
    onChange({
      images: images.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">

      {/* ================= ADD BUTTON ================= */}
      <div className="flex justify-end">
        <button
          onClick={addImage}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-white/10 rounded-lg text-white hover:bg-white/20 transition"
        >
          <Plus size={14} /> Add Image
        </button>
      </div>

      {/* ================= IMAGES ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="space-y-3 p-4 rounded-xl bg-black/30 border border-white/10"
          >
            {/* IMAGE PICKER */}
            <ImagePicker
              folder="nishad-gateway/cities/gallery"
              value={
                img.url
                  ? {
                      url: img.url,
                      alt: img.alt || "",
                      publicId: img.publicId,
                    }
                  : null
              }
              onChange={(val) => updateImage(index, val)}
            />

            {/* ALT WARNING */}
            {!img.alt && img.url && (
              <p className="text-xs text-yellow-400">
                ⚠️ Missing alt text (important for SEO)
              </p>
            )}

            {/* REMOVE BUTTON */}
            <button
              onClick={() => removeImage(index)}
              className="text-red-400 text-xs flex items-center gap-1 hover:text-red-300"
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