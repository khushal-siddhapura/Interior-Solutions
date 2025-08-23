// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form"; // --- NEW: Import useForm ---
// import toast from "react-hot-toast";
// import {
//   getProducts,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } from "../services/productService";
// import ProductFormModal from "../components/product/ProductFormModal";
// import {
//   FiShoppingBag,
//   FiPlus,
//   FiEdit,
//   FiTrash2,
//   FiAlertCircle,
// } from "react-icons/fi";
// import { CgSpinner } from "react-icons/cg";

// const ProductManagementPage = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);

//   // --- NEW: Setup react-hook-form ---
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//   } = useForm({
//     defaultValues: {
//       name: "",
//       category: "",
//       description: "",
//     },
//   });

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const { data } = await getProducts();
//       setProducts(data);
//     } catch (err) {
//       toast.error("Failed to fetch products.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // --- UPDATED: onSubmit handler for react-hook-form ---
//   const onSubmit = async (data) => {
//     const productData = new FormData();
//     productData.append("name", data.name);
//     productData.append("category", data.category);
//     productData.append("description", data.description);
//     productData.append("image", data.image[0]);

//     const promise = createProduct(productData);

//     await toast.promise(promise, {
//       loading: "Adding new product...",
//       success: "Product added successfully!",
//       error: (err) => err.response?.data?.msg || "Failed to add product.",
//     });

//     try {
//       await promise;
//       fetchProducts();
//       reset(); // Reset form fields
//     } catch (err) {
//       console.error("Product creation error:", err);
//     }
//   };

//   const handleOpenModal = (product) => {
//     setEditingProduct(product);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setEditingProduct(null);
//     setIsModalOpen(false);
//   };

//   const handleUpdateSubmit = async (updateData) => {
//     if (!editingProduct) return;
//     const promise = updateProduct(editingProduct._id, updateData);
//     await toast.promise(promise, {
//       loading: "Updating product...",
//       success: "Product updated successfully!",
//       error: "Failed to update product.",
//     });

//     try {
//       await promise;
//       handleCloseModal();
//       fetchProducts();
//     } catch (err) {
//       // Toast handles error
//     }
//   };

//   // --- UPDATED: handleDelete with toast confirmation ---
//   const handleDelete = async (productId) => {
//     toast(
//       (t) => (
//         <div className="flex flex-col items-center gap-4 p-2">
//           <span className="font-semibold text-slate-700">Are you sure?</span>
//           <p className="text-sm text-slate-500 text-center">
//             This product will be permanently deleted.
//           </p>
//           <div className="flex gap-3 mt-2">
//             <button
//               onClick={async () => {
//                 toast.dismiss(t.id);
//                 const promise = deleteProduct(productId);
//                 await toast.promise(
//                   promise,
//                   {
//                     loading: "Deleting product...",
//                     success: "Product deleted.",
//                     error: "Failed to delete product.",
//                   },
//                   { duration: 3000 }
//                 );
//                 setProducts(products.filter((p) => p._id !== productId));
//               }}
//               className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
//             >
//               Delete
//             </button>
//             <button
//               onClick={() => toast.dismiss(t.id)}
//               className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm font-semibold"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       ),
//       {
//         duration: 6000,
//       }
//     );
//   };

//   return (
//     <>
//       <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-8">
//         <h2 className="text-2xl font-bold text-slate-800 flex items-center mb-1">
//           <FiShoppingBag className="mr-3 text-indigo-600" />
//           Product Management
//         </h2>
//         <p className="text-sm text-slate-500 mb-6">
//           Add new products to your catalog. Max image size: 3MB.
//         </p>

