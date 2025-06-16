import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Compras = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProduto(res.data);
      })
      .catch((err) => console.error("Erro ao carregar produto:", err));
  }, [id]);

  const aumentarQuant = () => setQuantidade((q) => q + 1);
  const diminuirQuant = () => {
    if (quantidade > 1) setQuantidade((q) => q - 1);
  };

  if (!produto)
    return (
      <p style={{ textAlign: "center", marginTop: 30 }}>
        Carregando produto...
      </p>
    );

  const styles = {
    container: {
      maxWidth: "300px",
      margin: "40px auto",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      textAlign: "center",
    },
    imagem: {
      maxWidth: "100%",
      height: "auto",
      borderRadius: "8px",
      marginBottom: "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    },
    titulo: {
      fontSize: "2rem",
      marginBottom: "10px",
      color: "#333",
    },
    descricao: {
      fontSize: "1.1rem",
      color: "#666",
      marginBottom: "15px",
    },
    preco: {
      fontSize: "1.5rem",
      color: "#007bff",
      marginBottom: "15px",
    },
    quantidadeContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "15px",
      marginBottom: "20px",
      fontSize: "1.2rem",
    },
    botaoQuant: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "6px",
      padding: "5px 15px",
      fontSize: "1.2rem",
      cursor: "pointer",
      userSelect: "none",
    },
    botao: {
      backgroundColor: "#28a745",
      color: "white",
      padding: "12px 30px",
      border: "none",
      borderRadius: "6px",
      fontSize: "1.1rem",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      <img src={produto.image} alt={produto.title} style={styles.imagem} />
      <h2 style={styles.titulo}>{produto.title}</h2>
      <p style={styles.descricao}>{produto.description}</p>

      <div style={styles.quantidadeContainer}>
        <button style={styles.botaoQuant} onClick={diminuirQuant}>
          -
        </button>
        <span>Quantidade: {quantidade}</span>
        <button style={styles.botaoQuant} onClick={aumentarQuant}>
          +
        </button>
      </div>

      <h3 style={styles.preco}>
        Preço total: R$ {(produto.price * quantidade).toFixed(2)}
      </h3>

      <button
        style={styles.botao}
        onClick={() =>
          alert(
            `Compra de ${quantidade}x ${
              produto.title
            } realizada com sucesso! Total: R$ ${(
              produto.price * quantidade
            ).toFixed(2)}`
          )
        }
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
      >
        Comprar
      </button>
    </div>
  );
};

export default Compras;
