import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ user, handleLogout, toggleCart, toggleOrders }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-title" onClick={() => navigate("/")}>
        <h1>Belo Shop</h1>
        <h2>All the hood necessities in one place!</h2>
      </div>

      <div className="header-actions">
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={toggleCart}>Cart</button>
            <button onClick={toggleOrders}>Orders</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
