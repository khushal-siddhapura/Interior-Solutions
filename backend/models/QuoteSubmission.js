const mongoose = require("mongoose");

const quoteSubmissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    projectType: { type: String },
    location: { type: String },
    quantity: { type: String },
    fileUrl: { type: String }, // URL for the uploaded file from Cloudinary
    filePublicId: { type: String }, // Public ID to delete from Cloudinary
    status: { type: String, enum: ["New", "Responded"], default: "New" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuoteSubmission", quoteSubmissionSchema);
