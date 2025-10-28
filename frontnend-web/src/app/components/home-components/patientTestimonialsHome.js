"use client";
import React from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Rohit Sharma",
    img: "/images/p1.png",
    rating: 5,
    text: "Excellent service! Booked a cardiologist appointment through Apna OPD and got immediate confirmation. The doctor was very professional and the entire process was smooth.",
    used: "Doctor Consultation",
  },
  {
    name: "Priya Agarwal",
    img: "/images/p2.png",
    rating: 5,
    text: "Home sample collection was fantastic! The technician arrived on time, followed all safety protocols, and I got my reports within 24 hours. Highly recommended!",
    used: "Lab Tests",
  },
  {
    name: "Amit Jain",
    img: "/images/p3.png",
    rating: 4,
    text: "Great platform for health checkups. The full body checkup package was comprehensive and reasonably priced. Easy booking and good customer support.",
    used: "Health Package",
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } },
};

const PatientTestimonialsHome = () => {
  return (
    <section className="w-full bg-[#fafbfc] py-8 px-4 md:px-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-3xl font-bold text-gray-800">
            What Our Patients Say
          </h2>
          <a
            href="/why-choose-us"
            className="text-blue-600 font-semibold hover:underline text-base"
          >
            View All &rarr;
          </a>
        </div>
        <div className="flex gap-6 overflow-x-auto py-4 hide-scrollbar">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 0 2px #2563eb, 0 0 16px #2563eb",
              }}
              className="bg-white rounded-2xl shadow-md md:mx-3 flex flex-col items-start justify-between py-8 px-6 min-h-[250px] min-w-[250px] transition-all duration-200 cursor-pointer outline-none"
            >
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                />
                <div>
                  <div className="font-bold text-gray-800 text-lg">
                    {t.name}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 text-base">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm ${
                          i < t.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-gray-700 text-base mb-4 mt-2">
                "{t.text}"
              </div>
              <div className="text-pink-500 text-sm font-medium mt-auto">
                Used: {t.used}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default PatientTestimonialsHome; 