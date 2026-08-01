const Doctor = require("../models/Doctor");

// ======================================
// Add New Doctor
// ======================================
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      specialization,
      hospital,
      experience,
      fees,
      rating,
      phone,
      email,
      address,
      city,
      availability,
      image,
      about,
    } = req.body;

    if (
      !name ||
      !specialization ||
      !hospital ||
      !experience ||
      !fees ||
      !phone ||
      !email ||
      !address ||
      !city
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const existingDoctor = await Doctor.findOne({
      email,
    });

    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor already exists.",
      });
    }

    const doctor = await Doctor.create({
      name,
      specialization,
      hospital,
      experience,
      fees,
      rating,
      phone,
      email,
      address,
      city,
      availability,
      image,
      about,
    });

    return res.status(201).json({
      success: true,
      message: "Doctor added successfully.",
      doctor,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================
// Get All Doctors
// ======================================
const getDoctors = async (req, res) => {
  try {

    const doctors = await Doctor.find().sort({
      rating: -1,
    });

    return res.status(200).json({
      success: true,
      total: doctors.length,
      doctors,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ======================================
// Get Doctor By ID
// ======================================
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    return res.status(200).json({
      success: true,
      doctor,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================
// Update Doctor
// ======================================
const updateDoctor = async (req, res) => {
  try {

    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Doctor updated successfully.",
      doctor: updatedDoctor,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================
// Delete Doctor
// ======================================
const deleteDoctor = async (req, res) => {
  try {

    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    await Doctor.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Doctor deleted successfully.",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ======================================
// Get Recommended Doctors
// ======================================
const getRecommendedDoctors = async (req, res) => {
  try {
    const { disease } = req.params;

    const specialistMap = {
      "Diabetes": "Endocrinologist",
      "Heart attack": "Cardiologist",
      "Hypertension": "Cardiologist",
      "Migraine": "Neurologist",
      "Paralysis (brain hemorrhage)": "Neurologist",
      "Bronchial Asthma": "Pulmonologist",
      "Pneumonia": "Pulmonologist",
      "Tuberculosis": "Pulmonologist",
      "Common Cold": "General Physician",
      "Malaria": "General Physician",
      "Typhoid": "General Physician",
      "Dengue": "General Physician",
      "Chicken pox": "General Physician",
      "Jaundice": "Gastroenterologist",
      "GERD": "Gastroenterologist",
      "Peptic ulcer disease": "Gastroenterologist",
      "Chronic cholestasis": "Gastroenterologist",
      "Hepatitis A": "Gastroenterologist",
      "Hepatitis B": "Gastroenterologist",
      "Hepatitis C": "Gastroenterologist",
      "Hepatitis D": "Gastroenterologist",
      "Hepatitis E": "Gastroenterologist",
      "Alcoholic hepatitis": "Gastroenterologist",
      "Fungal infection": "Dermatologist",
      "Allergy": "Dermatologist",
      "Drug Reaction": "Dermatologist",
      "Hypothyroidism": "Endocrinologist",
      "Hyperthyroidism": "Endocrinologist",
      "Hypoglycemia": "Endocrinologist",
      "Osteoarthritis": "Orthopedic",
      "Arthritis": "Orthopedic",
      "Cervical spondylosis": "Orthopedic",
      "AIDS": "Infectious Disease Specialist",
    };

    const specialization =
      specialistMap[disease] || "General Physician";

    const doctors = await Doctor.find({
      specialization: {
        $regex: new RegExp(
          `^${specialization}$`,
          "i"
        ),
      },
      isAvailable: true,
    }).sort({
      rating: -1,
      experience: -1,
    });

    return res.status(200).json({
      success: true,
      disease,
      specialization,
      total: doctors.length,
      doctors,
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
  addDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getRecommendedDoctors,
};