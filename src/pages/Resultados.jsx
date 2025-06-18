import React from "react";
import { useLocation } from "react-router-dom";

const Resultados = () => {
  const location = useLocation();
  const { results = [], searchTerm = "" } = location.state || {};

  return (
    <div className="container_produtos">
      <section className="categoria_section">
        <h2 className="categoria_title">Resultados para: "{searchTerm}"</h2>

        {results.length === 0 ? (
          <p style={{ fontSize: "18px", color: "#777" }}>
            Nenhum produto encontrado.
          </p>
        ) : (
          <div className="slide_produtos">
            <div
              className="swiper-slide"
              style={{ flexWrap: "wrap", gap: "20px", display: "flex" }}
            >
              {results.map((item) => (
                <div className="card_produto" key={item.id}>
                  <div className="link_produto">
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Resultados;
