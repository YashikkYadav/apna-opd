"use client";
import { motion } from "framer-motion";
import { FaHospitalAlt } from "react-icons/fa";

const overviewData = [
  {
    title: "About Max Hospital",
    content: (
      <span>
        Max Super Speciality Hospital is a leading healthcare institution providing world-class medical care with state-of-the-art facilities and cutting-edge technology. Established in 1985, we have been serving the community for over 35 years.
      </span>
    ),
  },
  {
    title: "Key Statistics",
    content: (
      <ul className="list-disc pl-5">
        <li>500+ Bed Capacity</li>
        <li>50+ ICU Beds</li>
        <li>24/7 Emergency Services</li>
        <li>100+ Doctors</li>
        <li>15+ Departments</li>
      </ul>
    ),
  },
  {
    title: "Accreditations",
    content: (
      <ul className="list-disc pl-5">
        <li>NABH Accredited</li>
        <li>JCI International Standards</li>
        <li>ISO 9001:2015 Certified</li>
        <li>Green OT Certified</li>
        <li>NABL Certified Lab</li>
      </ul>
    ),
  },
  {
    title: "Awards & Recognition",
    content: (
      <ul className="list-disc pl-5">
        <li>Best Multi-Specialty Hospital 2024</li>
        <li>Excellence in Patient Care</li>
        <li>Top Cardiac Care Center</li>
        <li>Digital Health Innovation Award</li>
      </ul>
    ),
  },
];

export default function HospitalOverviewCard() {
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
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">Hospital Overview</h2>
      </div>
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About, Key Statistics, Accreditations */}
        {overviewData.slice(0, 3).map((item, idx) => (
          <motion.div
            key={item.title}
            whileHover={{ scale: 1.03, boxShadow: "0 0 0 2pxrgb(49, 93, 227)" }}
            className="bg-[#F7F9FB] rounded-2xl p-6 min-h-[220px] border-b-4 border-blue-700/30 hover:border-blue-700 transition-all"
          >
            <h3 className="text-xl font-bold text-blue-700 mb-2">{item.title}</h3>
            <div className="text-gray-700 text-base font-medium">{item.content}</div>
          </motion.div>
        ))}
      </div>
      {/* Awards & Recognition (full width on mobile, 1/3 on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <motion.div
          whileHover={{ scale: 1.03, boxShadow: "0 0 0 2px rgb(49, 93, 227)" }}
          className="bg-[#F7F9FB] rounded-2xl p-6 min-h-[180px] border-b-4 border-blue-700/30 hover:border-blue-700 transition-all md:col-span-1"
        >
          <h3 className="text-xl font-bold text-blue-700 mb-2">{overviewData[3].title}</h3>
          <div className="text-gray-700 text-base font-medium">{overviewData[3].content}</div>
        </motion.div>
        {/* Empty columns for grid alignment on desktop */}
        <div className="hidden md:block md:col-span-2" />
      </div>
    </motion.div>
  );
} 