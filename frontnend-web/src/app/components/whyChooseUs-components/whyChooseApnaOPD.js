'use client';
import React from "react";
import { FaUserCheck, FaCalendarCheck, FaLayerGroup, FaStar, FaMapMarkedAlt, FaMoneyBillWave } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaUserCheck className="text-blue-400 text-2xl" />,
    title: "Verified Doctors Only",
    desc: "Every healthcare professional on our platform is thoroughly verified for credentials and expertise.",
    glow: "0 0 0 2px #a78bfa, 0 0 12px #a78bfa",
  },
  {
    icon: <FaCalendarCheck className="text-purple-400 text-2xl" />,
    title: "Live Appointment Availability",
    desc: "Real-time scheduling with instant confirmation and automated reminders for your convenience.",
    glow: "0 0 0 2px #a78bfa, 0 0 12px #a78bfa",
  },
  {
    icon: <FaLayerGroup className="text-pink-400 text-2xl" />,
    title: "All-in-One Healthcare Platform",
    desc: "Find doctors, hospitals, labs, and book appointments all from a single trusted platform.",
    glow: "0 0 0 2px #a78bfa, 0 0 12px #a78bfa",
  },
  {
    icon: <FaStar className="text-yellow-400 text-2xl" />,
    title: "Patient Reviews",
    desc: "Make informed decisions with genuine patient reviews and ratings for every healthcare provider.",
    glow: "0 0 0 2px #a78bfa, 0 0 12px #a78bfa",
  },
  {
    icon: <FaMapMarkedAlt className="text-green-400 text-2xl" />,
    title: "Location-Based Search",
    desc: "Find the nearest healthcare providers with detailed directions and contact information.",
    glow: "0 0 0 2px #a78bfa, 0 0 12px #a78bfa",
  },
  {
    icon: <FaMoneyBillWave className="text-cyan-400 text-2xl" />,
    title: "No Hidden Charges",
    desc: "Transparent pricing with no booking fees or hidden costs. What you see is what you pay.",
    glow: "0 0 0 2px #a78bfa, 0 0 12px #a78bfa",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
};

const WhyChooseApnaOPD = () => {
  return (
    <section className="w-full py-12 px-2 md:px-0 relative overflow-hidden min-h-[61vh]" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{background: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-5 text-white drop-shadow-lg">
          Why Choose Apna OPD?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.04, boxShadow: feature.glow }}
              className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl shadow-lg flex flex-col items-start justify-start py-7 px-5 min-h-[126px] transition-transform duration-200 cursor-pointer outline-none hover:bg-white/30"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/40 mb-3.5 shadow">
                {React.cloneElement(feature.icon, { className: feature.icon.props.className + ' text-[1.4rem]' })}
              </div>
              <div className="font-bold text-white mb-1 drop-shadow text-[1.25rem]">
                {feature.title}
              </div>
              <div className="text-white/90 drop-shadow-sm text-[1.08rem]">
                {feature.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseApnaOPD; 