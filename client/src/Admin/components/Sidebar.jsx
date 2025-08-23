import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiShoppingBag,
  FiImage,
  FiMail,
  FiFileText,
  FiUsers,
  FiLogOut,
  FiX,
  FiArrowLeft,
} from "react-icons/fi";
// 1. Import your user service functions
import { logout, getCurrentUser } from "../services/authService";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  // 2. Get the current user
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { to: "/admin/dashboard", icon: <FiGrid />, label: "Dashboard" },
    { to: "/admin/products", icon: <FiShoppingBag />, label: "Products" },
    { to: "/admin/gallery", icon: <FiImage />, label: "Gallery" },
    {
      to: "/admin/contact-submissions",
      icon: <FiMail />,
      label: "Contact Forms",
    },
    {
      to: "/admin/quote-submissions",
      icon: <FiFileText />,
      label: "Quote Requests",
    },
    {
      to: "/admin/management",
      icon: <FiUsers />,
      label: "Manage Admins",
      adminOnly: true,
    },
    {
      to: "/",
      icon: <FiArrowLeft />,
      label: "Back to Home",
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-slate-500 bg-opacity-50 z-20 transition-opacity lg:hidden ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside
        className={`fixed lg:relative inset-y-0 left-0 w-64 bg-slate-800 text-slate-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-30 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h1 className="text-xl font-bold text-white">Interior Solution</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <FiX size={24} />
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-2">
          {/* 3. Filter the links before mapping them */}
          {navLinks
            .filter(
              (link) =>
                !link.adminOnly ||
                (link.adminOnly && currentUser?.role === "SuperAdmin")
            )
            .map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "hover:bg-slate-700 hover:text-white"
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <span className="mr-3 text-lg">{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2.5 rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition-colors duration-200"
          >
            <FiLogOut className="mr-3 text-lg" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
