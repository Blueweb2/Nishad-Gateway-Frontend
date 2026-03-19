"use client";

import Image from "next/image";
import { Send, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="w-full bg-[#0b6a67] text-white min-h-screen flex flex-col">

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex flex-1 justify-center items-center pt-12 lg:pt-16 px-6 pb-16">

        <div className="max-w-[1320px] w-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-0">

          {/* LEFT TEXT */}
          <div className="lg:w-[280px] text-white leading-relaxed text-center lg:text-right lg:pr-5">
            <motion.p
              initial={{ x: -150, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Start Your Business in Saudi Arabia
              Expert guidance for business in Saudi Arabia, including company formation, foreign investment licensing, and ownership structuring in KSA.
            </motion.p>
          </div>


          {/* CENTER OVAL CTA */}
          <div className="relative w-[260px] sm:w-[300px] lg:w-[320px] h-[420px] sm:h-[460px] lg:h-[500px] rounded-[160px] overflow-hidden flex items-center justify-center">

            {/* BACKGROUND IMAGE */}
            <Image
              src="/contact.webp"
              alt="Desert landscape in Saudi Arabia representing business expansion environment"
              loading="lazy"
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
                  alt="NishadVTA - Business Expansion Services in Saudi Arabia"
                  loading="lazy"
                  width={220}
                  height={120}
                />
              </div>

              {/* CTA BUTTON */}
              <Link
                href="/ksa-expansion-cost-calculator"
                aria-label="Calculate your Saudi Arabia expansion cost using our cost calculator"
                title="KSA Expansion Cost Calculator"
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
            <a 
              href="/privacy-policy" 
              className="underline underline-offset-4" 
              aria-label="Read our privacy policy"
              title="Privacy Policy"
            >
              Privacy policy
            </a>
          </div>

          {/* CENTER */}
          <div className="sm:flex-1 flex justify-center gap-4">

            <SocialIcon
              label="Contact us on Telegram"
              icon={<Send size={14} />}
            />

            <SocialIcon
              label="Visit our Instagram"
              icon={<Instagram size={14} />}
            />

            <SocialIcon
              href="https://www.linkedin.com/in/nishad-abdu-rahiman-business-consultant"
              label="Visit Nishad Abdu Rahiman's LinkedIn profile"
              icon={<Linkedin size={14} />}
            />

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
type SocialIconProps = {
  icon: React.ReactNode;
  href?: string;
  label: string;
};

function SocialIcon({ icon, href, label }: SocialIconProps) {
  return (
    <a
      href={href && href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="
        w-8 h-8 rounded-full
        bg-white/10
        flex items-center justify-center
        hover:bg-white/20 transition
        focus:outline-none focus:ring-2 focus:ring-white/50
      "
    >
      <span aria-hidden="true">{icon}</span>
    </a>
  );
}