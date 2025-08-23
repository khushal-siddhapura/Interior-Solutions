// import React, { useState, useEffect } from "react";

// const GalleryFormModal = ({ isOpen, onClose, onSubmit, imageData }) => {
//   const [title, setTitle] = useState("");
//   const [file, setFile] = useState(null);

//   useEffect(() => {
//     if (imageData) {
//       setTitle(imageData.title || "");
//     }
//   }, [imageData]);

//   if (!isOpen) return null;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", title);
//     if (file) {
//       formData.append("image", file);
//     }
//     onSubmit(formData);
//   };

//   return (
//     <div style={styles.overlay}>
//       <div style={styles.content}>
//         <h2>Edit Gallery Image</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Image Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             style={styles.input}
//           />
//           <label>Replace Image (optional):</label>
//           <input
//             type="file"
//             onChange={(e) => setFile(e.target.files[0])}
//             style={styles.input}
//           />
//           <button type="submit">Update Image</button>
//           <button
//             type="button"
//             onClick={onClose}
//             style={{ marginLeft: "10px" }}
//           >
//             Cancel
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   overlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0, 0, 0, 0.75)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   content: {
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "5px",
//     width: "400px",
//   },
//   input: {
//     display: "block",
//     width: "95%",
//     padding: "8px",
//     marginBottom: "10px",
//   },
// };

// export default GalleryFormModal;

import React, { useState, useEffect } from "react";
import { FiX, FiUpload, FiImage, FiSave } from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";

const GalleryFormModal = ({ isOpen, onClose, onSubmit, imageData }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (imageData) {
      setTitle(imageData.title || "");
      setPreviewUrl(imageData.imageUrl); // Set initial preview to the existing image
    }
    // Reset file when modal opens for a new image or re-opens
    setFile(null);
  }, [imageData]);

  // Effect to create a preview URL for the newly selected file
  useEffect(() => {
    if (!file) {
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Clean up the object URL when the component unmounts or the file changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    if (file) {
      formData.append("image", file);
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      // Error is handled by react-hot-toast in the parent component
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
        className="relative w-full max-w-lg rounded-xl bg-white shadow-2xl m-4 animate-scaleIn"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center">
            <FiImage className="mr-3 text-indigo-600" />
            Edit Gallery Image
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
          <div className="p-6 space-y-6">
            {/* Image Preview */}
            <div className="w-full h-48 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-slate-400">Image Preview</span>
              )}
            </div>

            {/* Title Input */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Image Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="e.g., Modern Living Room"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* File Input */}
            <div>
              <label
                htmlFor="file-upload"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Replace Image (Optional)
              </label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-slate-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  <FiUpload className="mx-auto h-12 w-12 text-slate-400" />
                  <div className="flex text-sm text-slate-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-slate-500">
                    {file ? file.name : "PNG, JPG, GIF up to 3MB"}
                  </p>
                </div>
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
                  <span>Update Image</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GalleryFormModal;