{
  /* <form
  onSubmit={handleSubmit(onSubmit)}
  className="grid grid-cols-1 md:grid-cols-2 gap-6"
>
  <div className="space-y-4">
    <div>
      <label
        htmlFor="name"
        className="block text-sm font-medium text-slate-700"
      >
        Product Name
      </label>
      <input
        id="name"
        type="text"
        {...register("name", { required: "Product name is required." })}
        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      {errors.name && (
        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
      )}
    </div>
    <div>
      <label
        htmlFor="category"
        className="block text-sm font-medium text-slate-700"
      >
        Category
      </label>
      <select
        id="category"
        {...register("category", {
          required: "Please select a category.",
        })}
        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 transition"
      >
        <option value="">-- Select a Category --</option>
        <option value="Glass Partitions">Glass Partitions</option>
        <option value="Aluminium Systems">Aluminium Systems</option>
      </select>
      {errors.category && (
        <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
      )}
    </div>
    <div>
      <label
        htmlFor="product-image"
        className="block text-sm font-medium text-slate-700"
      >
        Product Image
      </label>
      <input
        id="product-image"
        type="file"
        accept="image/png, image/jpeg, image/webp"
        {...register("image", {
          required: "A product image is required.",
          validate: {
            lessThan2MB: (files) =>
              files[0]?.size < 3000000 || "Image must be under 3MB.",
            acceptedFormats: (files) =>
              ["image/jpeg", "image/png", "image/webp"].includes(
                files[0]?.type
              ) || "Only PNG, JPG, or WEBP formats are accepted.",
          },
        })}
        className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
      />
      {errors.image && (
        <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
      )}
    </div>
  </div>
  <div className="flex flex-col">
    <label
      htmlFor="description"
      className="block text-sm font-medium text-slate-700"
    >
      Description
    </label>
    <textarea
      id="description"
      rows="6"
      {...register("description", {
        required: "Description is required.",
        minLength: {
          value: 3,
          message: "Must be at least 3 characters.",
        },
      })}
      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    ></textarea>
    {errors.description && (
      <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
    )}
    <button
      type="submit"
      disabled={isSubmitting}
      className="mt-4 w-full flex items-center justify-center bg-indigo-600 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors duration-200 disabled:bg-indigo-300"
    >
      {isSubmitting ? (
        <CgSpinner className="animate-spin mr-2" />
      ) : (
        <FiPlus className="mr-2" />
      )}
      {isSubmitting ? "Adding Product..." : "Add Product"}
    </button>
  </div>
</form>; */
}
//       </div>

//       <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
//         <h3 className="text-xl font-bold text-slate-800 mb-6">
//           Existing Products
//         </h3>
//         {loading ? (
//           <div className="text-center py-10">Loading products...</div>
//         ) : products.length === 0 ? (
//           <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-lg">
//             <FiAlertCircle className="mx-auto text-4xl text-slate-400 mb-2" />
//             <h3 className="font-semibold">No Products Found</h3>
//             <p className="text-slate-500 text-sm">
//               Add a product using the form above to see it here.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map((product) => (
//               <div
//                 key={product._id}
//                 className="group bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:shadow-xl hover:-translate-y-1 duration-300 flex flex-col"
//               >
//                 <img
//                   src={product.imageUrl}
//                   alt={product.name}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4 flex-grow">
//                   <h4 className="text-md font-bold text-slate-800">
//                     {product.name}
//                   </h4>
//                   <p className="text-xs font-semibold uppercase text-indigo-500 my-1">
//                     {product.category}
//                   </p>
//                   <p className="text-sm text-slate-600 line-clamp-3">
//                     {product.description}
//                   </p>
//                 </div>
//                 <div className="p-2 bg-slate-50 flex justify-end items-center space-x-2">
//                   <button
//                     onClick={() => handleOpenModal(product)}
//                     className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition-colors"
//                   >
//                     <FiEdit size={16} />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(product._id)}
//                     className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
//                   >
//                     <FiTrash2 size={16} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {isModalOpen && (
//         <ProductFormModal
//           isOpen={isModalOpen}
//           onClose={handleCloseModal}
//           onSubmit={handleUpdateSubmit}
//           productData={editingProduct}
//         />
//       )}
//     </>
//   );
// };

// export default ProductManagementPage;

