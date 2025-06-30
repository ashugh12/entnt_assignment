import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function MyProfile() {
  const { user } = useAuth();
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>
      <div>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>
    </div>
  );
} 