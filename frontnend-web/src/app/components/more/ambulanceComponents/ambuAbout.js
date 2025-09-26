"use client";

import { motion } from "framer-motion";
import { User, HeartPulse, GraduationCap, Languages } from "lucide-react";

const OverviewSection = ({
  about = "",
  education = "",
  certifications = "",
  interests = "",
  languages = [],
  data,
  healthProfile,
}) => {
  console.log("healthProfile:", healthProfile);
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring" }}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-12 mx-auto mt-12 mb-8"
    >
      {/* Title */}
      <div className="mb-8 flex items-center gap-3">
        <User className="w-8 h-8 text-blue-600" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">
          Overview
        </h2>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1">
        {/* About Card */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-[#F7F9FB] rounded-2xl p-6 border-l-4 border-blue-400 transition-all shadow-md"
        >
          <h3 className="text-xl font-bold text-blue-600 mb-3 flex items-center gap-2">
            <HeartPulse className="w-6 h-6" /> About
          </h3>
          <p className="text-gray-700 text-base leading-relaxed">
            {healthProfile?.about}
          </p>
        </motion.div>

        {/* Education & Certifications */}
        {/* <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-[#F7F9FB] rounded-2xl p-6 border-l-4 border-blue-400 transition-all shadow-md"
                >
                    <h3 className="text-xl font-bold text-blue-600 mb-3 flex items-center gap-2">
                        <GraduationCap className="w-6 h-6" /> Education & Expertise
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 text-base">
                        <li><strong>Education:</strong> {healthProfile?.education?.map(i=>i.degree)}</li>
                        <li><strong>Certifications:</strong> {healthProfile?.certifications?.join(', ')}</li>
                        <li><strong>Special Interests:</strong> {healthProfile?.specialInterests?.join(', ')}</li>
                    </ul>
                </motion.div> */}

        {/* Languages */}
        {/* <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-[#F7F9FB] rounded-2xl p-6 border-l-4 border-blue-400 transition-all shadow-md"
                >
                    <h3 className="text-xl font-bold text-blue-600 mb-3 flex items-center gap-2">
                        <Languages className="w-6 h-6" /> Languages
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 text-base">
                        {healthProfile?.languages?.map((lang, idx) => (
                            <li key={idx}>{lang}</li>
                        ))}
                    </ul>
                </motion.div> */}
      </div>
    </motion.section>
  );
};

export default OverviewSection;
