import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";

function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center bg-gradient-to-r from-blue-50 via-cyan-100 to-white">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center px-8">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
            AI Powered Healthcare
          </span>

          <h1 className="text-6xl font-bold mt-8 leading-tight text-gray-900">
            Predict Diseases
            <br />
            Before They Become Serious
          </h1>

          <p className="mt-8 text-xl text-gray-600">
            Get instant AI-powered disease prediction with medicine,
            precautions and diet recommendations.
          </p>

          <div className="mt-10 flex gap-5">

            <Link
              to="/predict"
              className="bg-blue-700 hover:bg-blue-900 text-white px-8 py-4 rounded-xl"
            >
              Predict Now
            </Link>

            <Link
              to="/register"
              className="border-2 border-blue-700 text-blue-700 px-8 py-4 rounded-xl"
            >
              Register
            </Link>

          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >

          <div className="w-80 h-80 rounded-full bg-blue-600 flex items-center justify-center shadow-2xl">

            <FaHeartbeat
              size={140}
              className="text-white"
            />

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default Hero;