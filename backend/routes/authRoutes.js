const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  register,
  login,
  getProfile,
} = require("../controllers/authController");

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Get Logged In User Profile
router.get("/profile", protect, getProfile);

module.exports = router;