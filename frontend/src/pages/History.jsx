import { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://hospital-disease-prediction-system.onrender.com/api/disease/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory(res.data.diseases);
    } catch (error) {
      console.log(error);
      alert("Unable to load history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const deletePrediction = async (id) => {
    if (!window.confirm("Delete this prediction?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        "https://hospital-disease-prediction-system.onrender.com/api/disease/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory(history.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
      alert("Delete failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
          Prediction History
        </h1>

        {loading ? (
          <h2 className="text-center text-xl">
            Loading...
          </h2>
        ) : history.length === 0 ? (
          <h2 className="text-center text-xl text-gray-500">
            No Predictions Found
          </h2>
        ) : (
          history.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg p-6 mb-6"
            >
              <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold text-green-700">
                  {item.diseaseName}
                </h2>

                <button
                  onClick={() => deletePrediction(item._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>

              </div>

              <p className="text-gray-500 mt-2">
                {new Date(item.createdAt).toLocaleString()}
              </p>

              <hr className="my-4" />

              <h3 className="font-bold text-lg">
                Symptoms
              </h3>

              <ul className="list-disc ml-6 mb-4">
                {item.symptoms.map((symptom, index) => (
                  <li key={index}>{symptom}</li>
                ))}
              </ul>

              <h3 className="font-bold text-lg">
                Description
              </h3>

              <p className="mb-4">
                {item.description}
              </p>

              <h3 className="font-bold text-lg">
                Medicines
              </h3>

              <ul className="list-disc ml-6 mb-4">
                {item.medicines.map((medicine, index) => (
                  <li key={index}>{medicine}</li>
                ))}
              </ul>

              <h3 className="font-bold text-lg">
                Precautions
              </h3>

              <ul className="list-disc ml-6 mb-4">
                {item.precautions.map((precaution, index) => (
                  <li key={index}>{precaution}</li>
                ))}
              </ul>

              <h3 className="font-bold text-lg">
                Recommended Diet
              </h3>

              <ul className="list-disc ml-6">
                {item.diet.map((food, index) => (
                  <li key={index}>{food}</li>
                ))}
              </ul>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default History;