"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import BookSession from "../common/BookSession";

function getStarIcons(avgRating) {
  const stars = [];
  const safeRating = avgRating ?? 0;
  const fullStars = Math.floor(safeRating);
  const hasHalfStar = safeRating - fullStars > 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FaStar key={`full-${i}`} className="text-[#FFD700] text-2xl" />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <FaStarHalfAlt key="half" className="text-[#FFD700] text-2xl" />
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FaRegStar key={`empty-${i}`} className="text-[#FFD700] text-2xl" />
    );
  }

  return stars;
}

const HeroSection = ({
  imageUrl = "/images/gym-default.jpg",
  healthProfile,
  data,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const avgRating = healthProfile?.testimonials?.length
    ? (
        healthProfile?.testimonials.reduce((sum, r) => sum + r.rating, 0) /
        healthProfile?.testimonials.length
      ).toFixed(1)
    : "0.0";
  const reviewCount = healthProfile?.testimonials?.length || 0;
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="relative overflow-hidden bg-[#0C65A0] text-white rounded-2xl shadow-lg p-5 md:p-10 flex flex-col lg:flex-row items-center gap-10"
    >
      {/* Decorative Circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full z-0" />
      <div className="absolute -top-10 right-0 w-40 h-40 bg-white/10 rounded-full z-0" />

      {/* Left Image */}
      <div className="z-10 flex-shrink-0 w-full lg:w-2/5 flex justify-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${healthProfile?.profilePhoto}`}
          alt={data?.name}
          width={320}
          height={320}
          className="rounded-xl object-contain bg-slate-100 shadow-md w-full h-[250px] md:h-[340px]"
        />
      </div>

      {/* Right Content */}
      <div className="z-10 flex-1 space-y-3 text-center lg:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow capitalize">
          {data?.name}
        </h1>

        <p className="text-white/90 text-lg max-w-xl">
          {healthProfile?.introduction}
        </p>

        {/* Ratings */}
        <div className="flex items-center gap-2 justify-center lg:justify-start">
          {getStarIcons(parseFloat(avgRating))}
          <span className="text-white text-xl font-semibold ml-2">
            {avgRating}/5
          </span>
          <span className="text-white/70 text-lg ml-2">
            ({reviewCount} reviews)
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-3">
          {healthProfile?.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-white/20 text-white px-4 py-2 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-3">
          <div>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-white text-blue-700 px-6 py-4 rounded-full font-bold"
            >
              Book a Free Trial
            </button>

            <BookSession
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              healthServeId={healthProfile?._id}
            />
          </div>

          <div>
            <button
              onClick={() => {
                const section = document.getElementById("plansSection");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border-2 border-white text-white text-lg px-8 py-3 rounded-full font-bold hover:bg-white hover:text-green-700 transition hover:scale-105"
            >
              📋 Plans
            </button>
          </div>

          <div>
            <button
              onClick={() => {
                const section = document.getElementById("LocationSection");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-white font-semibold px-6 py-4 border-2 border-white rounded-full hover:bg-white hover:text-blue-600 transition"
            >
              📍 Directions
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
