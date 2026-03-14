"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ListingForm from "@/components/admin/listings/ListingForm";
import toast from "react-hot-toast";

export default function EditListingPage() {

  const { cityId, categoryId, listingId } = useParams<{
    cityId: string;
    categoryId: string;
    listingId: string;
  }>();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const [listing, setListing] = useState<any>(null);

  useEffect(() => {

    const fetchListing = async () => {

      const res = await fetch(
        `${API_URL}/admin/listings/${listingId}`,
        { credentials: "include" }
      );

      const data = await res.json();

      setListing(data.data);

    };

    fetchListing();

  }, [listingId]);

  const handleUpdate = async (data: any) => {

    const res = await fetch(
      `${API_URL}/admin/listings/${listingId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      toast.error("Failed to update listing");
      return;
    }

    toast.success("Listing updated");

    router.push(
      `/admin/cities/${cityId}/categories/${categoryId}/listings`
    );
  };

  if (!listing) {
    return <div className="text-white">Loading...</div>;
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