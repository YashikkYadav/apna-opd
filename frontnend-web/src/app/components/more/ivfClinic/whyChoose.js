"use client";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaRupeeSign,
  FaStar,
  FaMapPin,
  FaStethoscope,
} from "react-icons/fa";
import { GiMicroscope } from "react-icons/gi";

const WhyChooseUs = () => {
  const featuresData = [
    {
      icon: <FaCheckCircle className="text-blue-600 text-4xl" />,
      title: "100% Verified IVF Clinics",
      description:
        "All IVF clinics are thoroughly verified and accredited by medical authorities for your safety",
    },
    {
      icon: <FaStethoscope className="text-blue-600 text-4xl" />,
      title: "Expert Specialists",
      description:
        "Access to India's leading fertility experts and reproductive endocrinologists",
    },
    {
      icon: <FaRupeeSign className="text-blue-600 text-4xl" />,
      title: "Transparent Process",
      description:
        "Clear treatment plans with no hidden costs and upfront consultation booking",
    },
    {
      icon: <GiMicroscope className="text-blue-600 text-4xl" />,
      title: "Latest Technology",
      description:
        "State-of-the-art fertility labs with advanced reproductive technologies",
    },
    {
      icon: <FaMapPin className="text-blue-600 text-4xl" />,
      title: "200+ Top Clinics",
      description:
        "Extensive network of premium IVF centers across all major Indian cities",
    },
    {
      icon: <FaStar className="text-blue-600 text-4xl" />,
      title: "Proven Success",
      description:
        "Clinics with high success rates and thousands of successful pregnancies",
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
        Why Choose <span className="text-blue-500">Apna OPD IVF Clinic?</span>
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
