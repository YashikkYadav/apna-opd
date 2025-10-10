'use client';
import React from 'react';
import { motion } from 'framer-motion';
import BookSession from '../common/BookSession';
import CallNow from '../common/CallNow';
import { useState } from 'react';

const IvfFooter = ({ data }) => {

  const [bokkSessionOpen, setBookSessionOpen] = useState(false);
  const [callNowOpen, setCallNowOpen] = useState(false);
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring" }}
      className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16 text-center rounded-3xl shadow-inner p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
        Ready to Transform Your Life with {data?.name}
      </h2>

      <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
        Start your wellness journey today with the best yoga centre near you!
      </p>

      <div className="flex justify-center flex-wrap gap-4 mb-10">
        <motion.a
          whileHover={{ scale: 1.05 }}
          onClick={() => setBookSessionOpen(true)}
          className="bg-white text-blue-700 hover:bg-blue-600 hover:text-white font-bold py-3 px-20 rounded-full shadow-md transition-all"
        >
          Book Session
        </motion.a>
        <BookSession
          isOpen={bokkSessionOpen}
          onClose={() => setBookSessionOpen(false)}
          title='Book a Session'
        />
        <motion.a
          whileHover={{ scale: 1.05 }}
          onClick={() => setCallNowOpen(true)}
          className="border-2 border-white text-white hover:bg-white hover:text-blue-800 font-bold py-3 px-20 rounded-full transition-all shadow"
        >
          Call Now
        </motion.a>
        <CallNow isOpen={callNowOpen} onClose={() => setCallNowOpen(false)} />
      </div>

      <p className="text-sm text-blue-200">
        © 2024 {data?.name}. All rights reserved.
      </p>
    </motion.footer>
  );
};

export default IvfFooter;

