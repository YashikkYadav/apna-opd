"use client";
import { motion } from "framer-motion";
import { FaHospitalAlt } from "react-icons/fa";

export default function DoctorOverviewCar({doctorData, specs}) {
  const overviewData = doctorData?.overviewData || [];
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
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">
          {(specs && typeof specs === 'string' && specs.length > 0)
            ? specs.charAt(0).toUpperCase() + specs.slice(1)
            : "Overview"}
        </h2>
      </div>
      {/* Grid */}
      <div className="flex flex-wrap gap-6">
      {overviewData.map((item, idx) => (
          <motion.div
            key={item.title}
            whileHover={{ scale: 1.03, boxShadow: "0 0 0 2px rgb(49, 93, 227)" }}
            className="bg-[#F7F9FB] rounded-2xl p-6 min-h-[220px] border-b-4 border-blue-700/30 hover:border-blue-700 transition-all"
          >
            <h3 className="text-xl font-bold text-blue-700 mb-2">
              {item.staticPrefix}{item.dynamicValue || item.title}
            </h3>
            <div className="text-gray-700 text-base font-medium">
            <ul className="list-disc pl-5">
              {item.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 