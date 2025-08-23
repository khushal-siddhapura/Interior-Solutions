import React, { useState, useEffect } from "react";
import {
  FiX,
  FiUser,
  FiMail,
  FiLock,
  FiSave,
  FiToggleLeft,
  FiToggleRight,
} from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";

const AdminFormModal = ({ isOpen, onClose, onSubmit, adminData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    status: "Active",
  });
  const [loading, setLoading] = useState(false);

  const isEditing = adminData && adminData._id;

  useEffect(() => {
    if (isOpen) {
      if (isEditing) {
        setFormData({
          name: adminData.name || "",
          email: adminData.email || "",
          password: "", // Password is not sent back for editing
          status: adminData.status || "Active",
        });
      } else {
        // Reset form for creating a new admin
        setFormData({
          name: "",
          email: "",
          password: "",
          status: "Active",
        });
      }
    }
  }, [adminData, isOpen, isEditing]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Submission failed in modal:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-blur bg-opacity-60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-xl bg-white border border-2 border-slate-500 shadow-2xl m-4 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center">
            <FiUser className="mr-3 text-indigo-600" />
            {isEditing ? "Edit Admin" : "Add New Admin"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 rounded-full hover:bg-slate-100 hover:text-slate-800 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Name
              </label>
              <div className="relative">
                <FiUser className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-slate-300 py-2 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <FiMail className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-slate-300 py-2 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            {!isEditing && (
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <FiLock className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-slate-300 py-2 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            )}
            {isEditing && (
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Status
                </label>
                <div className="relative">
                  {formData.status === "Active" ? (
                    <FiToggleRight className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-green-500" />
                  ) : (
                    <FiToggleLeft className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
                  )}
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="block w-full appearance-none rounded-md border-slate-300 py-2 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Footer with Action Buttons */}
          <div className="flex items-center justify-end space-x-3 bg-slate-50 p-4 border-t border-slate-200 rounded-b-xl">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400"
            >
              {loading ? (
                <CgSpinner className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <FiSave className="mr-2 h-5 w-5" />
                  <span>{isEditing ? "Update Admin" : "Create Admin"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminFormModal;
