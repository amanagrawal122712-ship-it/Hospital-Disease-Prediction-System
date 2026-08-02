import React, { useEffect, useState } from "react";
import axios from "axios";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        "https://hospital-disease-prediction-system.onrender.com/api/appointment",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(res.data.appointments || []);
    } catch (error) {
      console.log("Appointment Error:", error);

      if (error.response) {
        console.log(error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold text-blue-700">
          Loading Appointments...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
        📅 My Appointments
      </h1>

      {appointments.length === 0 ? (
        <div className="text-center text-xl text-gray-500">
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
                👨‍⚕️ {appointment.doctor?.name || "Doctor"}
              </h2>

              <p className="mb-2">
                <strong>🏥 Hospital :</strong>{" "}
                {appointment.doctor?.hospital || "N/A"}
              </p>

              <p className="mb-2">
                <strong>📅 Date :</strong>{" "}
                {appointment.appointmentDate
                  ? new Date(
                      appointment.appointmentDate
                    ).toLocaleDateString()
                  : "N/A"}
              </p>

              <p className="mb-2">
                <strong>🩺 Symptoms :</strong>{" "}
                {appointment.symptoms || "N/A"}
              </p>

              <p className="mb-2">
                <strong>Status :</strong>{" "}

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
}

export default MyAppointments;