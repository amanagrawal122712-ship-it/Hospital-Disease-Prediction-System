import { motion } from "framer-motion";
import {
  FaUserMd,
  FaHospitalUser,
  FaHeartbeat,
  FaBrain,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaBrain />,
    number: "42+",
    title: "Diseases"
  },
  {
    icon: <FaHeartbeat />,
    number: "132",
    title: "Symptoms"
  },
  {
    icon: <FaHospitalUser />,
    number: "5000+",
    title: "Predictions"
  },
  {
    icon: <FaUserMd />,
    number: "24/7",
    title: "Support"
  }
];

function Stats() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-700 to-cyan-600 text-white">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center">
          Trusted Healthcare AI
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mt-20">

          {stats.map((item, index) => (

            <motion.div
              key={index}
              whileHover={{
                scale:1.05
              }}
              className="text-center"
            >

              <div className="text-6xl flex justify-center mb-6">

                {item.icon}

              </div>

              <h1 className="text-5xl font-bold">

                {item.number}

              </h1>

              <p className="text-xl mt-4">

                {item.title}

              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Stats;