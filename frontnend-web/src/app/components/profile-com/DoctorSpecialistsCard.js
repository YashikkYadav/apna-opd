'use client';

import { motion } from 'framer-motion';

export default function DoctorSpecialistsCard({doctorData}) {
  const conditions = doctorData?.conditionsTreated;

  const procedures = doctorData?.proceduresOffered;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: 'spring' }}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
    >
      {/* Title */}
      <div className="mb-8 flex items-center gap-3">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">
          Specializations & Services
        </h2>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Conditions Treated */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-[#F7F9FB] rounded-2xl p-6 border-l-4 border-blue-400 shadow-md transition-all"
        >
          <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center gap-2">
            Conditions Treated
          </h3>
          <div className="flex flex-wrap gap-3">
            {conditions.map((item, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-gray-100 rounded-full text-gray-800 text-sm font-medium shadow-sm hover:bg-blue-50"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Procedures Offered */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-[#F7F9FB] rounded-2xl p-6 border-l-4 border-blue-400 shadow-md transition-all"
        >
          <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center gap-2">
             Procedures Offered
          </h3>
          <div className="flex flex-wrap gap-3">
            {procedures.map((item, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-gray-100 rounded-full text-gray-800 text-sm font-medium shadow-sm hover:bg-blue-50"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
