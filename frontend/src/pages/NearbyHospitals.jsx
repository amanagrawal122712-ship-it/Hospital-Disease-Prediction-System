import { useEffect, useState } from "react";
import axios from "axios";

function NearbyHospitals() {
  const [loading, setLoading] = useState(true);

  const [hospitals, setHospitals] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");

      setLoading(false);

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchHospitals(
          position.coords.latitude,
          position.coords.longitude
        );
      },

      (error) => {
        console.log(error);

        alert("Please allow location access.");

        setLoading(false);
      }
    );
  };
    const fetchHospitals = async (lat, lng) => {
    try {

      const response = await axios.get(
        "https://hospital-disease-prediction-system.onrender.com/api/disease/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHospitals(response.data.hospitals || []);

      setLoading(false);

    } catch (error) {

      console.log(error);

      alert("Unable to fetch nearby hospitals.");

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-blue-700">
          🏥 Nearby Hospitals
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Hospitals near your current location
        </p>

        {loading && (

          <div className="flex justify-center mt-10">

            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>

          </div>

        )}
                {!loading && hospitals.length > 0 && (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

            {hospitals.map((hospital, index) => (

              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
              >

                <h2 className="text-2xl font-bold text-blue-700">
                  🏥 {hospital.displayName?.text || "Hospital"}
                </h2>

                <p className="text-gray-600 mt-3">
                  📍 {hospital.formattedAddress || "Address not available"}
                </p>

                <p className="mt-2">
                  ⭐ Rating : {hospital.rating || "N/A"}
                </p>

                <p className="mt-2">
                  📞 Phone : {hospital.nationalPhoneNumber || "Not Available"}
                </p>

                <a
                  href={hospital.googleMapsUri}
                  target="_blank"
                  rel="noreferrer"
                  className="block mt-5"
                >
                  <button
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
                  >
                    🗺️ Open in Google Maps
                  </button>
                </a>

              </div>

            ))}

          </div>

        )}

        {!loading && hospitals.length === 0 && (

          <div className="text-center mt-10">

            <h2 className="text-2xl font-bold text-red-600">
              No Nearby Hospitals Found
            </h2>

          </div>

        )}

      </div>

    </div>
  );
}

export default NearbyHospitals;