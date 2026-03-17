"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

type Listing = {
  _id: string;
  title: string;
  description?: string;

  address?: string;
  locationLabel?: string;

  phone?: string;
  email?: string;
  website?: string;

  openingHours?: string;
  orderInfo?: string;

  rating?: number | null;
  priceRange?: string;

  coordinates?: {
    lat?: number;
    lng?: number;
  };

  coverImage?: string;
  isFeatured?: boolean;
};

export default function CategoryPage() {

  const { citySlug, categorySlug } = useParams();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [overview, setOverview] = useState<any>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchCategoryPage = async () => {

      try {

        const res = await fetch(
          `${API_URL}/public/cities/${citySlug}/categories/${categorySlug}`
        );

        if (!res.ok) throw new Error("Failed to fetch category");

        const data = await res.json();

        setOverview(data.overview);
        setListings(data.listings || []);

      } catch (err: any) {

        setError(err.message);

      } finally {

        setLoading(false);

      }

    };

    if (citySlug && categorySlug) fetchCategoryPage();

  }, [citySlug, categorySlug]);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading category...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-24 space-y-12">

   {/* Cover Image */}

{overview?.coverImage && (
  <div className="w-full h-[300px] md:h-[400px] mb-6 overflow-hidden rounded-xl">
    <img
      src={overview.coverImage}
      alt="category image"
      className="w-full h-full object-cover"
    />
  </div>
)}

{/* Category Title */}

<h1 className="text-4xl font-bold capitalize mb-4">
  {categorySlug}
</h1>

{/* Overview */}

{overview?.content && (
  <div
    className="rich-text-light max-w-none"
    dangerouslySetInnerHTML={{ __html: overview.content }}
  />
)}

      {/* Listings */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

        {listings.map((listing) => (

          <div
            key={listing._id}
            className="space-y-4"
          >

            {/* Image */}

            {listing.coverImage && (

              <div className="flex justify-center">

                <div className="relative w-[180px] h-[220px] rounded-[90px] overflow-hidden">

                  <Image
                    src={listing.coverImage}
                    alt={listing.title}
                    fill
                    className="object-cover"
                  />

                </div>

              </div>

            )}

            {/* Title */}

            <div className="text-center space-y-2">

              <h3 className="text-xl font-semibold">
                {listing.title}
              </h3>

              {listing.isFeatured && (
                <span className="text-xs bg-yellow-400 px-2 py-1 rounded">
                  Featured
                </span>
              )}

            </div>

            {/* Description */}

            {listing.description && (
              <p className="text-sm text-gray-600 text-center">
                {listing.description}
              </p>
            )}

            {/* Info */}

            <div className="text-sm text-gray-500 space-y-1 text-center">

              {listing.orderInfo && (
                <p>
                  <b>Order:</b> {listing.orderInfo}
                </p>
              )}

              {listing.openingHours && (
                <p>
                  <b>Opening hours:</b> {listing.openingHours}
                </p>
              )}

              {listing.locationLabel && (
                <p>
                  📍 {listing.locationLabel}
                </p>
              )}

              {listing.address && (
                <p>
                  📍 {listing.address}
                </p>
              )}

              {listing.phone && (
                <p>
                  📞 {listing.phone}
                </p>
              )}

              {listing.email && (
                <p>
                  ✉ {listing.email}
                </p>
              )}

              {listing.website && (
                <a
                  href={
                    listing.website.startsWith("http")
                      ? listing.website
                      : `https://${listing.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  {listing.website}
                </a>
              )}

              {listing.rating && (
                <p>
                  ⭐ {listing.rating} / 5
                </p>
              )}

              {listing.priceRange && (
                <p>
                  Price: {listing.priceRange}
                </p>
              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}