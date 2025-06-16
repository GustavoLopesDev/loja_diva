import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const sharedStyles = {
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

const registerStyles = {
  ...sharedStyles,
  button: {
    ...sharedStyles.button,
    backgroundColor: "#16a34a", // verde
  },
  link: {
    ...sharedStyles.link,
    color: "#4b5563", // cinza
  },
};

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("Preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "usuarios", user.uid), {
        email: user.email,
        criadoEm: new Date(),
      });

      alert("Usuário cadastrado com sucesso!");
      setTimeout(() => {
        navigate("/login");
      }, 100);
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Este e-mail já está em uso.");
      } else if (err.code === "auth/weak-password") {
        setError("A senha precisa ter pelo menos 6 caracteres.");
      } else {
        setError(`Erro: ${err.message}`);
      }
    }
  };

  return (
    <div style={registerStyles.container}>
      <div style={registerStyles.card}>
        <h2 style={registerStyles.heading}>Cadastro</h2>
        {error && <div style={registerStyles.error}>{error}</div>}
        <form onSubmit={handleRegister}>
          <label style={registerStyles.label}>E-mail</label>
          <input
            type="email"
            style={registerStyles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
          />
          <label style={registerStyles.label}>Senha</label>
          <input
            type="password"
            style={registerStyles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
          <label style={registerStyles.label}>Confirmar Senha</label>
          <input
            type="password"
            style={registerStyles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="********"
          />
          <button type="submit" style={registerStyles.button}>
            Cadastrar
          </button>
        </form>
        <p style={registerStyles.link}>
          Já tem conta? <a href="/login">Faça login</a>
        </p>
      </div>
    </div>
  );
}
