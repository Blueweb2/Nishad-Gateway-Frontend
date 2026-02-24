export default function SaudiExpansion() {
  return (
    <section className="w-full bg-[#0f6f66] text-white py-20">
      <div className="max-w-7xl mx-auto px-8">

        {/* Top Grid */}
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* LEFT SIDE */}
          <div>
            <h2 className="text-4xl font-bold leading-snug mb-10">
              We help you to <br />
              expand your business <br />
              in Saudi Arabia
            </h2>

            {/* Image */}
            <div className="relative w-full h-[380px] rounded-3xl overflow-hidden">
              <img src="/about/saudi-expansion.png" alt="Business Meeting" className="w-full h-full object-cover object-center"/>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col justify-between h-full">

            {/* Description */}
            <p className="text-sm text-gray-200 leading-relaxed max-w-md mb-12">
              Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry’s
              standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a
              type specimen book.
            </p>

            {/* Stats */}
            <div className="space-y-8 border-t border-white/30 pt-8">

              {/* Item */}
              <div className="flex justify-between items-center border-b border-white/20 pb-6">
                <span className="text-3xl font-bold">17+</span>
                <span className="text-sm text-gray-200">
                  Years of Experience
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-white/20 pb-6">
                <span className="text-3xl font-bold">8+</span>
                <span className="text-sm text-gray-200">
                  International Market Presence
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-white/20 pb-6">
                <span className="text-3xl font-bold">2,500+</span>
                <span className="text-sm text-gray-200">
                  Company Formations in KSA
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold">250+</span>
                <span className="text-sm text-gray-200">
                  Professionals
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};