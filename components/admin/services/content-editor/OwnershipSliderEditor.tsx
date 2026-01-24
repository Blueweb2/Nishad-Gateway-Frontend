"use client";

import toast from "react-hot-toast";
import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/utils/cloudinary";

export type OwnershipSlide = {
  title: string; // Capsule text (Main title inside)
  leftText?: string; // Left side text
  rightText?: string; // Right side text
  image: string; // background image url
};

type Props = {
  ownershipHeading: string;

  // Admin editable tab labels
  ownershipTabOneLabel?: string;
  ownershipTabTwoLabel?: string;

  ownershipSlides: OwnershipSlide[];

  updateField: (name: string, value: string) => void;

  addOwnershipSlide: () => void;
  updateOwnershipSlide: (
    index: number,
    key: keyof OwnershipSlide,
    value: string
  ) => void;
  removeOwnershipSlide: (index: number) => void;
};

export default function OwnershipSliderEditor({
  ownershipHeading,
  ownershipTabOneLabel,
  ownershipTabTwoLabel,
  ownershipSlides,
  updateField,
  addOwnershipSlide,
  updateOwnershipSlide,
  removeOwnershipSlide,
}: Props) {
  // ✅ must match backend allowedFolders
  const folder = "nishad-gateway/subservices";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">
          Ownership & Capital Rules (Slider)
        </h3>

        <button
          onClick={addOwnershipSlide}
          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-sm font-semibold"
        >
          + Add Slide
        </button>
      </div>

      {/* Heading */}
      <input
        value={ownershipHeading}
        onChange={(e) => updateField("ownershipHeading", e.target.value)}
        placeholder="Heading (ex: Ownership & Capital Rules)"
        className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
      />

      {/* Tab Labels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={ownershipTabOneLabel || ""}
          onChange={(e) => updateField("ownershipTabOneLabel", e.target.value)}
          placeholder="Tab 1 Label (ex: Foreign Ownership)"
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        />

        <input
          value={ownershipTabTwoLabel || ""}
          onChange={(e) => updateField("ownershipTabTwoLabel", e.target.value)}
          placeholder="Tab 2 Label (ex: Capital Reality)"
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        />
      </div>

      {/* Slides */}
      {ownershipSlides.length === 0 ? (
        <p className="text-sm text-gray-400">No slides added yet.</p>
      ) : (
        <div className="space-y-5">
          {ownershipSlides.map((slide, idx) => (
            <div
              key={idx}
              className="border border-gray-800 rounded-2xl p-5 space-y-4 bg-black/20"
            >
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-gray-200">
                  Slide {idx + 1}
                </p>

                <button
                  onClick={() => removeOwnershipSlide(idx)}
                  className="text-xs px-3 py-1 rounded-lg bg-red-800 hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>

              {/* Capsule title */}
              <input
                value={slide.title}
                onChange={(e) =>
                  updateOwnershipSlide(idx, "title", e.target.value)
                }
                placeholder="Capsule Title (ex: Restricted activities)"
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
              />

              {/* Left & Right texts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <textarea
                  value={slide.leftText || ""}
                  onChange={(e) =>
                    updateOwnershipSlide(idx, "leftText", e.target.value)
                  }
                  placeholder="Left Text (ex: Universal 100% rules)"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500 resize-none"
                />

                <textarea
                  value={slide.rightText || ""}
                  onChange={(e) =>
                    updateOwnershipSlide(idx, "rightText", e.target.value)
                  }
                  placeholder="Right Text (ex: Sector exceptions)"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500 resize-none"
                />
              </div>

              {/* Background Image */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400">
                  Background Image (Cloudinary Signed)
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const toastId = toast.loading("Uploading image...");

                    try {
                      const uploaded = await uploadToCloudinarySigned(
                        file,
                        folder
                      );

                      if (uploaded?.secure_url) {
                        updateOwnershipSlide(
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
                    updateOwnershipSlide(idx, "image", e.target.value)
                  }
                  placeholder="Background Image URL"
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
