"use client"
import React from "react";
import { motion } from "framer-motion";

const text = {
  headline: "India's Largest Homecare Healthcare Chain",
  sub: "Bringing trusted healthcare to your doorstep across India — from urban centers to remote areas.",
  desc: "With Apna OPD, you can now access verified nursing care, lab tests, and doctor consultations from the comfort of your home.",
  tagline: "Fast. Reliable. Nationwide."
};

const HeroSection2 = () => {
  return (
    <section className="w-full bg-gradient-to-br from-[#e0f2fe] via-[#f0f4ff] to-[#f8fafc] py-12 px-2 md:px-0">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          viewport={{ once: true }}
          className="flex-1 text-left"
        >
          <h1 className="text-2xl md:text-4xl font-extrabold text-blue-700 mb-4 leading-tight">
            {text.headline}
          </h1>
          <h2 className="text-lg md:text-2xl font-semibold text-gray-800 mb-3">
            {text.sub}
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-6">
            {text.desc}
          </p>
          <div className="text-blue-500 font-bold text-lg md:text-xl tracking-wide">
            {text.tagline}
          </div>
        </motion.div>
        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, type: "spring", delay: 0.2 }}
          viewport={{ once: true }}
          className="flex-1 flex justify-center items-center"
        >
          <img
            src="/images/map.png"
            alt="India map with Apna OPD logo"
            className="w-full max-w-[350px] md:max-w-[420px] h-auto object-contain drop-shadow-xl rounded-xl"
            draggable={false}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection2; 