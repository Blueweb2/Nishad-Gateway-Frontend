"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import MinistryCard from "./MinistryCard";
import { Ministry } from "@/lib/types/ministry";

export default function MinistriesSlider({
  ministries,
}: {
  ministries: Ministry[];
}) {
  return (
    <Swiper
      modules={[Autoplay]}
      className="!overflow-visible cursor-grab active:cursor-grabbing"
      loop={true}
      speed={900}
      grabCursor={true}
      centeredSlides={true}

      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}

      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
          centeredSlides: true,
        },

        640: {
          slidesPerView: 2,
          spaceBetween: 24,
          centeredSlides: false,
        },

        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
          centeredSlides: false,
        },

        1280: {
          slidesPerView: 4,
          spaceBetween: 40,
          centeredSlides: false,
        },
      }}
    >
      {ministries.map((ministry) => (
        <SwiperSlide
          key={ministry._id}
          className="flex justify-center items-stretch"
        >
          <MinistryCard ministry={ministry} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}