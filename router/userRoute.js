const express = require("express");
const userRouter = express.Router();
const { signUp, signIn } = require("../controller/user");
const { authenticateUser } = require("../middleware/Middleware");

userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);


// Protected route example
userRouter.get("/profile", authenticateUser, (req, res) => {
  // This route is protected and can only be accessed with a valid token
  res.json({ message: "This is a protected route", userId: req.userId });
});

module.exports = { userRouter }