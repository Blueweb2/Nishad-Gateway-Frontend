"use client";

import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { adminAxios } from "@/lib/http/adminAxios";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
};

export default function ListingForm({ initialData, onSubmit }: Props) {

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [address, setAddress] = useState(initialData?.address || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [website, setWebsite] = useState(initialData?.website || "");

  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);
  const [order, setOrder] = useState(initialData?.order || 0);
  const [status, setStatus] = useState(initialData?.status || "draft");

  const [loading, setLoading] = useState(false);
  const [publicId, setPublicId] = useState(initialData?.publicId || "");
const [uploading, setUploading] = useState(false);

  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSlug(generateSlug(value));
  };

const handleImageUpload = async (file: File) => {

  try {

    setUploading(true);

    const uploaded = await uploadToCloudinarySigned(
      file,
      "nishad-gateway/cities/categories/listings"
    );

    setImage(uploaded.secure_url);
    setPublicId(uploaded.public_id);

    toast.success("Image uploaded");

  } catch {

    toast.error("Image upload failed");

  } finally {

    setUploading(false);

  }

};

const handleRemoveImage = async () => {

  if (!publicId) {
    setImage("");
    return;
  }

  try {

    await adminAxios.delete("/upload/delete", {
      data: { publicId },
    });

    setImage("");
    setPublicId("");

    toast.success("Image removed");

  } catch {

    toast.error("Failed to delete image");

  }

};

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!title) {
      toast.error("Title is required");
      return;
    }

    try {

      setLoading(true);

      await onSubmit({
        title,
        slug,
        description,
        image,
        address,
        phone,
        website,
        isFeatured,
        order,
        status,
      });

    } catch {

      toast.error("Failed to save listing");

    } finally {

      setLoading(false);

    }
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-6"
    >

      {/* Title */}

      <div>
        <label className="block text-sm text-white/70 mb-2">
          Title
        </label>

        <input
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-black border border-white/20 text-white"
          placeholder="Restaurant name"
        />
      </div>

      {/* Slug */}

      <div>
        <label className="block text-sm text-white/70 mb-2">
          Slug
        </label>

        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-black border border-white/20 text-white"
        />
      </div>

      {/* Description */}

      <div>
        <label className="block text-sm text-white/70 mb-2">
          Description
        </label>

        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-black border border-white/20 text-white"
        />
      </div>

      {/* Image */}

   {/* Image Upload */}

<div className="space-y-3">

  <label className="block text-sm text-white/70">
    Listing Image
  </label>

  {/* Upload Button */}

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) handleImageUpload(file);
    }}
    className="text-sm text-white"
  />

  {uploading && (
    <p className="text-xs text-white/60">
      Uploading image...
    </p>
  )}

  {/* Preview */}

{image && (
  <div className="mt-3 flex items-center gap-4">

    <img
      src={cloudinaryAutoWebp(image)}
      alt="preview"
      className="w-40 h-28 object-cover rounded-lg border border-white/10"
    />

    <button
      type="button"
      onClick={handleRemoveImage}
      className="text-red-400 text-sm hover:underline"
    >
      Remove Image
    </button>

  </div>
)}

</div>

      {/* Address */}

      <div>
        <label className="block text-sm text-white/70 mb-2">
          Address
        </label>

        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-black border border-white/20 text-white"
        />
      </div>

      {/* Phone */}

      <div>
        <label className="block text-sm text-white/70 mb-2">
          Phone
        </label>

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-black border border-white/20 text-white"
        />
      </div>

      {/* Website */}

      <div>
        <label className="block text-sm text-white/70 mb-2">
          Website
        </label>

        <input
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-black border border-white/20 text-white"
        />
      </div>

      {/* Featured */}

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
        />
        <span className="text-sm text-white/70">Featured Listing</span>
      </div>

      {/* Order */}

      <div>
        <label className="block text-sm text-white/70 mb-2">
          Display Order
        </label>

        <input
          type="number"
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
          className="w-full px-4 py-2 rounded-lg bg-black border border-white/20 text-white"
        />
      </div>

      {/* Status */}

      <div>
        <label className="block text-sm text-white/70 mb-2">
          Status
        </label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-black border border-white/20 text-white"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400"
      >
        {loading ? "Saving..." : "Save Listing"}
      </button>

    </form>
  );
}