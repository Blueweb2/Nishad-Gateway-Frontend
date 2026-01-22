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
    const whiteSections = document.querySelectorAll('[data-navbar="white"]');

    const observer = new IntersectionObserver(
      (entries) => {
        const anyWhiteVisible = entries.some((e) => e.isIntersecting);
        setUseColoredLogo(anyWhiteVisible);
      },
      {
        rootMargin: "0px 0px 0px 0px",
        threshold: 0.01,
      }
    );

    whiteSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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
      <header className="fixed top-0 left-0 w-full z-[9999] bg-transparent">

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
              {/*  Services Button */}
              <button
                onClick={() => {
                  setOpenServices((prev) => !prev);
                  setOpenBlogs(false);
                }}
                className={`
  flex items-center gap-2
  px-4 py-2 rounded-full
  text-sm font-medium
  transition-all
  ${isLight
                    ? openServices
                      ? "bg-black text-white"
                      : "bg-white/70 text-black hover:bg-white"
                    : openServices
                      ? "bg-white text-gray-900"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }
`}

              >
                Services
                <span
                  className={`
                    text-lg leading-none transition-transform
                    ${openServices ? "rotate-45" : ""}
                  `}
                >
                  +
                </span>
              </button>

              {/*  Blog Button */}
              <button
                onClick={() => {
                  setOpenBlogs((prev) => !prev);
                  setOpenServices(false);
                }}
                className={`
  flex items-center gap-2
  px-4 py-2 rounded-full
  text-sm font-medium
  transition-all
  ${isLight
                    ? openBlogs
                      ? "bg-black text-white"
                      : "bg-white/70 text-black hover:bg-white"
                    : openBlogs
                      ? "bg-white text-gray-900"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }
`}

              >
                Blog
                <span
                  className={`
                    text-lg leading-none transition-transform
                    ${openBlogs ? "rotate-45" : ""}
                  `}
                >
                  +
                </span>
              </button>
            </div>

            {/* RIGHT — PHONE + CTA + MENU */}
            <div className="flex items-center gap-4">
              {/* Phone */}
              <span className={`hidden md:block text-sm me-36 ${isLight ? "text-black" : "text-white"}`}>
                +966 55 123 4567
              </span>


              {/* Contact Us */}
              <button
                onClick={() => {
                  setOpenContact(true);
                  setOpenServices(false);
                  setOpenBlogs(false);
                  setOpenMenu(false);
                }}
className={`
  flex items-center gap-2
  text-sm font-medium
  px-5 py-2 rounded-full
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



              {/* Hamburger */}
              {/* Hamburger / Close Button */}
              <button
                onClick={() => {
                  setOpenMenu((prev) => !prev);
                  setOpenServices(false);
                  setOpenBlogs(false);
                }}
   className={`
  relative flex items-center justify-center
  w-14 h-10 rounded-full
  transition-all duration-300
  ${openMenu
    ? "bg-green-700 hover:bg-green-600"
    : isLight
      ? "bg-white/70 border border-black/10"
      : "bg-black/30 border border-white/70 backdrop-blur-md"
  }
`}
      >
                {openMenu ? (
                  <span className="text-white text-xl font-semibold leading-none">×</span>
                ) : (
                  <div className="flex flex-col gap-1">
                    <span
                      className={`w-5 h-[2px] rounded-full ${isLight ? "bg-black" : "bg-white"
                        }`}
                    />
                    <span
                      className={`w-5 h-[2px] rounded-full ${isLight ? "bg-black" : "bg-white"
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

      {/*  BLOGS POPUP */}
      <BlogsPopup open={openBlogs} onClose={() => setOpenBlogs(false)} />
    </>
  );
}
