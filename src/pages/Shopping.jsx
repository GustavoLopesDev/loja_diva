import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GrAdd, GrFormSubtract } from "react-icons/gr";
import { BsHandbag } from "react-icons/bs";
import api from "../../api/api"; // ajuste o caminho conforme seu projeto
import Produtos from "../components/Produtos";

const Shopping = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [quantidade, setquantidade] = useState(1);

  const adicionarQuant = () => setquantidade((prev) => prev + 1);
  const diminuirQuant = () => {
    if (quantidade > 1) setquantidade((prev) => prev - 1);
  };

  const addToCart = (produto) => {
    const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
    const produtoExistente = carrinhoAtual.find(
      (item) => item.id === produto.id
    );

    let novoCarrinho;
    if (produtoExistente) {
      novoCarrinho = carrinhoAtual.map((item) =>
        item.id === produto.id
          ? { ...item, quantidade: item.quantidade + quantidade }
          : item
      );
    } else {
      novoCarrinho = [...carrinhoAtual, { ...produto, quantidade }];
    }
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    alert("Produto adicionado ao carrinho!");
  };

  const irParaCompras = () => {
    navigate(`/comprar/${produto.id}`);
  };

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduto(res.data);
      })
      .catch((err) => console.error("Erro ao carregar produto:", err));
  }, [id]);

  if (!produto) return <p>Carregando...</p>;

  return (
    <>
      <div className="shopping_container">
        <div className="shopping_container-1">
          <img
            className="img_shopping"
            src={produto.image}
            alt={produto.title}
          />
        </div>
        <div className="shopping_container-2">
          <p className="title_shopping">{produto.title}</p>
          <p className="text_shopping">{produto.description}</p>
          <p className="valor_product">R$ {produto.price}</p>

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
            <div className="links_shopping">
              <button
                onClick={irParaCompras}
                style={{ all: "unset", cursor: "pointer" }}
              >
                Comprar
              </button>
            </div>
            <div className="links_shopping">
              <button
                onClick={() => addToCart({ ...produto, quantidade })}
                style={{ all: "unset", cursor: "pointer" }}
              >
                Adicionar ao carrinho
              </button>
              <BsHandbag className="bag_car_shopping" />
            </div>
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
