"use client";

import ImagePicker from "../common/ImagePicker";

interface Props {
  data: any;
  onChange: (data: any) => void;
}

export default function HeroBlockEditor({ data, onChange }: Props) {

  return (
    <div className="space-y-4 border border-gray-700 p-4 rounded-lg">

      {/* Title */}
      <input
        placeholder="Hero Title"
        value={data.title || ""}
        onChange={(e) =>
          onChange({ ...data, title: e.target.value })
        }
        className="w-full p-3 bg-[#111] border border-gray-700 rounded"
      />

      {/* Description */}
      <textarea
        placeholder="Hero Description"
        value={data.description || ""}
        onChange={(e) =>
          onChange({ ...data, description: e.target.value })
        }
        rows={3}
        className="w-full p-3 bg-[#111] border border-gray-700 rounded"
      />

      {/* Background Image */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400">
          Background Image
        </label>

        <ImagePicker
          folder="nishad-gateway/cities/hero"
          value={
            data.backgroundImage
              ? {
                  url: data.backgroundImage,
                  alt: data.backgroundImageAlt || "",
                  publicId: data.backgroundImagePublicId,
                }
              : null
          }
          onChange={(val) => {
            onChange({
              ...data,
              backgroundImage: val?.url ?? "",
              backgroundImagePublicId: val?.publicId ?? undefined,
              backgroundImageAlt:
                val?.alt ||
                data.title ||
                "Hero background image",
            });
          }}
        />

        {/* ALT WARNING */}
        {!data.backgroundImageAlt && data.backgroundImage && (
          <p className="text-xs text-yellow-400">
            ⚠️ Missing alt text
          </p>
        )}
      </div>

    </div>
  );
}