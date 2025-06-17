import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Banner = () => {
  const banners = [
    {
      id: 1,
      imagem:
        "https://firebasestorage.googleapis.com/v0/b/divafashion-630b5.firebasestorage.app/o/Banners%2FBanner%20festival%20de%20ofertas%20colorido%20moderno%20em%20pink%20e%20azul.png?alt=media&token=e3c3b396-990f-4dec-8b25-7b56aec4831d",
    },
    {
      id: 2,
      imagem:
        "https://firebasestorage.googleapis.com/v0/b/divafashion-630b5.firebasestorage.app/o/Banners%2FBanner%20para%20loja%20online%20frete%20gr%C3%A1tis%20mercado%20shops%20m%C3%A9dio.png?alt=media&token=e9716b8a-6152-4b52-ad51-58b571a2f272",
    },
  ];

  return (
    <div className="slide_container">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <img
              src={banner.imagem}
              alt={`banner-${banner.id}`}
              className="banner_slide"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
