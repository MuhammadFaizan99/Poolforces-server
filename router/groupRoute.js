const express = require("express");
const groupRouter = express.Router();
const multer = require("multer");
const {
  createGroup,
  getGroup,
  joinGroup,
  incrementMembers,
  getTopGroups,
  updateJoinStatus,
  getMaxTargetFundsGroup, // Add this import
} = require("../controller/group");
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
groupRouter.post("/create-group", upload.single("Image"), createGroup);
groupRouter.get("/get-group", getGroup);
groupRouter.post("/join-group", authenticateUser, joinGroup);
groupRouter.post("/increment-members", incrementMembers);
groupRouter.get("/get-top-groups", getTopGroups);
groupRouter.post("/update-join-status/:groupId", updateJoinStatus);
groupRouter.get("/max-target-funds-group", getMaxTargetFundsGroup);

module.exports = { groupRouter };
