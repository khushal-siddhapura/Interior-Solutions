const GalleryImage = require("../models/GalleryImage");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// We can reuse the same helper function logic
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const cld_upload_stream = cloudinary.uploader.upload_stream(
      { folder: "admin-panel-gallery" }, // Use a different folder for gallery images
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(cld_upload_stream);
  });
};

// UPLOAD a new image to the gallery
exports.uploadImage = async (req, res) => {
  const { title, tags } = req.body;
  if (!req.file) {
    return res.status(400).json({ msg: "Image file is required" });
  }

  try {
    const uploadResult = await uploadToCloudinary(req.file.buffer);
    const newImage = new GalleryImage({
      title,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      imageUrl: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
    });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ msg: "Server error during image upload" });
  }
};

// GET all gallery images (for the admin panel)
exports.getAllImages = async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// UPDATE a gallery image
exports.updateImage = async (req, res) => {
  const { title, tags } = req.body;
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ msg: "Image not found" });
    }

    // Update text fields
    image.title = title || image.title;
    image.tags = tags ? tags.split(",").map((tag) => tag.trim()) : image.tags;

    // Check for a new image file and replace the old one
    if (req.file) {
      // 1. Delete the old image from Cloudinary
      await cloudinary.uploader.destroy(image.imagePublicId);

      // 2. Upload the new image
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      image.imageUrl = uploadResult.secure_url;
      image.imagePublicId = uploadResult.public_id;
    }

    const updatedImage = await image.save();
    res.json(updatedImage);
  } catch (error) {
    console.error("Error updating image:", error);
    res.status(500).json({ msg: "Server error during image update" });
  }
};

// DELETE an image from the gallery
exports.deleteImage = async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ msg: "Image not found" });
    }
    await cloudinary.uploader.destroy(image.imagePublicId);
    await image.deleteOne();
    res.json({ msg: "Image removed successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};
