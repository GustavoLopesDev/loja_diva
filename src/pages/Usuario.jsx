import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  getUserData,
  saveUserData,
  uploadUserPhoto,
} from "../firebaseUserService";

const Usuario = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [fotoURL, setFotoURL] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!usuario?.uid) return;

    const fetchData = async () => {
      try {
        const data = await getUserData(usuario.uid);
        if (data) {
          setNome(data.nome || "");
          setEndereco(data.endereco || "");
          setFotoURL(data.fotoURL || "");
        }
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [usuario]);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      if (!usuario) return;
      setUploading(true);

      let imageUrl = fotoURL;

      // Se foi selecionado novo arquivo, faz o upload
      if (selectedFile) {
        imageUrl = await uploadUserPhoto(usuario.uid, selectedFile);

        // Atualiza imagem na tela com timestamp para evitar cache
        const urlWithTimestamp = imageUrl + "?t=" + new Date().getTime();
        setFotoURL(urlWithTimestamp);
        setPreviewURL("");
      }

      await saveUserData(usuario.uid, {
        nome,
        endereco,
        fotoURL: imageUrl,
      });

      alert("Dados salvos com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar dados:", err);
      setError("Erro ao salvar os dados.");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading) return <p style={{ color: "#444" }}>Carregando...</p>;

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Perfil</h2>

      <div style={imageWrapperStyle}>
        {previewURL || fotoURL ? (
          <img
            src={previewURL || fotoURL}
            alt="Foto do perfil"
            style={profileImageStyle}
          />
        ) : (
          <div style={emptyProfileStyle} />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          style={fileInputStyle}
        />
      </div>

      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={inputStyle}
      />

      <input
        type="text"
        placeholder="Endereço"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
        style={inputStyle}
      />

      {error && <p style={errorStyle}>{error}</p>}

      <button onClick={handleSave} disabled={uploading} style={buttonStyle}>
        {uploading ? "Salvando..." : "Salvar"}
      </button>

      <button onClick={handleLogout} style={logoutButtonStyle}>
        Sair
      </button>
    </div>
  );
};

const containerStyle = {
  maxWidth: 400,
  margin: "30px auto",
  padding: 20,
  backgroundColor: "#f9f9f9",
  borderRadius: 12,
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: 25,
  color: "#333",
};

const imageWrapperStyle = {
  marginBottom: 25,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const profileImageStyle = {
  width: 120,
  height: 120,
  borderRadius: "50%",
  objectFit: "cover", // evita distorção da imagem, mantém proporção e cobre o círculo
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  marginBottom: 10,
  border: "3px solid #007bff",
};

const emptyProfileStyle = {
  width: 120,
  height: 120,
  borderRadius: "50%",
  backgroundColor: "#ccc",
  marginBottom: 10,
  border: "3px solid #ddd",
};

const fileInputStyle = {
  cursor: "pointer",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: 15,
  borderRadius: 8,
  border: "1px solid #ccc",
  fontSize: 16,
  outline: "none",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 8,
  border: "none",
  backgroundColor: "#007bff",
  color: "#fff",
  fontWeight: "600",
  fontSize: 16,
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const logoutButtonStyle = {
  ...buttonStyle,
  marginTop: 12,
  backgroundColor: "#d9534f",
};

const errorStyle = {
  color: "red",
  marginBottom: 10,
  fontWeight: "600",
  textAlign: "center",
};

export default Usuario;
