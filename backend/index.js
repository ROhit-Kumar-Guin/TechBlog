const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require("path");
const cookieParser = require('cookie-parser');

// Import routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comments');

// Load environment variables
dotenv.config();


app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully!");
  } catch (err) {
    console.log("DB Connection Error:", err);
  }
};

// Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ CORRECT CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

// Serve static images
app.use("/images", express.static(path.join(__dirname, "/images")));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

// Image upload route
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "images");
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
  }
});
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image has been uploaded successfully!");
});

// Start server
app.listen(process.env.PORT, () => {
  connectDB();
  console.log("App is running on port " + process.env.PORT);
});



