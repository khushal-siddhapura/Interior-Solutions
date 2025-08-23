const Admin = require("../models/Admin");

// @desc    Create a new admin
// @route   POST /api/admins
// @access  Private/SuperAdmin
exports.createAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res
        .status(400)
        .json({ msg: "Admin with that email already exists" });
    }

    const newAdmin = new Admin({ name, email, password, role: "Admin" });
    await newAdmin.save();

    // Don't send the password back
    const adminToReturn = { ...newAdmin._doc };
    delete adminToReturn.password;

    res.status(201).json(adminToReturn);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

// @desc    Get all admins
// @route   GET /api/admins
// @access  Private/SuperAdmin
exports.getAllAdmins = async (req, res) => {
  try {
    // Find all admins EXCEPT the one who is currently logged in
    const admins = await Admin.find({ _id: { $ne: req.admin.id } }).select(
      "-password"
    );
    res.json(admins);
  } catch (err) {
    console.error(err.message); // Log the actual error
    res.status(500).json({ msg: "Server Error" });
  }
};

// @desc    Update an admin (name, role, status)
// @route   PUT /api/admins/:id
// @access  Private/SuperAdmin
exports.updateAdmin = async (req, res) => {
  const { name, role, status } = req.body;
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    admin.name = name || admin.name;
    admin.role = role || admin.role;
    admin.status = status || admin.status;

    const updatedAdmin = await admin.save();
    res.json(updatedAdmin);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// @desc    Delete an admin
// @route   DELETE /api/admins/:id
// @access  Private/SuperAdmin
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }
    await admin.deleteOne(); // or admin.remove() depending on Mongoose version
    res.json({ msg: "Admin removed" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};
