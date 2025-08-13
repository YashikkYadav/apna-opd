'use client';

import { motion } from 'framer-motion';
import { User, FileBadge, Award, Languages } from 'lucide-react';

const DoctorOverviewCar = ({ doctorData }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: 'spring' }}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
    >
      {/* Title */}
      <div className='flex'>
        <User className="w-8 h-8 text-blue-600" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">
          About  {doctorData?.doctorId?.name}
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Profile + Languages */}
        <div className="flex flex-col gap-4 flex-1">
          {/* Profile */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[#F7F9FB] rounded-2xl p-6 border-l-4 border-blue-400 shadow-md transition-all"
          >
            <p className="text-gray-700 text-base leading-relaxed">
              {doctorData?.about}
            </p>
          </motion.div>

          {/* Languages */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[#F7F9FB] rounded-2xl p-6 border-l-4 border-blue-400 shadow-md transition-all"
          >
            <h3 className="text-xl font-bold text-blue-600 mb-3 flex items-center gap-2">
              <Languages className="w-6 h-6" /> Languages Spoken
            </h3>
            <div className="flex flex-wrap gap-3">
              {doctorData?.languages?.map((lang, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 px-4 py-1 rounded-full text-gray-800 text-sm"
                >
                  {lang}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Professional Details + Memberships */}
        <div className="flex flex-col gap-4 flex-1">
          {/* Professional Details */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[#F7F9FB] rounded-2xl p-6 border-l-4 border-blue-400 shadow-md transition-all"
          >
            <h3 className="text-xl font-bold text-blue-600 mb-3 flex items-center gap-2">
              <FileBadge className="w-6 h-6" /> Professional Details
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>
                Appointment Fee :{doctorData?.appointmentFee}
              </li>
              <li>
                happyClients : {doctorData?.happyClients}
              </li>
            </ul>
          </motion.div>

          {/* Memberships & Awards */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[#F7F9FB] rounded-2xl p-6 border-l-4 border-blue-400 shadow-md transition-all"
          >
            <h3 className="text-xl font-bold text-blue-600 mb-3 flex items-center gap-2">
              <Award className="w-6 h-6" /> Memberships & Awards
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {doctorData?.membershipAwards?.map((award, idx) => (
                <li key={idx}>{award}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>


    </motion.section>
  );
};

export default DoctorOverviewCar;
