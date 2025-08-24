import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to import axios
import ImageGallery from "../components/ImageGallery";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Gallery = ({ preview = false, limit = 6 }) => {
  const navigate = useNavigate();

  // --- NEW: State for storing dynamic images, loading, and errors ---
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- NEW: Fetch gallery images from the backend when the component loads ---
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        // We use the public gallery route we created earlier
        const { data } = await axios.get(
          "https://interior-solutions.onrender.com/api/public/gallery"
        );

        // We transform the data from the backend to match the format your
        // <ImageGallery> component expects ({ src, caption })
        const formattedData = data.map((img) => ({
          src: img.imageUrl,
          caption: img.title || "Our Work", // Use title as caption, with a fallback
        }));

        setImages(formattedData);
      } catch (err) {
        console.error("Failed to fetch gallery images:", err);
        setError("Could not load the gallery at this time.");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []); // The empty array ensures this runs only once when the component mounts

  // Determine which images to show based on whether it's a preview or the full page
  const shown = preview ? images.slice(0, Math.min(limit, 3)) : images;

  return (
    <div className={preview ? "px-4" : "max-w-6xl mx-auto py-12 px-4"}>
      <SectionTitle title="Gallery" />

      {/* --- NEW: Show loading or error messages --- */}
      {loading && <p className="text-center">Loading Gallery...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Show the gallery only if not loading and no error */}
      {!loading && !error && <ImageGallery images={shown} />}

      {/* The preview button logic remains the same */}
      {preview && !loading && !error && (
        <div className="text-center mt-6">
          <Button variant="ViewProduct" onClick={() => navigate("/gallery")}>
            View Full Gallery
          </Button>
        </div>
      )}
    </div>
  );
};

export default Gallery;