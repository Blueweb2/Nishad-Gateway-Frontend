"use client";

import toast from "react-hot-toast";
import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/utils/cloudinary";

export type LocationSlide = {
  title: string;
  description: string;
  image: string;
  tag?: string;
  link?: string;
};

type Props = {
  locationsHeading: string;
  locationsSubheading: string;
  locationsSlides: LocationSlide[];

  updateField: (name: string, value: string) => void;

  addLocationSlide: () => void;
  updateLocationSlide: (
    index: number,
    key: keyof LocationSlide,
    value: string
  ) => void;
  removeLocationSlide: (index: number) => void;
};

export default function LocationsSliderEditor({
  locationsHeading,
  locationsSubheading,
  locationsSlides,
  updateField,
  addLocationSlide,
  updateLocationSlide,
  removeLocationSlide,
}: Props) {
  const folder = "nishad-gateway/subservices"; // must match backend allowedFolders

  return (
    <div className="space-y-5 border border-gray-800 rounded-2xl p-6 bg-black/20">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">
          Locations Slider (Cities)
        </h3>

        <button
          onClick={addLocationSlide}
          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-sm font-semibold"
        >
          + Add City
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={locationsHeading}
          onChange={(e) => updateField("locationsHeading", e.target.value)}
          placeholder="Heading (ex: Start Your Business Anywhere in Saudi Arabia)"
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        />

        <input
          value={locationsSubheading}
          onChange={(e) => updateField("locationsSubheading", e.target.value)}
          placeholder="Subheading (small text right side)"
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        />
      </div>

      {locationsSlides.length === 0 ? (
        <p className="text-sm text-gray-400">No cities added yet.</p>
      ) : (
        <div className="space-y-5">
          {locationsSlides.map((slide, idx) => (
            <div
              key={idx}
              className="border border-gray-800 rounded-2xl p-5 space-y-4 bg-black/30"
            >
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-gray-200">
                  City {idx + 1}
                </p>

                <button
                  onClick={() => removeLocationSlide(idx)}
                  className="text-xs px-3 py-1 rounded-lg bg-red-800 hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  value={slide.title}
                  onChange={(e) =>
                    updateLocationSlide(idx, "title", e.target.value)
                  }
                  placeholder="City Title (ex: Riyadh)"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                />

                <input
                  value={slide.tag || ""}
                  onChange={(e) =>
                    updateLocationSlide(idx, "tag", e.target.value)
                  }
                  placeholder="Tag (ex: ARTICLE)"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                />
              </div>

              <textarea
                value={slide.description}
                onChange={(e) =>
                  updateLocationSlide(idx, "description", e.target.value)
                }
                placeholder="Description (short paragraph)"
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500 resize-none"
              />

              <input
                value={slide.link || ""}
                onChange={(e) => updateLocationSlide(idx, "link", e.target.value)}
                placeholder="Optional Link (ex: /blogs/riyadh)"
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
              />

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400">
                  City Image (Cloudinary Signed)
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const toastId = toast.loading("Uploading city image...");

                    try {
                      const uploaded = await uploadToCloudinarySigned(
                        file,
                        folder
                      );

                      if (uploaded?.secure_url) {
                        updateLocationSlide(
                          idx,
                          "image",
                          cloudinaryAutoWebp(uploaded.secure_url)
                        );

                        toast.success("Uploaded", { id: toastId });
                        e.target.value = "";
                      } else {
                        toast.error("Upload failed", { id: toastId });
                      }
                    } catch (err: any) {
                      toast.error(err?.message || "Upload failed", {
                        id: toastId,
                      });
                    }
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white"
                />

                <input
                  value={slide.image}
                  onChange={(e) =>
                    updateLocationSlide(idx, "image", e.target.value)
                  }
                  placeholder="City Image URL"
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
