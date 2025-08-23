const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// Middleware to protect routes and identify the user
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token (and attach to request)
      req.admin = await Admin.findById(decoded.admin.id).select("-password");

      if (!req.admin) {
        return res.status(401).json({ msg: "Not authorized, admin not found" });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ msg: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ msg: "Not authorized, no token" });
  }
};

// Middleware to check for SuperAdmin role
exports.isSuperAdmin = (req, res, next) => {
  if (req.admin && req.admin.role === "SuperAdmin") {
    next();
  } else {
    res.status(403).json({ msg: "Access denied. SuperAdmin role required." });
  }
};
