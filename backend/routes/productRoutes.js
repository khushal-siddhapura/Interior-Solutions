const express = require("express");
const router = express.Router();
const {
  createProduct,
  updateProduct,
  getAllProducts,
  deleteProduct,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// All these routes are protected and require a valid token
router.use(protect);

router
  .route("/")
  .get(getAllProducts)
  .post(upload.single("image"), createProduct);

router
  .route("/:id")
  .put(upload.single("image"), updateProduct) // Add the PUT route
  .delete(deleteProduct);

router.route("/:id").delete(deleteProduct);
// .put(upload.single('image'), updateProduct); // For later

module.exports = router;
