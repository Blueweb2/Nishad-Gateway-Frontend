"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { getCities } from "@/lib/api/public/city.api";

type CityItem = {
  _id: string;
  cityName: string;
  citySlug: string;
  cityImage?: string;
};

export default function CitiesPopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [render, setRender] = useState(open);
  const [cities, setCities] = useState<CityItem[]>([]);
  const [loading, setLoading] = useState(false);

  // mount / unmount
  useEffect(() => {
    if (open) {
      setRender(true);
    } else {
      const t = setTimeout(() => setRender(false), 550);
      return () => clearTimeout(t);
    }
  }, [open]);

  // fetch cities
  useEffect(() => {
    if (!open) return;

    const fetchCities = async () => {
      try {
        setLoading(true);
        const data = await getCities();
        setCities(data || []);
      } catch (err) {
        console.error("Failed to fetch cities");
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [open]);

  if (!render) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-500"
        style={{ opacity: open ? 1 : 0 }}
      />

      {/* POPUP */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-20 left-1/2 w-[340px] sm:w-[360px] sm:hidden md:block z-50
        ${open ? "animate-sheetRevealButtons" : "animate-sheetHideButtons"}`}
      >
        <div className="bg-white rounded-[28px] shadow-2xl border border-black/10 p-5">

          {/* HEADER */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900">
              Cities & Zones
            </h3>

            <Link
              href="/cities"
              onClick={onClose}
              className="flex items-center gap-2 text-xs text-gray-700"
            >
              All
              <span className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          {/* LIST */}
          <div className="mt-5 space-y-5 max-h-[500px] overflow-y-auto hide-scrollbar">

            {loading && (
              <p className="text-sm text-gray-400 text-center py-10">
                Loading cities...
              </p>
            )}

            {!loading &&
              cities.map((city) => (
                <div
                  key={city._id}
                  className="flex items-center justify-between gap-4 border-b border-gray-200 pb-5"
                >
                  <div className="flex items-center gap-4">

                    {/* IMAGE */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className=" overflow-hidden"
                    >
                      <Image
                        priority
                        src={city.cityImage || "/citiesbg.webp"}
                        alt={city.cityName}
                        width={60}
                        height={60}
                        className="w-[60px] h-[80px] rounded-[160px] object-cover"
                      />
                    </motion.div>

                    {/* CITY NAME */}
                    <h4 className="text-sm font-semibold text-gray-900">
                      {city.cityName}
                    </h4>
                  </div>

                  {/* LINK */}
                  <Link
                    href={`/cities/${city.citySlug}`}
                    onClick={onClose}
                    className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    <ArrowUpRight className="w-4 h-4 text-gray-900" />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}