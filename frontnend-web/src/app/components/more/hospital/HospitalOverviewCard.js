"use client";
import { motion } from "framer-motion";
import { FaHospitalAlt } from "react-icons/fa";

export default function HospitalOverviewCard({ profileData }) {
  const overviewData = [
    {
      title: "About " + (profileData?.name || "Hospital"),
      content: (
        <span>
          {profileData?.about || profileData?.introduction || "No description available."}
        </span>
      ),
    },
    {
      title: "Key Statistics",
      content: (
        <ul className="list-disc pl-5">
          {(profileData?.keyStats || []).map((stat, i) => (
            <li key={i}>{stat}</li>
          ))}
          <li>{profileData?.departments?.length || 0}+ Departments</li>
        </ul>
      ),
    },
    {
      title: "Accreditations",
      content: (
        <ul className="list-disc pl-5">
          {(profileData?.accreditations || []).map((acc, i) => (
            <li key={i}>{acc}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Awards & Recognition",
      content: (
        <ul className="list-disc pl-5">
          {(profileData?.awards || []).map((award, i) => (
            <li key={i}>{award}</li>
          ))}
        </ul>
      ),
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
        <FaHospitalAlt className="text-3xl text-blue-700" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">
          Hospital Overview
        </h2>
      </div>

      {/* Grid: About, Key Statistics, Accreditations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {overviewData.slice(0, 3).map((item, idx) => (
          <motion.div
            key={item?.title}
            whileHover={{ scale: 1.03, boxShadow: "0 0 0 2px rgb(49, 93, 227)" }}
            className="bg-[#F7F9FB] rounded-2xl p-6 min-h-[220px] border-b-4 border-blue-700/30 hover:border-blue-700 transition-all"
          >
            <h3 className="text-xl font-bold text-blue-700 mb-2">
              {item?.title}
            </h3>
            <div className="text-gray-700 text-base font-medium">
              {item?.content}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Awards & Recognition */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <motion.div
          whileHover={{ scale: 1.03, boxShadow: "0 0 0 2px rgb(49, 93, 227)" }}
          className="bg-[#F7F9FB] rounded-2xl p-6 min-h-[180px] border-b-4 border-blue-700/30 hover:border-blue-700 transition-all md:col-span-1"
        >
          <h3 className="text-xl font-bold text-blue-700 mb-2">
            {overviewData[3]?.title}
          </h3>
          <div className="text-gray-700 text-base font-medium">
            {overviewData[3]?.content}
          </div>
        </motion.div>
        <div className="hidden md:block md:col-span-2" />
      </div>
    </motion.div>
  );
}