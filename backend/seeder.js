require("dotenv").config();

const mongoose = require("mongoose");

const Doctor = require("./models/Doctor");

const doctors = require("./data/doctors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

  } catch (error) {

    console.log(error.message);

    process.exit(1);
  }
};

const importDoctors = async () => {
  try {

    await Doctor.deleteMany();

    await Doctor.insertMany(doctors);

    console.log("✅ Doctors Imported Successfully");

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit(1);

  }
};
connectDB().then(() => {
  importDoctors();
});