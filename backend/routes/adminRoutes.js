const express = require("express");
const router = express.Router();
const {
  createAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/adminController");
const { protect, isSuperAdmin } = require("../middleware/authMiddleware");

// Apply protect and isSuperAdmin middleware to all routes in this file
router.use(protect, isSuperAdmin);

router.route("/").post(createAdmin).get(getAllAdmins);

router.route("/:id").put(updateAdmin).delete(deleteAdmin);

module.exports = router;
