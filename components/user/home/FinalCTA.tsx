"use client";

import Image from "next/image";
import { Send, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";



export default function FinalCTA() {
  return (
    <section className="w-full bg-[#0b6a67] text-white min-h-screen flex flex-col justify-between">

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-[1320px] mx-auto px-6 pt-10 flex items-center justify-between">

        {/* LEFT TEXT */}
        <div className="max-w-sm text-white/90 leading-relaxed me-5">
          <p>
            If you’re considering Saudi Arabia <br /> and want clarity <br />
            before taking the next step…
          </p>
        </div>

        {/* CENTER OVAL CTA */}
        <div className="relative w-[420px] h-[600px] rounded-[160px] overflow-hidden flex items-center justify-center">

          {/* BACKGROUND IMAGE */}
          <Image
            src="/contact.webp" // replace with your desert image
            alt="Saudi Arabia Desert"
            fill
            className="object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/20" />

          {/* CONTENT */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">

            {/* BRAND */}
         <div className="mb-14">
              <Image
                src="/coloredlogo.svg"
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
    px-10 py-3
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

      {/* ================= FOOTER ================= */}
      <div className="max-w-[1320px] mx-auto px-6 pb-8 w-full mt-10">

        <div className="flex items-center justify-between text-xs text-white/70">

          {/* LEFT */}
          <a href="#" className="underline underline-offset-4">
            Privacy policy
          </a>

          {/* CENTER SOCIALS */}
          <div className="flex gap-4">
            <SocialIcon icon={<Send size={14} />} />
            <SocialIcon icon={<Instagram size={14} />} />
            <SocialIcon icon={<Linkedin size={14} />} />
          </div>

          {/* RIGHT */}
          <p>© 2026 NishadVTA. All rights are reserved.</p>

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
