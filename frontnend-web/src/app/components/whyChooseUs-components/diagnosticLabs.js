'use client';
import React from "react";
import { FaFlask, FaMicroscope, FaVial, FaHeartbeat, FaDna, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const labs = [
  {
    logo: "/images/labs/b.png",
    name: "Dr. B Lal Clinical Lab",
    subtitle: "Comprehensive Testing",
    glow: "0 0 0 1px #3B82F6, 0 0 8px #3B82F6",
  },
  {
    logo: "/images/labs/red.png",
    name: "Redcliffe Labs",
    subtitle: "Advanced Diagnostics",
    glow: "0 0 0 1px #3B82F6, 0 0 8px #3B82F6",  },
  {
    logo: "/images/labs/thy.png",
    name: "Thyrocare",
    subtitle: "Specialized Testing",
    glow: "0 0 0 1px #3B82F6, 0 0 8px #3B82F6",  },
  {
    logo: "/images/labs/metro.png",
    name: "Metropolis Labs",
    subtitle: "Premium Diagnostics",
    glow: "0 0 0 1px #3B82F6, 0 0 8px #3B82F6",  },
  {
    logo: "/images/labs/srl.png",
    name: "SRL Diagnostics",
    subtitle: "Nationwide Network",
    glow: "0 0 0 1px #3B82F6, 0 0 8px #3B82F6",  },
  {
    logo: "/images/labs/path.png",
    name: "Pathkind Labs",
    subtitle: "Quality Assured",
    glow: "0 0 0 1px #3B82F6, 0 0 8px #3B82F6",  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
};

const DiagnosticLabs = () => {
  return (
    <section className="w-full bg-[#f8f9fa] py-20 px-1 md:px-0 min-h-[70vh]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-800">
          Trusted Diagnostic Labs
        </h2>
        <p className="text-center text-gray-400 mb-6 text-base max-w-xl mx-auto">
          Get accurate results from India's most reliable diagnostic partners
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {labs.map((lab, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.04, boxShadow: lab.glow }}
              className="bg-white rounded-xl shadow flex flex-col items-center justify-center py-6 px-2 min-h-[120px] transition-transform duration-200 cursor-pointer outline-none"
            >
              <div className="flex items-center justify-center w-14 h-14 mb-3 overflow-hidden bg-white/80 rounded-xl shadow">
                <img
                  src={lab.logo}
                  alt={lab.name + ' logo'}
                  className="object-contain w-12 h-12"
                  style={{ background: 'transparent' }}
                />
              </div>
              <div className="text-base md:text-lg font-bold text-gray-800 text-center mb-1">
                {lab.name}
              </div>
              <div className="text-gray-400 text-sm text-center">{lab.subtitle}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiagnosticLabs; 