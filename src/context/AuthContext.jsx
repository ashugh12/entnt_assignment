import React, { createContext, useContext, useState, useEffect } from "react";
import { getItem, setItem, removeItem } from "../utils/localStorage.js";
import { mockData } from "../data/mockData.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getItem("user"));

  useEffect(() => {
    // On first load, seed mock data if not present
    if (!getItem("users")) setItem("users", mockData.users);
    if (!getItem("patients")) setItem("patients", mockData.patients);
    if (!getItem("incidents")) setItem("incidents", mockData.incidents);
  }, []);

  const login = (email, password) => {
    const users = getItem("users") || [];
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      setItem("user", found);
      return { success: true, user: found };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => {
    setUser(null);
    removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
