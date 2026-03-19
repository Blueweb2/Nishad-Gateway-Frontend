import Image from "next/image";
import FadeUpScroll from "../ui/FadeUpScroll";

export default function AboutHero() {
  return (
    <section
      data-navbar="light"
      data-menu="dark-text"
      className="relative w-full  text-black pt-28 pb-32 overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-6 text-center">

        <FadeUpScroll delay={0.1}>
          <h1 className="
            text-[42px]
            sm:text-[54px]
            md:text-[56px]
            lg:text-[132px]
            font-extrabold
            tracking-tight
            leading-[1]
          ">
            Nishad Abdurahiman
          </h1>
        </FadeUpScroll>

        <FadeUpScroll delay={0.2}>
          <p className="mt-6 text-lg md:text-2xl text-gray-500 font-medium">
            Your Gateway To Saudi Arabia
          </p>
        </FadeUpScroll>

        <FadeUpScroll delay={0.3}>
          <div className="mt-16 flex justify-center">
            <div className="
              relative
              w-[260px]
              sm:w-[320px]
              md:w-[420px]
              lg:w-[420px]
              aspect-[3/4]
              rounded-[160px]
              overflow-hidden
              shadow-[0_40px_80px_rgba(0,0,0,0.15)]
            ">
              <Image
                src="/about/aboutHero.webp"
                alt="Nishad Abdurahiman about hero img"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </FadeUpScroll>

      </div>
    </section>
  );
};