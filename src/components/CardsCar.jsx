import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <-- Importa useNavigate

const CardsCar = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // <-- Hook para navegação

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("carrinho")) || [];
    const itemsComQuantidade = items.map((item) => ({
      ...item,
      quantidade: item.quantidade || 1,
    }));
    setCartItems(itemsComQuantidade);
  }, []);

  const atualizarLocalStorage = (items) => {
    localStorage.setItem("carrinho", JSON.stringify(items));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    atualizarLocalStorage(updatedCart);
  };

  const aumentarQuant = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
    );
    setCartItems(updatedCart);
    atualizarLocalStorage(updatedCart);
  };

  const diminuirQuant = (id) => {
    const item = cartItems.find((item) => item.id === id);

    if (!item) return;

    if (item.quantidade > 1) {
      const updatedCart = cartItems.map((item) =>
        item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
      );
      setCartItems(updatedCart);
      atualizarLocalStorage(updatedCart);
    } else {
      removeItem(id);
    }
  };

  const total = cartItems
    .reduce((acc, item) => acc + item.preco * item.quantidade, 0)
    .toFixed(2);

  // Função para ir para página de finalizar compra
  const irParaFinalizarCompra = () => {
    navigate("/finalizar"); // Ajuste o caminho conforme sua rota
  };

  const styles = {
    carPage: {
      padding: "30px",
      maxWidth: "900px",
      margin: "0 auto",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 0 12px rgba(0, 0, 0, 0.1)",
    },
    title: {
      fontSize: "2rem",
      textAlign: "center",
      marginBottom: "30px",
      color: "#333",
    },
    list: {
      listStyle: "none",
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    item: {
      display: "flex",
      alignItems: "center",
      background: "#f7f7f7",
      padding: "15px",
      borderRadius: "10px",
      gap: "20px",
    },
    image: {
      width: "100px",
      height: "100px",
      objectFit: "cover",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    },
    itemText: {
      flex: 1,
    },
    p: {
      margin: "5px 0",
      fontSize: "1rem",
      color: "#444",
    },
    button: {
      backgroundColor: "#ff4d4f",
      border: "none",
      color: "white",
      padding: "8px 14px",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "10px",
    },
    quantControls: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginTop: "10px",
    },
    quantButton: {
      padding: "5px 10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      backgroundColor: "#eee",
      cursor: "pointer",
    },
    total: {
      position: "fixed",
      bottom: "0",
      right: "0",
      width: "100%",
      display: "flex",
      justifyContent: "space-between", // para separar total e botão
      alignItems: "center",
      backgroundColor: "#fff",
      padding: "15px 30px",
      boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
      fontSize: "1.5rem",
      fontWeight: "bold",
      textAlign: "center",
      zIndex: 1000,
      gap: "20px",
    },
    finalizarButton: {
      padding: "10px 20px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      cursor: "pointer",
      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <div style={styles.carPage}>
      <h1 style={styles.title}>Seu Carrinho</h1>
      {cartItems.length === 0 ? (
        <p style={styles.p}>O carrinho está vazio.</p>
      ) : (
        <>
          <ul style={styles.list}>
            {cartItems.map((item, index) => (
              <li key={index} style={styles.item}>
                <img src={item.imagem} alt={item.nome} style={styles.image} />
                <div style={styles.itemText}>
                  <p style={styles.p}>{item.nome}</p>
                  <p style={styles.p}>
                    R$ {item.preco.toFixed(2)} × {item.quantidade} ={" "}
                    <strong>
                      R$ {(item.preco * item.quantidade).toFixed(2)}
                    </strong>
                  </p>
                  <div style={styles.quantControls}>
                    <button
                      style={styles.quantButton}
                      onClick={() => diminuirQuant(item.id)}
                    >
                      −
                    </button>
                    <span>{item.quantidade}</span>
                    <button
                      style={styles.quantButton}
                      onClick={() => aumentarQuant(item.id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    style={styles.button}
                    onClick={() => removeItem(item.id)}
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div style={styles.total}>
            <span>Total: R$ {total}</span>
            <button
              style={styles.finalizarButton}
              onClick={irParaFinalizarCompra}
            >
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CardsCar;
