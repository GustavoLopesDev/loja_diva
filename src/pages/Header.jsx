import React, { useEffect, useState } from "react";
import { FaSearch, FaWhatsapp } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { BsHandbag } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import logo from "../assets/logo_diva.png";
import Car from "./Car";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img className="logo_header" src={logo} alt="Logo da loja" />
      </Link>

      <div className="div_input_header">
        <input
          className="input_header"
          placeholder="O que você está procurando ?"
          type="text"
        />
        <Link>
          <FaSearch className="icon_lupa" />
        </Link>
      </div>
      <div>
        <Link to="/" className="links_header">
          <p>Compre pelo Whastsaap</p>
          <FaWhatsapp className="icon_whats" />
        </Link>
      </div>
      <div>
        <Link to="/" className="links_header">
          <p>Bem vindo Divas</p>
          <IoMdContact className="icon_contato" />
        </Link>
      </div>
      <Link to="/carrinho" className="links_header">
        <BsHandbag className="bag_car" />
      </Link>
    </div>
  );
};

export default Header;
