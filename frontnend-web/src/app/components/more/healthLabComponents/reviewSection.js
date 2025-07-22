'use client';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const ReviewSection = ({ healthProfile }) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Title */}
            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3">
                    <span className="text-4xl text-yellow-400">⭐</span>
                    Patient Reviews & Testimonials
                </h2>
            </div>

            {/* Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {healthProfile?.testimonials?.map((review, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.03 }}
                        className="bg-[#F7F9FB] border border-blue-200 rounded-2xl p-6 shadow-sm flex flex-col min-h-[220px] relative"
                    >
                        <FaQuoteLeft className="absolute top-4 left-4 text-blue-100 text-4xl" />
                        <blockquote className="italic text-gray-800 mb-6 mt-6 text-lg">
                            “{review?.comment}”
                        </blockquote>

                        {/* Reviewer Info */}
                        <div className="flex items-center gap-3 mt-auto">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <span className="font-bold text-gray-700 ml-2">{review?.name}</span>
                            <span className="text-gray-500 font-medium">• {review?.date}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* CTA */}
            <div className="flex justify-center pt-10">
                <button className="px-6 py-3 border-2 border-blue-600 text-blue-700 rounded-full hover:bg-blue-600 hover:text-white font-semibold transition-all duration-300">
                    Leave a Review
                </button>
            </div>
        </motion.section>
    );
};

export default ReviewSection;
