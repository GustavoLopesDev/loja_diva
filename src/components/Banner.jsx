import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/banners")
      .then((res) => setBanners(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="slide_container">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false, //continua apó interação
          pauseOnMouseEnter: true, //pausa ao passar o mouse
        }}
        loop={true}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
      >
        {banners.map((item) => (
          <SwiperSlide key={item.id}>
            <img
              src={item.imagem}
              alt="baaners loja"
              className="banner_slide"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
