import React, { useState, useEffect } from "react";
import { FaSearch, FaWhatsapp } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { BsHandbag } from "react-icons/bs";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/logo_diva.png";
import { useAuth } from "../components/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const { usuario } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuAberto(!menuAberto);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Erro ao buscar produtos", err));
  }, []);

  const handleSearch = () => {
    const filtered = products.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    navigate("/resultados", { state: { results: filtered, searchTerm } });
    setMenuAberto(false);
  };

  return (
    <header className="header">
      <Link to="/">
        <img className="logo_header" src={logo} alt="Logo da loja" />
      </Link>

      <div className="div_input_header">
        <input
          className="input_header"
          placeholder="O que você está procurando?"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>
          <FaSearch className="icon_lupa" title="Buscar" />
        </button>
      </div>

      <div className="links_header">
        <Link to={usuario ? "/perfil" : "/login"} className="link_header">
          <p>{usuario ? "Olá, " + usuario.displayName + "!" : "Entrar"}</p>
          <IoMdContact className="icon_contato" title="Perfil/Login" />
        </Link>

        <Link to="/carrinho" className="link_header">
          <BsHandbag className="bag_car" title="Carrinho" />
        </Link>
      </div>

      <div className="menu_hamburguer" onClick={toggleMenu}>
        {menuAberto ? <FiX size={28} /> : <FiMenu size={28} />}
      </div>

      {menuAberto && (
        <div className="menu_mobile">
          <div className="div_input_header">
            <input
              className="input_header"
              placeholder="O que você está procurando?"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch}>
              <FaSearch className="icon_lupa" title="Buscar" />
            </button>
          </div>
          <Link to={usuario ? "/perfil" : "/login"} onClick={toggleMenu}>
            {usuario ? "Olá, " + usuario.displayName + "!" : "Entrar"}
          </Link>
          <Link to="/carrinho" onClick={toggleMenu}>
            Carrinho
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
