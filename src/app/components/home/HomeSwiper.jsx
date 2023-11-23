"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../css/homeSwiper.css";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

export default function HomeSwiper() {
  const list = [
    {
      img: "https://i.pinimg.com/474x/95/82/ed/9582ed40677b41e7bcb77876fc0f929a.jpg",
    },
    {
      img: "https://i.pinimg.com/736x/4f/a5/95/4fa59580be60bc3760d8b6366b48ee73.jpg",
    },
    {
      img: "https://i.pinimg.com/474x/ed/25/7f/ed257f7df01d8ae127d3dde2e4a6b03b.jpg",
    },
    {
      img: "https://i.pinimg.com/474x/f8/45/50/f84550051b5cca87f5eb49497c031a4a.jpg",
    },
  ];
  return (
    <>
      <Swiper
        pagination={{
         
        }}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        navigation={true}
        modules={[Pagination, Navigation, ]}
        className="mySwiper"
      >
        {list.map((x, index) => (
          <SwiperSlide key={index} style={{ backgroundImage: `url(${x.img})` }}> </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
