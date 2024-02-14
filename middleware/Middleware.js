const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  // Extract the token from the request header
  const token = req.header("Authorization");

  // Check if a token is provided
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided" });
  }

  try {
    // Verify the token using the JWT secret
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Set the user ID from the token in the request for future use
    req.user = {
      userId: decodedToken.userId,
    };

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid or expired, send an unauthorized response
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { authenticateUser };
