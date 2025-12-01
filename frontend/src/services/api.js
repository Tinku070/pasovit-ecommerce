import API from "../api/axios";

// Product APIs
export const getProducts = () => API.get("/products");
export const getProductById = (id) => API.get(`/products/${id}`);

// Auth APIs
export const login = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
export const getMe = () => API.get("/auth/me");
export const logoutUser = () => API.post("/auth/logout");

// Cart APIs
export const getCart = () => API.get("/cart");
export const addToCart = (data) => API.post("/cart", data);
export const removeFromCart = (productId) =>
  API.delete(`/cart/${productId}`);

// Default export (this FIXES your build)
export default {
  getProducts,
  getProductById,
  login,
  registerUser,
  getMe,
  logoutUser,
  getCart,
  addToCart,
  removeFromCart,
};
