// src/pages/Cart.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, totalPrice, updateQty, removeItem } = useCart();

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="page">
        <div className="card empty-cart">
          <h2>Your cart is empty</h2>
          <Link to="/products" className="btn-primary">
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Your Cart</h1>

        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.product?.image} alt="" />
            <div className="cart-info">
              <h3>{item.product?.name}</h3>
              <p>Size: {item.size}</p>
              <p>Price: ₹{item.price ?? item.product?.price}</p>

              <div className="qty-controls">
                <button onClick={() => updateQty(item, item.qty - 1)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item, item.qty + 1)}>+</button>
              </div>

              <button
                className="btn-text"
                onClick={() => removeItem(item)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="cart-footer">
          <h2>Total: ₹{totalPrice}</h2>
          <Link to="/checkout" className="btn-primary">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
