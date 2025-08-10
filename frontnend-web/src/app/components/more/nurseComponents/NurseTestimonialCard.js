"use client";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

export default function NurseTestimonialsCard({ NurseData }) {
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
        <span className="text-3xl text-yellow-400"><FaStar /></span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">Patient Reviews & Testimonials</h2>
      </div>
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {NurseData?.testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03, boxShadow: "0 0 0 2px blue" }}
            className="bg-[#F7F9FB] rounded-2xl p-6 min-h-[200px] border-l-4 border-blue-500 hover:border-blue-700 transition-all flex flex-col"
          >
            <div className="flex items-center gap-1 mb-2">
              {[...Array(t.stars)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
              {t.rating < 5 && <FaStar className="text-gray-300" />}
            </div>
            <div className="font-bold text-lg mb-1">{t.title}</div>
            <div className="text-gray-700 text-base mb-4">"{t.text}"</div>
            <div className="mt-auto font-bold text-black">
              - {t.author}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 