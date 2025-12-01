import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user on app start
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/me");
        setUser(res.data);
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password, guestCartItems = []) => {
    const res = await axios.post("/auth/login", { email, password, guestCartItems });
    setUser(res.data);
  };

  const register = async (name, email, password) => {
    const res = await axios.post("/auth/register", { name, email, password });
    setUser(res.data);
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ EXPORT THIS FUNCTION — this was missing
export const useAuth = () => useContext(AuthContext);
