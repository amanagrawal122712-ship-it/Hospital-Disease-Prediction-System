const express = require("express");
const router = express.Router();

const {
  addDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getRecommendedDoctors,
} = require("../controllers/doctorController");

const { protect } = require("../middleware/authMiddleware");

// ======================================
// Recommendation Route
// (Keep this BEFORE /:id)
// ======================================

router.get(
  "/recommend/:disease",
  protect,
  getRecommendedDoctors
);

// ======================================
// CRUD Routes
// ======================================

// Add Doctor
router.post("/", protect, addDoctor);

// Get All Doctors
router.get("/", protect, getDoctors);
// Get Doctor By ID
router.get(
  "/:id",
  protect,
  getDoctorById
);

// Update Doctor
router.put(
  "/:id",
  protect,
  updateDoctor
);

// Delete Doctor
router.delete(
  "/:id",
  protect,
  deleteDoctor
);

module.exports = router;