import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const Produtos = () => {
  const [productsByCategory, setProductsByCategory] = useState({});

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        const grouped = res.data.reduce((acc, product) => {
          const category = product.category;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(product);
          return acc;
        }, {});
        setProductsByCategory(grouped);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container_produtos">
      {Object.entries(productsByCategory).map(([category, products]) => (
        <section key={category} className="categoria_section">
          <h2 className="categoria_title">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>
          <div className="slide_produtos">
            <Swiper
              modules={[Navigation]}
              slidesPerView={4}
              slidesPerGroup={2}
              loop={false}
              navigation
              spaceBetween={20}
              breakpoints={{
                320: { slidesPerView: 1, slidesPerGroup: 1 },
                640: { slidesPerView: 2, slidesPerGroup: 1 },
                1024: { slidesPerView: 4, slidesPerGroup: 2 },
              }}
            >
              {products.map((item, index) => (
                <SwiperSlide
                  key={`${item.id}-${index}`}
                  className="card_produto"
                >
                  <Link to={`/shopping/${item.id}`} className="link_produto">
                    <div className="img_wrapper">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="img_card_product"
                      />
                    </div>
                    <p className="text_card_product title">{item.title}</p>
                    <p className="text_card_product price">
                      R$ {item.price.toFixed(2)}
                    </p>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Produtos;
