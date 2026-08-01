import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
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

        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-cyan-100 flex justify-center items-center">

      <div className="bg-white shadow-xl rounded-3xl p-10 w-[500px]">

        <div className="flex flex-col items-center">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            className="w-32 h-32 rounded-full"
          />

          <h1 className="text-3xl font-bold mt-5">
            {user.name}
          </h1>

          <p className="text-gray-500">
            {user.role.toUpperCase()}
          </p>

        </div>

        <div className="mt-10 space-y-5">

          <div className="bg-gray-100 p-4 rounded-xl">
            <strong>Email</strong>
            <p>{user.email}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            <strong>Member Since</strong>
            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            <strong>Role</strong>
            <p>{user.role}</p>
          </div>

        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="w-full bg-red-600 text-white py-3 rounded-xl mt-8 hover:bg-red-700"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Profile;