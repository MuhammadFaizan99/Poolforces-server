const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripePayment = async (req, res) => {
    try {
      const { amount, token } = req.body;
  
      const charge = await stripe.charges.create({
        amount: amount * 100, // Stripe expects amount in cents
        currency: 'usd',
        source: token.id,
        description: 'Payment for React Stripe Checkout Example',
      });
  
      res.json({ success: true, message: 'Payment succeeded!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
  module.exports = {stripePayment}