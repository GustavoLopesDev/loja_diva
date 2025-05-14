import React from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import Produtos from "../components/Produtos";

const Home = () => {
  return (
    <div>
      <nav className="container_home">
        <Link className="links_home" to="/">
          Feminino
        </Link>
        <Link className="links_home" to="/">
          Masculino
        </Link>
        <Link className="links_home" to="/">
          Novidades
        </Link>
        <Link className="links_home" to="/">
          Ultimas Unidades
        </Link>
      </nav>
      <Banner />
      <div className="container_produtos">
        <h2>AS MARCAS QUERIDINHAS COM CONDIÇÕES QUE SÓ A GENTE TEM</h2>
        <Produtos />
      </div>
    </div>
  );
};

export default Home;
