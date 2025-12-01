import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./style.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="app-root">
    <BrowserRouter>
      <Toaster position="top-center" />
      <App />
    </BrowserRouter>
  </div>
);
