import { createContext, useEffect, useState, useContext } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Usuário autenticado:", user); // ajuda no debug
      setUsuario(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUsuario(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, loading, logout }}>
      {!loading ? (
        children
      ) : (
        <p style={{ color: "#fff" }}>Carregando autenticação...</p>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
