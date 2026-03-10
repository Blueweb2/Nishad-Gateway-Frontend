//"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="w-full min-h-screen bg-[#8f8a86] text-white flex items-center">
      <div className="max-w-7xl mx-auto px-8 py-12 lg:py-20 w-full">
        
        {/* TOP SECTION */}
        <div className="grid md:grid-cols-2 lg:mb-24">
          
          {/* LEFT BIG HEADING */}
          <h1 className="text-4xl md:text-5xl font-semibold leading-snug max-w-2xl">
            Helping Businesses Enter & Grow in Saudi Arabia
          </h1>

          {/* RIGHT SMALL TEXT */}
          <p className="text-sm text-gray-200 leading-relaxed max-w-md md:ml-auto ">
            Saudi Arabia is rapidly becoming one of the world’s most dynamic investment destinations under Vision 2030, creating new opportunities across technology, manufacturing, logistics, tourism, and infrastructure. <br /><br />

            Nishad Abdurahiman brings 17+ years of business consulting experience, helping global entrepreneurs, investors, and companies successfully establish and expand their presence in Saudi Arabia and the Middle East. <br /><br />

            As Co-Founder of Analytix, he has supported 2000+ companies across sectors including logistics, technology, manufacturing, construction, healthcare, and professional services. His expertise covers business setup, MISA licensing, regulatory compliance, market entry strategy, and operational expansion.<br /><br />

            Nishad’s mission is to simplify business entry into Saudi Arabia and help companies grow confidently within the Kingdom’s rapidly evolving economy.
          </p>
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid md:grid-cols-3 items-center gap-4 lg:gap-12">
          
          {/* MISSION */}
          <div className="lg:border-r lg:border-gray-300 py-10">
            <h3 className="text-lg font-medium mb-6">Mission</h3>
            <p className="text-sm text-gray-200 leading-relaxed">
              To simplify the process of doing business in Saudi Arabia by providing trusted guidance, strategic
              insights, and end-to-end support for entrepreneurs and companies entering the Kingdom.
            </p>
          </div>

          {/* Divider */}

          {/* VISION */}
          <div className="lg:border-r lg:border-gray-300 lg:py-10">
            <h3 className="text-lg font-medium mb-6">Vision</h3>
            <p className="text-sm text-gray-200 leading-relaxed">
              To become a trusted global gateway for investors and businesses seeking opportunities in Saudi
              Arabia, helping them grow alongside the Kingdom’s economic transformation under Vision 2030.
            </p>
          </div>

          {/* Divider */}

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