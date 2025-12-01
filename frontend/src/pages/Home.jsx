import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>

      <div style={{
        padding: "100px 20px",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: "48px", fontWeight: "700", marginBottom: "10px" }}>
          Modern Clothing. Minimal Design.
        </h1>

        <p style={{ fontSize: "18px", opacity: 0.7 }}>
          Explore premium fashion crafted with simplicity & elegance.
        </p>

        <Link to="/products">
          <button className="btn btn-dark" style={{ marginTop: "20px", padding: "12px 24px" }}>
            Shop Now
          </button>
        </Link>
      </div>

    </div>
  );
}
