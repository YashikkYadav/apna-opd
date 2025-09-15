"use client";
import { motion } from "framer-motion";

const allFacilities = [
  {
    emoji: "🏢",
    name: "Spacious Practice Halls",
    desc: "2 naturally ventilated halls with bamboo flooring",
  },
  {
    emoji: "🧘",
    name: "Meditation Room",
    desc: "Quiet space for contemplation and breath work",
  },
  {
    emoji: "💻",
    name: "Online Class Studio",
    desc: "Professional setup for high-quality virtual sessions",
  },
  {
    emoji: "🌿",
    name: "Healing Garden",
    desc: "Outdoor space for nature-based practices",
  },
  {
    emoji: "🎵",
    name: "Audio-Visual Systems",
    desc: "Modern equipment for guided sessions",
  },
  {
    emoji: "🏃‍♀️",
    name: "Changing Rooms",
    desc: "Clean, well-maintained facilities with lockers",
  },
];

export default function YogaFacilitiesCard({ profileData }) {
  
  const visibleFacilities = allFacilities.filter((f) =>
    profileData?.worldClassFacilities?.includes(f.name)
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring" }}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
    >
      {/* Title */}
      <div className="flex items-center flex-wrap gap-3 mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">World Class Facilities </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleFacilities?.map((facility) => (
          <motion.div
            key={facility?.name || idx}
            whileHover={{ scale: 1.04, boxShadow: "0 0 0 4px blue" }}
            className="bg-[#F7F9FB] rounded-2xl p-6 flex flex-col items-center text-center hover:border-2 hover:border-blue-500 transition-all"
          >
            <div className="text-4xl mb-3">{facility?.emoji}</div>
            <h3 className="text-lg font-bold mb-1 text-center">{facility?.name}</h3>
            <p className="text-base text-center text-gray-600">{facility?.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
 