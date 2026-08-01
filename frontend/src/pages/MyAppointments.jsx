import React, { useEffect, useState } from "react";
import axios from "axios";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        "https://hospital-disease-prediction-system.onrender.com/api/disease/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(res.data.appointments || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
        📅 My Appointments
      </h1>

      {loading ? (
        <div className="text-center text-2xl font-semibold">
          Loading...
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          No Appointments Found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                👨‍⚕️ {appointment.doctor?.name}
              </h2>

              <p className="mb-2">
                <strong>🏥 Hospital:</strong>{" "}
                {appointment.doctor?.hospital}
              </p>

              <p className="mb-2">
                <strong>📅 Date:</strong>{" "}
                {new Date(
                  appointment.appointmentDate
                ).toLocaleDateString()}
              </p>

              <p className="mb-2">
                <strong>🩺 Symptoms:</strong>{" "}
                {appointment.symptoms}
              </p>

              <p className="mb-2">
                <strong>📌 Status:</strong>{" "}
                <span
                  className={`font-bold ${
                    appointment.status === "Confirmed"
                      ? "text-green-600"
                      : appointment.status === "Cancelled"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {appointment.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;