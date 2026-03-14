"use client";

import { useParams, useRouter } from "next/navigation";
import ListingForm from "@/components/admin/listings/ListingForm";
import toast from "react-hot-toast";

export default function CreateListingPage() {

  const { cityId, categoryId } = useParams<{
    cityId: string;
    categoryId: string;
  }>();

  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleCreate = async (data: any) => {

    const res = await fetch(
      `${API_URL}/admin/categories/${categoryId}/listings`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cityId,
          categoryId,
          ...data,
        }),
      }
    );

    if (!res.ok) {
      toast.error("Failed to create listing");
      return;
    }

    toast.success("Listing created");

    router.push(
      `/admin/cities/${cityId}/categories/${categoryId}/listings`
    );
  };

  return (
    <div className="max-w-3xl space-y-8">

      <h1 className="text-3xl font-semibold text-white">
        Create Listing
      </h1>

      <ListingForm onSubmit={handleCreate} />

    </div>
  );
}