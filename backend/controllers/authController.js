const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// We will use this to create the first SuperAdmin
exports.registerAdmin = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ msg: "Admin already exists" });
    }
    admin = new Admin({ name, email, password, role });
    await admin.save();
    res.status(201).json({ msg: "Admin registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Check if account is blocked
    if (admin.status === "Blocked") {
      return res.status(403).json({ msg: "Your account has been blocked." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Update last login time
    admin.lastLogin = Date.now();
    await admin.save();

    const payload = {
      admin: {
        id: admin.id,
        role: admin.role,
        name: admin.name,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" }, // Token expires in 5 hours
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
