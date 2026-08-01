const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  createAppointment,
  getAppointments,
} = require("../controllers/appointmentController");

// Create Appointment
router.post("/", protect, createAppointment);

// Get All Appointments
router.get("/", protect, getAppointments);

module.exports = router;