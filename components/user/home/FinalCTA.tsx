"use client";

import Image from "next/image";
import { Send, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";



export default function FinalCTA() {
  return (
    <section className="w-full bg-[#0b6a67] text-white min-h-screen flex flex-col">
      {/* ================= MAIN CONTENT ================= */}
      <div className="flex flex-1 justify-center items-center">
        <div className="max-w-[1320px] w-full flex items-center justify-center">

          {/* LEFT TEXT */}
          <div className="w-[250px] text-white/100 leading-relaxed ">
            <p className="text-right pr-5">
              If you’re considering Saudi Arabia  and want clarity 
              before taking the next step…
            </p>
          </div>

          {/* CENTER OVAL CTA */}
          <div 
            className="relative w-[320px] h-[500px] rounded-[160px] overflow-hidden flex items-center justify-center"
          >

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
            <div className="relative z-10 flex flex-col items-center text-center">

              {/* BRAND */}
              <div className="mb-14">
                <Image
                  src="/logowhite.svg"
                  alt="NishadVTA Logo"
                  width={260}
                  height={140}
                />
              </div >

              {/* CTA BUTTON */}
              <Link
                href="/ksa-expansion-cost-calculator"
                className="
                  bg-green-600 hover:bg-green-700
                  text-white text-sm font-medium
                  px-8 py-3 mt-10
                  rounded-full
                  transition
                  inline-block
                "
              >
                Calculate Your KSA Expansion Cost
              </Link>

            </div>
          </div>

          {/* RIGHT SPACER (EMPTY FOR BALANCE) */}
          <div className="w-[260px]" />
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="px-6 pb-3 w-full">

        <div className="flex items-center text-xs text-white/70">

          {/* LEFT */}
          <div className="flex-1">
            <a href="#" className="underline underline-offset-4">
              Privacy policy
            </a>
          </div>

          {/* CENTER */}
          <div className="flex-1 flex justify-center gap-4">
            <SocialIcon icon={<Send size={14} />} />
            <SocialIcon icon={<Instagram size={14} />} />
            <SocialIcon icon={<Linkedin size={14} />} />
          </div>

          {/* RIGHT */}
          <div className="flex-1 flex justify-end">
            <p>© 2026 NishadVTA. All rights are reserved.</p>
          </div>

        </div>
      </div>
    </section>
  );
}

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
}
