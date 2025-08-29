"use client";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaClock,
  FaUsers,
  FaStar,
  FaMapPin,
  FaStethoscope,
} from "react-icons/fa";

const WhyChooseUs = () => {
  const featuresData = [
    {
      icon: <FaCheckCircle className="text-blue-600 text-4xl" />,
      title: "100% Verified Blood Banks",
      description:
        "All Blood banks are thoroughly verified and accredited by medical authorities",
    },
    {
      icon: <FaClock className="text-blue-600 text-4xl" />,
      title: "Advanced Technology",
      description:
        "State-of-the-art medical equipment with cutting-edge facilities",
    },
    {
      icon: <FaUsers className="text-blue-600 text-4xl" />,
      title: "Transparent Healthcare",
      description:
        "Clear treatment plans with transparent pricing and easy booking system",
    },
    {
      icon: <FaStethoscope className="text-blue-600 text-4xl" />,
      title: "Expert Medical Specialists",
      description:
        "Access to India's leading doctors and medical specialists across all domains",
    },
    {
      icon: <FaMapPin className="text-blue-600 text-4xl" />,
      title: "500+ Top Hospitals",
      description:
        "Extensive network of premium healthcare facilities across major cities",
    },
    {
      icon: <FaStar className="text-blue-600 text-4xl" />,
      title: "Proven Excellence",
      description:
        "Hospitals with excellent patient outcomes and successful treatments",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white rounded-3xl shadow-lg p-6 md:px-8 mx-auto mb-8 mt-12 md:py-12"
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-3xl md:text-4xl font-extrabold text-left text-blue-700 mb-12"
      >
        Why Choose <span className="text-blue-500">Apna OPD Blood Banks?</span>
      </motion.h2>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
        {featuresData.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-xl hover:ring-2 hover:ring-blue-400 hover:ring-offset-2 transition-all cursor-pointer"
          >
            <div className="bg-blue-100 rounded-full p-5 mb-4 flex items-center justify-center">
              {feature.icon}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-blue-600 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default WhyChooseUs;
