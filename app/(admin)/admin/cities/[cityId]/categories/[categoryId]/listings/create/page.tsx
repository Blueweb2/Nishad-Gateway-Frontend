"use client";

import { useParams, useRouter } from "next/navigation";
import ListingForm from "@/components/admin/listings/ListingForm";
import toast from "react-hot-toast";
import { ListingInput } from "@/lib/types/listing.types";


export default function CreateListingPage() {

  const params = useParams();

  const cityId = params.cityId as string;
  const categoryId = params.categoryId as string;

  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleCreate = async (data: ListingInput): Promise<void> => {

    if (!data.title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {

      const res = await fetch(
        `${API_URL}/admin/categories/${categoryId}/contents`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            cityId,
            categoryId,
            type: "listing",
            ...data
          })
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result?.message || "Failed to create listing");
        return;
      }

      toast.success("Listing created");

      router.push(
        `/admin/cities/${cityId}/categories/${categoryId}`
      );

    } catch {

      toast.error("Something went wrong");

    }

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