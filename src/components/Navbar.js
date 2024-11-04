import React from "react";
import { Link } from "react-router-dom"; 
import "../styles/Navbar.css";
import logo from "../assets/Logo1.png";

const Navbar = () => {
  return (
    <div>
      <header className="navbar">
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/catalogo" className="nav-link">Catalogo</Link>
          <Link to="/conocenos" className="nav-link">Conócenos</Link>
        </nav>
        <div className="logo-container">
          <img src={logo} alt="Cats Logo" className="logo" />
        </div>
        <div className="contact-info">
          <div className="buy-now-container">
            <Link to="/test" className="button-now">Test para ver tu gato adecuado✨</Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;