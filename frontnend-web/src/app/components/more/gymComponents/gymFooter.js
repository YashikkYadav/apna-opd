'use client';
import React from 'react';
import { motion } from 'framer-motion';

const GymFooter = ({ healthProfile }) => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16 text-center rounded-3xl shadow-inner p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Ready to Transform Your Fitness Journey?
            </h2>

            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Join <span className="text-green-400 font-semibold">{healthProfile?.name}</span> today and take the first step towards a healthier, stronger you!
            </p>

            <div className="flex justify-center flex-wrap gap-4 mb-10">
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="/join-now"
                    className="bg-white text-blue-700 hover:bg-blue-600 hover:text-white font-bold py-3 px-6 rounded-full shadow-md transition-all"
                >
                    Join {healthProfile?.name} Today
                </motion.a>
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="/free-trial"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-800 font-bold py-3 px-6 rounded-full transition-all shadow"
                >
                    Claim Your Free Trial
                </motion.a>
            </div>

            <p className="text-sm text-blue-300">© 2024 {healthProfile?.name}. All rights reserved.</p>
        </motion.footer>
    );
};

export default GymFooter;
