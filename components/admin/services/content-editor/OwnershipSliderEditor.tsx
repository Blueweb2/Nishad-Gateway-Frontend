"use client";

import toast from "react-hot-toast";
import { uploadImage } from "@/lib/api/upload.api";

export type OwnershipSlide = {
  title: string; // ex: Restricted activities
  subtitle: string; // ex: Sector exceptions
  image: string; // background image url
};

type Props = {
  ownershipHeading: string;
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
  ownershipSlides,
  updateField,
  addOwnershipSlide,
  updateOwnershipSlide,
  removeOwnershipSlide,
}: Props) {
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

      <input
        value={ownershipHeading}
        onChange={(e) => updateField("ownershipHeading", e.target.value)}
        placeholder="Heading (ex: Ownership & Capital Rules)"
        className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
      />

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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  value={slide.title}
                  onChange={(e) =>
                    updateOwnershipSlide(idx, "title", e.target.value)
                  }
                  placeholder="Title (ex: Restricted activities)"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                />

                <input
                  value={slide.subtitle}
                  onChange={(e) =>
                    updateOwnershipSlide(idx, "subtitle", e.target.value)
                  }
                  placeholder="Subtitle (ex: Sector exceptions)"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-400">
                  Background Image (Cloudinary)
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const toastId = toast.loading("Uploading image...");

                    try {
                      const res = await uploadImage(file);

                      if (res?.data?.url) {
                        updateOwnershipSlide(idx, "image", res.data.url);
                        toast.success("Uploaded ", { id: toastId });
                      } else {
                        toast.error("Upload failed", { id: toastId });
                      }
                    } catch {
                      toast.error("Upload failed", { id: toastId });
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
