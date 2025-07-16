'use client';
import React from 'react';
import { motion } from 'framer-motion';

const IvfFooter = ({ clinicName = '{{clinic_name}}' }) => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: 'spring' }}
      className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16 text-center rounded-3xl shadow-inner p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
        Your Parenthood Journey Begins with{' '}
        <span className="underline decoration-white">{clinicName}</span>
      </h2>

      <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
        Take the first step toward building your family. Our expert IVF team is here to guide you every step of the way.
      </p>

      <div className="flex justify-center flex-wrap gap-4 mb-10">
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="/book-consultation"
          className="bg-white text-blue-700 hover:bg-blue-600 hover:text-white font-bold py-3 px-6 rounded-full shadow-md transition-all"
        >
          Book Fertility Consultation
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="/download-brochure"
          className="border-2 border-white text-white hover:bg-white hover:text-blue-800 font-bold py-3 px-6 rounded-full transition-all shadow"
        >
          Download Brochure
        </motion.a>
      </div>

      <p className="text-sm text-blue-200">© 2024 {clinicName}. All rights reserved.</p>
    </motion.footer>
  );
};

export default IvfFooter;

