"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import RichTextEditor from "../common/RichTextEditor";
import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";

export default function OverviewEditor() {

  const { cityId, categoryId } = useParams();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [coverImagePublicId, setCoverImagePublicId] = useState("");

  /* -------------------------------------------------------
     Fetch existing overview
  ------------------------------------------------------- */

  useEffect(() => {

    if (!cityId || !categoryId) return;

    const fetchOverview = async () => {

      try {

        const res = await fetch(
          `${API_URL}/admin/cities/${cityId}/categories/${categoryId}/overview`,
          { credentials: "include" }
        );

        const data = await res.json();

    if (data?.overview) {
  setContent(data.overview.content || "");
  setCoverImage(data.overview.coverImage || "");
  setCoverImagePublicId(data.overview.coverImagePublicId || "");
}

      } catch (err) {
        toast.error("Failed to load overview");
      }

    };

    fetchOverview();

  }, [cityId, categoryId]);

  /* -------------------------------------------------------
     Upload Cover Image
  ------------------------------------------------------- */

const handleImageUpload = async (e: any) => {

  const file = e.target.files?.[0];
  if (!file) return;

  try {
    setUploading(true);

    const res = await uploadToCloudinarySigned(
      file,
      "nishad-gateway/cities/categories/overview"
    );

    setCoverImage(res.secure_url);
    setCoverImagePublicId(res.public_id);

    toast.success("Image uploaded");

  } catch (err: any) {
    toast.error(err.message || "Upload failed");
  }

  setUploading(false);
};
  /* -------------------------------------------------------
     Save Overview
  ------------------------------------------------------- */

  const saveOverview = async () => {

    try {

      const res = await fetch(
        `${API_URL}/admin/cities/${cityId}/categories/${categoryId}/overview`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content,
            coverImage,
          }),
        }
      );

      if (res.ok) {
        toast.success("Overview saved");
      } else {
        toast.error("Failed to save overview");
      }

    } catch (err) {
      toast.error("Save failed");
    }

  };

  const deleteImage = async () => {

  if (!coverImagePublicId) return;

  try {

    const res = await fetch(
      `${API_URL}/admin/upload/${encodeURIComponent(coverImagePublicId)}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!res.ok) throw new Error();

    setCoverImage("");
    setCoverImagePublicId("");

    toast.success("Image removed");

  } catch {
    toast.error("Failed to delete image");
  }
};

  /* -------------------------------------------------------
     UI
  ------------------------------------------------------- */

  return (
    <div className="space-y-6">

      {/* Cover Image Upload */}

      <div className="space-y-2">

        <label className="text-sm font-medium">
          Cover Image
        </label>

       {coverImage && (
  <div className="relative">
    <img
      src={coverImage}
      alt="Cover"
      className="w-full h-64 object-cover rounded-lg border"
    />

    <button
      onClick={deleteImage}
      className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
    >
      Delete
    </button>
  </div>
)}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="text-sm"
        />

        {uploading && (
          <p className="text-sm text-gray-500">
            Uploading image...
          </p>
        )}

      </div>

      {/* Rich Text Editor */}

      <RichTextEditor
        value={content}
        onChange={(val) => setContent(val)}
      />

      {/* Save Button */}

      <button
        onClick={saveOverview}
        className="px-6 py-2 bg-emerald-500 text-black rounded-lg hover:bg-emerald-400"
      >
        Save Overview
      </button>

    </div>
  );
}