import React, { useState, useEffect, useCallback, memo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import ProductFormModal from "../components/product/ProductFormModal";
import {
  FiShoppingBag,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiAlertCircle,
} from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";

// --- OPTIMIZATION 1: Create a memoized ProductCard component ---
// React.memo prevents this component from re-rendering if its props are the same.
const ProductCard = memo(({ product, onEdit, onDelete }) => {
  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:shadow-xl hover:-translate-y-1 duration-300 flex flex-col">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
        loading="lazy" // --- BONUS: Lazy load images for better initial page load ---
      />
      <div className="p-4 flex-grow">
        <h4 className="text-md font-bold text-slate-800">{product.name}</h4>
        <p className="text-xs font-semibold uppercase text-indigo-500 my-1">
          {product.category}
        </p>
        <p className="text-sm text-slate-600 line-clamp-3">
          {product.description}
        </p>
      </div>
      <div className="p-2 bg-slate-50 flex justify-end items-center space-x-2">
        <button
          onClick={() => onEdit(product)}
          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition-colors"
          aria-label={`Edit ${product.name}`}
        >
          <FiEdit size={16} />
        </button>
        <button
          onClick={() => onDelete(product._id)}
          className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          aria-label={`Delete ${product.name}`}
        >
          <FiTrash2 size={16} />
        </button>
      </div>
    </div>
  );
});

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  // --- OPTIMIZATION 2: Memoize functions with useCallback ---
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getProducts();
      setProducts(data);
    } catch (err) {
      toast.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies, this function will be created only once.

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const onSubmit = useCallback(
    async (data) => {
      const productData = new FormData();
      productData.append("name", data.name);
      productData.append("category", data.category);
      productData.append("description", data.description);
      productData.append("image", data.image[0]);

      const promise = createProduct(productData);

      await toast.promise(promise, {
        loading: "Adding new product...",
        success: "Product added successfully!",
        error: (err) => err.response?.data?.msg || "Failed to add product.",
      });

      // Refetch data to ensure consistency
      await promise.catch((err) =>
        console.error("Product creation error:", err)
      );
      fetchProducts();
      reset();
    },
    [reset, fetchProducts]
  );

  const handleOpenModal = useCallback((product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  }, []); // State setters are stable and don't need to be in the dependency array

  const handleCloseModal = useCallback(() => {
    setEditingProduct(null);
    setIsModalOpen(false);
  }, []);

  const handleUpdateSubmit = useCallback(
    async (updateData) => {
      if (!editingProduct) return;

      const promise = updateProduct(editingProduct._id, updateData);
      await toast.promise(promise, {
        loading: "Updating product...",
        success: "Product updated successfully!",
        error: "Failed to update product.",
      });

      await promise.catch(() => {
        /* Toast handles error */
      });
      handleCloseModal();
      fetchProducts();
    },
    [editingProduct, fetchProducts, handleCloseModal]
  );

  const handleDelete = useCallback(
    (productId) => {
      toast(
        (t) => (
          <div className="flex flex-col items-center gap-4 p-2">
            <span className="font-semibold text-slate-700">Are you sure?</span>
            <p className="text-sm text-slate-500 text-center">
              This product will be permanently deleted.
            </p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={async () => {
                  toast.dismiss(t.id);
                  const promise = deleteProduct(productId);
                  await toast.promise(
                    promise,
                    {
                      loading: "Deleting product...",
                      success: "Product deleted.",
                      error: "Failed to delete product.",
                    },
                    { duration: 3000 }
                  );
                  // Optimistic UI update
                  setProducts((prevProducts) =>
                    prevProducts.filter((p) => p._id !== productId)
                  );
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
        { duration: 6000 }
      );
    },
    [] // products is not a dependency because we use the function form of setProducts
  );

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-8">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center mb-1">
          <FiShoppingBag className="mr-3 text-indigo-600" />
          Product Management
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Add new products to your catalog. Max image size: 3MB.
        </p>

        {/* The form JSX remains largely the same */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700"
              >
                Product Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name", { required: "Product name is required." })}
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-slate-700"
              >
                Category
              </label>
              <select
                id="category"
                {...register("category", {
                  required: "Please select a category.",
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 transition"
              >
                <option value="">-- Select a Category --</option>
                <option value="Glass Partitions">Glass Partitions</option>
                <option value="Aluminium Systems">
                  Aluminium Systems Windows
                </option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="product-image"
                className="block text-sm font-medium text-slate-700"
              >
                Product Image
              </label>
              <input
                id="product-image"
                type="file"
                accept="image/png, image/jpeg, image/webp"
                {...register("image", {
                  required: "A product image is required.",
                  validate: {
                    lessThan2MB: (files) =>
                      files[0]?.size < 3000000 || "Image must be under 3MB.",
                    acceptedFormats: (files) =>
                      ["image/jpeg", "image/png", "image/webp"].includes(
                        files[0]?.type
                      ) || "Only PNG, JPG, or WEBP formats are accepted.",
                  },
                })}
                className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.image.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-700"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="6"
              {...register("description", {
                required: "Description is required.",
                minLength: {
                  value: 3,
                  message: "Must be at least 3 characters.",
                },
              })}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full flex items-center justify-center bg-indigo-600 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors duration-200 disabled:bg-indigo-300"
            >
              {isSubmitting ? (
                <CgSpinner className="animate-spin mr-2" />
              ) : (
                <FiPlus className="mr-2" />
              )}
              {isSubmitting ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6">
          Existing Products
        </h3>
        {loading ? (
          <div className="text-center py-10">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-lg">
            <FiAlertCircle className="mx-auto text-4xl text-slate-400 mb-2" />
            <h3 className="font-semibold">No Products Found</h3>
            <p className="text-slate-500 text-sm">
              Add a product using the form above to see it here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* --- OPTIMIZATION 3: Use the new ProductCard component --- */}
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={handleOpenModal}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <ProductFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleUpdateSubmit}
          productData={editingProduct}
        />
      )}
    </>
  );
};

export default ProductManagementPage;
