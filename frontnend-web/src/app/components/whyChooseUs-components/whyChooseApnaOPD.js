'use client';
import React from "react";
import { FaUserCheck, FaCalendarCheck, FaLayerGroup, FaStar, FaMapMarkedAlt, FaMoneyBillWave } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaUserCheck className="text-blue-400 text-2xl" />,
    title: "Verified Doctors Only",
    desc: "Every healthcare professional on our platform is thoroughly verified for credentials and expertise.",
  },
  {
    icon: <FaCalendarCheck className="text-purple-400 text-2xl" />,
    title: "Live Appointment Availability",
    desc: "Real-time scheduling with instant confirmation and automated reminders for your convenience.",
  },
  {
    icon: <FaLayerGroup className="text-pink-400 text-2xl" />,
    title: "All-in-One Healthcare Platform",
    desc: "Find doctors, hospitals, labs, and book appointments all from a single trusted platform.",
  },
  {
    icon: <FaStar className="text-yellow-400 text-2xl" />,
    title: "Patient Reviews",
    desc: "Make informed decisions with genuine patient reviews and ratings for every healthcare provider.",
  },
  {
    icon: <FaMapMarkedAlt className="text-green-400 text-2xl" />,
    title: "Location-Based Search",
    desc: "Find the nearest healthcare providers with detailed directions and contact information.",
  },
  {
    icon: <FaMoneyBillWave className="text-cyan-400 text-2xl" />,
    title: "No Hidden Charges",
    desc: "Transparent pricing with no booking fees or hidden costs. What you see is what you pay.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
};

const WhyChooseApnaOPD = () => {

  return (
    <section className="w-full min-h-[70vh] py-20 px-1 md:px-0 relative flex flex-col items-center justify-center overflow-hidden bg-white">
      <div className="max-w-5xl mx-auto w-full z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-800">
          Why Choose Apna OPD?
        </h2>
        <p className="text-center text-gray-400 mb-6 text-base max-w-xl mx-auto">
          Discover the benefits of using Apna OPD for your healthcare needs
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 0 2px #3B82F6, 0 0 8px #3B82F6' }}
              className="bg-white rounded-xl shadow flex flex-col items-center justify-center py-6 px-2 min-h-[120px] transition-transform duration-200 cursor-pointer outline-none"
            >
              <div className="flex items-center justify-center w-14 h-14 mb-3 bg-white/80 rounded-xl shadow">
                {React.cloneElement(feature.icon, { className: feature.icon.props.className + ' text-[1.4rem]' })}
              </div>
              <div className="text-base md:text-lg font-bold text-gray-800 text-center mb-1">
                {feature.title}
              </div>
              <div className="text-gray-400 text-sm text-center">{feature.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseApnaOPD; 