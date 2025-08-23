const express = require("express");
const router = express.Router();
const ContactSubmission = require("../models/ContactSubmission");
const QuoteSubmission = require("../models/QuoteSubmission");
const upload = require("../middleware/uploadMiddleware"); // For file uploads
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const Product = require("../models/Product");
const GalleryImage = require("../models/GalleryImage");

// @route   GET /api/public/products
// @desc    Get all products for public display
// @access  Public
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route   POST /api/public/contact
// @desc    Submit the contact form
// @access  Public
router.post("/contact", async (req, res) => {
  try {
    const newSubmission = new ContactSubmission(req.body);
    await newSubmission.save();
    res.status(201).json({ msg: "Contact form submitted successfully!" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// @route   POST /api/public/quote
// @desc    Submit the get-a-quote form (with optional file)
// @access  Public
router.post("/quote", upload.single("file"), async (req, res) => {
  try {
    const submissionData = { ...req.body };

    if (req.file) {
      // Reusable upload logic
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "quote-requests" },
          (err, res) => {
            if (res) resolve(res);
            else reject(err);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
      submissionData.fileUrl = uploadResult.secure_url;
      submissionData.filePublicId = uploadResult.public_id;
    }

    const newQuote = new QuoteSubmission(submissionData);
    await newQuote.save();
    res.status(201).json({ msg: "Quote request submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/gallery", async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
