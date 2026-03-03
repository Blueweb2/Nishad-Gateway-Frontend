"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
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

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function HamburgerMenu({ open, onClose }: Props) {

  const [render, setRender] = useState(open);
  const MotionLink = motion.create(Link);

  const hasAnimated = useRef(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    const fetchServices = async () => {
      try {
        const res = await getServicesMenu();
        const data = res?.data || [];
        setServices(data);

        if (data.length > 0) {
          setExpanded(data[0]._id);
        }
      } catch (error) {
        console.error("Failed to load services");
      }
    };

    fetchServices();
  }, [open]);

  // Mount animation
  useEffect(() => {
    if (open) {
      setRender(true);
    } else {
      const t = setTimeout(() => setRender(false), 400);
      return () => clearTimeout(t);
    }
  }, [open]);

  // out side click time close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!render) return null;

  return (
    <div
      className={`
        fixed top-24 right-10 z-[9999]
        w-[360px] 
        transition-all duration-400
        ${open ? "animate-menuIn" : "animate-menuOut"}
      `}
      ref={menuRef}
    >
      {/* GLASS PANEL */}
      <div
        className="
          relative
          rounded-[36px]
          border border-white/25
          bg-gradient-to-b from-white/40 to-white/25
          backdrop-blur-3xl
          shadow-[0_30px_90px_rgba(0,0,0,0.35)]
          will-change-transform
          isolate
        "
      >
        <div className="pt-6 ">
          <div className="p-4 max-h-[70vh] overflow-y-auto mb-5 hide-scrollbar ">
            {/* SERVICES SECTION */}
            <div className="space-y-4">
              {services.map((service) => {
                const isOpen = expanded === service._id;

                return (
                  <div key={service._id} className="overflow-hidden">
                    {/* SERVICE HEADER */}
                    <div className="flex items-center justify-between ">
                      <button
                        onClick={() => setExpanded(isOpen ? null : service._id)}
                        className="flex-1 text-left"
                      >
                        <motion.span
                          initial={{ opacity: 0, y: 300 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className={`text-xs text-gray-700 block ${!open && 'hidden'}`}
                        >
                          {service.index}
                        </motion.span>

                        <motion.h2
                          initial={{ opacity: 0, y: 300 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className={`text-[20px] font-semibold transition text-black
                            ${!open && 'hidden'}`}
                        >
                          {service.title}
                        </motion.h2>
                      </button>

                      <button
                        onClick={() => {
                          onClose();
                          router.push(`/services/${service.slug}`);
                        }}
                        className={`w-9 h-9 rounded-lg border border-white/30 flex items-center justify-center ${!open && 'hidden'}`}
                      >
                        <ArrowRight size={16} className='text-black'/>
                      </button>
                    </div>

                    {/* SUB SERVICES */}
                    {isOpen && (
                      <ul className="mt-3 space-y-2 text-sm text-black">
                        {service.subServices?.map((sub) => (
                          <motion.li
                            initial={{ opacity: 0, y: 300 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            key={sub._id}
                            onClick={() => {
                              onClose();
                              router.push(
                                `/services/${service.slug}/${sub.slug}`
                              );
                            }}
                            className={`cursor-pointer hover:text-teal-400 transition ${!open && 'hidden'}`}
                          >
                            {sub.title}
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>

            {/* DIVIDER */}
            <div className={`my-8 border-t text-gray-300 ${!open && 'hidden'}`} />

            {/* STATIC LINKS */}
            <div className="space-y-3">
              <MotionLink
                initial={!hasAnimated.current ? { opacity: 0, y: 300 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                onAnimationComplete={() => {
                  hasAnimated.current = true;
                }}
                href="/about-us"
                onClick={onClose}
                className={`block text-[18px] font-semibold text-black hover:opacity-70 transition ${!open && 'hidden'}`}
              >
                About us
              </MotionLink>

              <MotionLink
                initial={!hasAnimated.current ? { opacity: 0, y: 300 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                onAnimationComplete={() => {
                  hasAnimated.current = true;
                }}
                href="/blogs"
                onClick={onClose}
                className={`block text-[18px] font-semibold text-black hover:opacity-70 transition ${!open && 'hidden'}`}
              >
                Blog
              </MotionLink>

              <MotionLink
                initial={!hasAnimated.current ? { opacity: 0, y: 300 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                onAnimationComplete={() => {
                  hasAnimated.current = true;
                }}
                href="/contact"
                onClick={onClose}
                className={`block text-[18px] font-semibold text-black hover:opacity-70 transition ${!open && 'hidden'}`}
              >
                Contacts
              </MotionLink>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};