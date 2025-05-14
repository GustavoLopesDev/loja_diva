import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

const Produtos = () => {
  const [products, setProductos] = useState([]);

  const listProducts = products.map((item, index) => (
    <SwiperSlide key={`${item.id}-${index}`} className="card_produto">
      <img src={item.imagem} alt="roupas" className="img_card_product" />
      <p>{item.descricao}</p>
      <p>R$ {item.preco}</p>
    </SwiperSlide>
  ));

  useEffect(() => {
    axios
      .get("http://localhost:3001/produtos")
      .then((res) => setProductos(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="slide_produtos">
        <Swiper
          slidesPerView={6}
          slidesPerGroup={3}
          pagination={false}
          loop={true}
          navigation
        >
          {listProducts}
        </Swiper>
      </div>
      <div className="slide_produtos">
        <Swiper
          slidesPerView={6}
          slidesPerGroup={3}
          pagination={false}
          loop={true}
          navigation
        >
          {listProducts}
        </Swiper>
      </div>
    </>
  );
};

export default Produtos;
