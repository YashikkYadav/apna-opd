'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Rudolf Basna',
    role: 'Founder ABZ Studio House',
    quote: 'Perfect Works and Very Recommended!',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    image: '/images/image_placeholder.svg',
  },
  {
    id: 2,
    name: 'Alice Johnson',
    role: 'CTO, TechWave',
    quote: 'Amazing Experience!',
    message:
      'Their professionalism and care made a huge difference for us. Highly recommend!',
    image: '/images/image_placeholder.svg',
  },
  {
    id: 3,
    name: 'Dr. Sanjay',
    role: 'Senior Surgeon',
    quote: 'Very professional!',
    message:
      'Impressed with the precision and support. Would definitely return.',
    image: '/images/image_placeholder.svg',
  },
  {
    id: 4,
    name: 'Priya Sharma',
    role: 'HR Manager',
    quote: 'Highly Efficient Team!',
    message: 'The team went above and beyond. I felt very cared for.',
    image: '/images/image_placeholder.svg',
  },
  {
    id: 5,
    name: 'James Lee',
    role: 'Software Engineer',
    quote: 'Great Service!',
    message: 'Exceptional attention to detail and prompt care.',
    image: '/images/image_placeholder.svg',
  },
  {
    id: 6,
    name: 'Neha Kapoor',
    role: 'Marketing Lead',
    quote: 'Wonderful Experience!',
    message:
      'From start to finish, everything was smooth and professional.',
    image: '/images/image_placeholder.svg',
  },
];

const slideVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -100 : 100,
  }),
};

const WhatOurUsers = () => {
  const [[index, direction], setIndex] = useState([0, 0]);
  const slide = testimonials[index];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(([prev]) => [(prev + 1) % testimonials.length, 1]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setIndex(([prev]) => [
      (prev - 1 + testimonials.length) % testimonials.length,
      -1,
    ]);
  };

  const goToNext = () => {
    setIndex(([prev]) => [(prev + 1) % testimonials.length, 1]);
  };

  return (
    <div className="w-full bg-white py-12 px-4 sm:px-6 lg:px-12">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#094B89]">
          What Our Users Have to Say
        </h2>
        <Image
          src="/images/comma.svg"
          width={65}
          height={40}
          alt="Comma"
          className="w-12 sm:w-[85px] h-auto"
        />
      </div>

      {/* Carousel Section */}
<div className="flex flex-col md:flex-row w-full overflow-hidden rounded-2xl">
  {/* Left Image */}
  <div className="w-full md:w-2/5 bg-[#EBEBEB] flex justify-center items-center">
    <Image
      src="/images/image_placeholder.svg"
      width={300}
      height={300}
      alt="Doctor"
      className="w-full max-w-[400px] object-contain"
    />
  </div>

  {/* Right Carousel */}
  <div className="relative w-full md:w-3/5 bg-[#094B89] text-white py-10 px-6 sm:px-10">
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={slide.id}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <h4 className="text-xl sm:text-2xl font-semibold mb-4">{slide.quote}</h4>
        <p className="mb-6 max-w-[580px] text-sm sm:text-base">{slide.message}</p>
        <div className="flex items-center gap-3">
          <Image
            src={slide.image}
            width={40}
            height={40}
            alt={slide.name}
            className="bg-white rounded-full w-10 h-10"
          />
          <div>
            <h6 className="text-sm sm:text-base font-bold">{slide.name}</h6>
            <p className="text-xs sm:text-sm">{slide.role}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>

    {/* Navigation Buttons */}
    <div className="absolute bottom-4 right-4 flex gap-3">
      <button
        onClick={goToPrev}
        className="p-2 sm:p-3 bg-white text-[#094B89] rounded-full hover:bg-gray-100 transition"
        aria-label="Previous"
      >
        <FaChevronLeft size={16} />
      </button>
      <button
        onClick={goToNext}
        className="p-2 sm:p-3 bg-white text-[#094B89] rounded-full hover:bg-gray-100 transition"
        aria-label="Next"
      >
        <FaChevronRight size={16} />
      </button>
    </div>
  </div>
</div>

    </div>
  );
};

export default WhatOurUsers;
