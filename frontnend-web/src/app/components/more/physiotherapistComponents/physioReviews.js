'use client';

import { motion } from 'framer-motion';
import { FaStar, FaRegStar, FaCommentDots } from 'react-icons/fa';

const renderStars = (count) =>
    [...Array(5)].map((_, i) =>
        i < count ? (
            <FaStar key={i} className="text-yellow-500" />
        ) : (
            <FaRegStar key={i} className="text-yellow-300" />
        )
    );

const PatientReviews = ({ data }) => {
    const reviews = data?.healthProfile?.reviews || [];

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.03, boxShadow: '0 0 0 3px rgba(59,130,246,0.2)' }}
                        className="bg-[#F7F9FB] rounded-2xl p-8 min-h-[220px] border-l-4 border-blue-500 hover:border-blue-600 transition-all"
                    >
                        <div className="text-4xl text-blue-300 mb-2">“”</div>
                        <p className="text-gray-700 text-base font-medium mb-4">{review.comment}</p>
                        <div className="flex items-center gap-3 mt-auto">
                            <div className="flex gap-1">{renderStars(review.rating)}</div>
                            <span className="text-gray-600 font-semibold">{review.name}</span>
                        </div>
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
