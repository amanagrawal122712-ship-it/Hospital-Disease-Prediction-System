import { motion } from "framer-motion";

const reviews = [
  {
    name: "Rahul Sharma",
    role: "Patient",
    review:
      "The AI prediction was quick and helpful. The recommendations made it easier to understand my condition."
  },
  {
    name: "Priya Verma",
    role: "Patient",
    review:
      "Beautiful interface and accurate predictions. I really liked the prediction history feature."
  },
  {
    name: "Dr. Amit Singh",
    role: "Doctor",
    review:
      "A great platform for preliminary disease analysis. Very useful for patients before consultation."
  }
];

function Testimonials() {
  return (
    <section className="py-24 bg-gray-100">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center">
          What People Say
        </h2>

        <p className="text-center text-gray-500 mt-4">
          Trusted by patients and healthcare professionals
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-20">

          {reviews.map((item, index) => (

            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >

              <p className="text-gray-600 italic">
                "{item.review}"
              </p>

              <h3 className="mt-8 text-2xl font-bold">
                {item.name}
              </h3>

              <p className="text-blue-700">
                {item.role}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;