const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  ConfirmPassword: {
    type: String,
    required: true,
  },
  JoinedGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: "group" }], // Array to store joined group IDs
});

const userModel = mongoose.model("user", userSchema);
module.exports = { userModel };
