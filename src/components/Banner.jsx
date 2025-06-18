import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Banner = () => {
  const banners = [
    {
      id: 1,
      imagem:
        "https://firebasestorage.googleapis.com/v0/b/divafashion-630b5/o/Banner%2FBanner%20para%20loja%20online%20frete%20grátis%20mercado%20shops%20médio.png?alt=media&token=4236df1b-1508-4ac0-9f88-4f6a68ceb8c5",
    },
    {
      id: 2,
      imagem:
        "https://firebasestorage.googleapis.com/v0/b/divafashion-630b5/o/Banner%2FBanner%20festival%20de%20ofertas%20colorido%20moderno%20em%20pink%20e%20azul.png?alt=media&token=1bc9864e-111a-4b59-85a6-a38d04b4efdd",
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
