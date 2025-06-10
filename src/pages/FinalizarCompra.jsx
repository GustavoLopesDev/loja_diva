import React, { useState, useEffect } from "react";

const FinalizarCompra = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("carrinho")) || [];
    setCartItems(items);
  }, []);

  const total = cartItems
    .reduce((acc, item) => acc + item.preco * item.quantidade, 0)
    .toFixed(2);

  const finalizarCompra = () => {
    if (cartItems.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
    alert(`Compra finalizada com sucesso! Total: R$ ${total}`);
    localStorage.removeItem("carrinho");
    setCartItems([]);
  };

  const styles = {
    container: {
      maxWidth: "700px",
      margin: "40px auto",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 0 12px rgba(0,0,0,0.1)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
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
      marginBottom: "30px",
    },
    item: {
      display: "flex",
      gap: "20px",
      padding: "15px",
      borderBottom: "1px solid #ddd",
      alignItems: "center",
    },
    img: {
      width: "100px",
      height: "100px",
      objectFit: "cover",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    },
    details: {
      flex: 1,
    },
    name: {
      fontSize: "1.2rem",
      marginBottom: "8px",
      color: "#222",
    },
    price: {
      color: "#007bff",
      fontWeight: "bold",
      marginBottom: "6px",
    },
    quantity: {
      marginBottom: "6px",
    },
    subtotal: {
      fontWeight: "bold",
      color: "#333",
    },
    total: {
      fontSize: "1.7rem",
      fontWeight: "bold",
      textAlign: "right",
      marginBottom: "30px",
      color: "#222",
    },
    btnFinalizar: {
      display: "block",
      width: "100%",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      padding: "15px",
      fontSize: "1.3rem",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
  };

  if (cartItems.length === 0)
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Obrigado pela Compra !</h2>
      </div>
    );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Finalizar Compra</h2>
      <ul style={styles.list}>
        {cartItems.map((item) => (
          <li key={item.id} style={styles.item}>
            <img src={item.imagem} alt={item.nome} style={styles.img} />
            <div style={styles.details}>
              <p style={styles.name}>{item.nome}</p>
              <p style={styles.price}>R$ {item.preco.toFixed(2)}</p>
              <p style={styles.quantity}>Quantidade: {item.quantidade}</p>
              <p style={styles.subtotal}>
                Subtotal: R$ {(item.preco * item.quantidade).toFixed(2)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <p style={styles.total}>Total: R$ {total}</p>
      <button style={styles.btnFinalizar} onClick={finalizarCompra}>
        Finalizar Compra
      </button>
    </div>
  );
};

export default FinalizarCompra;
