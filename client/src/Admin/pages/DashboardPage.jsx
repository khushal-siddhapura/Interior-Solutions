import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import {
  FiShoppingBag,
  FiImage,
  FiMail,
  FiFileText,
  FiUsers,
  FiArrowRight,
  FiHome, // Added home icon
  FiArrowLeft, // Added back arrow icon
} from "react-icons/fi";

const DashboardPage = () => {
  const user = getCurrentUser();

  const dashboardItems = [
    {
      to: "/admin/products",
      icon: <FiShoppingBag size={28} />,
      title: "Manage Products",
      description: "Add, edit, and remove products.",
    },
    {
      to: "/admin/gallery",
      icon: <FiImage size={28} />,
      title: "Manage Gallery",
      description: "Update your portfolio images.",
    },
    {
      to: "/admin/contact-submissions",
      icon: <FiMail size={28} />,
      title: "Contact Forms",
      description: "View and manage user inquiries.",
    },
    {
      to: "/admin/quote-submissions",
      icon: <FiFileText size={28} />,
      title: "Quote Requests",
      description: "Respond to new quote requests.",
    },
  ];

  if (user && user.role === "SuperAdmin") {
    dashboardItems.push({
      to: "/admin/management",
      icon: <FiUsers size={28} />,
      title: "Manage Admins",
      description: "Control admin user accounts.",
      highlight: true,
    });
  }

  const Card = ({ to, icon, title, description, highlight }) => (
    <Link
      to={to}
      className={`group bg-white rounded-xl shadow-md p-6 flex flex-col justify-between transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        highlight ? "bg-indigo-50 border-indigo-200 border" : ""
      }`}
    >
      <div>
        <div
          className={`mb-4 w-12 h-12 rounded-lg flex items-center justify-center ${
            highlight
              ? "bg-indigo-500 text-white"
              : "bg-slate-100 text-indigo-600"
          }`}
        >
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-1">{title}</h3>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <div className="mt-4 flex items-center text-sm font-medium text-indigo-600">
        Go to {title}
        <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );

  return (
    <div>
      {/* Header section with back button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Welcome, {user?.name || "Admin"}!
        </h1>
      </div>

      <p className="text-slate-600 mb-8">
        Here's a quick overview of your admin panel.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dashboardItems.map((item) => (
          <Card key={item.to} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
