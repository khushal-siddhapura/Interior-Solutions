const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const configureCloudinary = require("./config/cloudinaryConfig");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

// Load env vars
dotenv.config();

// Configure Cloudinary
configureCloudinary();

// Connect to database
connectDB();

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Enable CORS
// const corsOptions = {
//   origin: "https://interior-solutions-three.vercel.app/", // Your React app's address
//   optionsSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

// Allow list of frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://interior-solutions-three.vercel.app", // Vercel preview or main site
  "https://interiorsolutions.co.in", // Your custom domain
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(compression());

// // Add caching headers
// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.set("Cache-Control", "public, max-age=31536000");
//   }
//   next();
// });

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api/", limiter);

// Define Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admins", require("./routes/adminRoutes"));
app.use("/api/public", require("./routes/publicRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/submissions", require("./routes/submissionRoutes"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
