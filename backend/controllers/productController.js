const Product = require("../models/Product");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Helper function to upload to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const cld_upload_stream = cloudinary.uploader.upload_stream(
      { folder: "admin-panel-products" },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(cld_upload_stream);
  });
};

// CREATE a new product
exports.createProduct = async (req, res) => {
  const { name, category, description, price, tags } = req.body;
  if (!req.file) {
    return res.status(400).json({ msg: "Image upload is required" });
  }

  if (!name || !category || !description) {
    return res
      .status(400)
      .json({ msg: "Name, category, and description are required" });
  }

  try {
    const uploadResult = await uploadToCloudinary(req.file.buffer);

    const product = new Product({
      name,
      category,
      description,
      imageUrl: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ msg: "Server error during product creation" });
  }
};

// UPDATE a product
exports.updateProduct = async (req, res) => {
  const { name, category, description, price, tags } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Update text fields
    product.name = name || product.name;
    product.category = category || product.category;
    product.description = description || product.description;
    product.price = price || product.price;
    product.tags = tags
      ? tags.split(",").map((tag) => tag.trim())
      : product.tags;

    // Check if a new image was uploaded
    if (req.file) {
      // Delete the old image from Cloudinary
      await cloudinary.uploader.destroy(product.imagePublicId);

      // Upload the new image
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      product.imageUrl = uploadResult.secure_url;
      product.imagePublicId = uploadResult.public_id;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ msg: "Server error during product update" });
  }
};

// GET all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// DELETE a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Delete image from Cloudinary first
    await cloudinary.uploader.destroy(product.imagePublicId);

    // Then delete product from DB
    await product.deleteOne();

    res.json({ msg: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// Note: The UPDATE controller is more complex as it needs to handle optional image replacement.
// We can add it later or you can try implementing it as a challenge.
