export default function SaudiExpansion() {
  return (
    <section className="w-full bg-[#0f6f66] text-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-8">

        {/* Top Grid */}
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* LEFT SIDE */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug mb-10">
              Helping Global Businesses <br />
              Establish and Grow <br />
              in Saudi Arabia
            </h2>

            {/* Image */}
            <div className="relative w-full h-[380px] rounded-3xl overflow-hidden">
              <img src="/about/saudi-expansion.webp" alt="Business Meeting" className="w-full h-full object-cover object-center"/>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col justify-between h-full">

            {/* Description */}
            <p className="text-sm text-gray-200 leading-relaxed mb-12">
              Saudi Arabia is one of the fastest-growing business destinations in the world, driven by the
              ambitious reforms of Vision 2030. From technology and logistics to tourism, manufacturing, and
              entertainment, the Kingdom offers significant opportunities for international investors and
              entrepreneurs. <br /><br />
              Nishad Abdurahiman works closely with global businesses to help them enter, establish, and grow
              in Saudi Arabia. With deep expertise in market entry strategy, regulatory compliance, MISA
              licensing, and business expansion, he guides companies through every stage of their Saudi
              journey. <br /><br />
              From selecting the right business structure to securing approvals and launching operations, Nishad
              helps organizations navigate the Saudi market with confidence and clarity.
            </p>

            {/* Stats */}
            <div className="space-y-3 lg:space-y-8 border-t border-white/30 pt-3 lg:pt-8">

              {/* Item */}
              <div className="flex justify-between items-center border-b border-white/20 pb-3 lg:pb-6">
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold">17+</span>
                <span className="text-sm text-gray-200">
                  Years of Experience
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-white/20 pb-3 lg:pb-6">
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold">8+</span>
                <span className="text-sm text-gray-200">
                  International Market Presence
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-white/20 pb-3 lg:pb-6">
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold">2,500+</span>
                <span className="text-sm text-gray-200">
                  Company Formations in KSA
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold">250+</span>
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