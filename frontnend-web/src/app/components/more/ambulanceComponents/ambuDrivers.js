"use client";
import { motion } from "framer-motion";

export default function DeriversSection({ healthProfile }) {
  const drivers = healthProfile?.drivers || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring" }}
      className="max-w-7xl mx-auto px-6 md:px-12 mt-12 mb-8 shadow-xl py-10 rounded-3xl"
    >
      {/* Title */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">
          Expert Derivers
        </h2>
        <div className="w-20 h-1 bg-blue-600 mx-10 mt-2 rounded"></div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {drivers.map((inst, idx) => (
          <motion.div
            key={inst._id || idx}
            whileHover={{ scale: 1.03 }}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-all"
          >
            {/* Avatar (emoji for now, can replace with image later) */}
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-4xl text-white mb-4">
              👨‍✈️
            </div>

            {/* Name */}
            <h3 className="text-xl font-bold">Name: {inst.name}</h3>

            {/* Designation */}
            <p className="text-gray-700 font-semibold">
              Experience: {inst.experience}+ Years
            </p>

            {/* Speciality */}
            <p className="text-gray-600 italic">
              Contact No: {inst.contactNumbers}
            </p>

            {/* Description */}
            <p className="text-gray-600 mt-2">
              License No: {inst.licenseNumber}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
