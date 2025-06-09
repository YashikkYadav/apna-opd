'use client';
import React from "react";
import { FaUserFriends, FaUserMd, FaHospitalAlt, FaCity, FaStethoscope, FaVials, FaCalendarCheck, FaSmile } from "react-icons/fa";
import { motion } from "framer-motion";

const stats = [
  {
    icon: <FaUserFriends className="text-blue-500 text-4xl mx-auto" />,
    value: "85,000+",
    label: "Monthly Visitors",
  },
  {
    icon: <FaUserMd className="text-blue-500 text-4xl mx-auto" />,
    value: "500+",
    label: "Verified Doctors",
  },
  {
    icon: <FaHospitalAlt className="text-blue-500 text-4xl mx-auto" />,
    value: "100+",
    label: "Partner Hospitals",
  },
  {
    icon: <FaCity className="text-blue-500 text-4xl mx-auto" />,
    value: "35+",
    label: "Cities Covered",
  },
  {
    icon: <FaStethoscope className="text-blue-500 text-4xl mx-auto" />,
    value: "40+",
    label: "Medical Specialties",
  },
  {
    icon: <FaVials className="text-blue-500 text-4xl mx-auto" />,
    value: "20+",
    label: "Diagnostic Labs",
  },
  {
    icon: <FaCalendarCheck className="text-blue-500 text-4xl mx-auto" />,
    value: "2,50,000+",
    label: "Successful Appointments",
  },
  {
    icon: <FaSmile className="text-blue-500 text-4xl mx-auto" />,
    value: "98.6%",
    label: "Patient Satisfaction Rate",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
};

const ImpactNumbers = () => {
  return (
    <section className="w-full bg-[#f8f9fa] py-12 px-2 md:px-0">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
          Our Impact in Numbers
        </h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ scale: 1.07, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
              className="bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center py-10 px-4 min-h-[180px] transition-transform duration-200 cursor-pointer"
            >
              <div className="mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
              <div className="text-gray-500 text-base text-center">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactNumbers; 