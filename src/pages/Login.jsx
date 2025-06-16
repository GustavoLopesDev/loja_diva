import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  heading: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  error: {
    color: "#dc2626",
    fontSize: "0.875rem",
    textAlign: "center",
    marginBottom: "1rem",
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: "500",
    display: "block",
    marginBottom: "0.5rem",
  },
  input: {
    width: "100%",
    border: "1px solid #d1d5db",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    marginBottom: "1rem",
  },
  button: {
    width: "100%",
    backgroundColor: "#2563eb",
    color: "white",
    padding: "0.5rem",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
  },
  link: {
    fontSize: "0.875rem",
    textAlign: "center",
    color: "#6b7280",
    marginTop: "1rem",
  },
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login realizado com sucesso!");
      navigate("/"); // ou outra rota logada
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("Usuário não encontrado.");
      } else if (err.code === "auth/wrong-password") {
        setError("Senha incorreta.");
      } else if (err.code === "auth/invalid-email") {
        setError("E-mail inválido.");
      } else {
        setError("Erro ao fazer login. Tente novamente.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Login</h2>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleLogin}>
          <label style={styles.label}>E-mail</label>
          <input
            type="email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
          />
          <label style={styles.label}>Senha</label>
          <input
            type="password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
          <button type="submit" style={styles.button}>
            Entrar
          </button>
        </form>
        <p style={styles.link}>
          Não tem conta? <a href="/register">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}
