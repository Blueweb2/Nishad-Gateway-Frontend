"use client";

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

type SubService = {
  _id: string;
  title: string;
  slug: string;
  shortDesc: string;
  thumbnail: string;
};

type Props = {
  serviceTitle: string;
  serviceSlug: string;
  subservices: SubService[];
};

export default function ServiceTemplate({
  serviceTitle,
  serviceSlug,
  subservices,
}: Props) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white" data-navbar="light">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-sm">Back</span>
        </button>

        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <h1 className="text-5xl font-bold text-gray-800 leading-tight">
            {serviceTitle}
          </h1>

          <div className="text-right">
            <div className="text-sm text-gray-500">All</div>
            <div className="text-5xl font-light text-gray-400">
              {subservices.length}
            </div>
          </div>
        </div>

        {/* Intro */}
        <div className="max-w-md ml-auto mb-16">
          <p className="text-gray-500 text-sm leading-relaxed">
            Explore the available services and choose the right option for your
            business setup.
          </p>
        </div>

        {/* Subservices */}
        <div className="space-y-6">
          {subservices.map((sub) => (
            <div key={sub._id} className="border-t border-gray-200 pt-6">
              <div className="flex items-start gap-6">
                {/* Letter */}
                <div className="text-gray-300 font-light text-lg pt-2 w-8">
                  {(sub.title?.[0] || "S").toUpperCase()}
                </div>

                {/* Image */}
                <div className="flex-shrink-0">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${sub.thumbnail}`}
                    alt={sub.title}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>

                {/* Title */}
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {sub.title}
                  </h2>
                </div>

                {/* Description */}
                <div className="flex-grow max-w-md">
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {sub.shortDesc}
                  </p>
                </div>

                {/* Arrow */}
                <button
                  onClick={() =>
                    router.push(`/services/${serviceSlug}/${sub.slug}`)
                  }
                  className="flex-shrink-0 w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                >
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}