"use client";
import { specialists } from "@/app/data/constants";
import { motion } from "framer-motion";
import { FaRegCreditCard } from "react-icons/fa";

export default function NurseSpecialistsCard({ NurseData }) {
  

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
        <span className="text-3xl text-blue-700">
          <FaRegCreditCard />
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">
          Specialists
        </h2>
      </div>
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First row: 3 cards */}

        <motion.div
          whileHover={{ scale: 1.03, boxShadow: "0 0 0 2px blue" }}
          className="bg-[#F7F9FB] rounded-2xl p-5 min-h-[200px] border-l-4 border-blue-500 hover:border-blue-600 transition-all"
        >
          <h3 className="text-lg font-bold text-blue-600 mb-2">
            Certifications
          </h3>
          <ul className="space-y-2 list-disc">
            {NurseData?.certifications.map((item, idx) => (
              <li key={idx} className="text-gray-700 ml-4">
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03, boxShadow: "0 0 0 2px blue" }}
          className="bg-[#F7F9FB] rounded-2xl px-8 py-5 min-h-[200px] border-l-4 border-blue-500 hover:border-blue-600 transition-all "
        >
          <h3 className="text-lg font-bold text-blue-600 mb-2">
            ID
          </h3>
          <ul className="space-y-2 list-disc">
            <li>Aadhar (Varified)</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
} 