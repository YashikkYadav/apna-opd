'use client';
import { motion } from 'framer-motion';
import {
  FaMicroscope,
  FaGift,
  FaSnowflake,
  FaHeartbeat,
} from 'react-icons/fa';
import { GiTestTubes, GiSyringe } from 'react-icons/gi';



const FertilityServices = ({ data,healthProfile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: 'spring' }}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
    >
      {/* Title */}
      <div className="mb-8 text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">
          Fertility Services at <span className="text-blue-500">{data?.name}</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {healthProfile?.services?.map((service, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.04, boxShadow: '0 0 0 4px rgba(59,130,246,0.4)' }}
            className="bg-[#F7F9FB] rounded-2xl p-6 flex flex-col items-center text-center hover:border-2 hover:border-blue-500 transition-all"
          >
            <div className="text-blue-600 mb-3">{service.icon}</div>
            <h3 className="text-lg font-bold text-blue-700 mb-1">{service}</h3>
            <p className="text-base text-gray-600">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FertilityServices;
