"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import MinistryCard from "./MinistryCard";

type Ministry = {
  _id: string;
  title: string;
  slug: string;
  shortDesc?: string;
  logo?: string;
};

export default function MinistriesSlider({
  ministries,
}: {
  ministries: Ministry[];
}) {
  return (
    <Swiper
      className="!overflow-visible cursor-grab active:cursor-grabbing"
      modules={[Autoplay]}
      loop
      speed={900}
      grabCursor
      slidesPerView={4.15}
      spaceBetween={40}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      breakpoints={{
        0: { slidesPerView: 1.2, spaceBetween: 20 },
        640: { slidesPerView: 2.2, spaceBetween: 25 },
        1024: { slidesPerView: 3.2, spaceBetween: 30 },
        1280: { slidesPerView: 4.15, spaceBetween: 40 },
      }}
    >
      {ministries.map((item) => (
        <SwiperSlide key={item._id} className="flex justify-center">
          <MinistryCard ministry={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}