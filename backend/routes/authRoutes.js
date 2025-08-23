const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin } = require("../controllers/authController");

// @route   POST api/auth/register
// @desc    Register an admin (for initial setup)
// @access  Public
router.post("/register", registerAdmin);

// @route   POST api/auth/login
// @desc    Authenticate admin & get token
// @access  Public
router.post("/login", loginAdmin);

module.exports = router;
