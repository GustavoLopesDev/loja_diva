import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const Produtos = () => {
  const [products, setProducts] = useState([]);

  const listProducts = products.map((item, index) => (
    <SwiperSlide key={`${item.id}-${index}`} className="card_produto">
      <Link to={`/shopping/${item.id}`} className="link_produto">
        <img src={item.image} alt={item.title} className="img_card_product" />
        <p className="text_card_product">{item.title}</p>
        <p className="text_card_product">R$ {item.price.toFixed(2)}</p>
      </Link>
    </SwiperSlide>
  ));

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="slide_produtos">
        {products.length > 0 && (
          <Swiper
            modules={[Navigation]}
            slidesPerView={6}
            slidesPerGroup={4}
            loop={true}
            navigation
          >
            {listProducts}
          </Swiper>
        )}
      </div>
    </>
  );
};

export default Produtos;
