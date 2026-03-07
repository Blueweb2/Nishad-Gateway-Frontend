"use client";

import Image from "next/image";
import { Send, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="w-full bg-[#0b6a67] text-white min-h-screen flex flex-col">

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex flex-1 justify-center items-center pt-12 lg:pt-16 px-6 pb-16">

        <div className="max-w-[1320px] w-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-0">

          {/* LEFT TEXT */}
          <div className="lg:w-[280px] text-white leading-relaxed text-center lg:text-right lg:pr-5">
            <p>
              Company Formation in Saudi Arabia Starts Here. Expert guidance
              on business setup, foreign investment licensing, and ownership
              structuring in KSA.
            </p>
          </div>


          {/* CENTER OVAL CTA */}
          <div className="relative w-[260px] sm:w-[300px] lg:w-[320px] h-[420px] sm:h-[460px] lg:h-[500px] rounded-[160px] overflow-hidden flex items-center justify-center">

            {/* BACKGROUND IMAGE */}
            <Image
              src="/contact.webp"
              alt="Saudi Arabia Desert"
              fill
              className="object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/20" />

            {/* CONTENT */}
            <div className="relative z-10 flex flex-col items-center text-center px-6">

              {/* BRAND */}
              <div className="mb-10 lg:mb-14">
                <Image
                  src="/logowhite.svg"
                  alt="NishadVTA Logo"
                  width={220}
                  height={120}
                />
              </div>

              {/* CTA BUTTON */}
              <Link
                href="/ksa-expansion-cost-calculator"
                className="
                  bg-green-600 hover:bg-green-700
                  text-white text-sm font-medium
                  px-8 py-3
                  rounded-full
                  transition
                  inline-block
                "
              >
                Calculate Your KSA Expansion Cost
              </Link>

            </div>
          </div>


          {/* RIGHT SPACER */}
          <div className="hidden lg:block w-[260px]" />

        </div>
      </div>


      {/* ================= FOOTER ================= */}
      <div className="px-6 pb-6 w-full">

        <div className="max-w-[1320px] mx-auto flex flex-col sm:flex-row items-center gap-6 sm:gap-0 text-xs text-white/70">

          {/* LEFT */}
          <div className="sm:flex-1 text-center sm:text-left">
            <a href="#" className="underline underline-offset-4">
              Privacy policy
            </a>
          </div>

          {/* CENTER */}
          <div className="sm:flex-1 flex justify-center gap-4">
            <SocialIcon icon={<Send size={14} />} />
            <SocialIcon icon={<Instagram size={14} />} />
            <SocialIcon icon={<Linkedin size={14} />} />
          </div>

          {/* RIGHT */}
          <div className="sm:flex-1 text-center sm:text-right">
            <p>© 2026 NishadVTA. All rights are reserved.</p>
          </div>

        </div>
      </div>

    </section>
  );
};

/* ================= SOCIAL ICON ================= */

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <button
      className="
        w-8 h-8 rounded-full
        bg-white/10
        flex items-center justify-center
        hover:bg-white/20 transition
      "
    >
      {icon}
    </button>
  );
};