"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const PatientTestimonials = ({ testimonials = [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 text-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl font-extrabold text-gray-900 mb-12"
      >
        What Our Patients Say
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start text-left transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer hover:ring-2 hover:ring-blue-500 hover:ring-offset-2"
          >
            <p className="text-gray-700 text-lg italic mb-6 leading-relaxed">
              "{testimonial.text}"
            </p>
            <div className="flex items-center mt-auto">
              <Image
                src={testimonial.image}
                alt={testimonial.author}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0 border border-gray-200"
              />
              <div className="ml-4">
                <h4 className="text-md font-semibold text-gray-900">{testimonial.author}</h4>
                <p className="text-gray-600 text-sm">{testimonial.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PatientTestimonials; 