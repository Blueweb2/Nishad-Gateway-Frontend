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

type MenuItem = {
  title: string;
  href?: string;
  children?: { label: string; href: string }[];
};

export default function HamburgerMenu({ open, onClose }: Props) {

  const [render, setRender] = useState(open);
  const [useDarkText, setUseDarkText] = useState(false);
  const MotionLink = motion(Link);

  const hasAnimated = useRef(false);

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

  // ESC close
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  // Detect background type
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>("[data-menu]");
      const viewportMiddle = window.innerHeight / 2;

      let isDarkText = false;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
          const mode = section.getAttribute("data-menu");
          if (mode === "dark-text") {
            isDarkText = true;
          }
        }
      });

      setUseDarkText(isDarkText);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  if (!render) return null;

  const textColor = useDarkText ? "text-black" : "text-white";
  const subTextColor = useDarkText ? "text-black/70" : "text-white/80";
  const borderColor = useDarkText ? "border-black/10" : "border-white/20";

  return (
    <div
      className={`
        fixed top-24 right-10 z-[9999]
        w-[360px] 
        transition-all duration-400
        ${open ? "animate-menuIn" : "animate-menuOut"}
      `}
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
                          className="text-xs text-gray-400 block"
                        >
                          {service.index}
                        </motion.span>

                        <motion.h2
                          initial={{ opacity: 0, y: 300 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className={`text-[20px] font-semibold transition ${
                            isOpen ? "text-black" : textColor
                          }`}
                        >
                          {service.title}
                        </motion.h2>
                      </button>

                      <button
                        onClick={() => {
                          onClose();
                          router.push(`/services/${service.slug}`);
                        }}
                        className="w-9 h-9 rounded-lg border border-white/30 flex items-center justify-center"
                      >
                        <ArrowRight size={16} className={`${ isOpen ? "text-black" : textColor}`}/>
                      </button>
                    </div>

                    {/* SUB SERVICES */}
                    {isOpen && (
                      <ul className={`mt-3 space-y-2 text-sm ${subTextColor}`}>
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
                            className="cursor-pointer hover:text-teal-400 transition"
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
            <div className={`my-8 border-t ${borderColor}`} />

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
                className={`block text-[18px] font-semibold ${textColor} hover:opacity-70 transition`}
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
                className={`block text-[18px] font-semibold ${textColor} hover:opacity-70 transition`}
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
                className={`block text-[18px] font-semibold ${textColor} hover:opacity-70 transition`}
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