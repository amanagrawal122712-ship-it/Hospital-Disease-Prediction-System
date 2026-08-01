const chatRoutes = require("./routes/chatRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const diseaseRoutes=require("./routes/diseaseRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const express=require("express");
const cors=require("cors");

const app=express();

app.use(cors());
app.use(express.json());

const authRoutes=require("./routes/authRoutes");

app.use("/api/auth",authRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/disease",diseaseRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/chat", chatRoutes);
app.get("/",(req,res)=>{

res.send("Hospital Backend Running");

});

module.exports=app;