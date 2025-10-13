"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaStar, FaStarHalfAlt, FaRegStar, FaTint } from "react-icons/fa";
import RequestBloodDonation from "./DonorRequest";
import StarRating from "../../common-components/StarRating";

import { useState } from "react";

const HeroSection = ({ data, healthProfile }) => {
  console.log("h", healthProfile);

  const user = data;
  const [callModalOpen, setCallModalOpen] = useState(false);

  const getAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

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
            `${process.env.NEXT_PUBLIC_IMAGE_URL}/${healthProfile?.profilePhoto}` ||
            " "
          }
          alt={data?.name}
          width={340}
          height={340}
          unoptimized
          className="rounded-xl object-contain bg-slate-100 shadow-md w-full h-[250px] md:h-[340px]"
        />
      </div>

      {/* Right: Text Content */}
      <div className="z-10 flex-1 space-y-3 text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold drop-shadow capitalize">
          {user?.name ?? "Dummy Name"} ({healthProfile?.data?.gender || "N/A"})
        </h2>
        <p className="text-lg flex items-center bg-white text-[#0C65A0] rounded-full w-fit px-4 py-1 mx-auto lg:mx-0 font-semibold gap-2">
          <FaTint className="text-red-500" /> Blood Group:{" "}
          {healthProfile?.data?.bloodGroup || "N/A"}
        </p>
        <p className="capitalize text-lg">
          {healthProfile?.data?.locality}, {healthProfile?.data?.city || "N/A"}{" "}
          & Age: {getAge(healthProfile?.data?.dob)}
        </p>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
          <StarRating
            rating={avgRating}
            ratingCount={healthProfile?.testimonials?.length}
          />
        </div>
        {healthProfile?.data?.willingToDonate && (
          <p className="text-lg">
            Willing to Donate :{" "}
            {healthProfile?.data?.preferredDonationLocation || "N/A"}
          </p>
        )}
        {/* Enlarged Action Buttons */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
          <button
            onClick={() => setCallModalOpen(true)}
            className="border-2 border-white text-white text-lg px-8 py-3 rounded-full font-bold hover:bg-white hover:text-[#0C65A0] transition hover:scale-105"
          >
            📞 Request Donation
          </button>
          <RequestBloodDonation
            isOpen={callModalOpen}
            onClose={() => setCallModalOpen(false)}
          />
          <div>
            <button
              onClick={() => {
                const section = document.getElementById("contactSection");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border-2 border-white text-white text-lg px-8 py-3 rounded-full font-bold hover:bg-white hover:text-[#0C65A0] transition hover:scale-105"
            >
              📍 Get Directions
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
