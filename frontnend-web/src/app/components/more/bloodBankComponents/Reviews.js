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

const Reviews = (healthProfile) => {
    console.log("healthProfile", healthProfile);
    console.log("test",healthProfile?.testimonials)
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, type: "spring" }}
        className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
      >
        {/* Title */}
        <div className=" mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3">
            <FaCommentDots className="text-3xl text-blue-700" />
            Reviews & Ratings
          </h2>
        </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {healthProfile?.healthProfile?.testimonials?.map((review, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.03, boxShadow: '0 0 0 2px rgba(59,130,246,0.3)' }}
                        className="bg-[#F7F9FB] rounded-2xl p-6 min-h-[180px] border-l-4 border-blue-500 hover:border-blue-600 transition-all"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-bold text-blue-700">{review.title}</h3>
                            <div className="flex gap-1">{renderStars(review.rating)}</div>
                        </div>
                        <p className="text-gray-700 text-base font-medium">{review.text}</p>
                    </motion.div>
                ))}
            </div>

        {/* CTA */}
        <div className="flex justify-center pt-8">
          <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white font-semibold transition-all duration-300">
            Leave a Review
          </button>
        </div>
      </motion.div>
    );
};

export default Reviews;
