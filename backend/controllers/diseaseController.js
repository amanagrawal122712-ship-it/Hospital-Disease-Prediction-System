const Disease = require("../models/Disease");
const axios = require("axios");
const diseaseInfo = require("../utils/diseaseInfo");

// ======================================
// Predict Disease & Save
// ======================================
const createDisease = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (
      !symptoms ||
      !Array.isArray(symptoms) ||
      symptoms.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one symptom.",
      });
    }

    // Call Flask API
    const flaskResponse = await axios.post(
      "http://127.0.0.1:5001/predict",
      {
        symptoms,
      }
    );

    console.log(
      "Flask Response:",
      flaskResponse.data
    );

    const predictedDisease =
      flaskResponse.data.predicted_disease ||
      flaskResponse.data.prediction ||
      flaskResponse.data.disease;

    if (!predictedDisease) {
      return res.status(500).json({
        success: false,
        message:
          "Prediction not received from Flask API.",
      });
    }

    // Disease Details
    const info =
      diseaseInfo[predictedDisease] || {
        description:
          "No description available.",
        medicines: [],
        precautions: [],
        diet: [],
      };

    // Save Prediction
    const disease = await Disease.create({
      user: req.user._id,
      diseaseName: predictedDisease,
      symptoms,

      description: info.description,

      medicines: info.medicines,

      precautions: info.precautions,

      diet: info.diet,
    });

    return res.status(201).json({
      success: true,

      prediction: predictedDisease,

      description: info.description,

      medicines: info.medicines,

      precautions: info.precautions,

      diet: info.diet,

      disease,
    });

  } catch (error) {

    console.log(
      "Prediction Error:",
      error.message
    );

    if (error.response) {
      console.log(error.response.data);
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get Prediction History
// ======================================
const getDiseases = async (req, res) => {
  try {

    const diseases = await Disease.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,

      total: diseases.length,

      diseases,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ======================================
// Delete Prediction
// ======================================
const deleteDisease = async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id);

    if (!disease) {
      return res.status(404).json({
        success: false,
        message: "Prediction not found.",
      });
    }

    if (
      disease.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    await Disease.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Prediction deleted successfully.",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Dashboard Analytics
// ======================================
const getDashboardStats = async (req, res) => {
  try {

    const diseases = await Disease.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    const totalPredictions =
      diseases.length;

    const lastPrediction =
      diseases.length > 0
        ? diseases[0]
        : null;

    // Disease Frequency
    const diseaseCount = {};

    diseases.forEach((item) => {
      diseaseCount[item.diseaseName] =
        (diseaseCount[item.diseaseName] || 0) + 1;
    });

    let mostPredictedDisease =
      "No Data";

    let max = 0;

    for (const disease in diseaseCount) {
      if (
        diseaseCount[disease] > max
      ) {
        max = diseaseCount[disease];
        mostPredictedDisease = disease;
      }
    }

    // -----------------------------
    // Pie & Bar Chart Data
    // -----------------------------
    const diseaseStats =
      Object.keys(diseaseCount).map(
        (key) => ({
          name: key,
          count: diseaseCount[key],
        })
      );

    // -----------------------------
    // Monthly Chart Data
    // -----------------------------
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyMap = {};
        diseases.forEach((item) => {
      const date = new Date(item.createdAt);
      const month = monthNames[date.getMonth()];

      monthlyMap[month] =
        (monthlyMap[month] || 0) + 1;
    });

    const monthlyStats = Object.keys(monthlyMap).map(
      (month) => ({
        month,
        count: monthlyMap[month],
      })
    );

    return res.status(200).json({
      success: true,

      totalPredictions,

      lastPrediction,

      mostPredictedDisease,

      diseaseStats,

      monthlyStats,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Export Controllers
// ======================================
module.exports = {
  createDisease,
  getDiseases,
  deleteDisease,
  getDashboardStats,
};
