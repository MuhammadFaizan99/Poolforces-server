const { reviewModel } = require('../model/reviewSch');

const createReview = async (req, res) => {
  try {
    const review = new reviewModel(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFiveStarReviews = async (req, res) => {
  try {
    const fiveStarReviews = await reviewModel.find({ rating: 5 });
    res.status(200).json(fiveStarReviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createReview, getFiveStarReviews };
