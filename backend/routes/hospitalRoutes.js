const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getNearbyHospitals,
} = require("../controllers/hospitalController");

// ======================================
// Nearby Hospitals
// ======================================

router.get(
  "/nearby",
  protect,
  getNearbyHospitals
);
module.exports = router;