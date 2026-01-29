import Image from "next/image";

export default function HeroSection({ content }: any) {
  return (
    <section className="relative h-[90vh] text-white">
      <Image
        src={content.backgroundImage}
        alt={content.heading}
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-40">
        <h1 className="text-5xl font-bold mb-4">
          {content.heading}
        </h1>
        <p className="text-lg max-w-xl">
          {content.subheading}
        </p>

        {content.ctaText && (
          <button className="mt-8 bg-green-600 px-6 py-3 rounded-full">
            {content.ctaText}
          </button>
        )}
      </div>
    </section>
  );
}