import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Shopping from "./pages/Shopping";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shopping/:id" element={<Shopping />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
