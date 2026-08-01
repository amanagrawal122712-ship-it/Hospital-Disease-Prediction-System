const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");

// ================= Create Appointment =================

const createAppointment = async (req, res) => {
  try {

    const patient = await Patient.findOne({
      user: req.user._id,
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient profile not found.",
      });
    }

    const appointment = await Appointment.create({
      patient: patient._id,
      doctor: req.body.doctor,
      appointmentDate: req.body.appointmentDate,
      symptoms: req.body.symptoms,
    });

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully.",
      appointment,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= Get My Appointments =================

const getAppointments = async (req, res) => {
  try {

    const patient = await Patient.findOne({
      user: req.user._id,
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient profile not found.",
      });
    }

    const appointments = await Appointment.find({
      patient: patient._id,
    })
      .populate("doctor")
      .sort({ appointmentDate: -1 });

    return res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ================= Export =================

module.exports = {
  createAppointment,
  getAppointments,
};