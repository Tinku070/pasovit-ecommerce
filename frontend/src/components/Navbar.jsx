import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  return (
    <nav className="nav-container">
      <div className="nav-content">
        
        {/* Brand */}
        <Link to="/" className="nav-logo">
          Pasovit<span>Store</span>
        </Link>

        {/* Menu */}
        <div className="nav-links">
          <Link to="/products" className="nav-link">Products</Link>

          {/* Cart */}
          <Link to="/cart" className="nav-link cart-link">
            Cart
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="user-section">
              <span className="username">{user.name}</span>
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-btn">Login</Link>
              <Link to="/register" className="nav-btn nav-btn-dark">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
