import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <button onClick={() => navigate("/reviews")}>
        Read Customer Reviews
      </button>
      <p className="ownership">Made by Vukejso 🥷🏻</p>
    </footer>
  );
};

export default Footer;
