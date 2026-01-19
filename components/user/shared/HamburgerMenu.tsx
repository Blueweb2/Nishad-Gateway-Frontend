"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
  // mount/unmount like your ServicesPopup
  const [render, setRender] = useState(open);

  useEffect(() => {
    if (open) {
      setRender(true);
    } else {
      const t = setTimeout(() => setRender(false), 500);
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

  const menu: MenuItem[] = [
    {
      title: "Business Setup",
      children: [
        { label: "Company Formation", href: "/services/company-formation" },
        { label: "International Market Entry", href: "/services/market-entry" },
        { label: "Saudi Business Advisory", href: "/services/advisory" },
        { label: "Corporate Support", href: "/services/corporate-support" },
      ],
    },
    { title: "Why Saudi Arabia", href: "/why-saudi-arabia" },
    { title: "Investment Sectors", href: "/investment-sectors" },
    { title: "Cities & Economic Zones", href: "/cities-economic-zones" },
    { title: "Life in Saudi Arabia", href: "/life-in-saudi-arabia" },
    { title: "Tools & Resources", href: "/tools-resources" },
    { title: "Blog", href: "/blogs" },
    { title: "Contacts", href: "/contact" },
  ];

  if (!render) return null;

  return (
    <>
      {/* BACKDROP */}
      {/* <div
        onClick={onClose}
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm transition-opacity duration-500"
        style={{ opacity: open ? 1 : 0 }}
      /> */}

      {/* PANEL WRAPPER */}
      <div
        className={`
          fixed top-24 right-10 z-[9999]
          w-[340px] sm:w-[380px]
          ${open ? "animate-menuIn" : "animate-menuOut"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* PANEL */}
        <div
          className="
            rounded-[28px]
            border border-white/20
            bg-white/75
            backdrop-blur-xl
            shadow-2xl
            overflow-hidden
          "
        >
         

          {/* MENU LIST */}
          <div className="px-6 pb-6">
            <div className="space-y-6">
              {menu.map((item, idx) => (
                <div key={idx}>
                  {/* Main Title */}
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block text-[20px] font-semibold text-black hover:text-black/90 transition"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <p className="text-[20px] font-semibold text-black">
                      {item.title}
                    </p>
                  )}

                  {/* Children list */}
                  {item.children && (
                    <ul className="mt-2 space-y-1 text-sm text-black/80">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            onClick={onClose}
                            className="hover:text-black transition"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
