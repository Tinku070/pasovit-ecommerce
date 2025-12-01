// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart when auth state changes
  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      try {
        if (user) {
          const res = await api.get("/cart");
          setItems(res.data.items || []);
        } else {
          const saved = JSON.parse(localStorage.getItem("guest-cart") || "[]");
          setItems(saved);
        }
      } catch (err) {
        console.error("Cart load error", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user]);

  // Persist guest cart
  useEffect(() => {
    if (!user) {
      localStorage.setItem("guest-cart", JSON.stringify(items));
    }
  }, [items, user]);

  // ADD ITEM
  const addItem = async (product, size, qty = 1) => {
    if (!size) return;

    if (user) {
      const res = await api.post("/cart", {
        productId: product._id,
        size,
        qty,
      });
      setItems(res.data.items);
    } else {
      setItems((prev) => {
        const index = prev.findIndex(
          (i) => i.product._id === product._id && i.size === size
        );

        if (index !== -1) {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            qty: updated[index].qty + qty,
          };
          return updated;
        }

        return [
          ...prev,
          {
            product,
            productId: product._id,
            size,
            qty,
            price: product.price,
          },
        ];
      });
    }
  };

  // UPDATE QUANTITY
  const updateQty = async (item, newQty) => {
    if (newQty < 1) return;

    if (user) {
      const res = await api.put("/cart", {
        productId: item.product._id,
        size: item.size,
        qty: newQty,
      });
      setItems(res.data.items);
    } else {
      setItems((prev) =>
        prev.map((i) =>
          i.product._id === item.product._id && i.size === item.size
            ? { ...i, qty: newQty }
            : i
        )
      );
    }
  };

  // REMOVE ITEM
  const removeItem = async (item) => {
    if (user) {
      const res = await api.put("/cart/remove", {
        productId: item.product._id,
        size: item.size,
      });
      setItems(res.data.items);
    } else {
      setItems((prev) =>
        prev.filter(
          (i) =>
            !(
              i.product._id === item.product._id &&
              i.size === item.size
            )
        )
      );
    }
  };

  // CLEAR CART
  const clearCart = async () => {
    if (user) {
      await api.delete("/cart");
    } else {
      localStorage.removeItem("guest-cart");
    }
    setItems([]);
  };

  const totalPrice = items.reduce(
    (sum, item) =>
      sum + (item.price ?? item.product?.price ?? 0) * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems: items,
        loading,
        addItem,
        updateQty,
        removeItem,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
