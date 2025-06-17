import React from "react";
import { FaSearch, FaWhatsapp } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { BsHandbag } from "react-icons/bs";
import { Link } from "react-router-dom";
import logo from "../assets/logo_diva.png";
import { useAuth } from "../components/AuthContext";

const Header = () => {
  const { usuario } = useAuth();

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
        />
        <Link>
          <FaSearch className="icon_lupa" title="Buscar" />
        </Link>
      </div>

      <Link to="/addProduct" className="links_header">
        <p>Compre pelo WhatsApp</p>
        <FaWhatsapp className="icon_whats" title="WhatsApp" />
      </Link>

      <Link to={usuario ? "/perfil" : "/login"} className="links_header">
        <p>{usuario ? "Olá, " + usuario.displayName + "!" : "Entrar"}</p>
        <IoMdContact className="icon_contato" title="Perfil/Login" />
        <img
          src={usuario?.fotoURL || "url-default-ou-placeholder"}
          alt="perfil"
        />
      </Link>

      <Link to="/carrinho" className="links_header">
        <BsHandbag className="bag_car" title="Carrinho" />
      </Link>
    </header>
  );
};

export default Header;
