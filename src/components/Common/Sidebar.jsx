import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LogOut from "../../pages/LogOut";
import { 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  User, 
  ChevronLeft, 
  ChevronRight, 
  Menu,
  Stethoscope
} from "lucide-react";

export default function Sidebar({ userRole }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const adminNavItems = [
    {
      path: "/dashboard",
      icon: Home,
      label: "Dashboard",
      color: "blue"
    },
    {
      path: "/patients",
      icon: Users,
      label: "Patients",
      color: "green"
    },
    {
      path: "/incidents",
      icon: FileText,
      label: "Appointments",
      color: "purple"
    },
    {
      path: "/calendar",
      icon: Calendar,
      label: "Calendar",
      color: "orange"
    },
    {
      path: "/profile",
      icon: User,
      label: "Profile",
      color: "gray"
    }
  ];

  const patientNavItems = [
    {
      path: "/dashboard",
      icon: Home,
      label: "Dashboard",
      color: "blue"
    },
    {
      path: "/patient-view",
      icon: FileText,
      label: "My Appointments",
      color: "green"
    },
    {
      path: "/profile",
      icon: User,
      label: "My Profile",
      color: "purple"
    }
  ];

  const navItems = userRole === "Admin" ? adminNavItems : patientNavItems;

  const getColorClasses = (color, isActive = false) => {
    const colorMap = {
      blue: isActive ? "bg-blue-100 text-blue-700 border-blue-200" : "text-gray-600 hover:bg-blue-50 hover:text-blue-700",
      green: isActive ? "bg-green-100 text-green-700 border-green-200" : "text-gray-600 hover:bg-green-50 hover:text-green-700",
      purple: isActive ? "bg-purple-100 text-purple-700 border-purple-200" : "text-gray-600 hover:bg-purple-50 hover:text-purple-700",
      orange: isActive ? "bg-orange-100 text-orange-700 border-orange-200" : "text-gray-600 hover:bg-orange-50 hover:text-orange-700",
      gray: isActive ? "bg-gray-100 text-gray-700 border-gray-200" : "text-gray-600 hover:bg-gray-50 hover:text-gray-700"
    };
    return colorMap[color] || colorMap.blue;
  };

  const handleNavClick = (path) => {
    navigate(path);
    if (isMobile) {
      setIsCollapsed(true);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
      
      <div className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-20 ${
        isCollapsed ? 'w-16' : 'w-64'
      } ${isMobile && isCollapsed ? '-translate-x-full' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-violet-600">ENTNT</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2 flex-1">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const IconComponent = item.icon;
            return (
              <button
                key={index}
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${getColorClasses(item.color, isActive)} ${
                  isActive ? 'font-medium' : 'font-normal'
                }`}
                title={isCollapsed ? item.label : ""}
              >
                <IconComponent size={20} />
                {!isCollapsed && (
                  <span className="text-sm">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Info and Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 space-y-2">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                {userRole === "Admin" ? (
                  <Stethoscope size={16} className="text-violet-600" />
                ) : (
                  <User size={16} className="text-violet-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {userRole === "Admin" ? "Administrator" : "Patient"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {userRole === "Admin" ? "Full Access" : "Limited Access"}
                </p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                {userRole === "Admin" ? (
                  <Stethoscope size={16} className="text-violet-600" />
                ) : (
                  <User size={16} className="text-violet-600" />
                )}
              </div>
            </div>
          )}
          
          {/* Logout Button */}
          <div className="flex justify-center">
            <LogOut />
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      {isMobile && isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="fixed top-4 left-4 z-30 p-2 bg-white rounded-md shadow-lg md:hidden"
        >
          <Menu size={20} />
        </button>
      )}
    </>
  );
} 