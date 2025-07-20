'use client';
import { motion } from 'framer-motion';
import { FaStar, FaRegStar, FaCommentDots } from 'react-icons/fa';

const testimonials = [
  {
    text: `Excellent faculty and practical training. The hospital tie-ups provided great exposure during internships. Highly recommend for nursing education.`,
    name: '{{student_1_name}}',
    course: 'B.Sc Nursing Graduate',
    rating: 5,
  },
  {
    text: `Great infrastructure and supportive environment. The hostel facilities are comfortable and the faculty is very helpful throughout the course.`,
    name: '{{student_2_name}}',
    course: 'GNM Student',
    rating: 4,
  },
  {
    text: `Good placement support and clinical training. The college has strong connections with leading hospitals which helped in getting good job opportunities.`,
    name: '{{student_3_name}}',
    course: 'ANM Graduate',
    rating: 5,
  },
  {
    text: `Modern labs and equipment for practical learning. The MBBS program is well-structured with experienced faculty and excellent clinical exposure.`,
    name: '{{student_4_name}}',
    course: 'MBBS Student',
    rating: 5,
  },
];

const renderStars = (count) =>
  [...Array(5)].map((_, i) =>
    i < count ? (
      <FaStar key={i} className="text-yellow-500" />
    ) : (
      <FaRegStar key={i} className="text-yellow-300" />
    )
  );

const StudentTestimonials = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: 'spring' }}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
    >
      {/* Title */}
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center justify-center md:justify-start gap-3">
          <FaCommentDots className="text-3xl text-blue-700" />
          Student Reviews & Testimonials
        </h2>
        <p className="text-gray-600 text-lg mt-2">
          Hear from our successful graduates and current students
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03, boxShadow: '0 0 0 2px rgba(59,130,246,0.3)' }}
            className="bg-[#F7F9FB] rounded-2xl p-6 border-l-4 border-blue-500 hover:border-blue-600 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-blue-700">{t.name}</h3>
              <div className="flex gap-1">{renderStars(t.rating)}</div>
            </div>
            <p className="text-gray-700 text-base font-medium italic mb-4">"{t.text}"</p>
            <p className="text-sm font-semibold text-gray-600">– {t.course}</p>
          </motion.div>
        ))}
      </div>

      {/* Optional CTA */}
      <div className="flex justify-center pt-10">
        <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white font-semibold transition-all duration-300">
          Share Your Experience
        </button>
      </div>
    </motion.section>
  );
};

export default StudentTestimonials;
