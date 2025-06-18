"use client";
import { motion } from "framer-motion";
import { FaHospitalAlt } from "react-icons/fa";

const allFacilities = [
  { emoji: "🚑", name: "24/7 Emergency", desc: "Round-the-clock emergency care" },
  { emoji: "🧪", name: "Diagnostic Lab", desc: "NABL certified laboratory" },
  { emoji: "💊", name: "Pharmacy", desc: "24-hour pharmacy services" },
  { emoji: "💀", name: "Radiology", desc: "MRI, CT Scan, X-Ray" },
  { emoji: "💓", name: "Cath Lab", desc: "Cardiac catheterization" },
  { emoji: "🖥️", name: "ICU/CCU", desc: "Intensive care units" },
  { emoji: "🔄", name: "Dialysis", desc: "Hemodialysis services" },
  { emoji: "🅿️", name: "Parking", desc: "500+ parking spaces" },
  { emoji: "☕", name: "Cafeteria", desc: "24-hour food court" },
  { emoji: "📶", name: "Free WiFi", desc: "High-speed internet" },
  { emoji: "🏧", name: "ATM", desc: "ATM services" },
  { emoji: "🔒", name: "Security", desc: "24/7 security services" },
  { emoji: "🧼", name: "Housekeeping", desc: "Daily room cleaning" },
  { emoji: "❄️", name: "Air Conditioning", desc: "Central air system" },
  { emoji: "🧺", name: "Laundry", desc: "Clothes cleaning services" },
  { emoji: "🦽", name: "Wheelchair Access", desc: "Accessible for all" },
  { emoji: "🛒", name: "Medical Store", desc: "On-campus store" },
  { emoji: "🩸", name: "Blood Bank", desc: "Emergency blood supply" },
  { emoji: "🕒", name: "Waiting Area", desc: "Spacious waiting zone" },
  { emoji: "🛏️", name: "NICU", desc: "Neonatal Intensive Care Unit" },
  { emoji: "🔪", name: "Operation Theater", desc: "Advanced surgical facilities" }
];

export default function HospitalFacilitiesCard({ profileData }) {
  const visibleFacilities = allFacilities.filter(f => profileData?.facilities?.includes(f.name));

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
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">Facilities & Services</h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {visibleFacilities.map((facility) => (
          <motion.div
            key={facility.name}
            whileHover={{ scale: 1.04, boxShadow: "0 0 0 4px blue" }}
            className="flex flex-col items-center justify-center bg-[#F7F9FB] rounded-2xl p-6 min-h-[120px] text-gray-800 shadow-md transition-all"
          >
            <div className="text-4xl mb-3">{facility.emoji}</div>
            <h3 className="text-lg font-bold mb-1 text-center">{facility.name}</h3>
            <p className="text-base text-center text-gray-600">{facility.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
 