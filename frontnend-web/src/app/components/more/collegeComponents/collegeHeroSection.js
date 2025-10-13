"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import ApplyNow from "./ApplyNow";
import CallNow from "../common/CallNow"; 
import StarRating from "../../common-components/StarRating";

const CollegeHeroSection = ({
  college_name = "EduVista Institute",
  healthProfile,
  data,
}) => {
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const avgRating = healthProfile?.testimonials?.length
    ? (
        healthProfile?.testimonials.reduce((sum, r) => sum + r.rating, 0) /
        healthProfile?.testimonials.length
      ).toFixed(1)
    : "0.0";

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

      {/* Left: College Image */}
      <div className="z-10 flex-shrink-0 w-full lg:w-2/5 flex justify-center">
        <Image
          src={
            `${process.env.NEXT_PUBLIC_IMAGE_URL}/${healthProfile?.profileImage}` ||
            ""
          }
          alt={college_name}
          width={320}
          height={320}
          className="rounded-xl object-contain bg-slate-100 shadow-md w-full h-[250px] md:h-[340px]"
        />
      </div>

      {/* Right: College Info */}
      <div className="z-10 flex-1 space-y-3 text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold drop-shadow capitalize">
          {data?.name}
        </h2>

        <p className="text-white/90 text-lg max-w-xl">{healthProfile?.about}</p>

        {/* Ratings */}
        <div className="flex items-center gap-2 justify-center lg:justify-start">
          <StarRating
            rating={avgRating}
            ratingCount={healthProfile?.testimonials?.length}
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-3 py-3">
          {healthProfile?.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-white/20 text-white px-4 py-2 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-white text-blue-700 text-lg px-8 py-3 rounded-full font-bold shadow hover:bg-blue-100 transition hover:scale-105"
          >
            🎓 Apply Now
          </button>
          <ApplyNow isOpen={modalOpen} onClose={() => setModalOpen(false)} />
          <button className="border-2 border-white text-white text-lg px-8 py-3 rounded-full font-bold hover:bg-white hover:text-blue-700 transition hover:scale-105">
            📄 Download Brochure
          </button>
          <button className="border-2 border-white text-white text-lg px-8 py-3 rounded-full font-bold hover:bg-white hover:text-blue-700 transition hover:scale-105">
            🌐 Visit Website
          </button>
          <button
            onClick={() => setCallModalOpen(true)}
            className="border-2 border-white text-white text-lg px-8 py-3 rounded-full font-bold hover:bg-white hover:text-[#0C65A0] transition hover:scale-105"
          >
            📞 Call Now
          </button>
          <CallNow
            isOpen={callModalOpen}
            onClose={() => setCallModalOpen(false)}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default CollegeHeroSection;
