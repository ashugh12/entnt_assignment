import React, { createContext, useContext, useState, useEffect } from "react";
import { getItem, setItem, removeItem } from "../utils/localStorage";
import { mockData } from "../data/mockData";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getItem("user"));

  useEffect(() => {
    // On first load, seed mock data if not present
    if (!getItem("users")) setItem("users", mockData.users);
    if (!getItem("patients")) setItem("patients", mockData.patients);
    if (!getItem("incidents")) setItem("incidents", mockData.incidents);
  }, []);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "user") {
        const newUser = e.newValue ? JSON.parse(e.newValue) : null;
        setUser(newUser);
      }
    };

    // Listen for storage events (cross-tab communication)
    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom events for same-tab communication
    const handleCustomStorageChange = (e) => {
      if (e.detail.key === "user") {
        setUser(e.detail.value);
      }
    };
    window.addEventListener("customStorageChange", handleCustomStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("customStorageChange", handleCustomStorageChange);
    };
  }, []);

  const login = (email, password) => {
    const users = getItem("users") || [];
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      setItem("user", found);
      
      // Dispatch custom event for same-tab communication
      window.dispatchEvent(new CustomEvent("customStorageChange", {
        detail: { key: "user", value: found }
      }));
      
      return { success: true, user: found };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => {
    setUser(null);
    removeItem("user");
    
    // Dispatch custom event for same-tab communication
    window.dispatchEvent(new CustomEvent("customStorageChange", {
      detail: { key: "user", value: null }
    }));
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
