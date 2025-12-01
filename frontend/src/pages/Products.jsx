import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data.products));
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>All Products</h2>

      <div className="product-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            <img src={p.image} alt={p.name} />

            <h3 style={{ marginTop: "14px" }}>{p.name}</h3>
            <p style={{ opacity: 0.6 }}>₹{p.price}</p>

            <Link to={`/product/${p._id}`}>
              <button className="btn btn-dark" style={{ marginTop: "10px" }}>
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
