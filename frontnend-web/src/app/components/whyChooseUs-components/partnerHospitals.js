'use client';
import React from "react";
import { FaHospitalAlt, FaClinicMedical, FaHeartbeat, FaAmbulance, FaUserMd, FaStethoscope } from "react-icons/fa";
import { motion } from "framer-motion";

const hospitals = [
  {
    logo: "/images/hospitals/narayana.png",
    name: "Narayana Multispeciality Hospital",
    city: "Jaipur",
    glow: "0 0 0 1px #3B82F6, 0 0 8px #3B82F6", 
  },
  {
    logo: "/images/hospitals/fortis.png",
    name: "Fortis Hospital",
    city: "Jaipur",
    glow: "0 0 0 1px #3B82F6, 0 0 8px #3B82F6", 
  },
  {
    logo: "/images/hospitals/manipal.png",
    name: "Manipal Hospitals",
    city: "Jaipur",
    glow: "0 0 0 1px #3B82F6, 0 0 8px #3B82F6", 
  },
  {
    logo: "/images/hospitals/mahatma_gandhi.png",
    name: "Mahatma Gandhi Hospital",
    city: "Jaipur",
    glow: "0 0 0 1px #3B82F6, 0 0 8px #3B82F6", 
  },
  {
    logo: "/images/hospitals/amar.png",
    name: "Amar Jain Hospital",
    city: "Jaipur",
    glow: "0 0 0 1px #3B82F6, 0 0 8px #3B82F6", 
  },
  {
    logo: "/images/hospitals/rukmani_birla.png",
    name: "Rukmani Birla Hospital",
    city: "Jaipur",
    glow: "0 0 0 1px #3B82F6, 0 0 8px #3B82F6", 
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
};

const PartnerHospitals = () => {
  return (
    <section className="w-full bg-white py-20 px-2 md:px-0 min-h-[70vh]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-800">
          Partner Hospitals You Can Trust
        </h2>
        <p className="text-center text-gray-400 mb-6 text-base max-w-xl mx-auto">
        We're proud to be associated with some of the most reputed names in healthcare.
These hospitals are not just names – they're pillars of trust and care in their respective cities.
        </p>
        <p className="font-semibold text-center text-black-100 mb-6 text-base max-w-xl mx-auto">
        Our Premium Hospital Partners include:- </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {hospitals.map((hospital, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.04, boxShadow: hospital.glow }}
              className="bg-[#f8fafd] rounded-xl shadow flex flex-col items-center justify-center py-6 px-2 min-h-[120px] transition-transform duration-200 cursor-pointer outline-none"
            >
              <div className="flex items-center justify-center w-14 h-14 mb-3 overflow-hidden bg-white/80 rounded-xl shadow">
                <img
                  src={hospital.logo}
                  alt={hospital.name + ' logo'}
                  className="object-contain w-12 h-12"
                  style={{ background: 'transparent' }}
                />
              </div>
              <div className="text-base md:text-lg font-bold text-gray-800 text-center mb-1">
                {hospital.name}
              </div>
              <div className="text-gray-400 text-sm text-center">{hospital.city}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerHospitals; 