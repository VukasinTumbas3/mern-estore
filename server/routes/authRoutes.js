const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = "nQe5!zF8vLK2tR@X6bM0pY9uT$hJ1cA7gW*VsDdBnQ3eEjL"; // Change to env var in production

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // hashuje password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created", userId: user._id });
  } catch (err) {
    res.status(400).json({ error: "User already exists or invalid data." });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // nadje usera uz email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    // compare password za hashovanom sifrom
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token, userId: user._id, username: user.username });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
