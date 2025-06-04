import React from "react";

const CartPopup = ({
  items,
  removeFromCart,
  updateQuantity,
  handleCheckout,
}) => {
  // Racuna totalnu cenu sa item cenom i item quantity
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div
      style={{
        position: "absolute",
        top: "60px",
        right: "20px",
        width: "300px",
        background: "#fff",
        padding: "15px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      }}
    >
      <h3>Cart</h3>
      {items.length === 0 ? (
        <p>No items.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              {item.name} x {item.quantity}
              <div>
                <button onClick={() => updateQuantity(item._id, -1)}>-</button>
                <button onClick={() => updateQuantity(item._id, 1)}>+</button>
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default CartPopup;
