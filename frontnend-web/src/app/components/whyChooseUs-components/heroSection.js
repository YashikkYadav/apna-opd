'use client';
import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const heroVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60, delay: 0.1 } },
};

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center overflow-hidden" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{background: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-12">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-white mb-6 leading-tight drop-shadow-lg"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          India's Most Trusted Healthcare Discovery<br className="hidden md:block" /> Platform
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl text-center text-blue-100 mb-12 max-w-2xl mx-auto"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          Apna OPD connects you with verified doctors, leading hospitals,<br className="hidden md:block" /> and trusted labs – all in one place.
        </motion.p>
        <motion.div
          className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }} 
        >
          <button className="flex items-center gap-2 bg-[#22a6f3] hover:text-white hover:bg-[#1b8ed1] text-white font-bold text-lg rounded-full px-10 py-5 min-w-[260px] shadow-lg transition-all duration-200 hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.18)]">
            <FaRegCheckCircle className="text-2xl" />
            Book Appointment
          </button>
          <button className="flex items-center gap-2 border-2 border-white text-white font-bold text-lg rounded-full px-10 py-5 min-w-[260px] bg-transparent hover:bg-white hover:text-[#22a6f3] transition-all duration-200">
            <FaRegCheckCircle className="text-2xl" />
            Join as a Partner
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection; 