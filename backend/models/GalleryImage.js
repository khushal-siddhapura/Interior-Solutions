const mongoose = require("mongoose");

const galleryImageSchema = new mongoose.Schema(
  {
    title: { type: String },
    tags: [{ type: String }],
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GalleryImage", galleryImageSchema);
