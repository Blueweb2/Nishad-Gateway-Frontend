"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import ServicesPopup from "./ServicesPopup";
import BlogsPopup from "./BlogsPopup";
import HamburgerMenu from "./HamburgerMenu";
import ContactPopup from "./ContactPopup";


export default function Navbar() {
  const pathname = usePathname();

  //  separate states
  const [openServices, setOpenServices] = useState(false);
  const [openBlogs, setOpenBlogs] = useState(false);

  const [useColoredLogo, setUseColoredLogo] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openContact, setOpenContact] = useState(false);


  //  change navbar color based on white sections
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>("[data-navbar]");
      const navbarHeight = 90;

      let currentTheme = "dark";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= navbarHeight && rect.bottom >= navbarHeight) {
          const theme = section.getAttribute("data-navbar");
          if (theme) currentTheme = theme;
        }
      });

      setUseColoredLogo(currentTheme === "light");
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  //  close popups on route change
  useEffect(() => {
    setOpenServices(false);
    setOpenBlogs(false);
    setOpenMenu(false);
  }, [pathname]);

  const isLight = useColoredLogo;

  return (
    <>
      {/* NAVBAR */}
      <header
        className={`
          fixed top-0 left-0 w-screen z-[9999]
          transition-all duration-300
          ${isLight ? "bg-white" : "bg-transparent"}
        `}
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-10 pt-4 sm:pt-6">
          <nav className="flex items-center justify-between py-2 sm:py-3 relative">

            {/* LEFT — LOGO */}
            <Link href="/" aria-label="Go to Home">
              <Image
                src={isLight ? "/coloredlogo.svg" : "/logowhite.svg"}
                alt="Nishad Gateway"
                width={220}
                height={80}
                priority
                className="cursor-pointer transition-opacity duration-300 w-[140px] sm:w-[180px] lg:w-[220px] h-auto"
              />
            </Link>

            {/* CENTER — SERVICES + BLOG */}
            <div className="hidden md:flex items-center gap-3 lg:gap-5 absolute left-1/2 -translate-x-1/2">

              {/* Services */}
              <button
                onClick={() => {
                  setOpenServices((prev) => !prev);
                  setOpenBlogs(false);
                }}
                className={`
                  flex items-center gap-2
                  px-3 lg:px-4 py-2 rounded-full
                  text-xs lg:text-sm font-medium
                  transition-all
                  ${isLight
                    ? openServices
                      ? "bg-black text-white shadow-md"
                      : "bg-black/[0.04] text-black border border-black/10 hover:bg-black/[0.08]"
                    : openServices
                    ? "bg-white text-gray-900 shadow-md"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                  }
                `}
              >
                Services
                <span
                  className={`text-lg leading-none transition-transform ${
                    openServices ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              {/* Blog */}
              <button
                onClick={() => {
                  setOpenBlogs((prev) => !prev);
                  setOpenServices(false);
                }}
                className={`
                  flex items-center gap-2
                  px-3 lg:px-4 py-2 rounded-full
                  text-xs lg:text-sm font-medium
                  transition-all
                  ${isLight
                    ? openBlogs
                      ? "bg-black text-white shadow-md"
                      : "bg-black/[0.05] text-black border border-black/10 hover:bg-black/[0.08]"
                    : openBlogs
                    ? "bg-white text-gray-900 shadow-md"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                  }
                `}
              >
                Blog
                <span
                  className={`text-lg leading-none transition-transform ${
                    openBlogs ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3 sm:gap-5 lg:gap-8">

              {/* Phone */}
              <span
                className={`hidden lg:block text-sm ${
                  isLight ? "text-black" : "text-white"
                }`}
              >
                +966 55 123 4567
              </span>

              {/* Contact */}
              <button
                onClick={() => {
                  setOpenContact(true);
                  setOpenServices(false);
                  setOpenBlogs(false);
                  setOpenMenu(false);
                }}
                className={`
                  hidden sm:flex items-center gap-2
                  text-xs sm:text-sm font-medium
                  px-3 sm:px-4 lg:px-5 py-2 rounded-full
                  transition
                  ${isLight
                    ? "bg-black text-white hover:bg-gray-900"
                    : "bg-white text-green-600 hover:bg-gray-100"
                  }
                `}
              >
                Contact Us
                <Mail size={16} />
              </button>

              <ContactPopup open={openContact} onClose={() => setOpenContact(false)} />

              {/* MENU BUTTON */}
              <button
                onClick={() => {
                  setOpenMenu((prev) => !prev);
                  setOpenServices(false);
                  setOpenBlogs(false);
                }}
                className={`
                  relative flex items-center justify-center
                  w-10 sm:w-12 lg:w-14
                  h-9 sm:h-10
                  rounded-full
                  transition-all duration-300
                  ${
                    openMenu
                      ? "bg-green-700 hover:bg-green-600"
                      : isLight
                      ? "bg-white/70 border border-black/10"
                      : "bg-black/30 border border-white/70 backdrop-blur-md"
                  }
                `}
              >
                {openMenu ? (
                  <span className="text-white text-lg sm:text-xl font-semibold leading-none">
                    ×
                  </span>
                ) : (
                  <div className="flex flex-col gap-1">
                    <span
                      className={`w-4 sm:w-5 h-[2px] rounded-full ${
                        isLight ? "bg-black" : "bg-white"
                      }`}
                    />
                    <span
                      className={`w-4 sm:w-5 h-[2px] rounded-full ${
                        isLight ? "bg-black" : "bg-white"
                      }`}
                    />
                  </div>
                )}
              </button>

              <HamburgerMenu open={openMenu} onClose={() => setOpenMenu(false)} />
            </div>
          </nav>
        </div>
      </header>

      {/* SERVICES POPUP */}
      <ServicesPopup open={openServices} onClose={() => setOpenServices(false)} />

      {/* BLOGS POPUP */}
      <BlogsPopup open={openBlogs} onClose={() => setOpenBlogs(false)} />
    </>
  )
}