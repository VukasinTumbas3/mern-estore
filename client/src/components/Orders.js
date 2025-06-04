import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers,
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const handleAddItem = async () => {
    if (!selectedProductId || !selectedOrderId) return;

    try {
      const order = orders.find((o) => o._id === selectedOrderId);
      const product = products.find((p) => p._id === selectedProductId);
      if (!order || !product) return;

      const existingItemIndex = order.items.findIndex(
        (i) => i._id === product._id
      );

      let updatedItems = [...order.items];

      if (existingItemIndex >= 0) {
        // If item exists increase quantity
        updatedItems[existingItemIndex].quantity += 1;
      } else {
        // Else, add new item
        updatedItems.push({ ...product, quantity: 1 });
      }

      await axios.put(
        `http://localhost:5000/api/orders/${selectedOrderId}`,
        { items: updatedItems },
        { headers }
      );

      setSelectedProductId("");
      setSelectedOrderId(null);
      fetchOrders();
    } catch (err) {
      console.error("Failed to add item:", err);
    }
  };

  const handleRemoveItem = async (orderId, itemIdToRemove) => {
    try {
      const order = orders.find((o) => o._id === orderId);
      if (!order) return;

      const updatedItems = order.items.filter(
        (item) => item._id !== itemIdToRemove
      );

      await axios.put(
        `http://localhost:5000/api/orders/${orderId}`,
        { items: updatedItems },
        { headers }
      );

      fetchOrders();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
        headers,
      });
      fetchOrders();
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };

  return (
    <div className="orders-container">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No past orders.</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h4>Order date: {new Date(order.date).toLocaleString()}</h4>
            <ul>
              {order.items.map((item) => (
                <li key={item._id}>
                  {item.name} - ${item.price} × {item.quantity}
                  <button
                    onClick={() => handleRemoveItem(order._id, item._id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            {/* Add product selector */}
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <select
                value={selectedProductId}
                onChange={(e) => {
                  setSelectedProductId(e.target.value);
                  setSelectedOrderId(order._id);
                }}
              >
                <option value="">Add product...</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name} - ${product.price}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddItem}
                disabled={!selectedProductId || !selectedOrderId}
              >
                Add to Order
              </button>
            </div>

            <button
              onClick={() => cancelOrder(order._id)}
              style={{ marginTop: "10px", color: "white" }}
            >
              Cancel Order
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
