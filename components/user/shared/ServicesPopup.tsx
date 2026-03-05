"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import { getServicesMenu } from "@/lib/api/public/services.api";

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

  useEffect(() => {
    if (services.length > 0 && expanded === null) {
      setExpanded(services[0]._id);
    }
  }, [services]);

  if (!render) {
    return null
  };

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
          fixed top-20 left-1/2 w-[340px] sm:w-[360px] sm:hidden md:block z-50
          ${open ? "animate-sheetReveal" : "animate-sheetHide"}
        `}
      >
        {/* INNER – CARD */}
        <div className="bg-white rounded-[28px] shadow-2xl p-5">
        
  
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
                className={`border-b border-gray-200 last:border-b-0 ${!open ? 'border-b-0' : ''}`}
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
                      <span className={`text-xs text-gray-400 block ${!open && 'hidden'}`}>
                        {service.index}
                      </span>
                      <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }} 
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className={`
                          text-[20px] font-semibold
                          transition-colors pe-6
                          ${isOpen ? "text-teal-700" : "text-gray-900"} ${!open && 'hidden'}
                        `}
                      >
                        {service.title}
                      </motion.h2>
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
                        ${!open && 'hidden'}
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
                          <motion.li
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }} 
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            key={sub._id}
                            onClick={() => {
                              onClose();
                              router.push(
                                `/services/${service.slug}/${sub.slug}`
                              );
                            }}
                            className={`cursor-pointer
                              text-gray-500
                              hover:text-teal-700
                              transition-colors ${!open && 'hidden'}`}
                          >
                            {sub.title}
                          </motion.li>
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
};