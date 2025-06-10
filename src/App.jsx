import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Shopping from "./pages/Shopping";
import Car from "./pages/Car";
import Compras from "./pages/Compras";
import FinalizarCompra from "./pages/FinalizarCompra";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shopping/:id" element={<Shopping />} />
        <Route path="/carrinho" element={<Car />} />
        <Route path="/comprar/:id" element={<Compras />} />
        <Route path="/finalizar" element={<FinalizarCompra />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
