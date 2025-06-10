"use client";
import { motion } from "framer-motion";
import { FaHospitalAlt } from "react-icons/fa";

const departments = [
  {
    emoji: "❤️",
    name: "Cardiology",
    desc: "Advanced heart care with latest cardiac procedures",
  },
  {
    emoji: "🦴",
    name: "Orthopedics",
    desc: "Bone and joint care with robotic surgery",
  },
  {
    emoji: "🧠",
    name: "Neurology",
    desc: "Brain and spine treatment by experts",
  },
  {
    emoji: "👶",
    name: "Pediatrics",
    desc: "Comprehensive child healthcare",
  },
  {
    emoji: "👩‍⚕️",
    name: "Gynecology",
    desc: "Women's health and maternity care",
  },
  {
    emoji: "🧪",
    name: "Oncology",
    desc: "Cancer treatment and care",
  },
];

export default function HospitalDepartmentsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring" }}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
    >
      {/* Title */}
      <div className="flex items-center gap-3 mb-8">
        <FaHospitalAlt className="text-3xl text-blue-700" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">Departments & Specialties</h2>
      </div>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {departments.map((dept, idx) => (
          <motion.div
            key={dept.name}
            whileHover={{ scale: 1.04, boxShadow: "0 0 0 4px rgb(49, 93, 227)" }}
            className="flex flex-col items-center justify-center bg-gradient-to-br from-[#6A8DFF] to-[#9B6EF6] rounded-2xl p-8 min-h-[200px] text-white shadow-md transition-all"
          >
            <div className="text-5xl mb-4">{dept.emoji}</div>
            <h3 className="text-xl font-bold mb-2 text-white text-center">{dept.name}</h3>
            <p className="text-base font-medium text-white/90 text-center">{dept.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 