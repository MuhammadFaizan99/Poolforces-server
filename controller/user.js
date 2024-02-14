const { userModel } = require("../model/userSch");
const jwt = require("jsonwebtoken");
// const config = require("../config/config");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    const { FirstName, LastName, Email, DOB, Password, ConfirmPassword } = req.body;

    // Check if the password and confirm password match
    if (Password !== ConfirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if a user with the same email already exists
    const existingUser = await userModel.findOne({ Email });

    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    // Create a new user with the hashed password
    const user = new userModel({
      FirstName,
      LastName,
      Email,
      DOB,
      Password: hashedPassword,
      ConfirmPassword: hashedPassword, // Make sure to hash this as well if needed
      JoinedGroups: [], // Initialize JoinedGroups as an empty array
    });

    // Save the user to the database
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const signIn = async (req, res) => {
  try {
    const { EmailNumber, Password } = req.body;

    // Find the user by email/username
    const user = await userModel.findOne({ Email: EmailNumber });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(Password, user.Password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Include userId in the response
    res.status(200).json({ message: "Authentication successful", token, userId: user._id, lastName: user.LastName  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const joinGroup = async (req, res) => {
  try {
    const { groupId } = req.body;
    const userId = req.user.userId; // Get the user's ID from the JWT token

    // Add the group ID to the user's JoinedGroups array
    await userModel.findByIdAndUpdate(userId, { $push: { JoinedGroups: groupId } });

    res.status(200).json({ message: "User joined the group successfully" });
  } catch (error) {
    console.error("Error joining group:", error);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = { signUp, signIn, joinGroup };
