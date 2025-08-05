'use client';
import { motion } from 'framer-motion';
import { FaPhoneAlt } from 'react-icons/fa';
import { BsDropletHalf } from 'react-icons/bs';
import { MdDownload } from 'react-icons/md';
import CallNow from './CallNow';
import { useState } from 'react';
const UrgentBanner = ({ healthProfile}) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: 'spring' }}
      className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16 px-6 rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
    >
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center justify-center gap-3">
          🚨 Need Blood Urgently?
        </h2>
        <p className="text-lg text-blue-100 font-medium">
          Don’t wait - contact <strong>{healthProfile?.name}</strong> now or explore more options on Apna OPD.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <button 
          onClick={() => setModalOpen(true)}
          className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow-md flex items-center gap-2 hover:bg-blue-50 transition">
            <BsDropletHalf className="text-xl" />
            Check Availability
          </button>
            <button 
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md flex items-center gap-2 transition">
            <FaPhoneAlt className="text-xl" />
            Call Now
          </button>
          <CallNow isOpen={modalOpen} onClose={() => setModalOpen(false)} />
          

          <button className="bg-white border-2 border-blue-600 text-blue-700 font-semibold px-6 py-3 rounded-full shadow-md flex items-center gap-2 hover:bg-blue-50 transition">
            <MdDownload className="text-xl" />
            Download Apna OPD App
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default UrgentBanner;
