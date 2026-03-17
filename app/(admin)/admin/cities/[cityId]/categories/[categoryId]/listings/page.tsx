"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

type Listing = {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  address?: string;
};

export default function ListingsManager() {

  const params = useParams();

  const cityId = params.cityId as string;
  const categoryId = params.categoryId as string;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  /* ======================================================
     FETCH LISTINGS
  ====================================================== */

  const fetchListings = async () => {

    try {

      const res = await fetch(
        `${API_URL}/admin/categories/${categoryId}/contents`,
        { credentials: "include" }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Failed to load listings");
        return;
      }

      setListings(Array.isArray(data.data) ? data.data : []);

    } catch {

      toast.error("Failed to load listings");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    if (categoryId) fetchListings();

  }, [categoryId]);



  /* ======================================================
     DELETE LISTING
  ====================================================== */

  const handleDelete = async (id: string) => {

    if (!confirm("Delete this listing?")) return;

    try {

      const res = await fetch(
        `${API_URL}/admin/contents/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Failed to delete listing");
        return;
      }

      setListings(prev => prev.filter(l => l._id !== id));

      toast.success("Listing deleted");

    } catch {

      toast.error("Something went wrong");

    }

  };



  return (

    <div className="space-y-10">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-semibold text-white">
            Listings
          </h1>

          <p className="text-sm text-white/60 mt-2">
            Manage listings for this category page.
          </p>

        </div>

        <Link
          href={`/admin/cities/${cityId}/categories/${categoryId}/listings/create`}
          className="px-4 py-2 rounded-lg bg-emerald-500 text-black text-sm font-semibold hover:bg-emerald-400"
        >
          + Add Listing
        </Link>

      </div>


      {/* Listings Table */}

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">

        {loading ? (

          <div className="p-6 text-white/60">
            Loading listings...
          </div>

        ) : listings.length === 0 ? (

          <div className="p-8 text-center text-white/60">
            No listings created yet.
          </div>

        ) : (

          <table className="w-full">

            <thead className="bg-white/5 text-white/70 text-sm">

              <tr>
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Address</th>
                <th className="text-left p-4">Actions</th>
              </tr>

            </thead>

            <tbody>

              {listings.map((listing) => (

                <tr
                  key={listing._id}
                  className="border-t border-white/10 text-white"
                >

                  <td className="p-4">
                    {listing.title}
                  </td>

                  <td className="p-4 text-white/70">
                    {listing.address || "-"}
                  </td>

                  <td className="p-4 flex items-center gap-4">

                    <Link
                      href={`/admin/cities/${cityId}/categories/${categoryId}/listings/${listing._id}`}
                      className="text-blue-400 hover:underline"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(listing._id)}
                      className="text-red-400 hover:underline"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>

  );

}