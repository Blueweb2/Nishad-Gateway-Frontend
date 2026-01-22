"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { getServicesMenu } from "@/lib/api/services.api"; //  create this function

type SubServiceItem = {
  _id: string;
  title: string;
  slug: string;
};

type ServiceItem = {
  _id: string;
  index: string;
  title: string;
  slug: string;
  subServices: SubServiceItem[];
};

export default function ServicesPopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  const [expanded, setExpanded] = useState<string | null>(null);

  // controls mount / unmount
  const [render, setRender] = useState(open);

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setRender(true);
    } else {
      const t = setTimeout(() => setRender(false), 550);
      return () => clearTimeout(t);
    }
  }, [open]);

  //  Fetch services menu when popup opens
  useEffect(() => {
    if (!open) return;

    const fetchServicesMenu = async () => {
      try {
        setLoading(true);

        const res = await getServicesMenu();
        setServices(res?.data || []);
      } catch (error) {
        toast.error("Failed to load services menu");
      } finally {
        setLoading(false);
      }
    };

    fetchServicesMenu();
  }, [open]);

  if (!render) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="
          fixed inset-0
          bg-black/30 backdrop-blur-sm
          z-40
          transition-opacity
          duration-500
        "
        style={{ opacity: open ? 1 : 0 }}
      />

      {/* POPUP – OUTER */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          fixed top-20 left-1/2 -translate-x-1/2
          w-[430px]
          z-50
          overflow-hidden
          ${open ? "animate-sheetReveal" : "animate-sheetHide"}
        `}
      >
        {/* INNER – CARD */}
        <div className="bg-white rounded-[28px] shadow-2xl p-5">
          {/* LOADING */}
          {loading && (
            <div className="py-10 text-center text-gray-500 text-sm">
              Loading...
            </div>
          )}

          {/* EMPTY */}
          {!loading && services.length === 0 && (
            <div className="py-10 text-center text-gray-500 text-sm">
              No services found
            </div>
          )}

          {/* LIST */}
          {!loading &&
            services.map((service) => {
              const isOpen = expanded === service._id;

              return (
                <div
                  key={service._id}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  {/* HEADER ROW */}
                  <div className="w-full flex items-center justify-between py-5">
                    {/* LEFT SIDE = EXPAND / COLLAPSE */}
                    <button
                      onClick={() =>
                        setExpanded(isOpen ? null : service._id)
                      }
                      className="flex-1 text-left group"
                    >
                      <span className="text-xs text-gray-400 block">
                        {service.index}
                      </span>

                      <h2
                        className={`
                          text-[26px] font-semibold
                          transition-colors pe-6
                          ${isOpen ? "text-teal-700" : "text-gray-900"}
                        `}
                      >
                        {service.title}
                      </h2>
                    </button>

                    {/* RIGHT ARROW = GO TO MAIN SERVICE PAGE */}
                    <button
                      onClick={() => {
                        onClose();
                        router.push(`/services/${service.slug}`);
                      }}
                      className={`
                        flex items-center justify-center
                        w-11 h-9
                        border border-gray-300
                        rounded-xl
                        transition-all duration-300
                        hover:border-gray-400
                        ${isOpen ? "rotate-90" : ""}
                      `}
                    >
                      <ArrowRight size={16} className="text-black" />
                    </button>
                  </div>

                  {/* SUB SERVICES */}
                  {isOpen && (
                    <ul className="pb-5 pl-1 space-y-2 text-sm">
                      {service.subServices?.length > 0 ? (
                        service.subServices.map((sub) => (
                          <li
                            key={sub._id}
                            onClick={() => {
                              onClose();
                              router.push(
                                `/services/${service.slug}/${sub.slug}`
                              );
                            }}
                            className="
                              cursor-pointer
                              text-gray-500
                              hover:text-teal-700
                              transition-colors
                            "
                          >
                            {sub.title}
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-400 text-sm">
                          No subservices
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
