"use client";
import { motion } from "framer-motion";
import { FaRegCreditCard } from "react-icons/fa";

export default function HospitalInsuranceCard({ profileData }) {
  const insuranceData = [
    {
      title: "Insurance Accepted",
      items: profileData.insurance ?? [],
    },
    {
      title: "Payment Options",
      items: profileData.payments ?? [],
    },
    {
      title: "Health Packages",
      items: profileData.healthPackages ?? [],
    },
    {
      title: "Special Services",
      items: profileData.specialServices ?? [],
    },
  ];

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
          Insurance & Payment
        </h2>
      </div>

      {/* Grid: Insurance, Payments, Health Packages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insuranceData.slice(0, 3).map((section) => (
          <motion.div
            key={section.title}
            whileHover={{ scale: 1.03, boxShadow: "0 0 0 2px blue" }}
            className="bg-[#F7F9FB] rounded-2xl p-6 min-h-[220px] border-l-4 border-blue-500 hover:border-blue-600 transition-all"
          >
            <h3 className="text-lg font-bold text-blue-600 mb-2">
              {section.title}
            </h3>
            <ul className="list-disc pl-5 text-gray-800 text-base font-medium">
              {section.items.length ? (
                section.items.map((item, idx) => <li key={idx}>{item}</li>)
              ) : (
                <li>No data available</li>
              )}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Grid: Special Services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <motion.div
          whileHover={{ scale: 1.03, boxShadow: "0 0 0 2px blue" }}
          className="bg-[#F7F9FB] rounded-2xl p-6 min-h-[180px] border-l-4 border-blue-500 hover:border-blue-700 transition-all md:col-span-1"
        >
          <h3 className="text-lg font-bold text-[#5B6EF6] mb-2">
            {insuranceData[3].title}
          </h3>
          <ul className="list-disc pl-5 text-gray-800 text-base font-medium">
            {insuranceData[3].items.length ? (
              insuranceData[3].items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))
            ) : (
              <li>No data available</li>
            )}
          </ul>
        </motion.div>
        <div className="hidden md:block md:col-span-2" />
      </div>
    </motion.div>
  );
}