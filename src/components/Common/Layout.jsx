import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";

export default function Layout({ children }) {
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!user) {
    return <div>{children}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole={user.role} />
      <main className={`flex-1 overflow-auto transition-all duration-300 ${
        isMobile ? 'ml-0' : 'ml-16 md:ml-64'
      }`}>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
} 