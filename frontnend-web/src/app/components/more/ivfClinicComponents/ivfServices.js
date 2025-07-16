'use client';
import { motion } from 'framer-motion';
import {
  FaMicroscope,
  FaGift,
  FaSnowflake,
  FaHeartbeat,
} from 'react-icons/fa';
import { GiTestTubes, GiSyringe } from 'react-icons/gi';

const services = [
  {
    icon: <GiTestTubes size={36} />,
    title: 'IVF (In Vitro Fertilization)',
    desc: 'Advanced IVF treatments with the latest technology and highest success rates',
  },
  {
    icon: <GiSyringe size={36} />,
    title: 'IUI (Intrauterine Insemination)',
    desc: 'Less invasive fertility treatment option with excellent outcomes',
  },
  {
    icon: <FaMicroscope size={36} />,
    title: 'ICSI',
    desc: 'Specialized technique for male factor infertility with high success rates',
  },
  {
    icon: <FaGift size={36} />,
    title: 'Donor Programs',
    desc: 'Comprehensive egg and sperm donation programs with rigorous screening',
  },
  {
    icon: <FaSnowflake size={36} />,
    title: 'Egg/Sperm Freezing',
    desc: 'Preserve your fertility for the future with advanced cryopreservation',
  },
  {
    icon: <FaHeartbeat size={36} />,
    title: 'Embryo Transfer',
    desc: 'Precision embryo transfer procedures for optimal pregnancy outcomes',
  },
];

const FertilityServices = ({ clinicName = '{{clinic_name}}' }) => {
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
          Fertility Services at <span className="text-blue-500">{clinicName}</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.04, boxShadow: '0 0 0 4px rgba(59,130,246,0.4)' }}
            className="bg-[#F7F9FB] rounded-2xl p-6 flex flex-col items-center text-center hover:border-2 hover:border-blue-500 transition-all"
          >
            <div className="text-blue-600 mb-3">{service.icon}</div>
            <h3 className="text-lg font-bold text-blue-700 mb-1">{service.title}</h3>
            <p className="text-base text-gray-600">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FertilityServices;
