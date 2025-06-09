'use client';
import React from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: `Booking with Apna OPD saved me hours of calling different clinics. The platform is so easy to use and I got my appointment confirmed instantly. Highly recommend!`,
    name: "Anjali Mehta",
    rating: 5,
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    accent: "from-blue-400 to-blue-200",
  },
  {
    text: `I found a specialist in minutes through Apna OPD. The doctor was excellent and the whole process was seamless. This platform is a game-changer!`,
    name: "Suresh Kumar",
    rating: 5,
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    accent: "from-purple-400 to-purple-200",
  },
  {
    text: `The patient reviews helped me choose the right doctor for my condition. Apna OPD has made healthcare so much more accessible and transparent.",`,
    name: "Priya Sharma",
    rating: 5,
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    accent: "from-cyan-400 to-cyan-200",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } },
};

const PatientTestimonials = () => {
  return (
    <section className="w-full bg-gradient-to-br from-[#f0f4ff] via-[#f8fafc] to-[#e0f2fe] py-12 px-2 md:px-0">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          What Our Patients Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -8, boxShadow: "0 8px 32px 0 rgba(56,189,248,0.10)" }}
              className="relative bg-white rounded-xl border border-gray-100 shadow-lg p-5 pt-10 flex flex-col justify-between min-h-[220px] transition-all duration-200 hover:border-blue-200"
            >
              <div className={`absolute left-0 top-0 w-full h-2 rounded-t-xl bg-gradient-to-r ${t.accent}`}></div>
              <img
                src={t.img}
                alt={t.name}
                className="absolute top-4 right-4 w-10 h-10 rounded-full object-cover ring-2 ring-blue-200 shadow-md bg-white"
              />
              <p className="text-sm text-gray-700 italic mb-6 pr-2 mt-4">"{t.text}"</p>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mt-auto">
                <span className="font-bold text-gray-800 text-sm">{t.name}</span>
                <span className="flex items-center gap-1 text-yellow-400 mt-2 md:mt-0">
                  {[...Array(t.rating)].map((_, i) => (
                    <FaStar key={i} className="text-xs" />
                  ))}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PatientTestimonials; 