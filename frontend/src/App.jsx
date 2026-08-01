import NearbyHospitals from "./pages/NearbyHospitals";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Predict from "./pages/Predict";
import History from "./pages/History";
import ChatBot from "./pages/ChatBot";
import MyAppointments from "./pages/MyAppointments";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/predict" element={<Predict />} />
      <Route path="/history" element={<History />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/nearby-hospitals" element={<NearbyHospitals />} />
      <Route path="/appointments" element={<MyAppointments />} />
      <Route path="/chat" element={<ChatBot />} />
    </Routes>
  );
}

export default App;