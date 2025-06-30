import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in and redirect appropriately
  useEffect(() => {
    if (user) {
      if (user.role === "Patient") {
        navigate("/patient-view", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");
    
    try {
      const res = login(email, password);
      if (res.success) {
        // Redirect based on user role
        if (res.user.role === "Patient") {
          navigate("/patient-view", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      } else {
        setErr(res.message);
      }
    } catch (error) {
      setErr("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    setIsLoading(true);
    setErr("");
    
    const demoCredentials = role === "Admin" 
      ? { email: "admin@entnt.in", password: "admin123" }
      : { email: "john@entnt.in", password: "patient123" };
    
    setEmail(demoCredentials.email);
    setPassword(demoCredentials.password);
    
    setTimeout(() => {
      const res = login(demoCredentials.email, demoCredentials.password);
      if (res.success) {
        if (res.user.role === "Patient") {
          navigate("/patient-view", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      } else {
        setErr(res.message);
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-violet-600 mb-2">ENTNT</h1>
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>
        
        {err && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {err}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          <button 
            className="w-full bg-violet-600 text-white py-2 px-4 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or try demo accounts</span>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <button
              onClick={() => handleDemoLogin("Admin")}
              disabled={isLoading}
              className="w-full bg-blue-50 border border-blue-200 text-blue-700 py-2 px-4 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              👨‍⚕️ Demo Admin Login
            </button>
            <button
              onClick={() => handleDemoLogin("Patient")}
              disabled={isLoading}
              className="w-full bg-green-50 border border-green-200 text-green-700 py-2 px-4 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              👤 Demo Patient Login
            </button>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Demo Credentials:</p>
          <p className="font-mono text-xs mt-1">
            Admin: admin@entnt.in / admin123<br />
            Patient: john@entnt.in / patient123
          </p>
        </div>
      </div>
    </div>
  );
} 
