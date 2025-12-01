// frontend/src/pages/Products.jsx

import { useEffect, useState } from "react";
import { getProducts } from "../api"; // IMPORTANT

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => {
        console.log("Products Loaded:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Loading products...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Products</h2>
      {products.length === 0 && <p>No products found.</p>}

      {products.map((p) => (
        <div key={p.id} style={{ margin: "10px 0" }}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <p>Price: ₹{p.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
