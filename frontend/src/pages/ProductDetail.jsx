// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <div className="card">
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page">
        <div className="card">
          <p>{error || "Product not found."}</p>
        </div>
      </div>
    );
  }

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  const handleAddToCart = () => {
    setFeedback("");
    setError("");

    if (!size) {
      setError("Please choose a size.");
      return;
    }

    if (isOutOfStock) {
      setError("This product is currently out of stock.");
      return;
    }

    addItem(product, size, 1);
    setFeedback("Added to cart ✔");
  };

  return (
    <div className="page">
      <div className="product-detail">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
          {isOutOfStock && (
            <span className="badge-out">Out of stock</span>
          )}
        </div>

        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="muted">{product.description}</p>

          <h2 className="price">₹{product.price}</h2>

          <div className="field-block">
            <label>Size</label>
            <select
              className="form-control"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="">Select Size</option>
              {product.sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="error-text mt-2">{error}</p>}
          {feedback && <p className="success-text mt-2">{feedback}</p>}

          <button
            className="btn-primary mt-3"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
