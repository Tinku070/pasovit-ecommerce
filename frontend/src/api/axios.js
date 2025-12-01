import axios from "axios";

const API = axios.create({
  baseURL: "https://pasovit-ecommerce.onrender.com/api", // will update AFTER backend deploy
  withCredentials: true,
});

export default API;
