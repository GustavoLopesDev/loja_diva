import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ children }) {
  const { usuario, loading } = useAuth();

  if (loading) return <p>Carregando...</p>;

  return usuario ? children : <Navigate to="/login" />;
}
