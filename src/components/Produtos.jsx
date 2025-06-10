import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

const Produtos = () => {
  const [products, setProductos] = useState([]);

  const listProducts = products.map((item, index) => (
    <SwiperSlide key={`${item.id}-${index}`} className="card_produto">
      <Link to={`/shopping/${item.id}`} className="link_produto">
        <img src={item.imagem} alt="roupas" className="img_card_product" />
        <p className="text_card_product">{item.descricao}</p>
        <p className="text_card_product">R$ {item.preco}</p>
      </Link>
    </SwiperSlide>
  ));

  useEffect(() => {
    axios
      .get("http://localhost:3001/produtos")
      .then((res) => {
        setProductos(res.data); // <- aqui está o ajuste!
      })
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
    </>
  );
};

export default Produtos;
