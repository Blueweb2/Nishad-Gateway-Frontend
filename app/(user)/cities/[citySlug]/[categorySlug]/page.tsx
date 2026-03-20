"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Mail, MapPin, Phone, Star } from "lucide-react";

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

<div className="grid md:grid-cols-2 lg:grid-cols-3">

  {listings.map((listing) => {

    return (
      <div
        key={listing._id}
        className="bg-white p-5  border border-gray-100 hover: transition space-y-4"
      >

        {/* Image */}
        {listing.coverImage && (
          <div className="flex justify-center">
            <div className="relative w-[200px] h-[280px] rounded-[160px] overflow-hidden">
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
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {listing.title}
          </h3>
        </div>

        {/* Description */}
        {listing.description && (
          <div
            className="text-sm text-gray-600 text-center rich-text-light line-clamp-3"
            dangerouslySetInnerHTML={{ __html: listing.description }}
          />
        )}

        {/* Info */}
        <div className="text-sm text-gray-500 space-y-2">

          {listing.locationLabel && (
            <p className="flex items-center gap-2 justify-center">
              <MapPin size={14} className="text-gray-400" />
              {listing.locationLabel}
            </p>
          )}

          {listing.address && (
            <p className="flex items-center gap-2 justify-center">
              <MapPin size={14} className="text-gray-400" />
              {listing.address}
            </p>
          )}

          {listing.phone && (
            <a
              href={`tel:${listing.phone}`}
              className="flex items-center gap-2 justify-center hover:text-black"
            >
              <Phone size={14} className="text-gray-400" />
              {listing.phone}
            </a>
          )}

          {listing.email && (
            <a
              href={`mailto:${listing.email}`}
              className="flex items-center gap-2 justify-center hover:text-black"
            >
              <Mail size={14} className="text-gray-400" />
              {listing.email}
            </a>
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
              className="block text-center text-green-600 hover:underline"
            >
              {listing.website}
            </a>
          )}

        </div>

      </div>
    );
  })}
</div>

    </div>
  );
}