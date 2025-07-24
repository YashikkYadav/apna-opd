'use client';
import React from 'react';
import { motion } from 'framer-motion';
import ApplyNow from './ApplyNow';
const CollegeFooter = ({ healthProfile, applyLink = "#", campusVisitLink = "#" }) => {
    const [modelOpen, setModalOpen] = React.useState(false);
    return (
        <motion.footer
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16 text-center rounded-3xl shadow-inner p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* CTA Heading */}
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Ready to Start Your Medical Journey with
            </h2>
            <h3 className="text-3xl md:text-5xl font-extrabold mb-6 text-white drop-shadow-sm">
                {healthProfile?.name}?
            </h3>

            {/* Subtext */}
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
                Join thousands of successful medical professionals who started their career with us
            </p>

            {/* Buttons */}
            <div className="flex justify-center flex-wrap gap-4 mb-10">
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3 px-8 rounded-full shadow-md transition-all"
                    onClick={() => setModalOpen(true)}
                >
                    Apply Now
                </motion.a>
                <ApplyNow isOpen={modelOpen} onClose={() => setModalOpen(false)} />

                <motion.a
                    whileHover={{ scale: 1.05 }}
                    href={campusVisitLink}
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-800 font-bold py-3 px-8 rounded-full transition-all shadow"
                >
                    Schedule a Campus Visit
                </motion.a>
            </div>

            {/* Footer Bottom */}
            <p className="text-sm text-blue-300">
                © 2025 {healthProfile?.name}. All rights reserved. | Listed on Apna OPD
            </p>
            <p className="text-sm text-blue-300 mt-1">
                Empowering Future Healthcare Professionals
            </p>
        </motion.footer>
    );
};

export default CollegeFooter;
