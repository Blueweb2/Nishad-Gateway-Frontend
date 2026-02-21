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
  const [render, setRender] = useState(open);
  const [useDarkText, setUseDarkText] = useState(false);

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

  const menu: MenuItem[] = [
   
    { title: "About us", href: "/about-us" },
    { title: "Investment Sectors", href: "/investment-sectors" },
    { title: "Cities & Economic Zones", href: "/cities-economic-zones" },
    { title: "Life in Saudi Arabia", href: "/life-in-saudi-arabia" },
    { title: "Tools & Resources", href: "/tools-resources" },
    { title: "Blog", href: "/blogs" },
    { title: "Contacts", href: "/contact" },
  ];

  if (!render) return null;

  const textColor = useDarkText ? "text-black" : "text-white";
  const subTextColor = useDarkText ? "text-black/70" : "text-white/80";
  const borderColor = useDarkText ? "border-black/10" : "border-white/20";

  return (
    <div
      className={`
        fixed top-24 right-10 z-[9999]
        w-[260px] sm:w-[300px]
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
    overflow-hidden
    will-change-transform
    isolate
  "
>




        <div className="px-6 py-8">
          <div className="space-y-6">
            {menu.map((item, idx) => (
              <div key={idx}>
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`block text-[20px] font-semibold ${textColor} hover:opacity-70 transition`}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <p className={`text-[20px] font-semibold ${textColor}`}>
                    {item.title}
                  </p>
                )}

                {item.children && (
                  <ul className={`mt-2 space-y-1 text-sm ${subTextColor}`}>
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          onClick={onClose}
                          className="hover:opacity-70 transition"
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
  );
}
