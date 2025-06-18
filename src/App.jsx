import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Shopping from "./pages/Shopping";
import Car from "./pages/Car";
import Compras from "./pages/Compras";
import FinalizarCompra from "./pages/FinalizarCompra";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Usuario from "./pages/Usuario";
import Resultados from "./pages/Resultados";

import { AuthProvider } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

const AppWrapper = () => {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/register"];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shopping/:id" element={<Shopping />} />
        <Route
          path="/carrinho"
          element={
            <PrivateRoute>
              <Car />
            </PrivateRoute>
          }
        />
        <Route
          path="/comprar/:id"
          element={
            <PrivateRoute>
              <Compras />
            </PrivateRoute>
          }
        />
        <Route
          path="/finalizar"
          element={
            <PrivateRoute>
              <FinalizarCompra />
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Usuario />
            </PrivateRoute>
          }
        />
        <Route
          path="/resultados"
          element={
            <PrivateRoute>
              <Resultados />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
