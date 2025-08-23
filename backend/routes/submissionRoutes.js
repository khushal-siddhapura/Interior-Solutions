const express = require("express");
const router = express.Router();
const {
  getContactSubmissions,
  getQuoteSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
} = require("../controllers/submissionController");
const { protect } = require("../middleware/authMiddleware");

// Protect all these routes
router.use(protect);

router.get("/contact", getContactSubmissions);
router.get("/quote", getQuoteSubmissions);
router.put("/:type/:id", updateSubmissionStatus);
router.delete("/:type/:id", deleteSubmission);

module.exports = router;
