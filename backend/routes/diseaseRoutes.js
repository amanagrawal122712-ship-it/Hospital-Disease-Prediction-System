const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  createDisease,
  getDiseases,
  deleteDisease,
  getDashboardStats,
} = require("../controllers/diseaseController");

// Dashboard Analytics
router.get("/dashboard", protect, getDashboardStats);

// Predict Disease
router.post("/", protect, createDisease);

// Prediction History
router.get("/", protect, getDiseases);

// Delete Prediction
router.delete("/:id", protect, deleteDisease);

module.exports = router;