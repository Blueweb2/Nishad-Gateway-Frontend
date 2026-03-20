"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { motion } from "framer-motion";

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
           aria-label="Go back to blog page"
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-sm">Back</span>
        </button>

        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <motion.h1
            initial={{ x: -150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="text-5xl font-bold text-gray-800 leading-tight max-w-md"
          >
            {service.title}
          </motion.h1>

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
            <motion.p
              initial={{ x: 150, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-gray-500 text-sm leading-relaxed"
            >
                Explore our {service.title} services designed to help businesses
                establish and operate smoothly. Choose the right option that
                fits your requirements and start your journey with confidence.
            </motion.p>
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
                    loading="lazy"
                    src={cloudinaryAutoWebp(sub.thumbnail)}
                    alt={sub.title || "Service thumbnail image"}
                    className="w-[70px] h-[90px] lg:w-[80px] lg:h-[100px] rounded-[160px] object-cover"
                  />

                  {/* Title (mobile next to image) */}
                  <motion.h2
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{
                      duration: 2,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="lg:hidden text-lg font-semibold text-gray-900 leading-tight"
                  >
                    {sub.title}
                  </motion.h2> 

                  {/* Arrow (mobile divice) */}
                  <div className="flex lg:hidden justify-end">
                    <Link
                      href={`/services/${service.slug}/${sub.slug}`}
                      aria-label={`View ${sub.title} service`}
                      className="
                        flex items-center justify-center
                        w-8 h-8
                        rounded-full
                        border border-gray-200 shadow-sm
                        bg-white
                      "
                    >
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
                    </Link>
                  </div>
                </div>

                {/* Title (desktop) */}
                <div className="hidden lg:block">
                  <motion.h2
                    initial={{ x: 150, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{
                      duration: 2,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="text-2xl font-semibold text-gray-900 leading-tight"
                  >
                    {sub.title}
                  </motion.h2>
                </div>

                {/* Description */}
                <div>
                  <motion.p
                    initial={{ x: -150, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{
                      duration: 2,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="text-gray-500 text-sm leading-relaxed"
                  >
                    {sub.shortDesc}
                  </motion.p>
                </div>

                {/* Arrow (large divice) */}
                <div className="hidden lg:flex justify-end">
                  <Link
                    href={`/services/${service.slug}/${sub.slug}`}
                    aria-label={`View ${sub.title} service`}
                    className="
                      w-10 h-24 lg:w-12 lg:h-32
                      rounded-full
                      border border-gray-200 shadow-sm
                      flex items-center justify-center
                      bg-white hover:bg-gray-50
                      transition-all duration-200
                      active:scale-95
                    "
                  >
                    <ArrowRight className="w-5 h-5 text-gray-800" />
                  </Link>
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