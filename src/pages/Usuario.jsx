import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserData, saveUserData } from "../firebaseUserService";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Usuario = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [fotoURL, setFotoURL] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const storage = getStorage();

  useEffect(() => {
    if (!usuario) return;
    async function fetchData() {
      try {
        const data = await getUserData(usuario.uid);
        console.log("Dados do usuário carregados:", data);
        console.log("fotoURL recuperada:", data?.fotoURL);
        setNome(data?.nome || usuario.displayName || "");
        setEndereco(data?.endereco || "");
        setFotoURL(data?.fotoURL || usuario.photoURL || "");
      } catch (err) {
        setError("Erro ao carregar dados do usuário.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [usuario]);

  const handleSave = async () => {
    setError("");
    try {
      await saveUserData(usuario.uid, { nome, endereco, fotoURL });
      alert("Dados atualizados com sucesso!");
    } catch (err) {
      setError("Erro ao salvar dados.");
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreviewURL(localPreview);

    setUploading(true);
    const storageRef = ref(storage, `users/${usuario.uid}/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      setFotoURL(url); // exibe a imagem oficial do Firebase no lugar do preview
      // Não precisa mais limpar o preview manualmente
      await saveUserData(usuario.uid, { nome, endereco, fotoURL: url });
      alert("Foto atualizada com sucesso!");
    } catch (error) {
      console.error("Erro no upload:", error);
      setError("Erro ao enviar a foto.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [previewURL]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  if (!usuario) return <p>Carregando informações do usuário...</p>;
  if (loading) return <p style={styles.loading}>Carregando perfil...</p>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.imageSection}>
          {previewURL ? (
            <img src={previewURL} alt="Preview" style={styles.img} />
          ) : fotoURL ? (
            <img src={fotoURL} alt="Perfil" style={styles.img} />
          ) : (
            <div style={styles.placeholder}>Sem Foto</div>
          )}

          <label style={styles.uploadLabel}>
            {uploading ? "Enviando..." : "Alterar Foto"}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleImageUpload(e);
                e.target.value = null; // limpa o input
              }}
              disabled={uploading}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <div style={styles.info}>
          <h2 style={styles.title}>Perfil do Usuário</h2>
          {error && <p style={styles.error}>{error}</p>}

          <label style={styles.label}>
            Nome:
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              style={styles.input}
              placeholder="Seu nome"
            />
          </label>

          <label style={styles.label}>
            Endereço:
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              style={styles.input}
              placeholder="Seu endereço"
            />
          </label>

          <button onClick={handleSave} style={styles.button}>
            Salvar
          </button>

          <button
            onClick={handleLogout}
            style={{ ...styles.button, backgroundColor: "#e63946" }}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    padding: "30px",
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    maxWidth: "700px",
    width: "100%",
  },
  imageSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    minWidth: "150px",
  },
  img: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #2575fc",
  },
  placeholder: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    backgroundColor: "#ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "14px",
    color: "#555",
  },
  uploadLabel: {
    backgroundColor: "#2575fc",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
  },
  info: {
    flex: "1",
    minWidth: "250px",
  },
  title: {
    marginBottom: "20px",
    color: "#222",
  },
  label: {
    display: "block",
    marginBottom: "12px",
    fontWeight: "bold",
    color: "#444",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    marginTop: "5px",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  loading: {
    color: "#fff",
    fontSize: "18px",
  },
};

export default Usuario;
