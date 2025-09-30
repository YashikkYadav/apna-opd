"use client";
import React from "react";
import {
  FaUserMd,
  FaHeartbeat,
  FaTooth,
  FaEye,
  FaBrain,
  FaBone,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  {
    icon: <FaHeartbeat className="text-white text-3xl" />, // Cardiologist
    title: "Cardiologist",
    subtitle: "Heart specialists",
  },
  {
    icon: <FaUserMd className="text-white text-3xl" />, // Gynaecologist
    title: "Gynaecologist",
    subtitle: "Women's health",
  },
  {
    icon: <FaTooth className="text-white text-3xl" />, // Dentist
    title: "Dentist",
    subtitle: "Dental care",
  },
  {
    icon: <FaEye className="text-white text-3xl" />, // Ophthalmologist
    title: "Ophthalmologist",
    subtitle: "Eye care",
  },
  {
    icon: <FaBrain className="text-white text-3xl" />, // Neurologist
    title: "Neurologist",
    subtitle: "Brain & nerves",
  },
  {
    icon: <FaBone className="text-white text-3xl" />, // Orthopedic
    title: "Orthopedic",
    subtitle: "Bone & joints",
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } },
};

const PopularCategories = () => {
  return (
    <section className="w-full bg-[#fafbfc] py-8 px-4 md:px-3">
      <div className="mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-3xl font-bold text-gray-800">
            Popular Categories
          </h2>
          <a
            href="/find-doctor"
            className="text-blue-600 font-semibold hover:underline text-base"
          >
            View All &rarr;
          </a>
        </div>
        <div className="flex gap-6 overflow-x-auto hide-scrollbar">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={`/find-doctor?location=&speciality=${cat.title}`}
            >
              <motion.div
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 0 0 2px #3B82F6, 0 0 16px #3B82F6",
                }}
                className="bg-white rounded-2xl shadow-md flex flex-col items-center justify-center py-10 px-4 my-4 lg:mx-2 w-[220px] transition-all duration-200 cursor-pointer outline-none"
              >
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 mb-6">
                  {cat.icon}
                </div>
                <div className="text-xl font-bold text-gray-800 mb-2 text-center">
                  {cat.title}
                </div>
                <div className="text-gray-600 text-base text-center">
                  {cat.subtitle}
                </div>
              </motion.div>
            </Link>
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

export default PopularCategories;
