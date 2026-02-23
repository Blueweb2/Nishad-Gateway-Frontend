"use client";

import Image from "next/image";

export default function AboutTeam() {
  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-12">Our Team</h2>

        <div className="flex justify-center">
          <div className="relative w-64 h-72 rounded-[40px] overflow-hidden">
            <Image
              src="/about/team-member.png"
              alt="Team Member"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}