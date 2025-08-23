const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["Glass Partitions", "Aluminium Systems"], // Enforces these two values only
    },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true }, // For deleting from Cloudinary
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
