// src/api.js
const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async () => {
  const res = await fetch(`${API_URL}/api/products`);
  const data = await res.json();
  return data; // return entire response (contains products array)
};
