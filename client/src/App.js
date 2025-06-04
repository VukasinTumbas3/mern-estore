import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ReviewPage from "./components/ReviewPage";
import Footer from "./components/Footer";
import "./components/Header.css";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
      localStorage.setItem("orders", JSON.stringify(res.data));
    } catch (err) {
      console.error(
        "Failed to fetch orders:",
        err.response?.data || err.message
      );
    }
  };

  const handleLogin = (user) => {
    setUser(user);
    fetchOrders();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("orders");
    setUser(null);
    setOrders([]);
  };

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
          fetchOrders();
        })
        .catch((err) => {
          console.error(
            "Failed to fetch user:",
            err.response?.data || err.message
          );
        });
    }
  }, []);

  const addToCart = (product) => {
    const exists = cartItems.find((item) => item._id === product._id);
    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0 || !user) return;

    try {
      await axios.post(
        "http://localhost:5000/api/orders",
        { items: cartItems },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems([]);
      fetchOrders();
      alert("Order placed!");
    } catch (err) {
      console.error("Checkout error:", err.response?.data || err.message);
      alert("Checkout failed.");
    }
  };

  const HomePage = () => (
    <div style={{ padding: "20px" }}>
      <ProductList addToCart={addToCart} />
      {showCart && (
        <Cart
          items={cartItems}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          handleCheckout={handleCheckout}
        />
      )}
      {showOrders && user && <Orders />}
    </div>
  );

  return (
    <div className="app-wrapper">
      <Router>
        <Header
          user={user}
          handleLogout={handleLogout}
          toggleCart={() => setShowCart(!showCart)}
          toggleOrders={() => setShowOrders(!showOrders)}
          showCart={showCart}
          showOrders={showOrders}
        />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/reviews" element={<ReviewPage />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </div>
  );
};

export default App;
