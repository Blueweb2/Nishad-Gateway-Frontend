"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SERVICES } from "@/lib/services/services.data";
import { ServiceKey } from "@/lib/services/services.types";

const SERVICE_MAIN_ROUTES: Record<ServiceKey, string> = {
  companyFormation: "/services/company-formation",
  internationalMarket: "/services/international-market",
  advisory: "/services/advisory",
  corporateSupport: "/services/corporate",
};

export default function ServicesPopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  const [expanded, setExpanded] = useState<ServiceKey | null>(null);

  // controls mount / unmount
  const [render, setRender] = useState(open);

  useEffect(() => {
    if (open) {
      setRender(true);
    } else {
      const t = setTimeout(() => setRender(false), 550);
      return () => clearTimeout(t);
    }
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
          fixed top-20 left-1/2
          w-[430px]
          z-50
          overflow-hidden
          ${open ? "animate-sheetReveal" : "animate-sheetHide"}
        `}
      >
        {/* INNER – CARD */}
        <div className="bg-white rounded-[28px] shadow-2xl p-5">
          {(Object.keys(SERVICES) as ServiceKey[]).map((key) => {
            const service = SERVICES[key];
            const isOpen = expanded === key;

            return (
              <div
                key={key}
                className="border-b border-gray-200 last:border-b-0"
              >
                {/* HEADER ROW */}
                <div className="w-full flex items-center justify-between py-5">
                  {/* LEFT SIDE = EXPAND / COLLAPSE */}
                  <button
                    onClick={() => setExpanded(isOpen ? null : key)}
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

                  {/* RIGHT ARROW = GO TO MAIN PAGE */}
                  <button
                    onClick={() => {
                      onClose();
                      router.push(SERVICE_MAIN_ROUTES[key]);
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

                {/* SUB CONTENT */}
                {isOpen && (
                  <ul className="pb-5 pl-1 space-y-2 text-sm">
                    {service.items.map((item) => (
                      <li
                        key={item.label}
                        onClick={() => {
                          onClose();
                          router.push(item.href);
                        }}
                        className="
                          cursor-pointer
                          text-gray-500
                          hover:text-teal-700
                          transition-colors
                        "
                      >
                        {item.label}
                      </li>
                    ))}
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
