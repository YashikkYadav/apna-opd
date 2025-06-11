"use client";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    stars: 5,
    title: "Excellent Care",
    text: "Outstanding treatment and care received during my cardiac surgery. The doctors and nursing staff were exceptional.",
    author: "Rajesh Kumar",
    context: "Cardiology Patient",
  },
  {
    stars: 5,
    title: "Professional Staff",
    text: "Very impressed with the cleanliness, technology, and professional approach of all staff members. Highly recommended!",
    author: "Priya Sharma",
    context: "Orthopedics Patient",
  },
  {
    stars: 4,
    title: "Good Facilities",
    text: "Modern facilities and experienced doctors. The only issue was the waiting time, but overall satisfied with the treatment.",
    author: "Amit Gupta",
    context: "General Medicine",
  },
  {
    stars: 5,
    title: "Child-Friendly",
    text: "Excellent pediatric care for my daughter. Dr. Vikram was very patient and caring. The pediatric ward is well-designed.",
    author: "Neha Agarwal",
    context: "Pediatrics Parent",
  },
];

export default function HospitalTestimonialsCard() {
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
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03, boxShadow: "0 0 0 2px blue" }}
            className="bg-[#F7F9FB] rounded-2xl p-6 min-h-[200px] border-l-4 border-blue-500 hover:border-blue-700 transition-all flex flex-col"
          >
            <div className="flex items-center gap-1 mb-2">
              {[...Array(t.stars)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
              {t.stars < 5 && <FaStar className="text-gray-300" />}
            </div>
            <div className="font-bold text-lg mb-1">{t.title}</div>
            <div className="text-gray-700 text-base mb-4">"{t.text}"</div>
            <div className="mt-auto font-bold text-black">
              - {t.author} <span className="font-normal text-gray-600">({t.context})</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 