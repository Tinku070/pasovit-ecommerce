import axios from "axios";

const API = axios.create({
  baseURL: "https://pasovit-ecommerce-eojr.onrender.com/api",
  withCredentials: true,
});

export default API;
