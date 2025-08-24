import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

// We no longer need the hardcoded GLASS and ALUM arrays.
// They will be fetched from the backend.

const previewImages = [
  {
    title: "Glass Partitions",
    description: "Modern partitions for workspaces.",
    image: "/images/GlassPartition.jpg",
  },
  {
    title: "Aluminium System Windows",
    description: "Smooth sliding aluminium windows.",
    image: "/images/AlluminumWindow.jpg",
  },
];

const Products = ({ preview = false }) => {
  const navigate = useNavigate();

  // --- NEW: State management for dynamic data and filtering ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Glass Partitions");

  // --- NEW: Fetch products from the backend when the component loads ---
  useEffect(() => {
    // This effect runs only on the full products page, not the preview.
    if (!preview) {
      const fetchProducts = async () => {
        try {
          // Assuming your backend is running on port 5001
          const { data } = await axios.get(
            "https://interior-solutions.onrender.com/api/public/products"
          );
          setProducts(data);
        } catch (err) {
          console.error("Failed to fetch products:", err);
          setError("Could not load products at this time.");
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [preview]);

  // --- NEW: Filter products based on the active category ---
  const glassProducts = products.filter(
    (p) => p.category === "Glass Partitions"
  );
  const aluminiumProducts = products.filter(
    (p) => p.category === "Aluminium Systems"
  );

  return (
    <div className={preview ? "px-4" : "max-w-6xl mx-auto py-12 px-4"}>
      <SectionTitle title="Our Products" />

      {/* Preview logic remains unchanged */}
      {preview ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {previewImages.map((img) => (
            <div
              key={img.title}
              onClick={() => navigate("/products")}
              className="cursor-pointer overflow-hidden transform transition-transform duration-300 shadow-md rounded-2xl group"
            >
              <div className="relative group">
                <img
                  src={img.image}
                  alt={img.description}
                  className="w-full h-110 object-cover rounded-t-2xl"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-medium">
                  View Products
                </div>
              </div>
              <div className="bg-white rounded-b-2xl p-4 text-center">
                <h3 className="text-xl font-semibold text-slate-700">
                  {img.title}
                </h3>
                <p className="text-slate-500 mt-1">{img.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Full products page with dynamic data and filtering
        <>
          {/* --- NEW: Filter Buttons --- */}
          <div className="flex justify-center space-x-4 mb-10">
            <button
              onClick={() => setActiveCategory("Glass Partitions")}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                activeCategory === "Glass Partitions"
                  ? "bg-slate-800 text-white"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              Glass Partitions
            </button>
            <button
              onClick={() => setActiveCategory("Aluminium Systems")}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                activeCategory === "Aluminium Systems"
                  ? "bg-slate-800 text-white"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              Aluminium Systems Windows
            </button>
          </div>

          {loading && <p className="text-center">Loading products...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {/* --- NEW: Conditional Rendering based on activeCategory --- */}
          {!loading && !error && (
            <div>
              {activeCategory === "Glass Partitions" && (
                <div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {glassProducts.map((p) => (
                      <Card
                        key={p._id} // Use database ID as key
                        title={p.name}
                        description={p.description}
                        image={p.imageUrl} // Use imageUrl from database
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeCategory === "Aluminium Systems" && (
                <div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {aluminiumProducts.map((p) => (
                      <Card
                        key={p._id} // Use database ID as key
                        title={p.name}
                        description={p.description}
                        image={p.imageUrl} // Use imageUrl from database
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div>
            <h3 className="text-center text-lg text-slate-500 mt-8">
              All products come with durable finishes, aesthetic appeal, and
              easy maintenance.
            </h3>
          </div>
        </>
      )}

      {/* "View All" button on preview page remains unchanged */}
      {preview && (
        <div className="text-center mt-6">
          <Button variant="ViewProduct" onClick={() => navigate("/products")}>
            View All Products
          </Button>
        </div>
      )}
    </div>
  );
};

export default Products;
