import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "https://hospital-disease-prediction-system.onrender.com/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.user);
    } catch (error) {
      console.log("Profile Error:", error);

      if (error.response) {
        console.log(error.response.data);
      }

      alert("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold text-blue-700">
          Loading Profile...
        </h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold text-red-600">
          Profile Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-cyan-100 to-white flex justify-center items-center px-5">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-10">

        <div className="flex flex-col items-center">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500"
          />

          <h1 className="text-3xl font-bold mt-5">
            {user.name}
          </h1>

          <p className="text-gray-500 text-lg mt-1">
            {user.role?.toUpperCase()}
          </p>

        </div>

        <div className="mt-10 space-y-5">

          <div className="bg-gray-100 rounded-xl p-4">
            <h3 className="font-bold text-blue-700">
              Email
            </h3>

            <p>{user.email}</p>
          </div>

          <div className="bg-gray-100 rounded-xl p-4">
            <h3 className="font-bold text-blue-700">
              Role
            </h3>

            <p>{user.role}</p>
          </div>

          <div className="bg-gray-100 rounded-xl p-4">
            <h3 className="font-bold text-blue-700">
              Joined On
            </h3>

            <p>
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl text-lg font-semibold"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Profile;