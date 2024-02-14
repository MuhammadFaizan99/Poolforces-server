const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  GroupName: {
    type: String,
    required: true,
    unique: true,
  },
  GroupDescription: {
    type: String,
    required: true,
  },
  TargetFunds: {
    type: Number,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  userIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  Members: {
    type: Number,
    default: 0,
  },
  isJoined: {
    type: Boolean,
    default: false,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
}, { timestamps: true });

const groupModel = mongoose.model("group", groupSchema);

module.exports = { groupModel };
