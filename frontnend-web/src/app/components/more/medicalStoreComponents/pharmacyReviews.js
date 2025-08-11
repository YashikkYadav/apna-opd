'use client';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { FaQuoteLeft } from 'react-icons/fa';

const TestimonialsSection = ({ healthProfile }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Title */}
            <div className="text-left mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center justify-start gap-3">
                    <span className="text-4xl text-yellow-400">⭐</span>
                    Patient Reviews & Testimonials
                </h2>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {healthProfile?.testimonials.map((review, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.03, boxShadow: '0 0 0 3px rgba(37,99,235,0.2)' }}
                        className="bg-[#F7F9FB] border border-blue-200 rounded-2xl p-6 shadow-sm flex flex-col min-h-[220px] relative transition-all"
                    >
                        <FaQuoteLeft className="absolute top-4 left-4 text-blue-100 text-4xl" />

                        <blockquote className="italic text-gray-800 mb-6 mt-4 relative text-lg">
                            {review?.text}
                        </blockquote>

                        {/* Reviewer Meta */}
                        <div className="flex items-center gap-3 mt-auto">
                            <div className="flex text-yellow-400">
                                {Array(5)
                                    .fill()
                                    .map((t, i) => (
                                        <span
                                            key={i}
                                            className={`text-lg ${i < t?.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        >★</span>
                                    ))}
                            </div>
                            <span className="font-bold text-gray-700 ml-2">{review?.author}</span>
                            {/* <span className="text-gray-500 font-medium">• {review}</span> */}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default TestimonialsSection;
