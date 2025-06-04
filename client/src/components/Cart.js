import React from "react";

const Cart = ({ items, removeFromCart, updateQuantity, handleCheckout }) => {
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div style={styles.cartPopup}>
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul style={styles.list}>
          {items.map((item) => (
            <li key={item._id} style={styles.item}>
              <div style={styles.info}>
                <strong>{item.name}</strong>
                <p>
                  ${item.price} x {item.quantity}
                </p>
              </div>
              <div style={styles.controls}>
                <button onClick={() => updateQuantity(item._id, -1)}>-</button>
                <button onClick={() => updateQuantity(item._id, 1)}>+</button>
                <button
                  onClick={() => removeFromCart(item._id)}
                  style={styles.removeBtn}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={handleCheckout} style={styles.checkoutBtn}>
        Checkout
      </button>
    </div>
  );
};

const styles = {
  cartPopup: {
    position: "fixed",
    top: "80px",
    right: "20px",
    width: "300px",
    background: "#fff",
    border: "1px solid #ccc",
    padding: "15px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    zIndex: 1000,
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginBottom: "10px",
  },
  item: {
    marginBottom: "10px",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
  },
  info: {
    marginBottom: "5px",
  },
  controls: {
    display: "flex",
    gap: "5px",
  },
  removeBtn: {
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  checkoutBtn: {
    background: "#2ecc71",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
};

export default Cart;
