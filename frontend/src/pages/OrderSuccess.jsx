// src/pages/OrderSuccess.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api
      .get(`/orders/${id}`)
      .then((res) => setOrder(res.data))
      .catch(() => setOrder(null));
  }, [id]);

  if (!order) {
    return (
      <div className="page">
        <div className="card">
          <h1>Order placed successfully</h1>
          <p>Your order id is: {id}</p>
          <Link to="/products" className="btn-primary">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Order Confirmed 🎉</h1>
        <p>Order ID: {order._id}</p>
        <p>Date: {new Date(order.orderDate).toLocaleString()}</p>

        <h3>Items</h3>
        <ul className="order-items">
          {order.items.map((item, index) => (
            <li key={index}>
              {item.name} ({item.size}) x {item.qty} – ₹{item.price}
            </li>
          ))}
        </ul>

        <h2>Total: ₹{order.totalPrice}</h2>

        <Link to="/products" className="btn-primary">
          Back to Products
        </Link>
      </div>
    </div>
  );
}
