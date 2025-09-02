'use client';

import { motion } from 'framer-motion';
import { FaStar, FaRegStar, FaCommentDots } from 'react-icons/fa';


const PatientReviews = ({ healthProfile }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Title */}
            <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3">
                    <FaCommentDots className="text-3xl text-yellow-500" />
                    Patient Reviews & Testimonials
                </h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {healthProfile?.testimonials?.map((t, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.04, boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.2)' }}
                        className="bg-[#F7F9FB] border-l-4 border-blue-500 hover:border-blue-700 rounded-2xl p-6 transition-all duration-300"
                    >
                        <div className="text-3xl text-blue-400 mb-2">“”</div>
                        <div className="flex mb-3">
                            {Array(5)
                                .fill()
                                .map((_, i) => (
                                    <span
                                        key={i}
                                        className={`text-lg ${i < t.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                    >★</span>
                                ))}
                        </div>
                        <p className="text-gray-700 mb-4">
                            <strong>{t.vetName}</strong> {t.text}
                        </p>
                        <p className="font-semibold text-blue-800">
                            – {t.author}, <span className="text-gray-600">{t.role}</span>
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* CTA */}
            <div className="flex justify-center pt-10">
                <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white font-semibold transition-all duration-300">
                    Leave a Review
                </button>
            </div>
        </motion.div>
    );
};

export default PatientReviews;
