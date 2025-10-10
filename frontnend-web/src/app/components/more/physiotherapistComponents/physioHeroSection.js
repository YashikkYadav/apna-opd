"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { CalendarPlus, Package } from "lucide-react";
import BookSession from "../common/BookSession"
import { useState } from "react";
import CallNow from "../common/CallNow";

import StarRating from "../../common-components/StarRating";

const PhysiotherapyHero = ({ data, healthProfile }) => {
  console.log("b", healthProfile);

  const features = healthProfile?.doctorInfo?.features;
  const [modalOpen, setModalOpen] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);
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
      {/* Background Circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full z-0" />
      <div className="absolute -top-10 right-0 w-40 h-40 bg-white/10 rounded-full z-0" />

      {/* Left: Image */}
      <div className="z-10 flex-shrink-0 w-full lg:w-2/5 flex justify-center">
        <Image
          src={
            `${process.env.NEXT_PUBLIC_IMAGE_URL}/${healthProfile?.profileImage}` ||
            ""
          }
          alt={`Dr.${data?.name}`}
          width={340}
          height={340}
          className="rounded-xl object-contain bg-slate-100 shadow-md w-full h-[250px] md:h-[340px]"
          priority
        />
      </div>

      {/* Right: Text Content */}
      <div className="z-10 flex-1 text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold drop-shadow mb-3 capitalize">
          {data?.name}
        </h2>
        <p className="mb-3">{healthProfile?.introduction}</p>

        <p className="text-white/90 text-lg mb-3">
          {healthProfile?.experience} Years Experience •{" "}
          {data?.locality ?? "Your Area"} • 5km Home Visit Radius
        </p>

        {/* Star Ratings */}
        <div className="flex items-center gap-2 justify-center lg:justify-start">
          <StarRating rating={avgRating} ratingCount={healthProfile?.testimonials?.length} />
        </div>

        {/*Tags */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-4 pb-2">
          {healthProfile?.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-white/20 text-white px-4 py-2 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mt-3 justify-center lg:justify-start">
          {features?.map((item, idx) =>
            item.enabled ? (
              <span
                key={idx}
                className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur"
              >
                {item.label}
              </span>
            ) : null
          )}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-white text-[#0C65A0] text-lg px-8 py-3 rounded-full font-bold shadow hover:bg-gray-100 transition hover:scale-105 flex items-center gap-2"
          >
            <CalendarPlus className="w-5 h-5" /> Book Session
          </button>
          <BookSession isOpen={modalOpen} onClose={() => setModalOpen(false)} />
          <button
            onClick={() => {
              const section = document.getElementById("therapyPackagesSection");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className="border-2 border-white text-white text-lg px-8 py-3 rounded-full font-bold hover:bg-white hover:text-[#0C65A0] transition hover:scale-105 flex items-center gap-2"
          >
            <Package className="w-5 h-5" /> Explore Packages
          </button>
          <button
            onClick={() => setCallModalOpen(true)}
            className="border-2 border-white text-white text-lg px-8 py-3 rounded-full font-bold hover:bg-white hover:text-green-700 transition hover:scale-105"
          >
            📞 Call Now
          </button>
          <CallNow
            isOpen={callModalOpen}
            onClose={() => setCallModalOpen(false)}
          />
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
    </motion.section>
  );
};

export default PhysiotherapyHero;
