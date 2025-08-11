"use client";
import { motion } from "framer-motion";
import { FaBolt } from "react-icons/fa";
import { useRouter } from "next/navigation";

const actions = [
  {
    emoji: "📅",
    title: "Book Appointment",
    desc: "Schedule your visit with our specialists",
    button: "Book Now",
    link: "/find-doctor",
  },
  {
    emoji: "🚑",
    title: "Emergency",
    desc: "24/7 Emergency services available",
    button: "Call Emergency",
    link: "/more/emergency",
  },
  {
    emoji: "💬",
    title: "Online Consultation",
    desc: "Consult with doctors from home",
    button: "Start Consultation",
    link: "/find-doctor",
  },
  {
    emoji: "📝",
    title: "Health Packages",
    desc: "Comprehensive health checkup packages",
    button: "View Packages",
    link: "/more/laboratory",
  },
];

export default function HospitalQuickActionsCard() {
  const router = useRouter();
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
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">Quick Actions</h2>
      </div>
      {/* Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions?.map((action, idx) => (
          <motion.div
            key={action?.title}
            whileHover={{ scale: 1.04, boxShadow: `0 0 0 3px blue` }}
            className={`flex flex-col items-center justify-between bg-blue-600 rounded-2xl p-8 min-h-[220px] text-white shadow-md transition-all`}
          >
            <div className="flex flex-col items-center gap-2 w-full">
              <span className="text-4xl mb-2">{action?.emoji}</span>
              <h3 className="text-xl font-extrabold mb-1 text-white text-center">{action?.title}</h3>
              <p className="text-base font-medium text-white/90 text-center mb-6">{action?.desc}</p>
            </div>
            <button onClick={() => {router.push(action?.link)}}
              className={`mt-auto rounded-full px-8 py-3 text-lg font-bold hover:border-white hover:text-white shadow bg-white text-blue-700 transition w-full max-w-[200px]`}
            >
              {action?.button}
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 