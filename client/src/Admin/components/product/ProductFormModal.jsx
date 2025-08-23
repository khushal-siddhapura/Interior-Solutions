import React, { useState, useEffect } from "react";
import { FiX, FiUpload, FiShoppingBag, FiSave } from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";

const ProductFormModal = ({ isOpen, onClose, onSubmit, productData }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productData) {
      setFormData({
        name: productData.name || "",
        category: productData.category || "",
        description: productData.description || "",
      });
      setPreviewUrl(productData.imageUrl); // Set initial preview
    }
    // Reset file input when modal opens
    setFile(null);
  }, [productData]);

  // Create a preview URL for a newly selected file
  useEffect(() => {
    if (!file) {
      // If file is cleared, revert to the original product image if it exists
      if (productData) {
        setPreviewUrl(productData.imageUrl);
      }
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Clean up the object URL
    return () => URL.revokeObjectURL(objectUrl);
  }, [file, productData]);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updateData = new FormData();
    for (const key in formData) {
      updateData.append(key, formData[key]);
    }
    if (file) {
      updateData.append("image", file);
    }

    try {
      await onSubmit(updateData);
    } catch (error) {
      console.error("Submission failed in modal:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-slate-400 to-zinc-500 bg-opacity-60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-xl bg-white shadow-2xl m-4 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center">
            <FiShoppingBag className="mr-3 text-indigo-600" />
            Edit Product
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
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Image Preview & Upload */}
            <div className="space-y-4">
              <div className="w-full h-48 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Product Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-slate-400">Image Preview</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="product-file-upload"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Replace Image (Optional)
                </label>
                <input
                  id="product-file-upload"
                  name="image"
                  type="file"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
            </div>

            {/* Right Column: Form Fields */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Product Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="block w-full p-2 rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="block w-full p-2 rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">-- Select a Category --</option>
                  <option value="Glass Partitions">Glass Partitions</option>
                  <option value="Aluminium Systems">
                    Aluminium Systems Windows
                  </option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="block w-full p-2 rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></textarea>
              </div>
            </div>
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
                  <span>Update Product</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
