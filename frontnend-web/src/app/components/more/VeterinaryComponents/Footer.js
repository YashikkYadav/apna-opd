'use client';
import React from 'react';
import { motion } from 'framer-motion';

const FooterCTA = ({healthProfile }) => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16 text-center rounded-3xl shadow-inner p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Looking for Compassionate Pet Care?
            </h2>

            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Don’t wait – your pet’s health is our priority. Book with <span className="text-green-400 font-semibold">{healthProfile?.name}</span> today!
            </p>

            <div className="flex justify-center flex-wrap gap-4 mb-10">
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="/book"
                    className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3 px-6 rounded-full shadow-md transition-all"

                >
                    Book with {healthProfile?.name}
                </motion.a>
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="/download-app"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-800 font-bold py-3 px-6 rounded-full transition-all shadow"
                >
                    Download Apna OPD App
                </motion.a>
            </div>

            <p className="text-sm text-blue-300">© 2024 Apna OPD. All rights reserved.</p>
        </motion.footer>
    );
};

export default FooterCTA;
