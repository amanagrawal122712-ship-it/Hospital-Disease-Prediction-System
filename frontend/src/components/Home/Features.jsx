import { motion } from "framer-motion";
import {
  FaRobot,
  FaUserMd,
  FaHeartbeat,
  FaHistory,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRobot size={45} />,
    title: "AI Prediction",
    desc: "Predict diseases instantly using Machine Learning."
  },
  {
    icon: <FaUserMd size={45} />,
    title: "Expert Doctors",
    desc: "Consult doctors after getting prediction."
  },
  {
    icon: <FaHeartbeat size={45} />,
    title: "Health Reports",
    desc: "Store your disease history securely."
  },
  {
    icon: <FaHistory size={45} />,
    title: "Prediction History",
    desc: "Access all previous predictions anytime."
  }
];

function Features() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center">
          Why Choose MedPredict AI?
        </h2>

        <p className="text-center text-gray-500 mt-4">
          Smart Healthcare powered by Artificial Intelligence
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {features.map((item, index) => (

            <motion.div

              key={index}

              whileHover={{
                scale: 1.05,
                y: -10,
              }}

              className="bg-blue-50 rounded-3xl p-8 shadow-lg text-center"

            >

              <div className="text-blue-700 flex justify-center mb-6">

                {item.icon}

              </div>

              <h3 className="text-2xl font-bold mb-4">

                {item.title}

              </h3>

              <p className="text-gray-600">

                {item.desc}

              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;