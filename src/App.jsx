import React from "react";
import { BrowserRouter, Routes, Link } from "react-router-dom";
import Header from "./pages/Header";
import Home from "./pages/Home";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Home />
    </BrowserRouter>
  );
};

export default App;
