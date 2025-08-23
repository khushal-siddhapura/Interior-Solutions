const ContactSubmission = require("../models/ContactSubmission");
const QuoteSubmission = require("../models/QuoteSubmission");
const cloudinary = require("cloudinary").v2;

exports.getContactSubmissions = async (req, res) => {
  const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
  res.json(submissions);
};

exports.getQuoteSubmissions = async (req, res) => {
  const submissions = await QuoteSubmission.find().sort({ createdAt: -1 });
  res.json(submissions);
};

exports.updateSubmissionStatus = async (req, res) => {
  const { type, id } = req.params;
  const { status } = req.body;

  const Model = type === "contact" ? ContactSubmission : QuoteSubmission;

  try {
    const submission = await Model.findById(id);
    if (!submission)
      return res.status(404).json({ msg: "Submission not found" });

    submission.status = status;
    await submission.save();
    res.json(submission);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.deleteSubmission = async (req, res) => {
  const { type, id } = req.params;
  const Model = type === "contact" ? ContactSubmission : QuoteSubmission;

  try {
    const submission = await Model.findById(id);
    if (!submission)
      return res.status(404).json({ msg: "Submission not found" });

    // If it's a quote with a file, delete from Cloudinary first
    if (type === "quote" && submission.filePublicId) {
      await cloudinary.uploader.destroy(submission.filePublicId);
    }

    await submission.deleteOne();
    res.json({ msg: "Submission removed" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};
