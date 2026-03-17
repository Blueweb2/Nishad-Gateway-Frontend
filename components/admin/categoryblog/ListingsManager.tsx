"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";

type ListingForm = {
  title: string;
  description: string;
  address: string;
  phone: string;
  website: string;

  openingHours: string;
  orderInfo: string;
  locationLabel: string;
  email: string;
  priceRange: string;
  rating: number | "";

  coordinates: {
    lat: number | "";
    lng: number | "";
  };

  coverImage: string;
  coverImagePublicId?: string;

  isFeatured: boolean;
  status: "draft" | "published" | "archived";
};

const defaultForm: ListingForm = {
  title: "",
  description: "",
  address: "",
  phone: "",
  website: "",

  openingHours: "",
  orderInfo: "",
  locationLabel: "",
  email: "",
  priceRange: "",
  rating: "",

  coordinates: {
    lat: "",
    lng: "",
  },

  coverImage: "",
  coverImagePublicId: "",

  isFeatured: false,
  status: "draft",
};
export default function ListingsManager() {

  const { cityId, categoryId } = useParams();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [listings, setListings] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ListingForm>(defaultForm);
  const [uploading, setUploading] = useState(false);

  /* ================= FETCH LISTINGS ================= */

  const fetchListings = async () => {
    try {
      const res = await fetch(
        `${API_URL}/admin/cities/${cityId}/categories/${categoryId}/listings`,
        { credentials: "include" }
      );

      const data = await res.json();
      setListings(data.listings || []);
    } catch {
      toast.error("Failed to load listings");
    }
  };

  useEffect(() => {
    if (!cityId || !categoryId) return;
    fetchListings();
  }, [cityId, categoryId]);



  /* ================= CLOUDINARY IMAGE UPLOAD ================= */

  const uploadImage = async (e: any) => {

    const file = e.target.files?.[0];
    if (!file) return;

    try {

      setUploading(true);

      const res = await uploadToCloudinarySigned(
        file,
        "nishad-gateway/cities/categories/listings"
      );

      setForm({
        ...form,
        coverImage: res.secure_url,
        coverImagePublicId: res.public_id,
      });

      toast.success("Image uploaded");

    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    }

    setUploading(false);
  };

  const deleteImage = async () => {

  if (!form.coverImagePublicId) return;

  try {

    const res = await fetch(
      `${API_URL}/admin/upload/${encodeURIComponent(form.coverImagePublicId)}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!res.ok) throw new Error();

    setForm({
      ...form,
      coverImage: "",
      coverImagePublicId: "",
    });

    toast.success("Image removed");

  } catch {
    toast.error("Failed to delete image");
  }

};

  /* ================= CREATE OR UPDATE ================= */

  const saveListing = async () => {

    const url = editingId
      ? `${API_URL}/admin/contents/${editingId}`
      : `${API_URL}/admin/cities/${cityId}/categories/${categoryId}/listings`;

    const method = editingId ? "PUT" : "POST";

    try {

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      toast.success(editingId ? "Listing updated" : "Listing created");

      setShowForm(false);
      setEditingId(null);
      setForm(defaultForm);

      fetchListings();

    } catch {
      toast.error("Failed to save listing");
    }

  };

  /* ================= EDIT ================= */

  const editListing = (listing: any) => {

    setEditingId(listing._id);
    setShowForm(true);

setForm({
  title: listing.title || "",
  description: listing.description || "",
  address: listing.address || "",
  phone: listing.phone || "",
  website: listing.website || "",

  openingHours: listing.openingHours || "",
  orderInfo: listing.orderInfo || "",
  locationLabel: listing.locationLabel || "",
  email: listing.email || "",
  priceRange: listing.priceRange || "",
  rating: listing.rating ?? "",

  coordinates: {
    lat: listing.coordinates?.lat ?? "",
    lng: listing.coordinates?.lng ?? "",
  },

  coverImage: listing.coverImage || "",
  coverImagePublicId: listing.coverImagePublicId || "",

  isFeatured: listing.isFeatured || false,
  status: listing.status || "draft",
});

  };

  /* ================= DELETE ================= */

  const deleteListing = async (id: string) => {

    if (!confirm("Delete this listing?")) return;

    try {

      const res = await fetch(`${API_URL}/admin/contents/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      toast.success("Listing deleted");
      fetchListings();

    } catch {
      toast.error("Delete failed");
    }

  };

  /* ================= FEATURE TOGGLE ================= */

  const toggleFeatured = async (id: string) => {

    try {

      const res = await fetch(`${API_URL}/admin/contents/${id}/featured`, {
        method: "PATCH",
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      fetchListings();

    } catch {
      toast.error("Failed to toggle featured");
    }

  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">
        <h2 className="text-white text-lg font-semibold">Listings</h2>

        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setForm(defaultForm);
          }}
          className="bg-emerald-500 px-4 py-2 rounded-lg text-black"
        >
          + Add Listing
        </button>
      </div>

      {/* Form */}

      {showForm && (
        <div className="bg-white/5 border border-white/10 p-6 rounded-lg space-y-4">

          {/* Image Preview */}


{form.coverImage && (
  <div className="relative">

    <img
      src={form.coverImage}
      className="w-full h-48 object-cover rounded-lg"
    />

    <button
      onClick={deleteImage}
      className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
    >
      Delete
    </button>

  </div>
)}

          {/* Upload */}

          <input
            type="file"
            accept="image/*"
            onChange={uploadImage}
            className="text-white text-sm"
          />

          {uploading && (
            <p className="text-white/60 text-sm">Uploading...</p>
          )}

          {/* Inputs */}

          <input
            placeholder="Title"
            className="w-full p-2 rounded bg-black border border-white/20 text-white"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            placeholder="Description"
            className="w-full p-2 rounded bg-black border border-white/20 text-white"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            placeholder="Address"
            className="w-full p-2 rounded bg-black border border-white/20 text-white"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <input
            placeholder="Phone"
            className="w-full p-2 rounded bg-black border border-white/20 text-white"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            placeholder="Website"
            className="w-full p-2 rounded bg-black border border-white/20 text-white"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />

          <input
  placeholder="Opening Hours"
  className="w-full p-2 rounded bg-black border border-white/20 text-white"
  value={form.openingHours}
  onChange={(e) =>
    setForm({ ...form, openingHours: e.target.value })
  }
/>

<input
  placeholder="Order Info"
  className="w-full p-2 rounded bg-black border border-white/20 text-white"
  value={form.orderInfo}
  onChange={(e) =>
    setForm({ ...form, orderInfo: e.target.value })
  }
/>

<input
  placeholder="Location Label"
  className="w-full p-2 rounded bg-black border border-white/20 text-white"
  value={form.locationLabel}
  onChange={(e) =>
    setForm({ ...form, locationLabel: e.target.value })
  }
/>

<input
  placeholder="Email"
  className="w-full p-2 rounded bg-black border border-white/20 text-white"
  value={form.email}
  onChange={(e) =>
    setForm({ ...form, email: e.target.value })
  }
/>

<input
  placeholder="Price Range (eg: $$)"
  className="w-full p-2 rounded bg-black border border-white/20 text-white"
  value={form.priceRange}
  onChange={(e) =>
    setForm({ ...form, priceRange: e.target.value })
  }
/>

<input
  placeholder="Rating (0 - 5)"
  type="number"
  step="0.1"
  className="w-full p-2 rounded bg-black border border-white/20 text-white"
  value={form.rating}
 onChange={(e) =>
  setForm({
    ...form,
    rating: e.target.value === "" ? "" : Number(e.target.value),
  })
}
/>

<div className="grid grid-cols-2 gap-4">

  <input
    placeholder="Latitude"
    type="number"
    className="p-2 rounded bg-black border border-white/20 text-white"
    value={form.coordinates.lat}
    onChange={(e) =>
      setForm({
        ...form,
        coordinates: {
          ...form.coordinates,
          lat: Number(e.target.value),
        },
      })
    }
  />

  <input
    placeholder="Longitude"
    type="number"
    className="p-2 rounded bg-black border border-white/20 text-white"
    value={form.coordinates.lng}
    onChange={(e) =>
      setForm({
        ...form,
        coordinates: {
          ...form.coordinates,
          lng: Number(e.target.value),
        },
      })
    }
  />

</div>

          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) =>
                setForm({ ...form, isFeatured: e.target.checked })
              }
            />
            Featured
          </label>

          <select
            className="w-full p-2 rounded bg-black border border-white/20 text-white"
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value as "draft" | "published" | "archived",
              })
            }
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>

          <button
            onClick={saveListing}
            className="bg-emerald-500 px-4 py-2 rounded-lg text-black"
          >
            {editingId ? "Update Listing" : "Save Listing"}
          </button>

        </div>
      )}

      {/* Listings */}

      {listings.map((listing) => (

        <div
          key={listing._id}
          className="p-4 rounded-lg bg-white/5 border border-white/10 flex justify-between items-center"
        >

          <div className="flex items-center gap-4">

            {listing.coverImage && (
              <img
                src={listing.coverImage}
                className="w-16 h-16 rounded object-cover"
              />
            )}

            <div>
              <p className="text-white font-semibold">{listing.title}</p>

              {listing.address && (
                <p className="text-white/60 text-sm">{listing.address}</p>
              )}

              <span
                className={`text-xs px-2 py-1 rounded mt-1 inline-block ${
                  listing.status === "published"
                    ? "bg-green-500 text-black"
                    : listing.status === "draft"
                    ? "bg-gray-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {listing.status}
              </span>
            </div>

          </div>

          <div className="flex gap-3">

            <button
              onClick={() => toggleFeatured(listing._id)}
              className={`text-xs px-3 py-1 rounded ${
                listing.isFeatured
                  ? "bg-yellow-500 text-black"
                  : "bg-white/10 text-white"
              }`}
            >
              Featured
            </button>

            <button
              onClick={() => editListing(listing)}
              className="text-xs px-3 py-1 bg-blue-500 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={() => deleteListing(listing._id)}
              className="text-xs px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>
  );
}