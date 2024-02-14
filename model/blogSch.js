const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: true,
  },
  CreationDate: {
    type: Date, // Use the Date data type for date and time
    required: true,
  },
  BlogName: {
    type: String,
    required: true,
    unique: true,
  },
  BlogDescription: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

const blogModel = mongoose.model("blog", blogSchema);

module.exports = { blogModel };
