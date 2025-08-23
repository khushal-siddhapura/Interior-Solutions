import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/authService";
import {
  FiMenu,
  FiBox,
  FiImage,
  FiMail,
  FiFileText,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";

const AdminNavigation = ({ children }) => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { to: "/admin/products", label: "Manage Products", icon: <FiBox /> },
    { to: "/admin/gallery", label: "Manage Gallery", icon: <FiImage /> },
    {
      to: "/admin/contact-submissions",
      label: "Contact Forms",
      icon: <FiMail />,
    },
    {
      to: "/admin/quote-submissions",
      label: "Quote Requests",
      icon: <FiFileText />,
    },
  ];

  if (user?.role === "SuperAdmin") {
    navLinks.push({
      to: "/admin-management",
      label: "Manage Admins",
      icon: <FiUsers />,
    });
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Sidebar */}
      <div
        className={`fixed md:static z-20 top-0 left-0 h-full bg-white/70 backdrop-blur-lg border-r border-gray-200 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-72 shadow-xl`}
      >
        <div className="p-5 flex items-center justify-between border-b border-gray-300">
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Admin Panel
          </h2>
          <button
            className="md:hidden text-gray-600 hover:text-gray-900 transition"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        <nav className="p-4 flex flex-col gap-2">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="flex items-center gap-4 p-3 rounded-xl text-gray-700 font-medium hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-200 group"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="text-xl text-blue-500 group-hover:scale-110 transition-transform">
                {link.icon}
              </span>
              <span>{link.label}</span>
            </Link>
          ))}
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="flex items-center gap-4 p-3 rounded-xl text-red-600 font-medium hover:bg-red-50 transition-all duration-200 group mt-4"
          >
            <FiLogOut className="text-xl group-hover:scale-110 transition-transform" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white/70 backdrop-blur-md shadow-md p-4 flex items-center justify-between border-b border-gray-200">
          <button
            className="md:hidden text-gray-700 hover:text-gray-900 transition"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu size={26} />
          </button>
          <h1 className="text-lg md:text-2xl font-bold text-gray-800">
            Welcome,{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {user?.name || "Admin"}
            </span>
          </h1>
        </header>

        {/* Page-specific content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminNavigation;
