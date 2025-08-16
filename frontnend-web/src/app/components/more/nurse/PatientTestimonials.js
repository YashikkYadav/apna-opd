"use client";
import { motion } from "framer-motion";
import { FaStar, FaRegStar, FaCommentDots } from "react-icons/fa";
import Image from "next/image";


const PatientTestimonials = ({ testimonials = [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring" }}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
    >
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3">
          <FaCommentDots className="text-3xl text-blue-700" />
          What Our Patients Say
        </h2>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((review, idx) => (
          <motion.div
            key={idx}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 0 2px rgba(59,130,246,0.3)",
            }}
            className="bg-[#F7F9FB] rounded-2xl p-6 border-l-4 border-blue-500 hover:border-blue-600 transition-all flex flex-col justify-between"
          >
            <p className="text-gray-700 text-base font-medium italic mb-4">
              "{review.text}"
            </p>

            <div className="flex items-center gap-4">
              <Image
                src={review.image}
                alt={review.author}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover border border-gray-200"
              />
              <div>
                <h4 className="text-md font-semibold text-blue-700">
                  {review.author}
                </h4>
                <p className="text-gray-600 text-sm">{review.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PatientTestimonials;
