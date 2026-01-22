"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { getServiceBySlug } from "@/lib/api/subservices.api";
import { getSubServicesByService } from "@/lib/api/subservices.api";

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
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!service) return null;

  return (
    <div className="min-h-screen bg-white" data-navbar="white">
<div  className="h-[2px] w-full" />

<div className="max-w-7xl mx-auto px-6 pt-28 pb-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-sm">Back</span>
        </button>

        {/* Header Section */}
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

        {/* Intro Text - Right Aligned */}
        <div className="flex justify-end mb-16">
          <div className="max-w-xs">
            <p className="text-gray-500 text-sm leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard
            </p>
          </div>
        </div>

        {/* Sub-services List */}
        <div className="space-y-6">
          {subservices.map((sub) => (
            <div key={sub._id} className="border-t border-gray-200 p-6">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px 100px 520px 1fr 100px",
                  alignItems: "center",
                  columnGap: "24px",
                }}
              >
                {/* Left Letter */}
                <div className="text-gray-300 font-light text-lg">
                  {(sub.title?.[0] || "S").toUpperCase()}
                </div>

                {/* Thumbnail */}
                <div>
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${sub.thumbnail}`}
                    alt={sub.title}
                    style={{
                      width: "40px",
                      height: "50px",
                      borderRadius: "160px",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Title */}
                <div>
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

                {/* Arrow */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => router.push(`/services/${service.slug}/${sub.slug}`)}
                    className="
  w-12 h-32 rounded-[160px]
  border border-gray-200
  shadow-sm
  flex items-center justify-center
  bg-white hover:bg-gray-50
  transition-all duration-200
"

                  >
                    <ArrowRight className="w-5 h-5 text-gray-800" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>


        {/* Empty State */}
        {subservices.length === 0 && (
          <p className="text-gray-400 text-sm mt-10">
            No subservices available.
          </p>
        )}
      </div>
    </div>
  );
}