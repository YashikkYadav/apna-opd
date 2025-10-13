"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import BookSession from "../common/BookSession";
import CallNow from "../common/CallNow";
import StarRating from "../../common-components/StarRating";


export default function RadioHeroSection({ data, healthProfile }) {
  const [openModal, setOpenModal] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const avgRating = healthProfile?.testimonials?.length
    ? (
        healthProfile.testimonials.reduce((sum, r) => sum + r.rating, 0) /
        healthProfile.testimonials.length
      )
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

      {/* Left: Profile Image */}
      <div className="z-10 flex-shrink-0 w-full lg:w-2/5 flex justify-center">
        <Image
          src={
            `${process.env.NEXT_PUBLIC_IMAGE_URL}/${healthProfile?.profileImage}` ||
            ""
          }
          alt={healthProfile?.name || "Doctor"}
          width={300}
          height={300}
          unoptimized
          className="rounded-xl object-contain bg-slate-100 shadow-md w-full h-[250px] md:h-[320px]"
        />
      </div>

      {/* Right: Content */}
      <div className="z-10 flex-1 text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold drop-shadow capitalize mb-3">
          {data?.name}
        </h2>
        <p className="text-white/90 text-lg max-w-xl mb-3">
          {healthProfile?.introduction}
        </p>
        <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-3">
          <p className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
            RadioLogist
          </p>
          <p className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
            {healthProfile?.experience}+ years of experience
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 justify-center lg:justify-start mb-3">
          <StarRating
            rating={avgRating}
            ratingCount={healthProfile?.testimonials?.length}
          />
        </div>

        {/* Specialties / Tags */}
        {/* <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-3">
          {healthProfile?.specialties?.map((tag, i) => (
            <span key={i} className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div> */}

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
          <button
            onClick={() => setOpenModal(true)}
            className="bg-white text-[#0C65A0] text-lg px-8 py-3 rounded-full font-bold shadow hover:bg-gray-100 transition hover:scale-105"
          >
            📅 Book Appointment
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
          <button
            onClick={() => {
              const section = document.getElementById("LocationSection");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className="border-2 border-white text-white text-lg px-8 py-3 rounded-full font-bold hover:bg-white hover:text-[#0C65A0] transition hover:scale-105"
          >
            📍 Get Directions
          </button>
        </div>
        <BookSession
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          title="Book a Appointment"
        />
      </div>
    </motion.section>
  );
}
