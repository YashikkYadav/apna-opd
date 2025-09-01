"use client";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaStar,
  FaUsers,
  FaHome,
  FaMapPin,
  FaMoneyBillWave,
  FaTools,
  FaStethoscope,
  FaHandsHelping,
  FaMedkit,
} from "react-icons/fa";



const WhyChooseUs = () => {
  const featuresData = [
    {
      icon: <FaCheckCircle className="text-blue-600 text-4xl" />,
      title: "100% Verified Doctors",
      description:
        "All doctors are thoroughly verified and registered with medical councils for your safety",
    },
    {
      icon: <FaStethoscope className="text-blue-600 text-4xl" />,
      title: "Expert Specialists",
      description:
        "Access to India's leading doctors and specialists across all medical fields",
    },
    {
      icon: <FaMoneyBillWave className="text-blue-600 text-4xl" />,
      title: "Transparent Pricing",
      description:
        "Clear consultation fees with no hidden costs and instant booking confirmation",
    },
    {
      icon: <FaMedkit className="text-blue-600 text-4xl" />,
      title: "500+ Top Doctors",
      description:
        "Extensive network of premium doctors from India's best hospitals and clinics",
    },
    {
      icon: <FaStar className="text-blue-600 text-4xl" />,
      title: "Highly Rated",
      description:
        "Doctors with excellent ratings and thousands of successful consultations",
    },
    {
      icon: <FaHandsHelping className="text-blue-600 text-4xl" />,
      title: "Easy Booking",
      description:
        "Book appointments instantly online or via phone with flexible scheduling",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white rounded-3xl shadow-lg p-6 md:px-8 mx-auto mb-8 md:py-12"
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-3xl md:text-4xl font-extrabold text-left text-blue-700 mb-12"
      >
        Why Choose <span className="text-blue-500">Apna OPD Physiotherapist?</span>
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
