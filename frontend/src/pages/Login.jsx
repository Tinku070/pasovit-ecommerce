import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await login(email, password, items);
    navigate("/");
  };

  return (
    <div className="form-box">
      <h2>Login</h2>

      <form onSubmit={submit}>
        <input
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-dark" style={{ width: "100%", marginTop: "10px" }}>
          Login
        </button>
      </form>

      <p style={{ marginTop: "10px" }}>
        New user? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
