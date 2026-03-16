"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ListingForm from "@/components/admin/listings/ListingForm";
import toast from "react-hot-toast";
import { ListingInput } from "@/lib/types/listing.types";


export default function EditListingPage() {

  const params = useParams();

  const cityId = params.cityId as string;
  const categoryId = params.categoryId as string;
  const listingId = params.listingId as string;

  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [listing, setListing] = useState<ListingInput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchListing = async () => {

      try {

        const res = await fetch(
          `${API_URL}/admin/contents/${listingId}`,
          { credentials: "include" }
        );

        const data = await res.json();

        if (!res.ok) {
          toast.error(data?.message || "Failed to load listing");
          return;
        }

        setListing(data.data);

      } catch {

        toast.error("Failed to load listing");

      } finally {

        setLoading(false);

      }

    };

    if (listingId) fetchListing();

  }, [listingId]);



  const handleUpdate = async (data: ListingInput): Promise<void> => {

    if (!data.title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {

      const res = await fetch(
        `${API_URL}/admin/contents/${listingId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            type: "listing",
            ...data
          })
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result?.message || "Failed to update listing");
        return;
      }

      toast.success("Listing updated");

      router.push(
        `/admin/cities/${cityId}/categories/${categoryId}`
      );

    } catch {

      toast.error("Something went wrong");

    }

  };



  if (loading) {
    return <div className="p-8 text-white/70">Loading listing...</div>;
  }

  if (!listing) {
    return <div className="p-8 text-white/70">Listing not found</div>;
  }

  return (

    <div className="max-w-3xl space-y-8">

      <h1 className="text-3xl font-semibold text-white">
        Edit Listing
      </h1>

      <ListingForm
        initialData={listing}
        onSubmit={handleUpdate}
      />

    </div>

  );

}