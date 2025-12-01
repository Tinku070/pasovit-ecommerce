// src/pages/Checkout.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    return (
      <div className="page">
        <div className="card">
          <h1>Checkout</h1>
          <p>You need to log in before placing an order.</p>
          <button className="btn-primary" onClick={() => navigate("/login")}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const placeOrder = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.post("/orders");
      clearCart();
      navigate(`/order/${res.data._id}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Checkout</h1>
        <p>Total items: {cartItems.length}</p>
        <p>Total: ₹{totalPrice}</p>

        {error && <p className="error-text">{error}</p>}

        <button
          className="btn-primary"
          disabled={loading || cartItems.length === 0}
          onClick={placeOrder}
        >
          {loading ? "Placing order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
