"use client";

import toast from "react-hot-toast";
import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/utils/cloudinary";

export type EntityTypeSlide = {
  title: string;

  // new fields
  mainImage: string; // big image
  subImage: string; // small image

  description?: string;
};

type Props = {
  entityTypesHeading: string;
  entityTypesDescription: string;
  entityTypesSlides: EntityTypeSlide[];

  updateField: (name: string, value: string) => void;

  addEntityTypeSlide: () => void;
  updateEntityTypeSlide: (
    index: number,
    key: keyof EntityTypeSlide,
    value: string
  ) => void;
  removeEntityTypeSlide: (index: number) => void;
};

export default function EntityTypesSliderEditor({
  entityTypesHeading,
  entityTypesDescription,
  entityTypesSlides,
  updateField,
  addEntityTypeSlide,
  updateEntityTypeSlide,
  removeEntityTypeSlide,
}: Props) {
  // allowed folder (must match backend allowedFolders)
  const folder = "nishad-gateway/subservices";

  return (
    <div className="space-y-5 border border-gray-800 rounded-2xl p-6 bg-black/20">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">
          Entity Types Slider (Cards)
        </h3>

        <button
          onClick={addEntityTypeSlide}
          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-sm font-semibold"
        >
          + Add Entity Card
        </button>
      </div>

      {/* Heading + Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={entityTypesHeading}
          onChange={(e) => updateField("entityTypesHeading", e.target.value)}
          placeholder="Heading (ex: Entity Types Available to Foreign Investors)"
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        />

        <textarea
          value={entityTypesDescription}
          onChange={(e) =>
            updateField("entityTypesDescription", e.target.value)
          }
          placeholder="Description (right side text)"
          rows={2}
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500 resize-none"
        />
      </div>

      {/* Slides */}
      {entityTypesSlides.length === 0 ? (
        <p className="text-sm text-gray-400">No entity cards added yet.</p>
      ) : (
        <div className="space-y-5">
          {entityTypesSlides.map((slide, idx) => (
            <div
              key={idx}
              className="border border-gray-800 rounded-2xl p-5 space-y-4 bg-black/30"
            >
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-gray-200">
                  Card {idx + 1}
                </p>

                <button
                  onClick={() => removeEntityTypeSlide(idx)}
                  className="text-xs px-3 py-1 rounded-lg bg-red-800 hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>

              <input
                value={slide.title}
                onChange={(e) =>
                  updateEntityTypeSlide(idx, "title", e.target.value)
                }
                placeholder="Title (ex: Limited Liability Company (LLC))"
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
              />

              <textarea
                value={slide.description || ""}
                onChange={(e) =>
                  updateEntityTypeSlide(idx, "description", e.target.value)
                }
                placeholder="Optional description (small text)"
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500 resize-none"
              />

              {/* MAIN IMAGE Upload */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400">
                  Main Image (Big Image - Cloudinary Signed)
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const toastId = toast.loading("Uploading main image...");

                    try {
                      const uploaded = await uploadToCloudinarySigned(
                        file,
                        folder
                      );

                      const webpUrl = cloudinaryAutoWebp(uploaded.secure_url);

                      updateEntityTypeSlide(idx, "mainImage", webpUrl);
                      toast.success("Main image uploaded", { id: toastId });
                    } catch (err: any) {
                      toast.error(err?.message || "Upload failed", {
                        id: toastId,
                      });
                    }
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white"
                />

                <input
                  value={slide.mainImage}
                  onChange={(e) =>
                    updateEntityTypeSlide(
                      idx,
                      "mainImage",
                      cloudinaryAutoWebp(e.target.value)
                    )
                  }
                  placeholder="Main Image URL"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                />
              </div>

              {/* SUB IMAGE Upload */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400">
                  Sub Image (Small Image - Cloudinary Signed)
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const toastId = toast.loading("Uploading sub image...");

                    try {
                      const uploaded = await uploadToCloudinarySigned(
                        file,
                        folder
                      );

                      const webpUrl = cloudinaryAutoWebp(uploaded.secure_url);

                      updateEntityTypeSlide(idx, "subImage", webpUrl);
                      toast.success("Sub image uploaded", { id: toastId });
                    } catch (err: any) {
                      toast.error(err?.message || "Upload failed", {
                        id: toastId,
                      });
                    }
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white"
                />

                <input
                  value={slide.subImage}
                  onChange={(e) =>
                    updateEntityTypeSlide(
                      idx,
                      "subImage",
                      cloudinaryAutoWebp(e.target.value)
                    )
                  }
                  placeholder="Sub Image URL"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
