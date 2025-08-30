"use client";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaRupeeSign,
  FaStar,
  FaMapPin,
  FaStethoscope,
} from "react-icons/fa";
import { BsClipboard2DataFill } from "react-icons/bs";
import { GrUserExpert } from "react-icons/gr";

const WhyChooseUs = () => {
  const featuresData = [
    {
      icon: <FaCheckCircle className="text-blue-600 text-4xl" />,
      title: "100% Accredited Labs",
      description:
        "All labs are NABL certified and equipped with state-of-the-art diagnostic technology",
    },
    {
      icon: <GrUserExpert className="text-blue-600 text-4xl" />,
      title: "Expert Pathologists",
      description:
        "Access to India's leading pathologists and lab technicians for accurate test results",
    },
    {
      icon: <FaRupeeSign className="text-blue-600 text-4xl" />,
      title: "Transparent Pricing",
      description:
        "Clear pricing with no hidden costs and comprehensive test packages at competitive rates",
    },
    {
      icon: <BsClipboard2DataFill className="text-blue-600 text-4xl" />,
      title: "Fast Results",
      description:
        "Quick turnaround time with digital reports and home sample collection",
    },
    {
      icon: <FaMapPin className="text-blue-600 text-4xl" />,
      title: "200+ Top Labs",
      description:
        "Extensive network of premium diagnostic labs across all major Indian cities",
    },
    {
      icon: <FaStar className="text-blue-600 text-4xl" />,
      title: "Quality Assured",
      description:
        "Labs with high accuracy ratings and thousands of satisfied patients",
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
        Why Choose <span className="text-blue-500">Apna OPD Laboratory?</span>
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
