const express = require("express");
const paymentRouter = express.Router();
const {stripePayment} = require("../controller/payment")

paymentRouter.post('/checkout',stripePayment );
  module.exports = {paymentRouter}