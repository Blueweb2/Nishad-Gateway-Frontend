import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="w-full">
      {/* HERO SECTION (Navbar stays transparent here) */}
      <section className="relative min-h-[90vh] w-full overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero.jpg" // ✅ change this to your hero image
            alt="Saudi Arabia"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="mx-auto w-full max-w-6xl px-6 pt-16 pb-14">
          <h1 className="text-white text-5xl md:text-7xl font-semibold tracking-tight leading-tight">
            Saudi Arabia
          </h1>

          <p className="mt-4 max-w-xl text-white/80 text-base md:text-lg">
            Your gateway to Saudi Arabia — company formation, advisory, and
            corporate support services.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <Link
              href="/services"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-gray-100 transition"
            >
              Explore Services
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-white/60 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* WHITE SECTION (Navbar becomes white here automatically) */}
      <section data-navbar="white" className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Why choose Nishad Gateway?
          </h2>

          <p className="mt-3 max-w-2xl text-gray-600 text-sm md:text-base">
            We help businesses enter the Saudi market smoothly with trusted
            guidance, proper documentation, and clear step-by-step processes.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900">Fast Process</h3>
              <p className="mt-2 text-sm text-gray-600">
                Quick setup with expert support and clear timelines.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900">Expert Advisory</h3>
              <p className="mt-2 text-sm text-gray-600">
                Get accurate business consultation for Saudi compliance.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900">End-to-End Support</h3>
              <p className="mt-2 text-sm text-gray-600">
                From formation to corporate support, everything in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ANOTHER SECTION (Optional) */}
      <section className="bg-gray-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Ready to start your business in Saudi Arabia?
          </h2>

          <p className="mt-3 max-w-2xl text-gray-600 text-sm md:text-base">
            Contact us today and let’s build your business journey with a strong
            foundation.
          </p>

          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/90 transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
