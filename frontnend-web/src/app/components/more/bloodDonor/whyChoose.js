"use client";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaClock,
  FaMapPin
} from "react-icons/fa";
import { GiHypodermicTest } from "react-icons/gi";
import { FaDroplet } from "react-icons/fa6";
import { MdWorkspacePremium } from "react-icons/md";

const WhyChooseUs = () => {
  const featuresData = [
    {
      icon: <FaCheckCircle className="text-blue-600 text-4xl" />,
      title: "Safe Donation Process",
      description:
        "Every donation is carried out under strict medical supervision with sterile equipment.",
    },
    {
      icon: <MdWorkspacePremium className="text-blue-600 text-4xl" />,
      title: "Donor Recognition",
      description:
        "Regular donors receive certificates, badges, and appreciation for their life-saving contributions.",
    },
    {
      icon: <GiHypodermicTest className="text-blue-600 text-4xl" />,
      title: "Free Health Checkup",
      description:
        "Each donor undergoes a basic health screening including hemoglobin levels, blood pressure, and more.",
    },
    {
      icon: <FaDroplet className="text-blue-600 text-4xl" />,
      title: "Support Rare Needs",
      description:
        "Join the donor registry to help patients in need of rare blood groups during critical emergencies.",
    },
    {
      icon: <FaMapPin className="text-blue-600 text-4xl" />,
      title: "Nationwide Donor Network",
      description:
        "Be part of a growing community of blood donors available across cities for urgent requirements.",
    },
    {
      icon: <FaClock className="text-blue-600 text-4xl" />,
      title: "Quick & Hassle-Free",
      description:
        "The donation process takes only 15–20 minutes, making it simple to save lives in your free time.",
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
        Why Choose <span className="text-blue-500">Apna OPD Blood Donors?</span>
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
