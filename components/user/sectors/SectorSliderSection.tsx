"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import OvalArrow from "@/components/user/ui/OvalArrow";

interface Props {
  title: string;
  description: string;
  items: {
    title: string;
    description: string;
    image: string;
  }[];
}

export default function SectorSliderSection({
  title,
  description,
  items,
}: Props) {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-[#8f8a86] py-24 overflow-hidden" data-navbar="light">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex justify-between items-start mb-16">

          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white max-w-xl leading-tight">
              {title}
            </h2>
          </div>

          <div className="max-w-md text-white/80 text-sm md:text-base leading-relaxed">
            {description}
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            <div ref={prevRef}>
              <OvalArrow direction="left" variant="gray" />
            </div>

            <div ref={nextRef}>
              <OvalArrow direction="right" variant="gray" />
            </div>
          </div>

        </div>

        {/* Slider */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={40}
          slidesPerView={1.2}
          onSwiper={(swiper) => {
            setTimeout(() => {
              if (
                swiper?.params?.navigation &&
                typeof swiper.params.navigation !== "boolean"
              ) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;

                swiper.navigation?.init();
                swiper.navigation?.update();
              }
            });
          }}
          navigation={false}
          breakpoints={{
            768: { slidesPerView: 1.5 },
            1024: { slidesPerView: 2 },
          }}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-[40px] p-8 flex flex-col md:flex-row items-center gap-8">

                {/* Text */}
                <div className="flex-1">
                  <div className="text-gray-400 text-sm mb-3">
                    {(index + 1).toString().padStart(2, "0")} /
                  </div>

                  <h3 className="text-2xl font-semibold mb-4">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Image */}
                {item.image && (
                  <div className="flex-1">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="rounded-[30px] w-full h-64 object-cover"
                    />
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}