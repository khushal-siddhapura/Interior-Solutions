import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Sidebar from "./Sidebar";
import { FiMenu } from "react-icons/fi";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* Toaster for notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#F0FDF4",
              color: "#166534",
            },
          },
          error: {
            style: {
              background: "#FEF2F2",
              color: "#B91C1C",
            },
          },
        }}
      />

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar for mobile */}
        <header className="lg:hidden bg-white shadow-sm z-10">
          <div className="py-3 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-slate-500 hover:text-indigo-600"
            >
              <FiMenu size={24} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 py-8 animate-fadeIn">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
