import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form"; // --- NEW: Import useForm ---
import toast from "react-hot-toast";
import {
  getGalleryImages,
  uploadImage,
  updateImage,
  deleteImage,
} from "../services/galleryService";
import GalleryFormModal from "../components/gallery/GalleryFormModal";
import {
  FiImage,
  FiUpload,
  FiEdit,
  FiTrash2,
  FiAlertCircle,
} from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";

const GalleryManagementPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);

  // --- NEW: Setup react-hook-form for the upload form ---
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const fetchImages = async () => {
    try {
      setLoading(true);
      const { data } = await getGalleryImages();
      setImages(data);
    } catch (err) {
      toast.error("Failed to fetch gallery images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // --- UPDATED: onSubmit handler for react-hook-form ---
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("image", data.image[0]); // Get the file from the FileList

    const promise = uploadImage(formData);

    await toast.promise(promise, {
      loading: "Uploading image...",
      success: "Image uploaded successfully!",
      error: "Failed to upload image.",
    });

    try {
      await promise;
      fetchImages();
      reset(); // Reset the form fields
    } catch (err) {
      // Toast handles the error message
    }
  };

  const handleOpenModal = (image) => {
    setEditingImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingImage(null);
    setIsModalOpen(false);
  };

  const handleUpdateSubmit = async (formData) => {
    if (!editingImage) return;
    const promise = updateImage(editingImage._id, formData);
    toast.promise(promise, {
      loading: "Updating image...",
      success: "Image updated!",
      error: "Failed to update image.",
    });

    try {
      await promise;
      handleCloseModal();
      fetchImages();
    } catch (err) {
      // Toast handles error
    }
  };

  // --- UPDATED: handleDelete with toast confirmation ---
  const handleDelete = async (imageId) => {
    toast(
      (t) => (
        <div className="flex flex-col items-center gap-4 p-2">
          <span className="font-semibold text-slate-700">Are you sure?</span>
          <p className="text-sm text-slate-500 text-center">
            This action cannot be undone.
          </p>
          <div className="flex gap-3 mt-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                const promise = deleteImage(imageId);
                await toast.promise(promise, {
                  loading: "Deleting image...",
                  success: "Image deleted.",
                  error: "Could not delete image.",
                });
                setImages(images.filter((img) => img._id !== imageId));
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 6000,
      }
    );
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-8">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center mb-1">
          <FiImage className="mr-3 text-indigo-600" />
          Gallery Management
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Upload new images to your gallery. Max file size: 3MB.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-slate-700"
            >
              Image Title (Optional)
            </label>
            <input
              id="title"
              type="text"
              placeholder="e.g., Modern Office Space"
              {...register("title")}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="file-upload"
              className="block text-sm font-medium text-slate-700"
            >
              Image File
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              {...register("image", {
                required: "An image file is required.",
                validate: {
                  lessThan2MB: (files) =>
                    files[0]?.size < 3000000 || "File must be under 3MB.",
                  acceptedFormats: (files) =>
                    ["image/jpeg", "image/png", "image/webp"].includes(
                      files[0]?.type
                    ) || "Only PNG, JPG, or WEBP formats are accepted.",
                },
              })}
              className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {/* --- NEW: Display validation errors --- */}
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">
                {errors.image.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto flex items-center justify-center bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors duration-200 disabled:bg-indigo-300"
          >
            {isSubmitting ? (
              <CgSpinner className="animate-spin mr-2" />
            ) : (
              <FiUpload className="mr-2" />
            )}
            {isSubmitting ? "Uploading..." : "Upload to Gallery"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6">
          Existing Images
        </h3>
        {loading ? (
          <div className="text-center py-10">Loading images...</div>
        ) : images.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-lg">
            <FiAlertCircle className="mx-auto text-4xl text-slate-400 mb-2" />
            <h3 className="font-semibold">Gallery is Empty</h3>
            <p className="text-slate-500 text-sm">
              Upload an image to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image) => (
              <div
                key={image._id}
                className="group bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:shadow-xl hover:-translate-y-1 duration-300"
              >
                <img
                  src={image.imageUrl}
                  alt={image.title || "Gallery image"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {image.title || "Untitled"}
                  </p>
                </div>
                <div className="p-2 bg-slate-50 flex justify-end items-center space-x-2">
                  <button
                    onClick={() => handleOpenModal(image)}
                    className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <FiEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(image._id)}
                    className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <GalleryFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleUpdateSubmit}
          imageData={editingImage}
        />
      )}
    </>
  );
};

export default GalleryManagementPage;
