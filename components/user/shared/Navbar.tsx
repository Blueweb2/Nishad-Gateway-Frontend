"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";
import ServicesPopup from "./ServicesPopup";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [useColoredLogo, setUseColoredLogo] = useState(false);

  useEffect(() => {
    const whiteSections = document.querySelectorAll('[data-navbar="white"]');

    const observer = new IntersectionObserver(
      (entries) => {
        const anyWhiteVisible = entries.some((e) => e.isIntersecting);
        setUseColoredLogo(anyWhiteVisible);
      },
      {
        rootMargin: "-80px 0px 0px 0px",
        threshold: 0.1,
      }
    );

    whiteSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const isLight = useColoredLogo;

  return (
    <>
      {/* NAVBAR */}
      <header
        className={`
          fixed top-0 left-0 w-full z-[9999]

          ${isLight ? "bg-white" : "bg-transparent"}
        `}
      >
        <div className="w-full mx-auto px-6 pt-6">
          <nav className="flex items-center justify-between px-1 py-3">
            {/* LEFT — LOGO */}
            <Link href="/" aria-label="Go to Home">
              <Image
                src={isLight ? "/coloredlogo.svg" : "/logowhite.svg"}
                alt="Nishad Gateway"
                width={190}
                height={60}
                priority
                className="cursor-pointer transition-opacity duration-300"
              />
            </Link>

            {/* CENTER — SERVICES + BLOG */}
            <div className="hidden md:flex items-center gap-5">
              {/* Services */}
              <button
                onClick={() => setOpen((prev) => !prev)}
                className={`
                  flex items-center gap-2
                  px-4 py-2 rounded-full
                  text-sm font-medium
                  transition-all
                  ${
                    isLight
                      ? "bg-gray-100 text-black hover:bg-gray-200"
                      : open
                      ? "bg-white text-gray-900"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }
                `}
              >
                Services
                <span
                  className={`
                    text-lg leading-none transition-transform
                    ${open ? "rotate-45" : ""}
                  `}
                >
                  +
                </span>
              </button>

              {/* Blog */}
              <Link
                href="#"
                className={`
                  px-4 py-2 rounded-full
                  text-sm
                  transition
                  ${
                    isLight
                      ? "bg-gray-100 text-black hover:bg-gray-200"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }
                `}
              >
                Blog +
              </Link>
            </div>

            {/* RIGHT — PHONE + CTA + MENU */}
            <div className="flex items-center gap-4">
              {/* Phone */}
              <span
                className={`
                  hidden md:block text-sm me-36
                  ${isLight ? "text-black" : "text-white"}
                `}
              >
                +966 55 123 4567
              </span>

              {/* Contact Us */}
              <Link
                href="#"
                className={`
                  flex items-center gap-2
                  text-sm font-medium
                  px-5 py-2
                  rounded-full
                  transition
                  ${
                    isLight
                      ? "bg-gray-100 text-green-700 hover:bg-gray-200"
                      : "bg-white text-green-600 hover:bg-gray-100"
                  }
                `}
              >
                Contact Us
                <Mail size={16} />
              </Link>

              {/* Hamburger */}
              <button
                className={`
                  relative
                  flex items-center justify-center
                  w-16 h-10
                  rounded-full
                  transition-all duration-300
                  ${
                    isLight
                      ? "bg-white border border-gray-300 shadow-sm"
                      : "bg-black/30 border border-white/70 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
                  }
                `}
              >
                <div className="flex flex-col gap-1">
                  <span
                    className={`
                      w-5 h-[2px] rounded-full
                      ${isLight ? "bg-black" : "bg-white"}
                    `}
                  />
                  <span
                    className={`
                      w-5 h-[2px] rounded-full
                      ${isLight ? "bg-black" : "bg-white"}
                    `}
                  />
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* SERVICES POPUP */}
      <ServicesPopup open={open} onClose={() => setOpen(false)} />
    </>
  );
}
