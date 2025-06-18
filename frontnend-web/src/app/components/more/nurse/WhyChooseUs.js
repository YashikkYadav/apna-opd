"use client";
import { motion } from "framer-motion";
import { FaCheckCircle, FaClock, FaDollarSign, FaUsers, FaStar, FaStethoscope } from "react-icons/fa";

const WhyChooseUs = ({ showFeatures = [] }) => {
  const featuresData = [
    {
      icon: <FaCheckCircle className="text-blue-600 text-4xl" />,
      title: "100% Verified",
      description: "All nurses are thoroughly background-checked and certified professionals",
    },
    {
      icon: <FaClock className="text-blue-600 text-4xl" />,
      title: "24x7 Support",
      description: "Round-the-clock customer support for all your healthcare needs",
    },
    {
      icon: <FaDollarSign className="text-blue-600 text-4xl" />,
      title: "Transparent Pricing",
      description: "No hidden fees. Affordable and upfront pricing for all services",
    },
    {
      icon: <FaUsers className="text-blue-600 text-4xl" />,
      title: "500+ Nurses",
      description: "Large network of qualified nurses across multiple specializations",
    },
    {
      icon: <FaStar className="text-blue-600 text-4xl" />,
      title: "4.7+ Rating",
      description: "Highly rated by thousands of satisfied patients and families",
    },
    {
      icon: <FaStethoscope className="text-blue-600 text-4xl" />,
      title: "All Specialties",
      description: "ICU, Elderly, Pediatric, Post-op, and specialized care available",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 text-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl font-extrabold text-gray-900 mb-12"
      >
        Why Choose Apna OPD Nurses?
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {featuresData.filter((_, index) => showFeatures[index]).map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer hover:ring-2 hover:ring-blue-500 hover:ring-offset-2"
          >
            <div className="bg-blue-100 rounded-full p-4 mb-4 flex items-center justify-center">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WhyChooseUs; 