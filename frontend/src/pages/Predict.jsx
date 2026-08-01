import React, { useEffect, useState } from "react";
import axios from "axios";

const Predict = () => {

  // ================= Prediction =================

  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [recommendedDoctors, setRecommendedDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================= Appointment =================

  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentSymptoms, setAppointmentSymptoms] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchSymptoms();
  }, []);

  // ================= Fetch Symptoms =================

  const fetchSymptoms = async () => {
    try {

      const res = await axios.get(
      "https://hospital-disease-prediction-system.onrender.com/api/disease/symptoms"
      );

      setSymptoms(res.data.symptoms || []);

    } catch (error) {

      console.log(error);

    }
  };
  // ================= Handle Checkbox =================

const handleCheckbox = (symptom) => {

  if (selectedSymptoms.includes(symptom)) {

    setSelectedSymptoms(
      selectedSymptoms.filter((item) => item !== symptom)
    );

  } else {

    if (selectedSymptoms.length >= 5) {
      alert("You can select maximum 5 symptoms.");
      return;
    }

    setSelectedSymptoms([
      ...selectedSymptoms,
      symptom,
    ]);

  }

};

// ================= Predict Disease =================

const predictDisease = async () => {

  if (selectedSymptoms.length === 0) {
    alert("Please select at least one symptom.");
    return;
  }

  try {

    setLoading(true);

      const response = await axios.post(
      "https://hospital-disease-prediction-system.onrender.com/api/disease",
      {
        symptoms: selectedSymptoms,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setPrediction(response.data.disease);

    const diseaseName =
      response.data.disease.diseaseName;

     const doctorResponse = await axios.get(
     `https://hospital-disease-prediction-system.onrender.com/api/doctor/recommend/${encodeURIComponent(
      diseaseName
     )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setRecommendedDoctors(
      doctorResponse.data.doctors || []
    );

  } catch (error) {

    console.log(error);

    alert("Prediction failed.");

  } finally {

    setLoading(false);

  }
};
   // ================= Book Appointment =================

const bookAppointment = async () => {

  try {

    if (!appointmentDate) {
      alert("Please select appointment date.");
      return;
    }

    await axios.post(
      "https://hospital-disease-prediction-system.onrender.com/api/disease/history",
      {
        doctor: selectedDoctor._id,
        appointmentDate,
        symptoms: appointmentSymptoms,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Appointment booked successfully.");

    setShowAppointmentForm(false);
    setAppointmentDate("");
    setAppointmentSymptoms("");

  } catch (error) {

    console.log(error);
    alert("Booking failed.");

  }
};
return (
  <div className="min-h-screen bg-gray-100 py-10 px-5">

    <div className="max-w-7xl mx-auto">

      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 px-2">
        AI Disease Prediction System
      </h1>

      <p className="text-center text-gray-600 mt-2 mb-8 px-2 text-sm md:text-base">
        Select up to 5 symptoms to predict disease and get doctor recommendations.
      </p>
      
      
      {/* ================= Symptoms ================= */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-semibold mb-5">
          Select Symptoms
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">

          {symptoms.map((symptom) => (

            <label
              key={symptom}
              className="flex items-center gap-2 border rounded-lg p-3 hover:bg-blue-50 cursor-pointer"
            >

              <input
                type="checkbox"
                checked={selectedSymptoms.includes(symptom)}
                onChange={() => handleCheckbox(symptom)}
              />

              <span>
                {symptom.replace(/_/g, " ")}
              </span>

            </label>

          ))}

        </div>

        <div className="mt-8 text-center">

          <button
            onClick={predictDisease}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto px-10 py-3 rounded-lg text-lg font-semibold"
          >
            {loading ? "Predicting..." : "Predict Disease"}
          </button>

        </div>

      </div>

      {/* ================= Loader ================= */}

      {loading && (

        <div className="flex justify-center mt-10">

          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>

        </div>

      )}
            {/* ================= Prediction Result ================= */}

      {prediction && (

        <div className="mt-10 bg-white rounded-xl shadow-lg p-8">

          <h2 className="text-3xl font-bold text-green-700 mb-8">
            Prediction Result
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Left Side */}

            <div>

              <h3 className="text-2xl font-bold mb-4">
                🦠 {prediction.diseaseName}
              </h3>

              <p className="text-gray-700 leading-7">
                {prediction.description || "No description available."}
              </p>

              <div className="mt-8">

                <h4 className="text-xl font-bold mb-3">
                  Selected Symptoms
                </h4>

                <div className="flex flex-wrap gap-2">

                  {prediction.symptoms.map((item, index) => (

                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                    >
                      {item.replace(/_/g, " ")}
                    </span>

                  ))}

                </div>

              </div>

            </div>

            {/* Right Side */}

            <div>

              <div className="mb-8">

                <h4 className="text-xl font-bold text-red-600 mb-3">
                  💊 Medicines
                </h4>

                <ul className="list-disc ml-6 space-y-2">

                  {prediction.medicines.length > 0 ? (

                    prediction.medicines.map((medicine, index) => (

                      <li key={index}>
                        {medicine}
                      </li>

                    ))

                  ) : (

                    <li>No medicines available.</li>

                  )}

                </ul>

              </div>

              <div>

                <h4 className="text-xl font-bold text-yellow-600 mb-3">
                  ⚠️ Precautions
                </h4>

                <ul className="list-disc ml-6 space-y-2">

                  {prediction.precautions.length > 0 ? (

                    prediction.precautions.map((item, index) => (

                      <li key={index}>
                        {item}
                      </li>

                    ))

                  ) : (

                    <li>No precautions available.</li>

                  )}

                </ul>

              </div>

            </div>

          </div>

          <div className="mt-10">

            <h4 className="text-xl font-bold text-green-700 mb-3">
              🥗 Recommended Diet
            </h4>

            <ul className="list-disc ml-6 space-y-2">

              {prediction.diet.length > 0 ? (

                prediction.diet.map((item, index) => (

                  <li key={index}>
                    {item}
                  </li>

                ))

              ) : (

                <li>No diet recommendation available.</li>

              )}

            </ul>

          </div>

        </div>

      )}
            {/* ================= Recommended Doctors ================= */}

      {recommendedDoctors.length > 0 && (

        <div className="mt-10">

          <h2 className="text-3xl font-bold text-blue-700 mb-6">
            👨‍⚕️ Recommended Doctors
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {recommendedDoctors.map((doctor) => (

              <div
                key={doctor._id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
              >

                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-200"
                />

                <h3 className="text-xl font-bold text-center mt-4">
                  {doctor.name}
                </h3>

                <p className="text-center text-blue-600">
                  {doctor.specialization}
                </p>

                <hr className="my-4" />

                <div className="space-y-2">

                  <p><strong>🏥 Hospital:</strong> {doctor.hospital}</p>

                  <p><strong>⭐ Rating:</strong> {doctor.rating}</p>

                  <p><strong>💼 Experience:</strong> {doctor.experience} Years</p>

                  <p><strong>💰 Fees:</strong> ₹{doctor.fees}</p>

                  <p><strong>📞 Phone:</strong> {doctor.phone}</p>

                  <p><strong>📍 City:</strong> {doctor.city}</p>

                </div>

                <button
                  className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setAppointmentSymptoms(
                      prediction?.diseaseName || ""
                    );
                    setShowAppointmentForm(true);
                  }}
                >
                  📅 Book Appointment
                </button>

              </div>

            ))}

          </div>

        </div>

      )}

      {/* ================= Appointment Popup ================= */}

      {showAppointmentForm && (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-[95%] max-w-md">

            <h2 className="text-3xl font-bold text-blue-700 mb-6">
              Book Appointment
            </h2>

            <p className="mb-3">
              <strong>Doctor:</strong> {selectedDoctor?.name}
            </p>

            <p className="mb-5">
              <strong>Hospital:</strong> {selectedDoctor?.hospital}
            </p>

            <label className="font-semibold">
              Appointment Date
            </label>

            <input
              type="date"
              className="w-full border rounded-lg p-3 mt-2 mb-5"
              value={appointmentDate}
              onChange={(e) =>
                setAppointmentDate(e.target.value)
              }
            />

            <label className="font-semibold">
              Symptoms
            </label>

            <textarea
              rows="3"
              className="w-full border rounded-lg p-3 mt-2"
              value={appointmentSymptoms}
              onChange={(e) =>
                setAppointmentSymptoms(e.target.value)
              }
            />

            <div className="flex flex-col sm:flex-row gap-4 mt-8">

              <button
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg"
                onClick={() =>
                  setShowAppointmentForm(false)
                }
              >
                Cancel
              </button>

              <button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
                onClick={bookAppointment}
              >
                Confirm Appointment
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  </div> 

);

};

export default Predict;