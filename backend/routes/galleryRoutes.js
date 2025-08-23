const express = require("express");
const router = express.Router();
const {
  uploadImage,
  getAllImages,
  updateImage,
  deleteImage,
} = require("../controllers/galleryController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Protect all admin routes for the gallery
router.use(protect);

router.route("/").get(getAllImages).post(upload.single("image"), uploadImage);

router
  .route("/:id")
  .put(upload.single("image"), updateImage) // Add this PUT route
  .delete(deleteImage);

router.route("/:id").delete(deleteImage);

module.exports = router;
