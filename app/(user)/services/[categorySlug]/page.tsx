"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { getServiceBySlug } from "@/lib/api/public/subservices.api";
import { getSubServicesByService } from "@/lib/api/public/subservices.api";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type ServiceItem = {
  _id: string;
  title: string;
  slug: string;
};

type SubServiceItem = {
  _id: string;
  title: string;
  slug: string;
  shortDesc: string;
  thumbnail: string;
};

export default function CategoryPage() {
  const router = useRouter();
  const params = useParams();

  const categorySlug = params?.categorySlug as string;

  const [service, setService] = useState<ServiceItem | null>(null);
  const [subservices, setSubservices] = useState<SubServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categorySlug) return;

    const fetchCategory = async () => {
      try {
        setLoading(true);

        const serviceRes = await getServiceBySlug(categorySlug);
        const foundService: ServiceItem = serviceRes?.data;

        if (!foundService?._id) {
          toast.error("Service not found");
          router.push("/services");
          return;
        }

        setService(foundService);

        const subRes = await getSubServicesByService(foundService._id);
        const list: SubServiceItem[] = subRes?.data || [];

        setSubservices(list);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Failed to load service");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categorySlug, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!service) return null;

  return (
    <div className="min-h-screen bg-white" data-navbar="light">
      <div className="h-[2px] w-full" />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-sm">Back</span>
        </button>

        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <h1 className="text-5xl font-bold text-gray-800 leading-tight max-w-md">
            {service.title}
          </h1>

          <div className="text-right">
            <div className="text-sm text-gray-500">All</div>
            <div className="text-5xl font-light text-gray-400">
              {subservices.length}
            </div>
          </div>
        </div>
        {/* Intro */}
        <div className="flex justify-end mb-16">
          <div className="max-w-xs">
            <p className="text-gray-500 text-sm leading-relaxed">
                Explore our {service.title} services designed to help businesses
                establish and operate smoothly. Choose the right option that
                fits your requirements and start your journey with confidence.
            </p>
          </div>
        </div>

        {/* Subservices */}
        <div className="space-y-6">
          {subservices.map((sub) => (
            <div key={sub._id} className="border-t border-gray-200 p-6">
              <div className="grid grid-cols-1 lg:grid-cols-[40px_100px_520px_1fr_100px] gap-4 lg:gap-6 items-start lg:items-center">

                {/* Letter (desktop only) */}
                <div className="hidden lg:block text-gray-300 font-light text-lg">
                  {(sub.title?.[0] || "S").toUpperCase()}
                </div>

                {/* Image */}
                <div className="flex justify-between items-center gap-4 lg:block">
                  <img
                    src={cloudinaryAutoWebp(sub.thumbnail)}
                    alt={sub.title}
                    className="w-[70px] h-[90px] lg:w-[80px] lg:h-[100px] rounded-[160px] object-cover"
                  />

                  {/* Title (mobile next to image) */}
                  <h2 className="lg:hidden text-lg font-semibold text-gray-900 leading-tight">
                    {sub.title}
                  </h2> 

                  {/* Arrow (mobile divice) */}
                  <div className="flex lg:hidden justify-end">
                    <button
                      onClick={() =>
                        router.push(`/services/${service.slug}/${sub.slug}`)
                      }
                      className="w-5 h-12 rounded-[160px] border border-gray-200 shadow-sm flex items-center justify-center bg-white hover:bg-gray-50 transition-all duration-200"
                    >
                      <ArrowRight className="w-5 h-5 text-gray-800" />
                    </button>
                  </div>
                </div>

                {/* Title (desktop) */}
                <div className="hidden lg:block">
                  <h2 className="text-2xl font-semibold text-gray-900 leading-tight">
                    {sub.title}
                  </h2>
                </div>

                {/* Description */}
                <div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {sub.shortDesc}
                  </p>
                </div>

                {/* Arrow (large divice) */}
                <div className="hidden lg:flex justify-end">
                  <button
                    onClick={() =>
                      router.push(`/services/${service.slug}/${sub.slug}`)
                    }
                    className="w-10 h-24 lg:w-12 lg:h-32 rounded-[160px] border border-gray-200 shadow-sm flex items-center justify-center bg-white hover:bg-gray-50 transition-all duration-200"
                  >
                    <ArrowRight className="w-5 h-5 text-gray-800" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty */}
        {subservices.length === 0 && (
          <p className="text-gray-400 text-sm mt-10">
            No subservices available.
          </p>
        )}
      </div>
    </div>
  );
}