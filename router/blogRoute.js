const express = require("express");
const blogRouter = express.Router();
const multer = require("multer");
const { createBlog , getBlogs } = require("../controller/blog");
const { authenticateUser } = require("../middleware/Middleware");

// Configure Multer to specify where to store uploaded files and file naming.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Generate a unique filename using a timestamp and the original file extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Create a Multer instance with the storage configuration.
const upload = multer({ storage });

// Use Multer middleware for handling file uploads.
blogRouter.post("/create-blog", upload.single("Image"), createBlog);
blogRouter.get("/fetch-blogs", getBlogs);

module.exports = { blogRouter };