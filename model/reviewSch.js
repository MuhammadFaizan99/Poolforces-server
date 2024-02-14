// reviewSch.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  text: {
    type: String,
    required: true,
  },
  // You can add more fields like user ID, date, product ID, etc. as needed
});

const reviewModel = mongoose.model('Review', reviewSchema);
module.exports = {reviewModel}