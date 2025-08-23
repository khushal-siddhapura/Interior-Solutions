import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../services/adminService";
import AdminFormModal from "../components/AdminFormModal";
import {
  FiUsers,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiAlertCircle,
  FiX,
  FiAlertTriangle,
} from "react-icons/fi";

const AdminManagementPage = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for the form modal
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);

  // --- 1. Add state for the confirmation modal ---
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const { data } = await getAdmins();
      setAdmins(data);
    } catch (err) {
      toast.error("Failed to fetch admins. You may not have permission.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleOpenFormModal = (admin = null) => {
    setEditingAdmin(admin);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setEditingAdmin(null);
    setIsFormModalOpen(false);
  };

  const handleSubmit = async (formData) => {
    const isEditing = !!editingAdmin;
    const promise = isEditing
      ? updateAdmin(editingAdmin._id, formData)
      : createAdmin(formData);

    toast.promise(promise, {
      loading: `${isEditing ? "Updating" : "Creating"} admin...`,
      success: `Admin ${isEditing ? "updated" : "created"} successfully!`,
      error: `Failed to ${isEditing ? "update" : "create"} admin.`,
    });

    try {
      await promise;
      fetchAdmins();
      handleCloseFormModal();
    } catch (err) {
      // Toast handles the error message
    }
  };

  // --- 2. This function now opens the confirmation modal ---
  const handleDeleteRequest = (adminId) => {
    setAdminToDelete(adminId);
    setIsConfirmModalOpen(true);
  };

  // --- 3. This function performs the actual deletion ---
  const handleConfirmDelete = async () => {
    if (!adminToDelete) return;

    const promise = deleteAdmin(adminToDelete);
    toast.promise(promise, {
      loading: "Deleting admin...",
      success: "Admin deleted successfully.",
      error: "Failed to delete admin.",
    });

    try {
      await promise;
      setAdmins(admins.filter((admin) => admin._id !== adminToDelete));
    } catch (err) {
      // Toast handles error
    } finally {
      // Close the modal and reset state
      setIsConfirmModalOpen(false);
      setAdminToDelete(null);
    }
  };

  const StatusBadge = ({ status }) => (
    <span
      className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
        status === "Active"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {status}
    </span>
  );

  // --- 4. Confirmation Modal JSX is defined inside the component ---
  const ConfirmationModal = () => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fadeIn"
      onClick={() => setIsConfirmModalOpen(false)}
    >
      <div
        className="relative w-full max-w-md rounded-xl bg-white shadow-2xl m-4 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center">
            <FiAlertTriangle className="mr-3 text-red-500" />
            Delete Admin
          </h2>
          <button
            onClick={() => setIsConfirmModalOpen(false)}
            className="p-2 text-slate-500 rounded-full hover:bg-slate-100 hover:text-slate-800 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>
        <div className="p-6">
          <p className="text-slate-600">
            Are you sure you want to delete this admin? This action is
            permanent.
          </p>
        </div>
        <div className="flex items-center justify-end space-x-3 bg-slate-50 p-4 border-t border-slate-200 rounded-b-xl">
          <button
            type="button"
            onClick={() => setIsConfirmModalOpen(false)}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmDelete}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700"
          >
            <FiTrash2 className="mr-2 h-5 w-5" />
            <span>Confirm Delete</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center">
              <FiUsers className="mr-3 text-indigo-600" />
              Admin Management
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Manage all administrator accounts.
            </p>
          </div>
          <button
            onClick={() => handleOpenFormModal()}
            className="mt-3 sm:mt-0 flex items-center justify-center bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors duration-200"
          >
            <FiPlus className="mr-2" />
            Add New Admin
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading admins...</div>
        ) : admins.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-lg">
            <FiAlertCircle className="mx-auto text-4xl text-slate-400 mb-2" />
            <h3 className="font-semibold">No Admins Found</h3>
            <p className="text-slate-500 text-sm">
              Click "Add New Admin" to get started.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {[
                    "Name",
                    "Email",
                    "Role",
                    "Status",
                    "Last Login",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {admins.map((admin) => (
                  <tr
                    key={admin._id}
                    className="hover:bg-slate-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {admin.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {admin.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {admin.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={admin.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {admin.lastLogin
                        ? new Date(admin.lastLogin).toLocaleString()
                        : "Never"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleOpenFormModal(admin)}
                          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition-colors"
                        >
                          <FiEdit size={16} />
                        </button>
                        <button
                          // --- 5. Update onClick to call the new request function ---
                          onClick={() => handleDeleteRequest(admin._id)}
                          className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <AdminFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        onSubmit={handleSubmit}
        adminData={editingAdmin}
      />

      {/* --- 6. Render the confirmation modal conditionally --- */}
      {isConfirmModalOpen && <ConfirmationModal />}
    </>
  );
};

export default AdminManagementPage;
