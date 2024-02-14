const express = require('express');
const reviewRouter = express.Router();
const { createReview, getFiveStarReviews } = require('../controller/review');

// Create a new review
reviewRouter.post('/create-review', createReview);

// Get all 5-star reviews
reviewRouter.get('/five-star-reviews', getFiveStarReviews);

module.exports = { reviewRouter };
