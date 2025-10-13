"use client";
import { motion } from "framer-motion";
import { FaStar, FaRegStar, FaCommentDots } from "react-icons/fa";
import Image from "next/image";

const Testimonials = ({
  testimonials, type
}) => {
  const users = () => {
    if (type === 'blood_donor'){
      return 'Donors'
    } else if (type === "Gym") {
      return "Fitness Freaks";
    } else if (type === "yoga") {
      return "Members";
    } else {
      return "Patients";
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring" }}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-7 mx-auto mt-12 mb-8 md:py-12"
    >
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3">
          <FaCommentDots className="text-3xl text-blue-700" />
          What Our {users()} Say
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

            <div className="flex items-center gap-3">
              {review.image ? (
                <Image
                  src={review.image}
                  alt={review.author}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="w-12 h-12 rounded-full flex justify-center items-center text-lg text-white font-bold bg-blue-500">
                  {review.author[0].toUpperCase()}
                </div>
              )}
              <div className="pt-3">
                <h4 className="text-md font-semibold text-blue-700 mb-0">
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

export default Testimonials;
