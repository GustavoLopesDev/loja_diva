import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { usuario, loading } = useAuth();

  if (loading) return <p>Carregando autenticação...</p>;

  return usuario ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
