const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  createPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController");

// Create Patient
router.post("/", protect, createPatient);

// Get All Patients
router.get("/", protect, getPatients);

// Get Single Patient
router.get("/:id", protect, getPatient);

// Update Patient
router.put("/:id", protect, updatePatient);

// Delete Patient
router.delete("/:id", protect, deletePatient);

module.exports = router;