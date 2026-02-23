//"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="w-full min-h-screen bg-[#8f8a86] text-white flex items-center">
      <div className="max-w-7xl mx-auto px-8 py-20 w-full">
        
        {/* TOP SECTION */}
        <div className="grid md:grid-cols-2 mb-24">
          
          {/* LEFT BIG HEADING */}
          <h1 className="text-4xl md:text-5xl font-semibold leading-snug max-w-2xl">
            Lorem Ipsum is simply <br />
            dummy text of the printing <br />
            and typesetting industry.
          </h1>

          {/* RIGHT SMALL TEXT */}
          <p className="text-sm text-gray-200 leading-relaxed max-w-md md:ml-auto mt-44">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid md:grid-cols-3 items-center gap-12">
          
          {/* MISSION */}
          <div className="border-r border-gray-300 py-10">
            <h3 className="text-lg font-medium mb-6">Mission</h3>
            <p className="text-sm text-gray-200 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>

          {/* Divider */}
          {/* <div className="hidden md:block h-40 w-px bg-gray-300 opacity-40 mx-auto" /> */}

          {/* VISION */}
          <div className="border-r border-gray-300 py-10">
            <h3 className="text-lg font-medium mb-6">Vision</h3>
            <p className="text-sm text-gray-200 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>

          {/* Divider */}
          {/* <div className="hidden md:block h-40 w-px bg-gray-300 opacity-40 mx-auto" /> */}

          {/* IMAGE */}
          <div className="relative w-full h-64 md:h-72 rounded-2xl overflow-hidden">
            <Image
              src="/about/indro-section.jpg"
              alt="Office"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}