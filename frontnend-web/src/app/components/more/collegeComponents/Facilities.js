'use client';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { TiTick } from "react-icons/ti";
const facilities = [
  'Fully Equipped Labs',
  'Smart Classrooms',
  'Clinical Rotations',
  'Digital Library',
  'Modern Cafeteria',
  'Comfortable Hostels',
  'High-Speed Wi-Fi',
  'Transport Services',
  'Anti-Ragging Campus',
  '24/7 Security',
  'Sports Complex',
  'Medical Center',
];

const FacilityCard = ({ name }) => (
  <motion.div
    whileHover={{ scale: 1.04, boxShadow: '0 0 0 4px rgba(59,130,246,0.4)' }}
    className="bg-[#F7F9FB] rounded-2xl p-6 flex flex-col items-center text-center hover:border-2 hover:border-blue-500 transition-all"
  >
    <div className="text-3xl text-green-600 mb-3"><TiTick className={{style:"color:green"}}/></div>
    <h4 className="text-lg font-bold text-blue-700">{name}</h4>
  </motion.div>
);

const CampusFacilities = ({healthProfile,data}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: 'spring' }}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-16"
    >
      {/* Heading */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3">
          <FaStar className="text-blue-700 text-3xl" />
          Campus Facilities for Holistic Learning
        </h2>
        <p className="text-gray-600 text-lg mt-2 max-w-2xl">
          Explore our state-of-the-art campus amenities that support academic and personal growth.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {healthProfile?.facilities?.map((name, idx) => (
          <FacilityCard key={idx} name={name} />
        ))}
      </div>
    </motion.section>
  );
};

export default CampusFacilities;
