import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#ca8a04",
  "#9333ea",
  "#0891b2",
  "#f97316",
  "#14b8a6",
];

const Dashboard = () => {

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalPredictions: 0,
    mostPredictedDisease: "No Data",
    lastPrediction: null,
    diseaseStats: [],
    monthlyStats: [],
  });

  const fetchDashboard = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8000/api/disease/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchDashboard();

  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
        Hospital Analytics Dashboard
      </h1>
            {/* ================= Dashboard Cards ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-600">

          <h2 className="text-gray-500 text-sm font-semibold uppercase">
            Total Predictions
          </h2>

          <p className="text-4xl font-bold text-blue-700 mt-4">
            {stats.totalPredictions}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-600">

          <h2 className="text-gray-500 text-sm font-semibold uppercase">
            Most Predicted
          </h2>

          <p className="text-2xl font-bold text-green-700 mt-4">
            {stats.mostPredictedDisease}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-600">

          <h2 className="text-gray-500 text-sm font-semibold uppercase">
            Latest Prediction
          </h2>

          <p className="text-2xl font-bold text-red-700 mt-4">
            {stats.lastPrediction
              ? stats.lastPrediction.diseaseName
              : "No Data"}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">

          <h2 className="text-gray-500 text-sm font-semibold uppercase">
            Last Prediction Date
          </h2>

          <p className="text-lg font-bold text-yellow-700 mt-4">

            {stats.lastPrediction
              ? new Date(
                  stats.lastPrediction.createdAt
                ).toLocaleDateString()
              : "--"}

          </p>

        </div>

      </div>
            {/* ================= Pie Chart ================= */}

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">

        <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">
          Disease Distribution
        </h2>

        {stats.diseaseStats.length === 0 ? (

          <div className="text-center text-gray-500 py-10 text-lg">
            No prediction data available.
          </div>

        ) : (

          <div className="w-full h-[450px]">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={stats.diseaseStats}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
                  innerRadius={70}
                  label
                >

                  {stats.diseaseStats.map((entry, index) => (

                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />

                  ))}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        )}

      </div>
            {/* ================= Bar Chart ================= */}

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">

        <h2 className="text-2xl font-bold text-center text-green-700 mb-8">
          Disease Prediction Count
        </h2>

        {stats.diseaseStats.length === 0 ? (

          <div className="text-center text-gray-500 py-10 text-lg">
            No prediction data available.
          </div>

        ) : (

          <div className="w-full h-[450px]">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart
                data={stats.diseaseStats}
                margin={{
                  top: 20,
                  right: 30,
                  left: 10,
                  bottom: 60,
                }}
              >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="name"
                  angle={-20}
                  textAnchor="end"
                  interval={0}
                />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="count"
                  fill="#2563eb"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        )}

      </div>
            {/* ================= Monthly Prediction Chart ================= */}

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">

        <h2 className="text-2xl font-bold text-center text-purple-700 mb-8">
          Monthly Predictions
        </h2>

        {stats.monthlyStats.length === 0 ? (

          <div className="text-center text-gray-500 py-10 text-lg">
            No monthly data available.
          </div>

        ) : (

          <div className="w-full h-[450px]">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart
                data={stats.monthlyStats}
                margin={{
                  top: 20,
                  right: 30,
                  left: 10,
                  bottom: 20,
                }}
              >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#9333ea"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        )}

      </div>
      {/* ================= Quick Actions ================= */}

     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

     <Link to="/predict">
     <div className="bg-blue-600 text-white rounded-2xl shadow-lg p-8 hover:bg-blue-700 transition cursor-pointer">

      <h2 className="text-3xl font-bold">
        🩺 Predict Disease
      </h2>

      <p className="mt-3 text-lg">
        Predict disease using AI model.
      </p>

     </div>
     </Link>

     <Link to="/nearby-hospitals">
    <div className="bg-green-600 text-white rounded-2xl shadow-lg p-8 hover:bg-green-700 transition cursor-pointer">

      <h2 className="text-3xl font-bold">
        🏥 Nearby Hospitals
      </h2>

      <p className="mt-3 text-lg">
        Find hospitals near your current location.
      </p>

     </div>
     </Link>

    </div>
      {/* ================= Footer ================= */}

      <div className="text-center text-gray-500 mt-10 mb-4">
        <p>
          Hospital Disease Prediction System Dashboard
        </p>

        <p className="text-sm mt-2">
          Built using React, Node.js, Express, MongoDB,
          Flask ML & Recharts
        </p>
      </div>

    </div>
  );
};

export default Dashboard;
