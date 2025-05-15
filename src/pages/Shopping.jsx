import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GrAdd, GrFormSubtract } from "react-icons/gr";
import { BsHandbag } from "react-icons/bs";
import axios from "axios";
import Produtos from "../components/Produtos";

const Shopping = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [quantidade, setquantidade] = useState(1);

  const adicionarQuant = () => setquantidade((prev) => prev + 1);
  const diminuirQuant = () => {
    if (quantidade > 1) {
      setquantidade((prev) => prev - 1);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/produtos/${id}`)
      .then((res) => setProduto(res.data))
      .catch((err) => console.error("Erro ao carregar produto:", err));
  }, [id]);

  if (!produto) return <p>Carregando...</p>;

  return (
    <>
      <div className="shopping_container">
        <div className="shopping_container-1">
          <img
            className="img_shopping"
            src={produto.imagem}
            alt={produto.nome}
          />
        </div>
        <div className="shopping_container-2">
          <p className="text_shopping">{produto.descricao}</p>
          <p className="valor_product">R$ {produto.preco}</p>
          <div className="quant_product_container">
            <p>Quantidade :</p>
            <div className="quant_product">
              <div className="div_click_buttom">
                <GrFormSubtract onClick={diminuirQuant} />
              </div>
              <div className="text_div_click_buttom">
                <p>{quantidade}</p>
              </div>
              <div className="div_click_buttom">
                <GrAdd onClick={adicionarQuant} />
              </div>
            </div>
          </div>

          <div className="div_compras_shopping">
            <Link to="/" className="link_comprar_shopping">
              <p>Comprar</p>
            </Link>
            <Link to="/" className="links_car_shopping">
              <p> Adicionar ao Carrinho</p>
              <BsHandbag className="bag_car_shopping" />
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Produtos />
      </div>
    </>
  );
};

export default Shopping;
