import axios from "axios";

const api = axios.create({
  baseURL: "https://pasovit-ecommerce-eojr.onrender.com/api",
  withCredentials: true,
});


export default api;
