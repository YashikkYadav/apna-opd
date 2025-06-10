"use client";
import { motion } from "framer-motion";
import { FaBolt } from "react-icons/fa";

const actions = [
  {
    emoji: "📅",
    title: "Book Appointment",
    desc: "Schedule your visit with our specialists",
    button: "Book Now",
    gradient: "from-[#6A8DFF] to-[#6E4FF6]",
    buttonClass: "bg-white text-[#5B6EF6] hover:bg-[#F7F9FB]",
  },
  {
    emoji: "🚑",
    title: "Emergency",
    desc: "24/7 Emergency services available",
    button: "Call Emergency",
    gradient: "from-[#FF7BAC] to-[#FF6B6B]",
    buttonClass: "bg-white text-[#FF6B6B] hover:bg-[#FFF0F3]",
  },
  {
    emoji: "💬",
    title: "Online Consultation",
    desc: "Consult with doctors from home",
    button: "Start Consultation",
    gradient: "from-[#3DDCFF] to-[#38F9D7]",
    buttonClass: "bg-white text-[#3DDCFF] hover:bg-[#F0FCFF]",
  },
  {
    emoji: "📝",
    title: "Health Packages",
    desc: "Comprehensive health checkup packages",
    button: "View Packages",
    gradient: "from-[#3DFCB1] to-[#38F9D7]",
    buttonClass: "bg-white text-[#1BC47D] hover:bg-[#F0FFF7]",
  },
];

export default function HospitalQuickActionsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring" }}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-10 max-w-7xl mx-auto mt-12 mb-8"
    >
      {/* Title */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl text-yellow-400"><FaBolt /></span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#5B6EF6]">Quick Actions</h2>
      </div>
      {/* Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action, idx) => (
          <motion.div
            key={action.title}
            whileHover={{ scale: 1.04, boxShadow: `0 0 0 4px #5B6EF6` }}
            className={`flex flex-col items-center justify-between bg-gradient-to-br ${action.gradient} rounded-2xl p-8 min-h-[220px] text-white shadow-md transition-all`}
          >
            <div className="flex flex-col items-center gap-2 w-full">
              <span className="text-4xl mb-2">{action.emoji}</span>
              <h3 className="text-xl font-extrabold mb-1 text-white text-center">{action.title}</h3>
              <p className="text-base font-medium text-white/90 text-center mb-6">{action.desc}</p>
            </div>
            <button
              className={`mt-auto rounded-full px-8 py-3 text-lg font-bold shadow ${action.buttonClass} transition w-full max-w-[200px]`}
            >
              {action.button}
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 